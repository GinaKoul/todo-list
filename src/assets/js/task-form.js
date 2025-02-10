import { PubSub } from "./pubsub";
import { documentMock } from "./document-mock";
import taskFormPage from "../json/task-form.json";
import { TodoItem } from './todo-item.js';

export const TaskForm = (function() {
    // cacheDom
    let mainContent = document.querySelector('#content');
    let addTaskForm,
        titleField,
        descriptionField,
        dueDateField,
        priorityField;

    function createTask(event) {
        event.preventDefault();
        let newTask = TodoItem;
        newTask.setTitle(titleField.value);
        newTask.setDescription(descriptionField.value);
        newTask.setDueDate(dueDateField.value);
        newTask.setPriority(priorityField.value);
        newTask.logTodoItem();
        addTaskForm.reset();
        // task1.addNote('Note 1');
        // task1.addNote('Note 2');
        // task1.addCheckListItem('Checklist item 1');
        // task1.addCheckListItem('Checklist item 2');
        // task1.addCheckListItem('Checklist item 3');
    }

    function cacheDom() {
        addTaskForm = document.querySelector('#addTask');
        titleField = document.querySelector('[name="todoItem.title"]');
        descriptionField = document.querySelector('[name="todoItem.description"]');
        dueDateField = document.querySelector('[name="todoItem.dueDate"]'),
        priorityField = document.querySelector('[name="todoItem.priority"]');
    }

    function createInput(field) {
        let inputField = document.createElement('input');
        inputField.id = field['id'];
        inputField.setAttribute('name',field['name']);
        inputField.setAttribute('type',field['inputType']);
        inputField['required']?inputField.setAttribute('required','required'):null;
        return inputField;
    }

    function createTextArea(field) {
        let textareaField = document.createElement('textarea');
        textareaField.id = field['id'];
        textareaField.setAttribute('name',field['name']);
        textareaField.setAttribute('rows',field['rows']);
        textareaField['required']?textareaField.setAttribute('required','required'):null;
        return textareaField;
    }

    function createSelect(field) {
        let selectField = document.createElement('select');
        selectField.id = field['id'];
        selectField.setAttribute('name',field['name']);
        selectField['required']?selectField.setAttribute('required','required'):null;

        field['options'].forEach(option => {
            let selectOption = document.createElement('option');
            selectOption.textContent = option['title'];
            selectOption.setAttribute('value',option['value']);
            option['selected']?selectOption.setAttribute('selected','selected'):null;
            selectField.append(selectOption);
        })
        return selectField;
    }

    function render() {
        //Create form element
        let form = document.createElement('form');
        form.id = 'addTask';
        form.classList.add('container','wmax-sm','add-task-form');
        form.addEventListener('submit',createTask); //,{ once: true }

        //Create form Title
        let formHeading = document.createElement('h2');
        formHeading.textContent = taskFormPage['title'];
        form.append(formHeading);

        // Create fields
        taskFormPage['formFields'].forEach(field => {
            let label = document.createElement('label');
            label.setAttribute('for',field['id']);
            label.textContent = field['titleLabel'];
            form.append(label);

            switch (field['fieldType']) {
                case 'input':
                    form.append(createInput(field));
                    break;
                case 'textarea':
                    form.append(createTextArea(field));
                    break;
                case 'select':
                    form.append(createSelect(field));
                    break;
            }
        })   

        // Add submit button
        let submitBtn = document.createElement('button');
        submitBtn.textContent = taskFormPage['submitButton'];
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