import FullCalendar, {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
  EventInput,
  EventRemoveArg,
} from "@fullcalendar/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import protectedApiService from "../../../../../services/_protected_api";
import { toast } from "react-toastify";
import moment from "moment";
import { Modal } from "react-bootstrap";
import Loader2 from "../../../../../common/loader2";

export default function ViewStudentClass() {
  const location: any = useLocation();
  const student: any = location.state[0];

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [initialEvents, setInitialEvents] = useState<EventInput[]>([]);
  const {
    getStudentClasses,
    deleteStudentClass,
    postAddFacultyTiming,
    postDeleteFacultyTiming,
  } = protectedApiService();
  const [show, setShow] = useState(false);
  const [currentFacultyDetails, setCurrentFacultyDetails] = useState<any>({});
  const [student_classes, setStudentClasses] = useState<any>([]);
  const [formData, setFormData] = useState<any>({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  ///////////////////////////////

  useEffect(() => {
    getClasses();
  }, []);
  /////////////////
  const getClasses = async () => {
    if (student) {
      setLoading(true);
      const res: any = await getStudentClasses(student.user_id);
      console.log(res);
      setCurrentFacultyDetails(res);
      const eventInit: EventInput[] = res.map((fac: any) => {
        let timing: EventInput = {
          id: fac.faculty_timing_id,
          start: `${fac.date.replace(/T.*$/, "")}T${fac.start_time}:00+05:30`,
          end: `${fac.date.replace(/T.*$/, "")}T${fac.end_time}:00+05:30`,
          title: fac.course_name,
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
      setLoading(false);
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
  const onDeleteClass = async (id: any) => {
    const res: any = await deleteStudentClass(id);
  };

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
      {!loading ? (
        <div className="mt-3" style={{ paddingBottom: "20vh" }}>
          <h5>Student Classes ({student.name}) </h5>
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
            <Modal.Body>
              {/* {JSON.stringify(deletedEvent)} */}
              <div className="p-3 text-start">
                <p>Faculty: {deletedEvent?.extendedProps?.extra.name}</p>
                <p>Course: {deletedEvent?.extendedProps?.extra.course_name}</p>
                <p>
                  Timing: {deletedEvent?.extendedProps?.extra.start_time} -{" "}
                  {deletedEvent?.extendedProps?.extra.end_time}
                </p>
              </div>
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
                  onDeleteClass(clickInfoEvent.event.extendedProps.event_id);
                  setDeleteModalShow(false);
                }}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <>
          <Loader2 />
        </>
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
          {" "}
          {moment(eventContent.event.start).format("h:mm  a")} -{" "}
          {moment(eventContent.event.end).format("h:mm  a")}
        </span>
      </>
    </div>
  );
};
