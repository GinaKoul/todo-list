import { CheckListItem } from './checklist-item.js';
import { v4 as uuidv4 } from 'uuid';

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

    function getStatus() {
        return status;
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
        getStatus,
        addNote,
        removeNote,
        getNotes,
        addCheckListItem,
        removeCheckListItem,
        getCheckList,
        getCheckListItem,
    }
};