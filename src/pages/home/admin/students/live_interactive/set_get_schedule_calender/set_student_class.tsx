import { useEffect, useCallback, useState } from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
  EventContentArg,
  EventRemoveArg,
} from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import PrimeDataTable from "../../../../../../common/prime_data_table";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import protectedApiService from "../../../../../../services/_protected_api";
import { Columns } from "../../../../../../interfaces/_common";
import globalDataStore from "../../../../../../store/_globalData";
import { json } from "stream/consumers";
import commonApiService from "../../../../../../services/_common_api";

export default function SetStudentClass() {
  const location: any = useLocation();
  const student: any = location.state;
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [initialEvents, setInitialEvents] = useState<EventInput[]>([]);
  const {
    getFacultyDetails,
    postAddFacultyTiming,
    postDeleteFacultyTiming,
    getStudentClasses,
    getFacultyTimingAll,
    getStudentFacultyTiming,
  } = protectedApiService();

  const { allCourses } = globalDataStore();
  const [show, setShow] = useState(false);
  const [currentFacultyDetails, setCurrentFacultyDetails] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [student_classes, setStudentClasses] = useState<any>([]);
  const [timing, setTiming] = useState<{
    scheduledTiming: any[];
    notscheduledTiming: any[];
    students: any[];
  }>({
    scheduledTiming: [],
    notscheduledTiming: [],
    students: [],
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  ///////////////////////////////

  useEffect(() => {
    //console.log(student);
    getFacultyData();
    getClasses();
  }, []);
  /////////////////\

  ////
  const getClasses = async () => {
    const res: any = await getStudentClasses(student.user_id);
    setStudentClasses(res);
    //console.log("sclass", res, typeof res);
  };
  ////
  const getFacultyData = async () => {
    setRenderLoading(true);
    const res: any = await getFacultyTimingAll();
    ////console.log(res);
    setCurrentFacultyDetails(res);
    //console.log(res);
    const filtered_course_data = res.faculty_timing.filter(
      (item: any) => item.course_id == student.course_id
    );
    const eventInit: EventInput[] = filtered_course_data.map((fac: any) => {
      let timing: EventInput = {
        id: Math.random() * 100 - 15 + 15 + "",
        start: `${fac.date.replace(/T.*$/, "")}T${fac.start_time}:00+05:30`,
        end: `${fac.date.replace(/T.*$/, "")}T${fac.end_time}:00+05:30`,
        title: student.course_name || "Not Specified",
        display: `${fac.start_time.replace(
          /T.*$/,
          ""
        )} - ${fac.end_time.replace(/T.*$/, "")}`,
        event_id: fac.faculty_timing_id,
        mode: fac.mode,
        extra: fac,
      };
      return timing;
    });
    setInitialEvents(eventInit);
    // //console.log("Init", eventInit);
    setRenderLoading(false);
  };

  ////
  const [loading, setLoading] = useState<boolean>(false);
  const [renderloading, setRenderLoading] = useState<boolean>(true);
  const handleEvents = useCallback((events: EventApi[]) => {
    setCurrentEvents(events);
    // events.map((x: any) => {
    // //console.log(x);
    // });
  }, []);
  ///////
  const [selectInfoState, setSelectInfoState] = useState<any>(null);
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    handleShow();
    setSelectInfoState(selectInfo);
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  }, []);

  const onSubmit = async () => {
    if (
      formData.mode &&
      formData.start_time &&
      formData.end_time &&
      formData.course
    ) {
      let data: any = {
        user_id: currentFacultyDetails?.faculty_details?.user_id,
        date: selectInfoState.startStr.replace(/T.*$/, ""),
        start_time: formData.start_time,
        end_time: formData.end_time,
        mode: formData.mode,
        course: formData.course,
      };
      setLoading(true);
      const res: any = await postAddFacultyTiming(data);
      if (res.status) {
        const data: any = JSON.parse(res.data);
        toast.success("Task added!");
        //  //console.log(res);
        let calendarApi = selectInfoState.view.calendar;
        calendarApi.addEvent({
          id: data.faculty_timing_id,
          title: currentFacultyDetails?.faculty_courses.map((cos: any) =>
            cos.course_id == data.course ? cos.course_name : ""
          ),
          start: `${data.date.replace(/T.*$/, "")}T${data.start_time}:00`,
          end: `${data.date.replace(/T.*$/, "")}T${data.end_time}:00`,
          allDay: selectInfoState.allDay,
          display: `${moment(formData.start_time).format("ll")} - ${moment(
            formData.end_time
          ).format("HH:MM aa")}`,
          event_id: data.faculty_timing_id,
          mode: formData.mode,
          extra: data,
        });
        setLoading(false);
        handleClose();
        setFormData({});
      } else {
        //console.log(res);
      }
    } else {
      /// error
    }
  };

  /////////////////////

  // new Date(Date.parse(`${x.date}T${x.start_time}:00`))

  ////////
  const [clickInfoEvent, setClickInfoEvent] = useState<any>(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>("");
  const handleEventClick = useCallback(
    async (clickInfo: EventClickArg) => {
      //console.log("Extened", clickInfo.event.extendedProps);

      setClickInfoEvent(clickInfo);
      setSelectedEvent(clickInfo.event);
      const extra: any = clickInfo.event.extendedProps.extra;
      const creeds: any = {
        schedule_date: extra.date,
        student_user_id: student.user_id,
        user_id: extra.user_id,
        faculty_timing_id: extra.faculty_timing_id,
        course_id: extra.course_id,
      };
      const res: any = await getStudentFacultyTiming(creeds);
      let newTiming: any[] = [];
      function getScheduledTiming(arr1: any, arr2: any, key: string) {
        let newTiming: any[] = [];
        arr1.map((one: any) => {
          arr2.map((two: any) => {
            if (two[key] == one[key]) {
              newTiming.push({ ...one, ...two });
            }
          });
        });
        return newTiming;
      }
      console.log(res);

      setTiming({
        scheduledTiming: [
          ...getScheduledTiming(
            res.timing,
            student_classes,
            "faculty_timing_id"
          ),
        ],
        notscheduledTiming: [...res.timing],
        students: res.students,
      });
      setDeleteModalShow(true);
    },
    [selectedEvent, clickInfoEvent, timing]
  );
  const afterDeleteEvent = async (arg: EventRemoveArg) => {
    const res: any = await postDeleteFacultyTiming(
      selectedEvent.extendedProps.event_id
    );
    if (res == 1) {
      toast.success("Deleted!");
      setClickInfoEvent(null);
      setSelectedEvent("");
    }
  };
  return (
    <>
      {!renderloading ? (
        <div className="mt-3" style={{ paddingBottom: "20vh" }}>
          <div className="flex-between">
            <div className="heading col-sm-4">
              Set Student Class Schedule ({student.name} id: {student.user_id})
            </div>
          </div>
          <div className="card p-4 shadow mt-3">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                start: "today prev next",
                center: "title",
                end: "dayGridMonth timeGridWeek timeGridDay",
              }}
              height={"70vh"}
              initialView="dayGridMonth"
              selectable={true}
              editable={true}
              initialEvents={initialEvents}
              eventsSet={handleEvents}
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventColor={"transparent"}
              eventContent={renderEventContent}
              eventRemove={afterDeleteEvent}
            />
          </div>
          <Modal
            fullscreen={true}
            aria-labelledby="example-custom-modal-styling-title"
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                Schedule Timing:{" "}
                {selectedEvent && selectedEvent.extendedProps.extra.date}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {timing.notscheduledTiming?.length ? (
                <AddClassTable
                  student_classes={timing.notscheduledTiming}
                  scheduled_timing={timing.scheduledTiming}
                  assigned_students={timing.students}
                  student={student}
                  title="Available Schedule Time"
                />
              ) : (
                <></>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setDeleteModalShow(false)}
                className="btn btn-info btn-sm"
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
          {/* <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Schedule Timing</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5 flex-center">
              <div
                className="mx-auto"
                style={{
                  minWidth: "20rem",
                }}
              >
                <div className="mb-3">
                  <label htmlFor="mode" className="form-label">
                    Mode
                  </label>
                  <div className="flex-start flex-between ">
                    <select
                      id="mode"
                      name="mode"
                      className="form-select  m-2"
                      onChange={(e) =>
                        onValueChange({
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      <option value={0} disabled selected hidden>
                        Select Class Mode
                      </option>
                      <option value={0}>Online</option>
                      <option value={1}>Offline</option>
                      <option value={2}>Both</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">
                    Course
                  </label>
                  <div className="flex-start flex-between ">
                    <select
                      id="course"
                      name="course"
                      className="form-select  m-2"
                      onChange={(e) =>
                        onValueChange({
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      <option value={0} disabled selected hidden>
                        Select Course
                      </option>
                      {currentFacultyDetails?.faculty_courses &&
                        currentFacultyDetails?.faculty_courses.map(
                          (co: any) => (
                            <option value={co.course_id}>
                              {co.course_name}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>
                <div className="flex-center">
                  <div className="mb-3 p-1">
                    <label htmlFor="start_time" className="form-label">
                      Start Time
                    </label>
                    <input
                      type="time"
                      onChange={(e) =>
                        onValueChange({
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="form-control"
                      name="start_time"
                      id="start_time"
                      aria-describedby="namelHelp"
                      placeholder="Start Time"
                      required
                    />
                  </div>
                  <div className="mb-3 p-1">
                    <label htmlFor="end_time" className="form-label">
                      Start Time
                    </label>
                    <input
                      type="time"
                      onChange={(e) =>
                        onValueChange({
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="form-control"
                      name="end_time"
                      id="end_time"
                      aria-describedby="namelHelp"
                      placeholder="End Time"
                      required
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                disabled={loading}
                onClick={onSubmit}
                className="btn btn-success btn-sm"
              >
                Schedule
              </button>
            </Modal.Footer>
          </Modal> */}
        </div>
      ) : (
        <>Loading.....</>
      )}
    </>
  );
}
const renderEventContent = (eventContent: EventContentArg) => {
  const content = eventContent.event.extendedProps.extra;
  return (
    <div
      className="calender-data  "
      style={{
        backgroundColor:
          content.mode == "0"
            ? "#00f210"
            : content.mode == "1"
            ? "#00def2"
            : "#f2c200",
      }}
    >
      <>
        <span>
          {moment(eventContent.event.start).format("h:mm  a")} -{" "}
          {moment(eventContent.event.end).format("h:mm  a")}
        </span>
      </>
    </div>
  );
};

