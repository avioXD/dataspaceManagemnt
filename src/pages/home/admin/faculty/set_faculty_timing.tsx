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
import protectedApiService from "../../../../services/_protected_api";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
export default function SetFacultyTiming() {
  const location: any = useLocation();
  const faculty_id: any = location.state;

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [initialEvents, setInitialEvents] = useState<EventInput[]>([]);
  const { getFacultyDetails, postAddFacultyTiming, postDeleteFacultyTiming } =
    protectedApiService();
  const [show, setShow] = useState(false);
  const [currentFacultyDetails, setCurrentFacultyDetails] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  ///////////////////////////////

  useEffect(() => {
    getFacultyData();
  }, []);
  /////////////////
  const getFacultyData = async () => {
    if (faculty_id) {
      const res: any = await getFacultyDetails(faculty_id);
      // console.log(res);
      setCurrentFacultyDetails(res);
      const eventInit: EventInput[] = res?.faculty_timing.map((fac: any) => {
        let timing: EventInput = {
          id: fac.faculty_timing_id,
          start: `${fac.date.replace(/T.*$/, "")}T${fac.start_time}:00`,
          end: `${fac.date.replace(/T.*$/, "")}T${fac.end_time}:00`,
          title: res?.faculty_courses.map((cos: any) =>
            cos.course_id == fac.course_id ? cos.course_name : ""
          ),
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
    }
  };
  ////
  const [loading, setLoading] = useState<boolean>(false);
  const handleEvents = useCallback((events: EventApi[]) => {
    setCurrentEvents(events);
    events.map((x: any) => {
      console.log(x);
    });
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
        console.log(res);
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
        console.log(res);
      }
    } else {
      /// error
    }
  };

  /////////////////////

  // new Date(Date.parse(`${x.date}T${x.start_time}:00`))

  const onValueChange = useCallback(
    (val: any) => {
      setFormData({ ...formData, ...val });
      // console.log(val);
      // console.log(formData);
    },
    [formData]
  );

  ////////
  const [clickInfoEvent, setClickInfoEvent] = useState<any>(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deletedEvent, setDeletedEvent] = useState<any>("");
  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      console.log(clickInfo.event.extendedProps.event_id);
      setDeleteModalShow(true);
      setClickInfoEvent(clickInfo);
      setDeletedEvent(clickInfo.event);
      // if (window.confirm(` ${clickInfo.event.title} `)) {
      //   clickInfo.event.remove();
      // }
    },
    [deleteModalShow, clickInfoEvent]
  );
  const afterDeleteEvent = async (arg: EventRemoveArg) => {
    const res: any = await postDeleteFacultyTiming(deletedEvent.id);
    if (res == 1) {
      toast.success("Deleted!");
      setClickInfoEvent(null);
      setDeletedEvent("");
    }
  };
  return (
    <>
      {currentFacultyDetails?.faculty_timing ? (
        <div className="mt-3" style={{ paddingBottom: "20vh" }}>
          <h5>Faculty Details</h5>
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
            centered
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Schedule Timing</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-5 flex-center">
              Want to remove the task?
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => setDeleteModalShow(false)}
                className="btn btn-info btn-sm"
              >
                No
              </button>
              <button
                onClick={() => {
                  clickInfoEvent.event.remove();
                  setDeleteModalShow(false);
                }}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </Modal.Footer>
          </Modal>
          <Modal centered show={show} onHide={handleClose}>
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
          </Modal>
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
        <p>{eventContent.event.title}: </p>
        <p>
          {moment(eventContent.event.start).format("h:mm  a")} -{" "}
          {moment(eventContent.event.end).format("h:mm  a")}
        </p>
        <p>{["Online", "Offline", "Online & Offline"][content.mode]} </p>
      </>
    </div>
  );
};
