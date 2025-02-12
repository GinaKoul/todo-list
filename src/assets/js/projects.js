import '../css/projects.css';
import { documentMock } from "./document-mock.js";
import { TodoProjectList } from "./todo-project-list.js";
import { TodoProject } from "./todo-project.js";

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

    function triggerEvent() {
        console.log('ADD PROJECT');
    }

    function deleteProject(event) {
        let selectedProject = event.target.closest('.project-item').getAttribute('data-id');
        TodoProjectList.removeProject(projectList.findIndex(project => project.getId() == selectedProject));
        render();
    }

    function render() {
        mainContent.textContent = '';
        projectList = TodoProjectList.getProjectList();

        let projectsContainer = document.createElement('article');
        projectsContainer.classList.add('container','components-list');

        let projectsTitle = document.createElement('h2');
        projectsTitle.textContent = 'All Projects';

        let addProjectBtn = document.createElement('button');
        addProjectBtn.textContent = 'Add project';
        addProjectBtn.addEventListener('click',triggerEvent)

        projectsContainer.append(projectsTitle,addProjectBtn);
        
        projectList.forEach(project => {
            let projectSection = document.createElement('article');
            projectSection.classList.add('project-item');
            projectSection.setAttribute('data-id',project.getId());

            let projectTitle = document.createElement('h3');
            projectTitle.textContent = project.getTitle();

            let deleteItem = document.createElement('button');
            deleteItem.classList.add('dlt-icon');
            deleteItem.textContent = '⌫';
            deleteItem.addEventListener('click',deleteProject);

            projectSection.append(projectTitle,deleteItem);

            projectsContainer.append(projectSection);
        });

        mainContent.append(projectsContainer);
    }

    return {
        load: render
    }
})(document||documentMock)