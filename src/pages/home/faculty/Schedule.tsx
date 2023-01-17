import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import PrimeDataTable from "../../../common/prime_data_table";
import { Columns } from "../../../interfaces/_common";
import protectedApiService from "../../../services/_protected_api";
import userState from "../../../store/_userState";
import Modal from "react-bootstrap/Modal";
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

export default function Schedule(){
    const { user } = userState();
    const { getFacultyDetails, get_faculty_tming, student_present_absent_data_submit } = protectedApiService();
    const [allData, setAllData] = useState(null);
    const [faculty_timing, setfacultytiming] = useState(null);
    const [renderloading, setRenderLoading] = useState<boolean>(true);
    const [initialEvents, setInitialEvents] = useState<EventInput[]>([]);
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [faculty_details, setfaculty_details] = useState("");

    const [all_data, setall_data] = useState(null);


    const tablesStructure: Columns[] = [
        {
          data_name: "name",
          header: "Student Name",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "email",
          header: "Email",
          sortable: false,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "course_name",
          header: "Course Name",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
          data_name: "contact_no",
          header: "Number",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        
        {
          data_name: "start_time",
          header: "Start Time",
          sortable: true,
          dataFilter: (data: any, key: any) => data[key] || <></>,
        },
        {
            data_name: "end_time",
            header: "End Time",
            sortable: true,
            dataFilter: (data: any, key: any) => data[key] || <></>,
          },
        {
            data_name: "mode",
            header: "Mode",
            sortable: true,
            dataFilter: (data: any, key: any) =>
            {
                if (data[key] == 1) return <div className="text-success">online</div>;
                if (data[key] == 0) return <div className="text-danger">offline</div>;
                if (data[key] == 2) return <div className="text-info">online & offline</div>;
                return <div className="text-gray">Not Specified</div>;
            }
            ,
          },
          {
            data_name: "student_cls",
            header: "Class",
            sortable: true,
            dataFilter: (data: any, key: any) =>
            {
              if(data["student_cls"]==null){
                return(
                 <>
                 <span className="btn btn-success" onClick={()=>{get_present_absent(data, 1);}}>Present</span>&nbsp;<span className="btn btn-danger"  onClick={()=>{get_present_absent(data, 0);}}>Absent</span>
                 </>
                )
             }else if(data["student_cls"]==1){
              return(
                <>
                <span className="btn btn-success" aria-disabled="true">Present</span>
                </>
               )
             }else if(data["student_cls"]==0){
              return(
                <>
                 <span className="btn btn-danger" aria-disabled="true">Absent</span>
                </>
              )
             }
            },
          },
          
      ];


useEffect(()=>{

    get_faculty_details();
},[])





const handleEvents = useCallback((events: EventApi[]) => {
    setCurrentEvents(events);
    // events.map((x: any) => {
    // //console.log(x);
    // });
  }, []);


  const [selectInfoState, setSelectInfoState] = useState<any>(null);
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    handleShow();
    setSelectInfoState(selectInfo);
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  }, []);

