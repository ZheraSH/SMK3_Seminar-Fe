import { emit } from "../../utils/event-bus";


export const notify = (message, type = "success") => {
  emit("notify", { message, type });
};
