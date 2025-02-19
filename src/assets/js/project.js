import '../css/project.css';
import { documentMock } from './document-mock.js';
import { PubSub } from './pubsub.js';
import { CurrentEvent } from './current-event.js';
import { TodoProjectList } from "./todo-project-list.js";
import { RecentProject } from "./recent-project.js";
import { RecentTask } from "./recent-task.js";
import ProjectPage from "../json/project.json";
import { format } from "date-fns";

export const Project = (function () {
    // Cache Dom
    const mainContent = document.querySelector('#content');

    let project;
    let projectTasks;

    function addTaskPage() {
        PubSub.trigger('AddTask');
    }

    function backToProjects() {
        PubSub.trigger('AllProjects');
    }

    function deleteTask(event) {
        const selectedProject = event.target.closest('.task-item').getAttribute('data-id');
        project.removeTask(projectTasks.findIndex(project => project.getId() === selectedProject));
        PubSub.trigger('UpdateProjects');
        PubSub.trigger('OpenProject');
    }

    function editTask(event) {
        const selectedTask = event.target.closest('.task-item').getAttribute('data-id');
        RecentTask.set(projectTasks.find(task => task.getId() === selectedTask));
        PubSub.trigger('EditTask');
    }

    function deleteProject(event) {
        event.stopPropagation();
        TodoProjectList.removeProject(TodoProjectList.get().findIndex(task => task.getId() === project.getId()));
        PubSub.trigger('UpdateProjects');
        PubSub.trigger('AllProjects');
    }

    function editProject(event) {
        event.stopPropagation();
        PubSub.trigger('EditProject');
    }

    function createCheckListItem(task, checkListItem, index) {
        const taskCheckListItem = document.createElement('li');
        taskCheckListItem.classList.add('checkbox-field');
        taskCheckListItem.setAttribute('data-id', index);

        // Create checkbox label
        const checkListItemLabel = document.createElement('label');
        checkListItemLabel.setAttribute('for', `check${task.getId()}-${index}`);
        checkListItemLabel.textContent = checkListItem.getTitle();

        // Create checkbox input
        const checkListItemInput = document.createElement('input');
        checkListItemInput.setAttribute('id', `check${task.getId()}-${index}`);
        checkListItemInput.setAttribute('type', 'checkbox');
        checkListItemInput.checked = checkListItem.getStatus();
        checkListItemInput.addEventListener('click', changeItemStatus);

        taskCheckListItem.append(checkListItemLabel, checkListItemInput);

        return taskCheckListItem;
    }

    function renderCheckList(task) {
        const taskCheckList = document.querySelector(`[data-id='${task.getId()}'] .task-checklist`);
        taskCheckList.textContent = '';
        task.getCheckList().forEach((checkListItem, index)=>{
            taskCheckList.append(createCheckListItem(task, checkListItem, index));
        });
    }

    function changeItemStatus(event) {
        event.stopPropagation();
        let selectedTask = event.target.closest('.task-item').getAttribute('data-id');
        const selectedItem = event.target.closest('li').getAttribute('data-id');
        selectedTask = projectTasks.find(task => task.getId() === selectedTask);
        selectedTask.getCheckListItem(selectedItem).changeStatus();
        PubSub.trigger('UpdateProjects');
        renderCheckList(selectedTask);
    }

    function changeTaskStatus(event) {
        event.stopPropagation();
        let selectedTask = event.target.closest('.task-item').getAttribute('data-id');
        selectedTask = projectTasks.find(task => task.getId() === selectedTask);
        selectedTask.changeStatus();
        PubSub.trigger('UpdateProjects');
        render();
    }

    function createTask(task) {
        const taskArticle = document.createElement('article');

        // Create collapse section parent
        const collapseParent = document.createElement('details');
        collapseParent.classList.add('task-item');
        collapseParent.setAttribute('data-id', task.getId());

        // Set name to make sure only one is open
        collapseParent.setAttribute('name', 'todo-item');

        // Create collapse title
        const collapseTitle = document.createElement('summary');
        collapseTitle.classList.add(task.getPriority());

        // Create task title
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.getTitle();

        // Create due date
        const taskDueDate = document.createElement('p');
        taskDueDate.classList.add('due-date');
        const dueDateTitle = document.createElement('span');
        dueDateTitle.classList.add('bold');
        dueDateTitle.textContent = `${ProjectPage['dueDateTitle']}: `;
        const dueDateContent = document.createElement('span');
        dueDateContent.textContent = format(task.getDueDate(), "dd/MM/yyyy HH:mm");
        taskDueDate.append(dueDateTitle, dueDateContent);

        // Create checkbox
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('task-status', 'checkbox-field');

        // Create checkbox label
        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', `task${task.getId()}`);
        checkboxLabel.textContent = task.getTitle();
        checkboxLabel.setAttribute('hidden', 'hidden');

        // Create checkbox input
        const checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('id', `task${task.getId()}`);
        checkboxInput.setAttribute('type', 'checkbox');
        checkboxInput.checked = task.getStatus();
        checkboxInput.addEventListener('click', changeTaskStatus);

        checkboxContainer.append(checkboxLabel, checkboxInput);

        // Create edit button
        const editItem = document.createElement('button');
        editItem.classList.add('edit-icon');
        editItem.textContent = '\u270E';
        editItem.addEventListener('click', editTask);

        // Create delete button
        const deleteItem = document.createElement('button');
        deleteItem.classList.add('dlt-icon');
        deleteItem.textContent = '⌫';
        deleteItem.addEventListener('click', deleteTask);

        // Add title of collapse
        collapseTitle.append(taskTitle, taskDueDate, checkboxContainer, editItem, deleteItem);

        // Create task details container
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('task-details');

        // Create description
        const descContainer = document.createElement('section');
        const descTitle = document.createElement('h4');
        descTitle.textContent = ProjectPage['descriptionTitle'];
        const taskDescription = document.createElement('p');
        taskDescription.textContent = task.getDescription();
        descContainer.append(descTitle, taskDescription);

        detailsContainer.append(descContainer);

        // Create notes list
        const taskNotes = task.getNotes();
        if (taskNotes.length > 0) {
            const notesContainer = document.createElement('section');
            const notesTitle = document.createElement('h4');
            notesTitle.textContent = ProjectPage['notesTitle'];
            const taskNotesList = document.createElement('ul');
            taskNotesList.classList.add('task-notes');
            taskNotes.forEach(note =>{
                const taskNote = document.createElement('li');
                taskNote.textContent = note;
                taskNotesList.append(taskNote);
            });
            notesContainer.append(notesTitle, taskNotesList);
            detailsContainer.append(notesContainer);
        }

        // Create checkList
        const taskCheckListItems = task.getCheckList();
        if (taskCheckListItems.length > 0) {
            const checkContainer = document.createElement('section');
            const checkTitle = document.createElement('h4');
            checkTitle.textContent = ProjectPage['checkListTitle'];
            const taskCheckList = document.createElement('ul');    
            taskCheckList.classList.add('task-checklist');
            taskCheckListItems.forEach((checkListItem, index)=>{
                taskCheckList.append(createCheckListItem(task, checkListItem, index));
            });
            checkContainer.append(checkTitle, taskCheckList);
            detailsContainer.append(checkContainer);
        }

        collapseParent.append(collapseTitle, detailsContainer);

        taskArticle.append(collapseParent);
        return taskArticle;
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('OpenProject');
        project = RecentProject.get();

        projectTasks = project.getTaskList();

        // Create project article
        const projectsContainer = document.createElement('article');
        projectsContainer.classList.add('container', 'components-list');

        // Create project title
        const projectsTitle = document.createElement('h2');
        projectsTitle.textContent = project.getTitle();

        // Create edit button
        const editItem = document.createElement('button');
        editItem.classList.add('edit-icon');
        editItem.textContent = '\u270E';
        editItem.addEventListener('click', editProject);

        // Create delete button
        const deleteItem = document.createElement('button');
        deleteItem.classList.add('dlt-icon');
        deleteItem.textContent = '⌫';
        deleteItem.addEventListener('click', deleteProject);

        // Create back button
        const backToProjectsBtn = document.createElement('button');
        backToProjectsBtn.textContent = ProjectPage['backButton'];
        backToProjectsBtn.addEventListener('click', backToProjects);

        // Create add task button
        const addProjectBtn = document.createElement('button');
        addProjectBtn.textContent = ProjectPage['addTaskButton'];
        addProjectBtn.addEventListener('click', addTaskPage);

        // Create priority section
        const prioritySection = document.createElement('details');
        prioritySection.classList.add('priorities');
        const prioritySummary = document.createElement('summary');
        const priorityTitle = document.createElement('h3');
        priorityTitle.textContent = ProjectPage['prioritiesTitle'];
        prioritySummary.append(priorityTitle);
        prioritySection.append(prioritySummary);

        ProjectPage['priorities'].forEach(priority => {
            const priorityTitle = document.createElement('h4');
            priorityTitle.textContent = priority['title'];
            priorityTitle.classList.add(priority['value']);
            prioritySection.append(priorityTitle);
        });

        projectsContainer.append(projectsTitle, prioritySection, editItem, deleteItem, backToProjectsBtn, addProjectBtn);
        
        // Create tasks
        projectTasks.forEach(task => {
            projectsContainer.append(createTask(task));
        });

        mainContent.append(projectsContainer);
    }

    return {
        load: render
    };

})(document||documentMock);