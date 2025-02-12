export function TodoItem() {
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

    function getTitle() {
        return title;
    }

    function setDescription(value) {
        description = value;
    }

    function getDescription() {
        return description;
    }

    function setDueDate(value) {
        dueDate = value;
    }

    function getDueDate() {
        return dueDate;
    }

    function setPriority(value) {
        priority = value;
    }

    function getPriority() {
        return priority;
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
        getTitle,
        setDescription,
        getDescription,
        setDueDate,
        getDueDate,
        setPriority,
        getPriority,
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
};