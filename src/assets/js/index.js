import '../css/styles.css';
import '../css/add-item.css';
import { AddTask } from './add-task.js';
import { AddProject } from './add-project.js';
import { Projects } from './projects.js';

// AddTask.load();
// AddProject.load();
Projects.load();


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