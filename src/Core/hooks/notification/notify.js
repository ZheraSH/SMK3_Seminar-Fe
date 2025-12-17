import { emit } from "../../utils/eventBus";

export const notify = (message, type = "success") => {
  emit("notify", { message, type });
};
