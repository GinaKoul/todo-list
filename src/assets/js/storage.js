import { storageAvailable } from './storage-availability.js';
import { CreateProjectsJson } from './create-projects-json.js';
import { CreateProjects } from './create-projects.js';
import { RecentProject } from "./recent-project.js";
import { TodoProjectList } from './todo-project-list.js';
import { CurrentEvent } from './current-event.js';

export const Storage = (function() {
    let localAvailability = storageAvailable('localStorage');
    let sessionAvailability = storageAvailable('sessionStorage');
    
    function updateProjects() {
        if(localAvailability) {
            localStorage.setItem('TodoProjects',CreateProjectsJson.get());
        }
    }

    function setProjects() {
        let projects = localStorage.getItem('TodoProjects');
        if(localAvailability && projects) {
            CreateProjects.run(localAvailability && projects?projects:[]);
        }
    }

    function updateRecentProject() {
        if(localAvailability) {
            localStorage.setItem('RecentProject',RecentProject.get().getId());
        }
    }

    function setRecentProject() {
        let recentProjectId = localStorage.getItem('RecentProject');
        if(localAvailability && recentProjectId) {
            let recentProject = TodoProjectList.get().find(project => project.getId() == recentProjectId);
            RecentProject.set(recentProject);
        }
    }

    function updateCurrentEvent() {
        if(sessionAvailability) {
            sessionStorage.setItem('CurrentEvent',CurrentEvent.get());
        }
    }

    function setCurrentEvent() {
        let currentEvent = sessionStorage.getItem('CurrentEvent');
        if(sessionAvailability && currentEvent) {
            CurrentEvent.set(currentEvent);
        }
    }

    return {
        updateProjects,
        setProjects,
        updateRecentProject,
        setRecentProject,
        updateCurrentEvent,
        setCurrentEvent
    }

})();