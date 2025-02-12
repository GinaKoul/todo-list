const { v4: uuidv4 } = require('uuid');

export function TodoProject() {
    let id = uuidv4(),
        title,
        taskList = [];

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
        taskList.splice(index,1)
    }

    function getTaskList() {
        return taskList;
    }

    return {
        getId,
        setTitle,
        getTitle,
        addTask,
        removeTask,
        getTaskList
    }
};