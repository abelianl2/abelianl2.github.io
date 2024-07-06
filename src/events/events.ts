import mitt, { Emitter } from "mitt";
type Events = {
  // 更新数据
  updateEvent: void;
  // 解锁WAbel
  uploadUnlockWAbel: void;
  // 提现奖金
  uploadWithDrawReward: void;
};
export const eventBus: Emitter<Events> = mitt<Events>();
