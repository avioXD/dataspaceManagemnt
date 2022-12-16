import React, { useEffect, useState } from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calender() {
  const empt: any[] = [];
  const [currentEvents, setCurrentEvents] = useState(empt);

  useEffect(() => {}, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    clickInfo.event.remove();
  };
  const handleDataSelect = (selectInfo: DateSelectArg) => {
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (true) {
      calendarApi.addEvent({
        id: Math.random() * 100 + 5 + "",
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };
  return (
    <>
      <div className=" p-4 ">
        <div className="card shadow p-3">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
            select={handleDataSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
          />
        </div>
      </div>
    </>
  );
}
function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}
