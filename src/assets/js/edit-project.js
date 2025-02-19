import '../css/form.css';
import { PubSub } from "./pubsub.js";
import { CurrentEvent } from './current-event.js';
import { documentMock } from "./document-mock.js";
import { Form } from "./form.js";
import { RecentProject } from "./recent-project.js";
import addProjectPage from "../json/add-project.json";
import editProjectPage from "../json/edit-project.json";

export const EditProject = (function () {
    // Cache Dom
    const mainContent = document.querySelector('#content');

    let project;
    let addProjectForm;
    let titleField;

    function cacheDom() {
        addProjectForm = document.querySelector('#editProject');
        titleField = document.querySelector('[name="todoProject.title"]');
    }

    function backToProjects() {
        PubSub.trigger('AllProjects');
    }

    function setTaskDetails(event) {
        event.preventDefault();
        if (Form.validate(addProjectForm)) {
            project.setTitle(titleField.value);
            PubSub.trigger('UpdateProjects');
            PubSub.trigger('AllProjects');
        }
    }

    function addFieldValues() {
        titleField.value = project.getTitle();
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('EditProject');
        project = RecentProject.get();

        // Create form element
        const form = document.createElement('form');
        form.id = 'editProject';
        form.classList.add('container', 'wmax-sm', 'add-form');
        form.addEventListener('submit', setTaskDetails);

        // Create form Title
        const formHeading = document.createElement('h2');
        formHeading.textContent = editProjectPage['title'];
        form.append(formHeading);

        // Create fields
        addProjectPage['formFields'].forEach(field => {
            switch (field['fieldType']) {
                case 'input':
                    form.append(Form.createLabel(field));
                    form.append(Form.createInput(field));
                    break;
                default:
                    break;
            }
        });

        // Add back to project button
        const backBtn = document.createElement('button');
        backBtn.textContent = editProjectPage['backButton'];
        backBtn.setAttribute('type', 'button');
        backBtn.addEventListener('click', backToProjects);

        // Add submit button
        const submitBtn = document.createElement('button');
        submitBtn.textContent = editProjectPage['submitButton'];

        form.append(backBtn, submitBtn);

        // Add page content
        mainContent.append(form);

        // Cache Dom
        cacheDom();

        // Add field values
        addFieldValues();
    }

    return {
        load: render
    };

})(document||documentMock);