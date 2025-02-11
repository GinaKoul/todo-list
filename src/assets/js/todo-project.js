import { PubSub } from "./pubsub";

export const TodoProject = (function() {
    let title,
        taskList = [];

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
        taskList.splice(index,1)
    }

    function getTaskList() {
        return taskList;
    }

    return {
        setTitle,
        getTitle,
        addTask,
        removeTask,
        getTaskList
    }

})();