import '../css/project.css';
import { documentMock } from "./document-mock.js";
import { PubSub } from './pubsub.js';
import { TodoProjectList } from "./todo-project-list.js";
import { TodoProject } from "./todo-project.js";
import { RecentProject } from "./recent-project.js";
import { TodoItem } from './todo-item.js';

export const Project = (function(){
    // cacheDom
    let mainContent = document.querySelector('#content');

    let project,
        projectTasks;

    function addTaskPage() {
        PubSub.trigger('AddTask');
    }

    function backToProjects() {
        PubSub.trigger('AllProjects');
    }

    function deleteTask(event) {
        let selectedProject = event.target.closest('.task-item').getAttribute('data-id');
        project.removeTask(projectTasks.findIndex(project => project.getId() == selectedProject));
        render();
    }

    // function openProject(event) {
    //     let selectedProject = event.target.getAttribute('data-id');
    //     RecentProject.set(projectList.find(project => project.getId() == selectedProject));
    //     console.log(RecentProject.get());
    // }

    function createCheckListItem(checkListItem,index) {
        let taskCheckListItem = document.createElement('li');
        taskCheckListItem.setAttribute('data-id',index);
        //Create checkList item label
        let checkListItemLabel = document.createElement('label');
        checkListItemLabel.textContent = checkListItem.getTitle();
        //Create checkList item input
        let checkListItemInput = document.createElement('input');
        checkListItemInput.setAttribute('type','checkbox');
        checkListItemInput.checked = checkListItem.getStatus();
        checkListItemInput.addEventListener('click',changeItemStatus);

        taskCheckListItem.append(checkListItemLabel,checkListItemInput);

        return taskCheckListItem;
    }

    function renderCheckList(task) {
        let taskCheckList = document.querySelector(`[data-id='${task.getId()}'] .task-checklist`);
        console.log(taskCheckList);
        taskCheckList.textContent = '';
        task.getCheckList().forEach((checkListItem,index)=>{
            taskCheckList.append(createCheckListItem(checkListItem,index));
        });
    }

    function changeItemStatus(event) {
        let selectedTask = event.target.closest('.task-item').getAttribute('data-id');
        let selectedItem = event.target.closest('li').getAttribute('data-id');
        selectedTask = projectTasks.find(task => task.getId() == selectedTask);
        selectedItem = selectedTask.getCheckListItem(selectedItem).changeStatus();
        renderCheckList(selectedTask);
    }

    function createTask(task) {
        let taskArticle = document.createElement('article');
        // projectSection.classList.add('project-item');
        // projectSection.setAttribute('data-id',project.getId());
        // // projectSection.addEventListener('click',openProject);

        // projectSection.append(projectTitle,deleteItem);

        //Create collapse section parent
        let collapseParent = document.createElement('details');
        collapseParent.classList.add('task-item');
        collapseParent.setAttribute('data-id',task.getId());

        //Set name to make sure only one is open
        collapseParent.setAttribute('name','todo-item');

        //Create collapse title
        let collapseTitle = document.createElement('summary');
        collapseTitle.classList.add(task.getPriority());

        //Create task title
        let taskTitle = document.createElement('h3');
        taskTitle.textContent = task.getTitle();

        //Create due date
        let taskDueDate = document.createElement('p');
        taskDueDate.classList.add('due-date');
        let dueDateTitle = document.createElement('span');
        dueDateTitle.classList.add('bold');
        dueDateTitle.textContent = 'Due Date: ';
        let dueDateContent = document.createElement('span');
        dueDateContent.textContent = task.getDueDate();
        taskDueDate.append(dueDateTitle,dueDateContent);

        //Create delete button
        let deleteItem = document.createElement('button');
        deleteItem.classList.add('dlt-icon');
        deleteItem.textContent = '⌫';
        deleteItem.addEventListener('click',deleteTask);

        //Add title of collapse
        collapseTitle.append(taskTitle,taskDueDate,deleteItem);

        //Create description paragraph
        let taskDescription = document.createElement('p');
        taskDescription.textContent = task.getDescription();

        collapseParent.append(collapseTitle,taskDescription);

        //Create notes list
        let taskNotes = task.getNotes();
        if(taskNotes.length > 0){
            let taskNotesList = document.createElement('ul');
            taskNotes.forEach(note =>{
                let taskNote = document.createElement('li');
                taskNote.textContent = note;
                taskNotesList.append(taskNote);
            });
            collapseParent.append(taskNotesList);
        }

        //Create checkList
        let taskCheckListItems = task.getCheckList();
        if(taskCheckListItems.length > 0){
            let taskCheckList = document.createElement('ul');    
            taskCheckList.classList.add('task-checklist');
            taskCheckListItems.forEach((checkListItem,index)=>{
                taskCheckList.append(createCheckListItem(checkListItem,index));
            });
            collapseParent.append(taskCheckList);
        }

        taskArticle.append(collapseParent);
        return taskArticle;
    }

    function render() {
        mainContent.textContent = '';
        project = RecentProject.get();

        //Remove
        let newTask = TodoItem();
        newTask.setTitle('Task 1');
        newTask.setDescription('Task 1 Description');
        newTask.setDueDate('1/1/2012');
        newTask.setPriority('high');
        newTask.addNote('Note 1');
        newTask.addNote('Note 2');
        newTask.addCheckListItem('CheckList Item 1');
        newTask.addCheckListItem('CheckList Item 2');
        project.addTask(newTask);
        let newTask2 = TodoItem();
        newTask2.setTitle('Task 2');
        newTask2.setDescription('Task 2 Description');
        newTask2.setDueDate('1/1/2012');
        newTask2.setPriority('low');
        project.addTask(newTask2);
        //Remove
        projectTasks = project.getTaskList();

        let projectsContainer = document.createElement('article');
        projectsContainer.classList.add('container','components-list');

        let projectsTitle = document.createElement('h2');
        projectsTitle.textContent = project.getTitle();

        let backToProjectsBtn = document.createElement('button');
        backToProjectsBtn.textContent = 'Back To Projects';
        backToProjectsBtn.addEventListener('click',backToProjects);

        let addProjectBtn = document.createElement('button');
        addProjectBtn.textContent = 'Add Task';
        addProjectBtn.addEventListener('click',addTaskPage);

        projectsContainer.append(projectsTitle,backToProjectsBtn,addProjectBtn);
        
        projectTasks.forEach(task => {
            projectsContainer.append(createTask(task));
        });

        mainContent.append(projectsContainer);
    }

    return {
        load: render
    }
})(document||documentMock);