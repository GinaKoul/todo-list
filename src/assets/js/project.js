import '../css/project.css';
import { documentMock } from './document-mock.js';
import { PubSub } from './pubsub.js';
import { CurrentEvent } from './current-event.js';
import { TodoProjectList } from "./todo-project-list.js";
import { RecentProject } from "./recent-project.js";
import { RecentTask } from "./recent-task.js";
import ProjectPage from "../json/project.json";
import { format } from "date-fns";

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
        PubSub.trigger('UpdateProjects');
        PubSub.trigger('OpenProject');
    }

    function editTask(event) {
        let selectedTask = event.target.closest('.task-item').getAttribute('data-id');
        RecentTask.set(projectTasks.find(task => task.getId() == selectedTask));
        PubSub.trigger('EditTask');
    }

    function deleteProject(event) {
        event.stopPropagation();
        TodoProjectList.removeProject(TodoProjectList.get().findIndex(task => task.getId() == project.getId()));
        PubSub.trigger('UpdateProjects');
        PubSub.trigger('AllProjects');
    }

    function editProject(event) {
        event.stopPropagation();
        PubSub.trigger('EditProject');
    }

    function createCheckListItem(task,checkListItem,index) {
        let taskCheckListItem = document.createElement('li');
        taskCheckListItem.classList.add('checkbox-field');
        taskCheckListItem.setAttribute('data-id',index);

        //Create checkbox label
        let checkListItemLabel = document.createElement('label');
        checkListItemLabel.setAttribute('for',`check${task.getId()}-${index}`)
        checkListItemLabel.textContent = checkListItem.getTitle();

        //Create checkbox input
        let checkListItemInput = document.createElement('input');
        checkListItemInput.setAttribute('id',`check${task.getId()}-${index}`);
        checkListItemInput.setAttribute('type','checkbox');
        checkListItemInput.checked = checkListItem.getStatus();
        checkListItemInput.addEventListener('click',changeItemStatus);

        taskCheckListItem.append(checkListItemLabel,checkListItemInput);

        return taskCheckListItem;
    }

    function renderCheckList(task) {
        let taskCheckList = document.querySelector(`[data-id='${task.getId()}'] .task-checklist`);
        taskCheckList.textContent = '';
        task.getCheckList().forEach((checkListItem,index)=>{
            taskCheckList.append(createCheckListItem(task,checkListItem,index));
        });
    }

    function changeItemStatus(event) {
        event.stopPropagation();
        let selectedTask = event.target.closest('.task-item').getAttribute('data-id');
        let selectedItem = event.target.closest('li').getAttribute('data-id');
        selectedTask = projectTasks.find(task => task.getId() == selectedTask);
        selectedItem = selectedTask.getCheckListItem(selectedItem).changeStatus();
        PubSub.trigger('UpdateProjects');
        renderCheckList(selectedTask);
    }

    function changeTaskStatus(event) {
        event.stopPropagation();
        let selectedTask = event.target.closest('.task-item').getAttribute('data-id');
        selectedTask = projectTasks.find(task => task.getId() == selectedTask);
        selectedTask.changeStatus();
        PubSub.trigger('UpdateProjects');
        render();
    }

    function createTask(task) {
        let taskArticle = document.createElement('article');

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
        dueDateTitle.textContent = `${ProjectPage['dueDateTitle']}: `;
        let dueDateContent = document.createElement('span');
        dueDateContent.textContent = format(task.getDueDate(), "dd/MM/yyyy HH:mm");
        taskDueDate.append(dueDateTitle,dueDateContent);

        //Create checkbox
        let checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('task-status','checkbox-field');

        //Create checkbox label
        let checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for',`task${task.getId()}`)
        checkboxLabel.textContent = task.getTitle();
        checkboxLabel.setAttribute('hidden','hidden');

        //Create checkbox input
        let checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('id',`task${task.getId()}`);
        checkboxInput.setAttribute('type','checkbox');
        checkboxInput.checked = task.getStatus();
        checkboxInput.addEventListener('click',changeTaskStatus);

        checkboxContainer.append(checkboxLabel,checkboxInput);

        //Create edit button
        let editItem = document.createElement('button');
        editItem.classList.add('edit-icon');
        editItem.textContent = '\u270E';
        editItem.addEventListener('click',editTask);

        //Create delete button
        let deleteItem = document.createElement('button');
        deleteItem.classList.add('dlt-icon');
        deleteItem.textContent = '⌫';
        deleteItem.addEventListener('click',deleteTask);

        //Add title of collapse
        collapseTitle.append(taskTitle,taskDueDate,checkboxContainer,editItem,deleteItem);

        //Create task details container
        let detailsContainer = document.createElement('div');
        detailsContainer.classList.add('task-details');

        //Create description
        let descContainer = document.createElement('section');
        let descTitle = document.createElement('h4');
        descTitle.textContent = ProjectPage['descriptionTitle'];
        let taskDescription = document.createElement('p');
        taskDescription.textContent = task.getDescription();
        descContainer.append(descTitle,taskDescription)

        detailsContainer.append(descContainer);

        //Create notes list
        let taskNotes = task.getNotes();
        if(taskNotes.length > 0){
            let notesContainer = document.createElement('section');
            let notesTitle = document.createElement('h4');
            notesTitle.textContent = ProjectPage['notesTitle'];
            let taskNotesList = document.createElement('ul');
            taskNotesList.classList.add('task-notes');
            taskNotes.forEach(note =>{
                let taskNote = document.createElement('li');
                taskNote.textContent = note;
                taskNotesList.append(taskNote);
            });
            notesContainer.append(notesTitle,taskNotesList)
            detailsContainer.append(notesContainer);
        }

        //Create checkList
        let taskCheckListItems = task.getCheckList();
        if(taskCheckListItems.length > 0){
            let checkContainer = document.createElement('section');
            let checkTitle = document.createElement('h4');
            checkTitle.textContent = ProjectPage['checkListTitle'];
            let taskCheckList = document.createElement('ul');    
            taskCheckList.classList.add('task-checklist');
            taskCheckListItems.forEach((checkListItem,index)=>{
                taskCheckList.append(createCheckListItem(task,checkListItem,index));
            });
            checkContainer.append(checkTitle,taskCheckList)
            detailsContainer.append(checkContainer);
        }

        collapseParent.append(collapseTitle,detailsContainer);

        taskArticle.append(collapseParent);
        return taskArticle;
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('OpenProject');
        project = RecentProject.get();

        projectTasks = project.getTaskList();

        let projectsContainer = document.createElement('article');
        projectsContainer.classList.add('container','components-list');

        let projectsTitle = document.createElement('h2');
        projectsTitle.textContent = project.getTitle();

        let editItem = document.createElement('button');
        editItem.classList.add('edit-icon');
        editItem.textContent = '\u270E';
        editItem.addEventListener('click',editProject);

        let deleteItem = document.createElement('button');
        deleteItem.classList.add('dlt-icon');
        deleteItem.textContent = '⌫';
        deleteItem.addEventListener('click',deleteProject);

        let backToProjectsBtn = document.createElement('button');
        backToProjectsBtn.textContent = ProjectPage['backButton'];
        backToProjectsBtn.addEventListener('click',backToProjects);

        let addProjectBtn = document.createElement('button');
        addProjectBtn.textContent = ProjectPage['addTaskButton'];
        addProjectBtn.addEventListener('click',addTaskPage);

        let prioritySection = document.createElement('details');
        prioritySection.classList.add('priorities');
        let prioritySummary = document.createElement('summary');
        let priorityTitle = document.createElement('h3');
        priorityTitle.textContent = 'Priorities';
        prioritySummary.append(priorityTitle);
        let priorityHigh = document.createElement('h4');
        priorityHigh.textContent = 'High';
        priorityHigh.classList.add('high');
        let priorityMedium = document.createElement('h4');
        priorityMedium.textContent = 'Medium';
        priorityMedium.classList.add('medium');
        let priorityLow = document.createElement('h4');
        priorityLow.textContent = 'Low';
        priorityLow.classList.add('low');
        prioritySection.append(prioritySummary,priorityHigh,priorityMedium,priorityLow);

        projectsContainer.append(projectsTitle,prioritySection,editItem,deleteItem,backToProjectsBtn,addProjectBtn);
        
        projectTasks.forEach(task => {
            projectsContainer.append(createTask(task));
        });

        mainContent.append(projectsContainer);
    }

    return {
        load: render
    }
})(document||documentMock);