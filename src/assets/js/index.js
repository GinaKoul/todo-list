import '../css/styles.css';
import '../css/add-item.css';
// import { TodoItem } from './todo-item.js';
import { TaskForm } from './task-form.js';
// import { Categories } from './categories.js';
// import { Contact } from './contact.js';
// import { Credits } from './credits.js';

TaskForm.load();
// let task1 = TodoItem;
// task1.setTitle('Task 1');
// task1.setDescription('Task 1 description');
// task1.setDueDate('1/12/2025');
// task1.setPriority('none');
// task1.addNote('Note 1');
// task1.addNote('Note 2');
// task1.addCheckListItem('Checklist item 1');
// task1.addCheckListItem('Checklist item 2');
// task1.addCheckListItem('Checklist item 3');

// task1.logTodoItem();

// task1.removeNote(0);
// task1.changeCheckListItemStatus(1);
// task1.removeCheckListItem(2);
// task1.changeStatus();

// console.log('------');

// task1.logTodoItem();



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