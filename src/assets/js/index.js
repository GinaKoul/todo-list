import '../css/styles.css';
import '../css/add-item.css';
import { PubSub } from "./pubsub.js";
import { AddTask } from './add-task.js';
import { AddProject } from './add-project.js';
import { Projects } from './projects.js';
import { Project } from './project.js';
import { EditTask } from './edit-task.js';
import { EditProject } from './edit-project.js';

Projects.load();

function addProjectPage() {
    AddProject.load();
}

function allProjectsPage() {
    Projects.load();
}

function projectPage() {
    Project.load();
}

function addTaskPage() {
    AddTask.load();
}

function editTaskPage() {
    EditTask.load();
}

function editProjectPage() {
    EditProject.load();
}

PubSub.on('AddProject',addProjectPage);
PubSub.on('AllProjects',allProjectsPage);
PubSub.on('OpenProject',projectPage);
PubSub.on('AddTask',addTaskPage);
PubSub.on('EditTask',editTaskPage);
PubSub.on('EditProject',editProjectPage);

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const initPage = (function(doc) {
    let mainContent, menuNavigation, navButtons, menuOpenBtn, menuCloseBtn; 

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    function menuOpen() {
        menuNavigation.setAttribute('data-menu','open');
    }

    function menuClose() {
        menuNavigation.setAttribute('data-menu','closed');
    }

    function clearMainContent() {
        menuClose();
        mainContent.classList.remove('pt-h');
        mainContent.innerHTML = null;
        scrollToTop();
    }

    function handleNavigation() {
        clearMainContent();
        switch(Number(this.getAttribute('data-id'))) {
            case 1:
                Homepage.load();
              break;
            case 2:
                Categories.load();
              break;
            case 3:
                Contact.load();
                break;
            case 4:
                Credits.load();
                break;
            default:
                Homepage.load();
          }
    }

    function menuMobileToggle() {
        menuOpenBtn.addEventListener('click',menuOpen);
        doc.body.addEventListener('click', function( event ){
            if(!menuNavigation.contains( event.target ) && menuOpenBtn != event.target || menuNavigation.contains( event.target ) && menuCloseBtn == event.target){
                menuClose();
            }
        });
    }

    // function initMainContent() {
    //     Homepage.load();
    //     navButtons.forEach(navButton=> {
    //         navButton.addEventListener('click',handleNavigation);
    //     });
    // }

    function initPage() {
        mainContent = doc.querySelector('#content');
        menuNavigation = doc.querySelector('.menu');
        navButtons = doc.querySelectorAll('.menu-nav');
        menuOpenBtn = doc.querySelector('.menu-open');
        menuCloseBtn = doc.querySelector('.menu-close');
        menuMobileToggle();
        // initMainContent();
    }
    
    if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', initPage);
    } else {
        initPage();
    }
})(document);

export {initPage};


// if (!localStorage.getItem("bgcolor")) {
//     populateStorage();
//   } else {
//     setStyles();
//   }

// window.addEventListener("storage", (e) => {
//     document.querySelector(".my-key").textContent = e.key;
//     document.querySelector(".my-old").textContent = e.oldValue;
//     document.querySelector(".my-new").textContent = e.newValue;
//     document.querySelector(".my-url").textContent = e.url;
//     document.querySelector(".my-storage").textContent = JSON.stringify(
//       e.storageArea,
//     );
//   });

// if (storageAvailable("localStorage")) {
//     // Yippee! We can use localStorage awesomeness
//   } else {
//     // Too bad, no localStorage for us
//   }

// storageAvailable('sessionStorage')