const AddClassTable = ({
  student_classes,
  student,
  title,
  assigned_students,
}: any) => {
  const { postGiveStudentClass } = protectedApiService();
  const tablesStructureForStudents: Columns[] = [
    {
      data_name: "name",
      header: "Name",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "email",
      header: "EmailID",
      sortable: false,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
    {
      data_name: "contact_no",
      header: "Contact",
      sortable: true,
      dataFilter: (data: any, key: any) => data[key] || <></>,
    },
  ];
  const { allCourses } = globalDataStore();
  const tablesStructure: Columns[] = [
    {
      data_name: "course",
      header: "course_name",
      sortable: false,
      dataFilter: (data: any, key: any) =>
        allCourses.filter((cos: any) => cos.course_id == data[key])[0]
          ?.course_name || <></>,
    },
    {
      data_name: "time",
      header: "Time",
      sortable: true,
      dataFilter: (data: any, key: any) =>
        (
          <>
            {data["start_time"]} - {data["end_time"]}
          </>
        ) || <></>,
    },
    {
      data_name: "mode",
      header: "Mode",
      sortable: false,
      dataFilter: (data: any, key: any) => {
        if (data[key] == 1) return <div className="text-success">online</div>;
        if (data[key] == 2) return <div className="text-danger">offline</div>;
        if (data[key] == 3)
          return <div className="text-info">online & offline</div>;
        return <div className="text-gray">Not Specified</div>;
      },
    },
    {
      data_name: "operation",
      header: "Operation",
      sortable: false,
      dataFilter: (data: any, key: any) => {
        return (
          <>
            {data?.student_classes_id ? (
              <>
                <button
                  onClick={() => addClassTiming(data)}
                  className="btn btn-outline-danger btn-sm"
                >
                  Remove from Class
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => addClassTiming(data)}
                  className="btn btn-outline-primary btn-sm"
                >
                  Add Class
                </button>
              </>
            )}
          </>
        );
      },
    },
  ];
  const addClassTiming = async (std: any) => {
    //console.log("set", std, student);
    var data: any = {
      student_id: student.user_id,
      faculty_user_id: std.user_id,
      date: std.date,
      course_id: std.course,
      mode: std.mode,
      faculty_timing_id: std.faculty_timing_id,
    };
    const res: any = await postGiveStudentClass(data);
    if (res.status == 1) {
      toast.success(res.msg);
    } else toast.error(res.msg);
  };
  //console.log(student_classes);

  return (
    <>
      <PrimeDataTable
        structure={tablesStructure}
        data={student_classes}
        noSearch
        title={title}
      />
      <PrimeDataTable
        structure={tablesStructureForStudents}
        data={assigned_students}
        noSearch
        title={"Assigned Students"}
      />
    </>
  );
};

