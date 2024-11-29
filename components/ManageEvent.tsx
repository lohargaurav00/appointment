import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from "./ui/form";
import { DialogProps } from "@radix-ui/react-dialog";
import { Event } from "@/utils/types";

export type EventData = z.infer<typeof FormSchema>;

interface ManageEventT {
  open: boolean;
  onClose: DialogProps["onOpenChange"];
  data?: Event;
  onSubmit: (data: EventData) => Promise<void>;
}

const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  start: z.string({ invalid_type_error: "Start Date and Time is required." }),
  end: z.string({ invalid_type_error: "End Date and Time is required." }),
});

const ManageEvent: React.FC<ManageEventT> = ({
  open,
  onClose,
  data,
  onSubmit: handleSubmit,
}) => {
  const { title, start, end } = data || {};

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: title || "",
      start: start
        ? moment(start).toDate().toString()
        : moment().toDate().toString(),
      end: end ? moment(end).toDate().toString() : moment().toDate().toString(),
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    handleSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <DialogHeader>
              <DialogTitle className="w-full text-center">
                Schedule Appointment
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4 justify-start ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Start Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select End Date & Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="gap-2">
              <Button type="submit">Schedule</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageEvent;
