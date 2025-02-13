import { CheckListItem } from './checklist-item.js';
const { v4: uuidv4 } = require('uuid');

export function TodoItem() {
    let id = uuidv4(),
        title,
        description,
        dueDate,
        priority,
        status = false,
        notes = [],
        checkList = [];

    function getId() {
        return id;
    }

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
        let item = CheckListItem();
        item.setTitle(value);
        checkList.push(item);
    }

    function removeCheckListItem(index) {
        checkList.splice(index,1);
    }

    function getCheckList() {
        return checkList;
    }

    function getCheckListItem(index) {
        return checkList[index];
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
        getId,
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
        getCheckListItem,
        logTodoItem
    }
};