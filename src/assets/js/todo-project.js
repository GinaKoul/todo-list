import { v4 as uuidv4 } from "uuid";

export function TodoProject() {
  let id = uuidv4();
  let title;
  const taskList = [];

  function setId(value) {
    id = value;
  }

  function getId() {
    return id;
  }

  function setTitle(value) {
    title = value;
  }

  function getTitle() {
    return title;
  }

  function addTask(task) {
    taskList.push(task);
  }

  function removeTask(index) {
    taskList.splice(index, 1);
  }

  function getTaskList() {
    return taskList;
  }

  return {
    setId,
    getId,
    setTitle,
    getTitle,
    addTask,
    removeTask,
    getTaskList,
  };
}