// const ConfigureStudentClass = ({ student, clickInfo }: any) => {
//   const { postGiveStudentClass, getStudentFacultyTiming, getStudentClasses } =
//     protectedApiService();
//   const [timing, setTiming] = useState<{
//     scheduledTiming: any[];
//     notscheduledTiming: any[];
//   }>({
//     scheduledTiming: [],
//     notscheduledTiming: [],
//   });

//   useEffect(() => {
//     getTiming();
//   }, []);

//   const getTiming = async () => {
//     const extra: any = clickInfo.event.extendedProps.extra;
//     const creeds: any = {
//       schedule_date: extra.date,
//       student_user_id: student.user_id,
//       user_id: extra.user_id,
//       faculty_timing_id: extra.faculty_timing_id,
//       course_id: extra.course_id,
//     };
//     const res: any = await getStudentFacultyTiming(creeds);
//     function getScheduledTiming(arr1: any, arr2: any, key: string) {
//       let newTiming: any[] = [];
//       arr1.map((one: any) => {
//         arr2.map((two: any) => {
//           if (two[key] == one[key]) {
//             newTiming.push({ ...one, ...two });
//           }
//         });
//       });
//       return newTiming;
//     }
//     console.log(res);
//     const classRes: any = await getStudentClasses(student.user_id);

//     setTiming({
//       scheduledTiming: [
//         ...getScheduledTiming(res.timing, classRes, "faculty_timing_id"),
//       ],
//       notscheduledTiming: [...res.timing],
//     });
//   };
// };
