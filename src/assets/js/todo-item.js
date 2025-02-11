import { PubSub } from "./pubsub";

export const TodoItem = (function() {
    let title,
        description,
        dueDate,
        priority,
        status = false,
        notes = [],
        checkList = [];

    function setTitle(value) {
        title = value;
    }

    function setDescription(value) {
        description = value;
    }

    function setDueDate(value) {
        dueDate = value;
    }

    function setPriority(value) {
        priority = value;
    }

    function changeStatus() {
        status = !status;
    }

    function addNote(value) {
        notes.push(value);
    }

    function removeNote(index) {
        notes.splice(index,1);
    }

    function getNotes() {
        return notes;
    }

    function addCheckListItem(value) {
        checkList.push({'title':`${value}`,'status':false});
    }

    function removeCheckListItem(index) {
        checkList.splice(index,1);
    }

    function getCheckList() {
        return checkList;
    }

    function changeCheckListItemStatus(index) {
        checkList[index].status = !checkList[index].status;
    }

    function logTodoItem() {
        console.log(title);
        console.log(description);
        console.log(dueDate);
        console.log(priority);
        console.log(status);
        console.log(notes);
        console.log(checkList);
    }

    return {
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        changeStatus,
        addNote,
        removeNote,
        getNotes,
        addCheckListItem,
        removeCheckListItem,
        getCheckList,
        changeCheckListItemStatus,
        logTodoItem
    }

})();