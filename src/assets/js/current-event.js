import { PubSub } from "./pubsub.js";

export const CurrentEvent = (function () {
  let currentEvent;

  function set(value) {
    currentEvent = value;
    PubSub.trigger("UpdateCurrentEvent");
  }

  function get() {
    return currentEvent;
  }

  return {
    set,
    get,
  };
})();
