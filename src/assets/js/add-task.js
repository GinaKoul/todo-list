import { PubSub } from "./pubsub.js";
import { documentMock } from "./document-mock.js";
import addTaskPage from "../json/add-task.json";
import { TodoItem } from './todo-item.js';
import { Form } from "./form.js";

export const AddTask = (function() {
    // cacheDom
    let mainContent = document.querySelector('#content');

    let newTask = TodoItem;
    let addTaskForm,
        titleField,
        descriptionField,
        dueDateField,
        priorityField;

    function cacheDom() {
        addTaskForm = document.querySelector('#addTask');
        titleField = document.querySelector('[name="todoItem.title"]');
        descriptionField = document.querySelector('[name="todoItem.description"]');
        dueDateField = document.querySelector('[name="todoItem.dueDate"]');
        priorityField = document.querySelector('[name="todoItem.priority"]');
    }

    function setTaskDetails(event) {
        event.preventDefault();
        newTask.setTitle(titleField.value);
        newTask.setDescription(descriptionField.value);
        newTask.setDueDate(dueDateField.value);
        newTask.setPriority(priorityField.value);
        newTask.logTodoItem();
        addTaskForm.reset();
    }

    function addTaskNote(additionField) {
        if(additionField.value) {
            newTask.addNote(additionField.value);
            additionField.value = '';
            newTask.logTodoItem();
        }
    }

    function removeTaskNote(event) {
        let itemId = event.target.closest('li').getAttribute('data-id');
        newTask.removeNote(Number(itemId));
        renderNotes(event.target.closest('details'));
    }

    function renderNotes(fieldContainer) {
        let containerList = fieldContainer.querySelector('ul');
        containerList.textContent = '';
        newTask.getNotes().forEach((note,index) =>{
            let listItem = document.createElement('li');
            listItem.setAttribute('data-id',index);

            let itemContent = document.createElement('span');
            itemContent.textContent = note;

            let deleteItem = document.createElement('span');
            deleteItem.classList.add('dlt-icon');
            deleteItem.textContent = '⌫';
            deleteItem.addEventListener('click',removeTaskNote);

            listItem.append(itemContent,deleteItem);
            containerList.append(listItem);
        })
    }

    function addTaskCheckItem(additionField) {
        if(additionField.value) {
            newTask.addCheckListItem(additionField.value);
            additionField.value = '';
            newTask.logTodoItem();
        }
    }

    function removeTaskCheckItem(event) {
        let itemId = event.target.closest('li').getAttribute('data-id');
        newTask.removeCheckListItem(Number(itemId));
        renderCheckList(event.target.closest('details'));
    }

    function renderCheckList(fieldContainer) {
        let containerList = fieldContainer.querySelector('ul');
        containerList.textContent = '';
        newTask.getCheckList().forEach((checkListItem,index) =>{
            let listItem = document.createElement('li');
            listItem.setAttribute('data-id',index);

            let itemContent = document.createElement('span');
            itemContent.textContent = checkListItem['title'];

            let deleteItem = document.createElement('span');
            deleteItem.classList.add('dlt-icon');
            deleteItem.textContent = '⌫';
            deleteItem.addEventListener('click',removeTaskCheckItem);

            listItem.append(itemContent,deleteItem);
            containerList.append(listItem);
        })
    }

    function additionEvent(event) {
        let additionContainer = event.target.closest('details');
        let additionField = additionContainer.querySelector('input');
        switch (additionField.getAttribute('name').split('.').pop()) {
            case 'notes':
                addTaskNote(additionField);
                renderNotes(additionContainer);
                break;
            case 'checkList':
                addTaskCheckItem(additionField);
                renderCheckList(additionContainer);
                break;
        }
    }

    function createAddField(field) {
        //Create collapse section parent
        let collapseParent = document.createElement('details');
        //Set name to make sure only one is open
        collapseParent.setAttribute('name','todo-item');
        //Create collapse title
        let collapseTitle = document.createElement('summary');
        //Add field label as the title of collapse
        collapseTitle.append(Form.createLabel(field));
        //Create the list for added elements
        let fieldList = document.createElement('ul');
        fieldList.classList.add('field-list');
        //Create input
        let additionInput = document.createElement('input');
        additionInput.setAttribute('name',field['name']);
        additionInput.setAttribute('type',field['inputType']);
        //Create button that adds elements
        let additionBtn = document.createElement('button');
        additionBtn.setAttribute('type','button');
        additionBtn.textContent = field['buttonTitle'];
        additionBtn.addEventListener('click',additionEvent);
        collapseParent.append(collapseTitle,fieldList,additionInput,additionBtn);
        return collapseParent;
    }

    function render() {
        //Create form element
        let form = document.createElement('form');
        form.id = 'addTask';
        form.classList.add('container','wmax-sm','add-task-form');
        form.addEventListener('submit',setTaskDetails); //,{ once: true }

        //Create form Title
        let formHeading = document.createElement('h2');
        formHeading.textContent = addTaskPage['title'];
        form.append(formHeading);

        // Create fields
        addTaskPage['formFields'].forEach(field => {
            switch (field['fieldType']) {
                case 'input':
                    form.append(Form.createLabel(field));
                    form.append(Form.createInput(field));
                    break;
                case 'textarea':
                    form.append(Form.createLabel(field));
                    form.append(Form.createTextArea(field));
                    break;
                case 'select':
                    form.append(Form.createLabel(field));
                    form.append(Form.createSelect(field));
                    break;
                case 'addition':
                    form.append(createAddField(field));
                    break;
            }
        });

        // Add submit button
        let submitBtn = document.createElement('button');
        submitBtn.textContent = addTaskPage['submitButton'];
        form.append(submitBtn);

        // Add page content
        mainContent.append(form);

        // Cache Dom
        cacheDom();
    }

    return {
        load: render
    }
})(document||documentMock)