import '../css/form.css';
import { PubSub } from "./pubsub.js";
import { CurrentEvent } from './current-event.js';
import { documentMock } from "./document-mock.js";
import { Form } from "./form.js";
import { TodoProjectList } from "./todo-project-list.js";
import { TodoProject } from './todo-project.js';
import addProjectPage from "../json/add-project.json";

export const AddProject = (function () {
    // Cache Dom
    const mainContent = document.querySelector('#content');

    let addProjectForm;
    let titleField;

    function cacheDom() {
        addProjectForm = document.querySelector('#addProject');
        titleField = document.querySelector('[name="todoProject.title"]');
    }

    function backToProjects() {
        PubSub.trigger('AllProjects');
    }

    function setProjectDetails(event) {
        event.preventDefault();
        if (Form.validate(addProjectForm)) {
            const newProject = TodoProject();
            newProject.setTitle(titleField.value);
            TodoProjectList.addProject(newProject);
            PubSub.trigger('UpdateProjects');
            PubSub.trigger('AllProjects');
        }
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('AddProject');

        // Create form element
        const form = document.createElement('form');
        form.id = 'addProject';
        form.classList.add('container', 'wmax-sm', 'add-form');
        form.addEventListener('submit', setProjectDetails);

        // Create form Title
        const formHeading = document.createElement('h2');
        formHeading.textContent = addProjectPage['title'];
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
        backBtn.textContent = addProjectPage['backButton'];
        backBtn.setAttribute('type', 'button');
        backBtn.addEventListener('click', backToProjects);

        // Add submit button
        const submitBtn = document.createElement('button');
        submitBtn.textContent = addProjectPage['submitButton'];

        form.append(backBtn, submitBtn);

        // Add page content
        mainContent.append(form);

        // Cache Dom
        cacheDom();
    }

    return {
        load: render
    };
    
})(document||documentMock);