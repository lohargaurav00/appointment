import { Event as BigEvent } from "react-big-calendar";

export interface Event extends BigEvent {
  id?: string | number;
  start: Date;
  end: Date;
  title: string;
  isAllDay?: boolean;
}

export interface MoveEventT extends Event {
  event: Event;
}
