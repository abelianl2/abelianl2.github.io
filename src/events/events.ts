import mitt, { Emitter } from "mitt";
type Events = {
  updateEvent: void;
  uploadUnlockWAbel: void;
  uploadWithDrawReward: void;
};
export const eventBus: Emitter<Events> = mitt<Events>();
