import { PubSub } from "./pubsub.js";
import { documentMock } from "./document-mock.js";
import addProjectPage from "../json/add-project.json";
import { TodoProject } from './todo-project.js';
import { Form } from "./form.js";

export const AddProject = (function(){
    // cacheDom
    let mainContent = document.querySelector('#content');

    let newProject = TodoProject;
    let addProjectForm,
        titleField;

    function cacheDom() {
        addProjectForm = document.querySelector('#addProject');
        titleField = document.querySelector('[name="todoProject.title"]');
    }

    function setTaskDetails(event) {
        event.preventDefault();
        newProject.setTitle(titleField.value);
        console.log(newProject.getTitle());
        addProjectForm.reset();
    }

    function render() {
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

        // Add submit button
        let submitBtn = document.createElement('button');
        submitBtn.textContent = addProjectPage['submitButton'];
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