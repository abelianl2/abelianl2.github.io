import mitt, { Emitter } from "mitt";
type Events = {
  updateEvent: void;
};
export const eventBus: Emitter<Events> = mitt<Events>();
