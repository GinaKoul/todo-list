import '../css/styles.css';
import { PubSub } from './pubsub.js';
import { Storage } from './storage.js';
import { RecentProject } from "./recent-project.js";
import { CurrentEvent } from './current-event.js';
import { AddTask } from './add-task.js';
import { AddProject } from './add-project.js';
import { Projects } from './projects.js';
import { Project } from './project.js';
import { EditTask } from './edit-task.js';
import { EditProject } from './edit-project.js';
import { documentMock } from './document-mock.js';

const appInit = (function() {
    let navButtons,
        validationMsg = document.querySelector('.validation-msg'); 

    if (process.env.NODE_ENV !== 'production') {
        console.log('Looks like we are in development mode!');
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    function handleNavigation() {
        PubSub.trigger(this.getAttribute('data-id'));
    }


    function initNavigation() {
        navButtons = document.querySelectorAll('.menu-nav');
        navButtons.forEach(navButton=> {
            navButton.addEventListener('click',handleNavigation);
        });
    }

    function updateStorageProjects() {
        Storage.updateProjects();
    }
    
    function updateStorageRecent() {
        Storage.updateRecentProject();
    }
    
    function updateCurrentEvent() {
        Storage.updateCurrentEvent();
    }
    
    function addProjectPage() {
        AddProject.load();
        scrollToTop();
    }
    
    function allProjectsPage() {
        Projects.load();
        scrollToTop();
    }
    
    function projectPage() {
        Project.load();
        scrollToTop();
    }
    
    function addTaskPage() {
        AddTask.load();
        scrollToTop();
    }
    
    function editTaskPage() {
        EditTask.load();
        scrollToTop();
    }
    
    function editProjectPage() {
        EditProject.load();
        scrollToTop();
    }

    PubSub.on('UpdateProjects',updateStorageProjects);
    PubSub.on('UpdateRecentProject',updateStorageRecent);
    PubSub.on('UpdateCurrentEvent',updateCurrentEvent);
    PubSub.on('AllProjects',allProjectsPage);
    PubSub.on('OpenProject',projectPage);
    PubSub.on('AddProject',addProjectPage);
    PubSub.on('EditProject',editProjectPage);
    PubSub.on('AddTask',addTaskPage);
    PubSub.on('EditTask',editTaskPage);

    function initTodo() {
        initNavigation();

        Storage.setProjects();
        Storage.setRecentProject();
        Storage.setCurrentEvent();

        let currentEvent = CurrentEvent.get();
        if(currentEvent) {
            PubSub.trigger(currentEvent);
        } else if(RecentProject.get()) {
            projectPage();
        } else {
            allProjectsPage();
        }
    }

    window.addEventListener("storage", (e) => {
        initTodo();
    });
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTodo);
    } else {
        initTodo();
    }
})(document||documentMock);