const get_faculty_details = async()=>{
const details = await getFacultyDetails(user.user_id);
//console.log(details);
setfaculty_details(details["faculty_details"]["name"])
const faculty_timing = details["faculty_timing"];

// const filtered_course_data = details.faculty_timing.filter(
//     (item: any) => item.course_id == student.course_id
//   );
  const eventInit: EventInput[] = faculty_timing.map((fac: any) => {
    let timing: EventInput = {
      id: Math.random() * 100 - 15 + 15 + "",
      start: `${fac.date.replace(/T.*$/, "")}T${fac.start_time}:00+05:30`,
      end: `${fac.date.replace(/T.*$/, "")}T${fac.end_time}:00+05:30`,
      title: fac.name || "Not Specified",
      display: `${fac.start_time.replace(
        /T.*$/,
        ""
      )} - ${fac.end_time.replace(/T.*$/, "")}`,
      date:fac.date,
      event_id: fac.faculty_timing_id,
      mode: fac.mode,
      extra: fac
    };
    //console.log(timing);
    return timing;
  });
  //console.log(eventInit);
  setInitialEvents(eventInit);
  // //console.log("Init", eventInit);
  setRenderLoading(false);

//console.log(initialEvents);

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



const get_data_submit_retrieve = async(event_id:any)=>{
  const timing_dataa:any = await get_faculty_tming(event_id);
  //console.log(timing_dataa);
  setall_data(timing_dataa);
}

  const handleEventClick = async(e:any)=>{
    console.log(e.event.extendedProps.event_id);
    setDeleteModalShow(true);
    get_data_submit_retrieve(e.event.extendedProps.event_id);
    

    // async (clickInfo: EventClickArg) => {
    //   //console.log("Extened", clickInfo.event.extendedProps);

    //   setClickInfoEvent(clickInfo);
    //   setSelectedEvent(clickInfo.event);
    //   const extra: any = clickInfo.event.extendedProps.extra;
    //   const creeds: any = {
    //     schedule_date: extra.date,
    //     student_user_id: student.user_id,
    //     user_id: extra.user_id,
    //     faculty_timing_id: extra.faculty_timing_id,
    //     course_id: extra.course_id,
    //   };
    //   const res: any = await getStudentFacultyTiming(creeds);
    //   let newTiming: any[] = [];
    //   function getScheduledTiming(arr1: any, arr2: any, key: string) {
    //     let newTiming: any[] = [];
    //     arr1.map((one: any) => {
    //       arr2.map((two: any) => {
    //         if (two[key] == one[key]) {
    //           newTiming.push({ ...one, ...two });
    //         }
    //       });
    //     });
    //     return newTiming;
    //   }
    //   console.log(res);

    //   setTiming({
    //     scheduledTiming: [
    //       ...getScheduledTiming(
    //         res.timing,
    //         student_classes,
    //         "faculty_timing_id"
    //       ),
    //     ],
    //     notscheduledTiming: [...res.timing],
    //     students: res.students,
    //   });
    //   setDeleteModalShow(true);
    // },
    // [selectedEvent, clickInfoEvent, timing]
  //);

  }


  const get_present_absent = async (data:any, status:any) => {
console.log(data);
    var ddt;
    if (status == 1) {
      ddt = "Are you sure to present this class?";
    } else {
      ddt = "Are you sure to absent this class?";
    }
    var al = window.confirm(ddt);


    if (al === true) {
      var d = {
        student_classes_id: data.student_classes_id,
        student_cls: status,
      };

      const submit:any = await student_present_absent_data_submit(d);

      if(submit==1){
        get_data_submit_retrieve(data.faculty_timing_id);
      }

  }

}

    return(
        <>
              {!renderloading ? (
        <div className="mt-3" style={{ paddingBottom: "20vh" }}>
          <div className="flex-between">
            <div className="heading col-sm-4">
              Set Student Class Schedule
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
              //eventRemove={afterDeleteEvent}
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
                {faculty_details}
               
                {/* {selectedEvent && selectedEvent.extendedProps.extra.date} */}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <PrimeDataTable
        data={all_data || []}
        structure={tablesStructure}
        title={"All Data"}
        
       // onRefresh={get_events}
        
        //options
      />
              {/* {timing.notscheduledTiming?.length ? (
                <AddClassTable
                  student_classes={timing.notscheduledTiming}
                  scheduled_timing={timing.scheduledTiming}
                  assigned_students={timing.students}
                  student={student}
                  title="Available Schedule Time"
                />
              ) : (
                <></>
              )} */}
              <div style={{display:"flex", justifyContent:"space-between"}}>
                  <div>
                  <h4>Live Video Link: </h4>
                <h4>Recorded Video Link: </h4>
                  </div>
                  <div></div>
              </div>
             

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
        
        </div>
      ) : (
        <>Loading.....</>
      )}
        </>
    )
}