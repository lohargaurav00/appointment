"use client";
import React, { useCallback, useEffect, useState } from "react";
import { PlusCircleIcon } from "lucide-react";

import Calendar from "@/components/Calendar";
import ManageEvent, { EventData } from "@/components/ManageEvent";
import { Event, MoveEventT } from "@/utils/types";

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [manageEvent, setManageEvent] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/get-all");

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (data: EventData) => {
    try {
      const response = await fetch("/api/events/create", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create event :${data}`);
      }

      const event = await response.json();

      setEvents((prev) => [...prev, event]);
      setManageEvent(false);
    } catch (error) {
      console.log("Error creating event: ", error);
    }
  };

  const updateEvent = async (event: Event) => {
    try {
      const resp = await fetch("/api/events/update", {
        method: "PUT",
        body: JSON.stringify(event),
      });

      if (!resp.ok) {
        throw new Error(`Failed to create event :${event}`);
      }
    } catch (error) {
      console.error("Error updating event : ", error);
    }
  };

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay }: MoveEventT) => {
      const droppedOnAllDaySlot = isAllDay ?? false;
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setEvents((prev) => {
        const existing = prev.find((ev: Event) => ev.id === event.id) ?? {};
        const updatedEvent = {
          ...existing,
          title: event.title,
          start,
          end,
          allDay: event.allDay,
        };
        const filtered = prev.filter((ev: Event) => ev.id !== event.id);
        updateEvent(updatedEvent);
        return [...filtered, updatedEvent];
      });
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: Omit<MoveEventT, "allDay">) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const updatedEvent = { ...existing, title: event.title, start, end };
        const filtered = prev.filter((ev) => ev.id !== event.id);
        updateEvent(updatedEvent);
        return [...filtered, updatedEvent];
      });
    },
    [setEvents]
  );

  return (
    <div className="flex h-full w-full p-3 relative">
      <PlusCircleIcon
        onClick={() => setManageEvent(true)}
        className="absolute top-[17px] right-80 cursor-pointer text-primary hover:text-gray-500 duration-300"
      />
      <Calendar
        events={events}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resizable
      />
      <ManageEvent
        open={manageEvent}
        onClose={(open) => setManageEvent(open)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
