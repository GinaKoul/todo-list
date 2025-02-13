import { PubSub } from "./pubsub.js";
import { documentMock } from "./document-mock.js";
import { Form } from "./form.js";
import { TodoProjectList } from "./todo-project-list.js";
import { TodoProject } from './todo-project.js';
import addProjectPage from "../json/add-project.json";

export const AddProject = (function(){
    // cacheDom
    let mainContent = document.querySelector('#content');

    let addProjectForm,
        titleField;

    function cacheDom() {
        addProjectForm = document.querySelector('#addProject');
        titleField = document.querySelector('[name="todoProject.title"]');
    }

    function backToProjects() {
        PubSub.trigger('AllProjects');
    }

    function setTaskDetails(event) {
        event.preventDefault();
        const newProject = TodoProject();
        newProject.setTitle(titleField.value);
        TodoProjectList.addProject(newProject);
        PubSub.trigger('AllProjects');
    }

    function render() {
        mainContent.textContent = '';

        //Create form element
        let form = document.createElement('form');
        form.id = 'addProject';
        form.classList.add('container','wmax-sm','add-task-form');
        form.addEventListener('submit',setTaskDetails);

        //Create form Title
        let formHeading = document.createElement('h2');
        formHeading.textContent = addProjectPage['title'];
        form.append(formHeading);

        // Create fields
        addProjectPage['formFields'].forEach(field => {
            switch (field['fieldType']) {
                case 'input':
                    form.append(Form.createLabel(field));
                    form.append(Form.createInput(field));
                    break;
            }
        });

        // Add back to project button
        let backBtn = document.createElement('button');
        backBtn.textContent = addProjectPage['backButton'];
        backBtn.setAttribute('type','button');
        backBtn.addEventListener('click',backToProjects);

        // Add submit button
        let submitBtn = document.createElement('button');
        submitBtn.textContent = addProjectPage['submitButton'];

        form.append(backBtn,submitBtn);

        // Add page content
        mainContent.append(form);

        // Cache Dom
        cacheDom();
    }

    return {
        load: render
    }

})(document||documentMock)