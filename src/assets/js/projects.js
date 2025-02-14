import '../css/projects.css';
import { documentMock } from "./document-mock.js";
import { PubSub } from './pubsub.js';
import { TodoProjectList } from "./todo-project-list.js";
import { TodoProject } from "./todo-project.js";
import { RecentProject } from "./recent-project.js";
import ProjectsPage from "../json/projects.json";

export const Projects = (function(){
    // cacheDom
    let mainContent = document.querySelector('#content');

    let projectList;

    const newProject = TodoProject();
    const newProject2 = TodoProject();
    newProject.setTitle('Project 1');
    newProject2.setTitle('Project 2');
    TodoProjectList.addProject(newProject);
    TodoProjectList.addProject(newProject2);

    function addProjectPage() {
        PubSub.trigger('AddProject');
    }

    function deleteProject(event) {
        event.stopPropagation();
        let selectedProject = event.target.closest('.project-item').getAttribute('data-id');
        TodoProjectList.removeProject(projectList.findIndex(project => project.getId() == selectedProject));
        render();
    }

    function setCurrentTask(eventTarget) {
        let selectedProject = eventTarget.closest('.project-item').getAttribute('data-id');
        RecentProject.set(projectList.find(project => project.getId() == selectedProject));
    }

    function openProject(event) {
        event.stopPropagation();
        setCurrentTask(event.target);
        PubSub.trigger('OpenProject');
    }

    function editProject(event) {
        event.stopPropagation();
        setCurrentTask(event.target);
        PubSub.trigger('EditProject');
    }

    function render() {
        mainContent.textContent = '';
        projectList = TodoProjectList.getProjectList();

        let projectsContainer = document.createElement('article');
        projectsContainer.classList.add('container','components-list');

        let projectsTitle = document.createElement('h2');
        projectsTitle.textContent = ProjectsPage['title'];

        let addProjectBtn = document.createElement('button');
        addProjectBtn.textContent = ProjectsPage['addProjectButton'];
        addProjectBtn.addEventListener('click',addProjectPage);

        projectsContainer.append(projectsTitle,addProjectBtn);
        
        projectList.forEach(project => {
            let projectSection = document.createElement('article');
            projectSection.classList.add('project-item');
            projectSection.setAttribute('data-id',project.getId());
            projectSection.addEventListener('click',openProject);

            let projectTitle = document.createElement('h3');
            projectTitle.textContent = project.getTitle();

            //Create edit button
            let editItem = document.createElement('button');
            editItem.classList.add('edit-icon');
            editItem.textContent = '\u270E';
            editItem.addEventListener('click',editProject);

            //Create delete button
            let deleteItem = document.createElement('button');
            deleteItem.classList.add('dlt-icon');
            deleteItem.textContent = '⌫';
            deleteItem.addEventListener('click',deleteProject);

            projectSection.append(projectTitle,editItem,deleteItem);

            projectsContainer.append(projectSection);
        });

        mainContent.append(projectsContainer);
    }

    return {
        load: render
    }
})(document||documentMock);