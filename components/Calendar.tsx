"use client";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  CalendarProps as BigCalendarProps,
} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { Event, MoveEventT } from "@/utils/types";

const localizer = momentLocalizer(moment);

interface CalendarProps extends Omit<BigCalendarProps, "localizer"> {
  events: Event[];
  onEventDrop?: ({ event, start, end, isAllDay }: MoveEventT) => void;
  onEventResize?: ({ event, start, end }: Omit<MoveEventT, "allDay">) => void;
  resizable?: boolean;
}

const DnDBigCalendar = withDragAndDrop(BigCalendar);

const Calendar: React.FC<CalendarProps> = ({ events, ...props }) => {
  return (
    <DnDBigCalendar
      defaultDate={moment().toDate()}
      localizer={localizer}
      events={events}
      //@ts-expect-error date error
      startAccessor={(event: Event) =>
        event.start ? moment(event.start).toDate() : moment().toDate()
      }
      resizable
      style={{
        width: "100%",
      }}
      {...props}
    />
  );
};

export default Calendar;
