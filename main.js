/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/assets/js/pubsub.js
let PubSub = {
    events: {},
    on: function(eventName,fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function(eventName,fn) {
        if(this.events[eventName]) {
            for(let i=0; i<this.events[eventName].length;i++) {
                if(this.events[eventName][i]==fn) {
                    this.events[eventName].splice(i,1);
                    break;
                }
            }
        }
    },
    trigger: function(eventName,data){
        if(this.events[eventName]){
            this.events[eventName].forEach(
                function(fn){
                    fn(data);
                }
            );
        }
    }
}
;// ./src/assets/js/storage-availability.js
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    }
}
;// ./src/assets/js/todo-project-list.js
const TodoProjectList = (function() {
    let projectList = [];

    function addProject(project) {
        projectList.push(project);
    }

    function removeProject(index) {
        projectList.splice(index,1)
    }

    function get() {
        return projectList;
    }

    function reset() {
        projectList = [];
    }

    return {
        addProject,
        removeProject,
        get,
        reset
    }

})();
;// ./src/assets/js/create-projects-json.js


const CreateProjectsJson = (function() {

    function getCheckList(checkList) {
        return checkList.map((checkListItem) => {
            return {
                title: checkListItem.getTitle(),
                status: checkListItem.getStatus()
            }
        })
    }

    function getTasks(projectTasks) {
        return projectTasks.map((task) => {
            return {
                id: task.getId(),
                title: task.getTitle(),
                description: task.getDescription(),
                dueDate: task.getDueDate(),
                priority: task.getPriority(),
                status: task.getStatus(),
                notes: task.getNotes(),
                checkList: getCheckList(task.getCheckList())
            }
        });
    }

    function getProjects() {
        return TodoProjectList.get().map((project) => {
            return {
                id: project.getId(),
                title: project.getTitle(),
                taskList: getTasks(project.getTaskList())
            }
        })
    }

    function get() {
        return JSON.stringify(getProjects());
    }

    return {
        get
    }
})();


;// ./node_modules/uuid/dist/esm-browser/native.js
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const esm_browser_native = ({ randomUUID });

;// ./node_modules/uuid/dist/esm-browser/rng.js
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}

;// ./node_modules/uuid/dist/esm-browser/stringify.js

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!validate(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
/* harmony default export */ const esm_browser_stringify = ((/* unused pure expression or super */ null && (stringify)));

;// ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
    if (esm_browser_native.randomUUID && !buf && !options) {
        return esm_browser_native.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? rng();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return unsafeStringify(rnds);
}
/* harmony default export */ const esm_browser_v4 = (v4);

;// ./src/assets/js/todo-project.js


function TodoProject() {
    let id = esm_browser_v4(),
        title,
        taskList = [];

    function setId(value) {
        id = value;
    }

    function getId() {
        return id;
    }

    function setTitle(value) {
        title = value;
    }

    function getTitle() {
        return title;
    }

    function addTask(task) {
        taskList.push(task);
    }

    function removeTask(index) {
        taskList.splice(index,1)
    }

    function getTaskList() {
        return taskList;
    }

    return {
        setId,
        getId,
        setTitle,
        getTitle,
        addTask,
        removeTask,
        getTaskList
    }
};
;// ./src/assets/js/checklist-item.js
function CheckListItem() {
    let title,
        status = false;

    function setTitle(value) {
        title = value;
    }

    function getTitle() {
        return title;
    }

    function changeStatus() {
        status = !status;
    }

    function getStatus() {
        return status;
    }

    return {
        setTitle,
        getTitle,
        changeStatus,
        getStatus
    }
}
;// ./src/assets/js/todo-item.js



function TodoItem() {
    let id = esm_browser_v4(),
        title,
        description,
        dueDate,
        priority,
        status = false,
        notes = [],
        checkList = [];

    function setId(value) {
        id = value;
    }

    function getId() {
        return id;
    }

    function setTitle(value) {
        title = value;
    }

    function getTitle() {
        return title;
    }

    function setDescription(value) {
        description = value;
    }

    function getDescription() {
        return description;
    }

    function setDueDate(value) {
        dueDate = value;
    }

    function getDueDate() {
        return dueDate;
    }

    function setPriority(value) {
        priority = value;
    }

    function getPriority() {
        return priority;
    }

    function changeStatus() {
        status = !status;
    }

    function getStatus() {
        return status;
    }

    function addNote(value) {
        notes.push(value);
    }

    function removeNote(index) {
        notes.splice(index,1);
    }

    function getNotes() {
        return notes;
    }

    function addCheckListItem(value) {
        let item = CheckListItem();
        item.setTitle(value);
        checkList.push(item);
    }

    function removeCheckListItem(index) {
        checkList.splice(index,1);
    }

    function getCheckList() {
        return checkList;
    }

    function getCheckListItem(index) {
        return checkList[index];
    }

    return {
        setId,
        getId,
        setTitle,
        getTitle,
        setDescription,
        getDescription,
        setDueDate,
        getDueDate,
        setPriority,
        getPriority,
        changeStatus,
        getStatus,
        addNote,
        removeNote,
        getNotes,
        addCheckListItem,
        removeCheckListItem,
        getCheckList,
        getCheckListItem,
    }
};
;// ./src/assets/js/create-projects.js




const CreateProjects = (function(){

    function setProject(project) {
        let newProject = TodoProject();
        newProject.setId(project.id);
        newProject.setTitle(project.title);
        
        project.taskList.forEach((task) => {
            let newTask = TodoItem();
            newTask.setId(task.id);
            newTask.setTitle(task.title);
            newTask.setDescription(task.description);
            newTask.setDueDate(task.dueDate);
            newTask.setPriority(task.priority);
            if(task.status) {
                newTask.changeStatus();
            }

            task.notes.forEach(note => {
                newTask.addNote(note);
            })

            task.checkList.forEach((checkListItem,index) => {
                newTask.addCheckListItem(checkListItem.title);
                if(checkListItem.status) {
                    newTask.getCheckListItem(index).changeStatus();
                }
            })

            newProject.addTask(newTask);
        });

        return newProject;
    }

    function setProjects(projects) {
        TodoProjectList.reset();
        projects.map((project) => {
            TodoProjectList.addProject(setProject(project));
        })
    }

    function run(projectsJSON) {
        setProjects(JSON.parse(projectsJSON));
    }

    return {
        run
    }
})();
;// ./src/assets/js/recent-project.js
const RecentProject = (function() {

    let recentProject;

    function set(value) {
        recentProject = value;
    }

    function get() {
        return recentProject;
    }

    return {
        set,
        get
    }
})();
;// ./src/assets/js/current-event.js


const CurrentEvent = (function() {
    let currentEvent;

    function set(value) {
        currentEvent = value;
        PubSub.trigger('UpdateCurrentEvent');
    }

    function get() {
        return currentEvent;
    }

    return {
        set,
        get
    }
})();
;// ./src/assets/js/storage.js







const Storage = (function() {
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
;// ./src/assets/js/document-mock.js
const documentMock = (()=>({
    querySelector: (selector) => ({
        innerHtml:null,
    }),
}))();
;// ./src/assets/js/form.js


const Form = (function(){

    let validationMsg = document.querySelector('.validation-msg');

    function createLabel(field) {
        let label = document.createElement('label');
        label.setAttribute('for',field['id']);
        label.textContent = field['titleLabel'];
        return label;
    }

    function createInput(field) {
        let inputField = document.createElement('input');
        inputField.id = field['id'];
        inputField.setAttribute('name',field['name']);
        inputField.setAttribute('type',field['inputType']);
        console.log()
        field['required']?inputField.setAttribute('required','required'):null;
        return inputField;
    }

    function createTextArea(field) {
        let textareaField = document.createElement('textarea');
        textareaField.id = field['id'];
        textareaField.setAttribute('name',field['name']);
        textareaField.setAttribute('rows',field['rows']);
        field['required']?textareaField.setAttribute('required','required'):null;
        return textareaField;
    }

    function createSelect(field) {
        let selectField = document.createElement('select');
        selectField.id = field['id'];
        selectField.setAttribute('name',field['name']);
        field['required']?selectField.setAttribute('required','required'):null;

        field['options'].forEach(option => {
            let selectOption = document.createElement('option');
            selectOption.textContent = option['title'];
            selectOption.setAttribute('value',option['value']);
            option['selected']?selectOption.setAttribute('selected','selected'):null;
            selectField.append(selectOption);
        })
        return selectField;
    }

    function validate(form) {
        let requiredFields = form.querySelectorAll('[required]');
        console.log(requiredFields);
        let valid = true;
        requiredFields.forEach(field => {
            if(field.value.trim() == '') {
                valid = false;
            }
        })
        if(!valid) {
            validationMsg.classList.add('show');
            setTimeout(() => {
                validationMsg.classList.remove('show');
            }, 6000);
        }
        return valid;
    }

    return {
        createLabel,
        createInput,
        createTextArea,
        createSelect,
        validate
    }

})(document||documentMock)
;// ./src/assets/json/add-task.json
const add_task_namespaceObject = /*#__PURE__*/JSON.parse('{"DD":"Create new task","Gv":"Back To Project","RC":"Add Task","UQ":[{"id":"taskTitle","titleLabel":"Title","fieldType":"input","inputType":"text","name":"todoItem.title","required":true},{"id":"taskDescription","titleLabel":"Description","fieldType":"textarea","rows":"4","name":"todoItem.description","required":true},{"id":"taskDueDate","titleLabel":"Due Date","fieldType":"input","inputType":"datetime-local","name":"todoItem.dueDate","required":true},{"id":"taskPriority","titleLabel":"Priority","fieldType":"select","options":[{"title":"None","value":"none","selected":true},{"title":"Low","value":"low","selected":false},{"title":"Medium","value":"medium","selected":false},{"title":"High","value":"high","selected":false}],"name":"todoItem.priority","required":true},{"id":"taskNotes","titleLabel":"Add Notes","fieldType":"addition","inputType":"text","name":"todoItem.notes","buttonTitle":"Save Note"},{"id":"taskCheckList","titleLabel":"Add Check List","fieldType":"addition","inputType":"text","name":"todoItem.checkList","buttonTitle":"Save Check List Item"}]}');
;// ./src/assets/js/add-task.js









const AddTask = (function() {
    // cacheDom
    let mainContent = document.querySelector('#content');

    let newTask,
        addTaskForm,
        titleField,
        descriptionField,
        dueDateField,
        priorityField;

    function cacheDom() {
        addTaskForm = document.querySelector('#addTask');
        titleField = document.querySelector('[name="todoItem.title"]');
        descriptionField = document.querySelector('[name="todoItem.description"]');
        dueDateField = document.querySelector('[name="todoItem.dueDate"]');
        priorityField = document.querySelector('[name="todoItem.priority"]');
    }

    function backToProject() {
        PubSub.trigger('OpenProject');
    }

    function setTaskDetails(event) {
        event.preventDefault();
        if(Form.validate(addTaskForm)) {
            newTask.setTitle(titleField.value);
            newTask.setDescription(descriptionField.value);
            newTask.setDueDate(dueDateField.value);
            newTask.setPriority(priorityField.value);
            let currentProject = RecentProject.get();
            currentProject.addTask(newTask);
            PubSub.trigger('UpdateProjects');
            backToProject();
        }
    }

    function addTaskNote(additionField) {
        if(additionField.value) {
            newTask.addNote(additionField.value);
            additionField.value = '';
        }
    }

    function removeTaskNote(event) {
        let itemId = event.target.closest('li').getAttribute('data-id');
        newTask.removeNote(Number(itemId));
        renderNotes(event.target.closest('details'));
    }

    function renderNotes(fieldContainer) {
        let containerList = fieldContainer.querySelector('ul');
        containerList.textContent = '';
        newTask.getNotes().forEach((note,index) =>{
            let listItem = document.createElement('li');
            listItem.setAttribute('data-id',index);

            let itemContent = document.createElement('span');
            itemContent.textContent = note;

            let deleteItem = document.createElement('span');
            deleteItem.classList.add('dlt-icon');
            deleteItem.textContent = '⌫';
            deleteItem.addEventListener('click',removeTaskNote);

            listItem.append(itemContent,deleteItem);
            containerList.append(listItem);
        })
    }

    function addTaskCheckItem(additionField) {
        if(additionField.value) {
            newTask.addCheckListItem(additionField.value);
            additionField.value = '';
        }
    }

    function removeTaskCheckItem(event) {
        let itemId = event.target.closest('li').getAttribute('data-id');
        newTask.removeCheckListItem(Number(itemId));
        renderCheckList(event.target.closest('details'));
    }

    function renderCheckList(fieldContainer) {
        let containerList = fieldContainer.querySelector('ul');
        containerList.textContent = '';
        newTask.getCheckList().forEach((checkListItem,index) =>{
            let listItem = document.createElement('li');
            listItem.setAttribute('data-id',index);

            let itemContent = document.createElement('span');
            itemContent.textContent = checkListItem.getTitle();

            let deleteItem = document.createElement('span');
            deleteItem.classList.add('dlt-icon');
            deleteItem.textContent = '⌫';
            deleteItem.addEventListener('click',removeTaskCheckItem);

            listItem.append(itemContent,deleteItem);
            containerList.append(listItem);
        })
    }

    function additionEvent(event) {
        let additionContainer = event.target.closest('details');
        let additionField = additionContainer.querySelector('input');
        switch (additionField.getAttribute('name').split('.').pop()) {
            case 'notes':
                addTaskNote(additionField);
                renderNotes(additionContainer);
                break;
            case 'checkList':
                addTaskCheckItem(additionField);
                renderCheckList(additionContainer);
                break;
        }
    }

    function createAddField(field) {
        //Create collapse section parent
        let collapseParent = document.createElement('details');

        //Set name to make sure only one is open
        collapseParent.setAttribute('name','todo-item');

        //Create collapse title
        let collapseTitle = document.createElement('summary');

        //Add field label as the title of collapse
        collapseTitle.append(Form.createLabel(field));

        //Create the list for added elements
        let fieldList = document.createElement('ul');
        fieldList.classList.add('field-list');

        //Create input
        let additionInput = document.createElement('input');
        additionInput.setAttribute('name',field['name']);
        additionInput.setAttribute('type',field['inputType']);

        //Create button that adds elements
        let additionBtn = document.createElement('button');
        additionBtn.setAttribute('type','button');
        additionBtn.textContent = field['buttonTitle'];
        additionBtn.addEventListener('click',additionEvent);
        collapseParent.append(collapseTitle,fieldList,additionInput,additionBtn);
        return collapseParent;
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('AddTask');
        newTask = TodoItem();

        //Create form element
        let form = document.createElement('form');
        form.id = 'addTask';
        form.classList.add('container','wmax-sm','add-form');
        form.addEventListener('submit',setTaskDetails);

        //Create form Title
        let formHeading = document.createElement('h2');
        formHeading.textContent = add_task_namespaceObject.DD;
        form.append(formHeading);

        // Create fields
        add_task_namespaceObject.UQ.forEach(field => {
            switch (field['fieldType']) {
                case 'input':
                    form.append(Form.createLabel(field));
                    form.append(Form.createInput(field));
                    break;
                case 'textarea':
                    form.append(Form.createLabel(field));
                    form.append(Form.createTextArea(field));
                    break;
                case 'select':
                    form.append(Form.createLabel(field));
                    form.append(Form.createSelect(field));
                    break;
                case 'addition':
                    form.append(createAddField(field));
                    break;
            }
        });

        // Add back to project button
        let backBtn = document.createElement('button');
        backBtn.textContent = add_task_namespaceObject.Gv;
        backBtn.setAttribute('type','button');
        backBtn.addEventListener('click',backToProject);

        // Add submit button
        let submitBtn = document.createElement('button');
        submitBtn.textContent = add_task_namespaceObject.RC;

        form.append(backBtn,submitBtn);

        // Add page content
        mainContent.append(form);

        // Cache Dom
        cacheDom();
    }

    return {
        load: render
    }
})(document||documentMock)
;// ./src/assets/json/add-project.json
const add_project_namespaceObject = /*#__PURE__*/JSON.parse('{"DD":"Create new project","Gv":"Back To Projects","RC":"Add project","UQ":[{"id":"taskTitle","titleLabel":"Title","fieldType":"input","inputType":"text","name":"todoProject.title","required":true}]}');
;// ./src/assets/js/add-project.js









const AddProject = (function(){
    // cacheDom
    let mainContent = document.querySelector('#content');

    let addProjectForm,
        titleField;

    function cacheDom() {
        addProjectForm = document.querySelector('#addProject');
        titleField = document.querySelector('[name="todoProject.title"]');
    }

    function backToProjects() {
        PubSub.trigger('AllProjects');
    }

    function setProjectDetails(event) {
        event.preventDefault();
        if(Form.validate(addProjectForm)) {
            const newProject = TodoProject();
            newProject.setTitle(titleField.value);
            TodoProjectList.addProject(newProject);
            PubSub.trigger('UpdateProjects');
            PubSub.trigger('AllProjects');
        }
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('AddProject');

        //Create form element
        let form = document.createElement('form');
        form.id = 'addProject';
        form.classList.add('container','wmax-sm','add-form');
        form.addEventListener('submit',setProjectDetails);

        //Create form Title
        let formHeading = document.createElement('h2');
        formHeading.textContent = add_project_namespaceObject.DD;
        form.append(formHeading);

        // Create fields
        add_project_namespaceObject.UQ.forEach(field => {
            switch (field['fieldType']) {
                case 'input':
                    form.append(Form.createLabel(field));
                    form.append(Form.createInput(field));
                    break;
            }
        });

        // Add back to project button
        let backBtn = document.createElement('button');
        backBtn.textContent = add_project_namespaceObject.Gv;
        backBtn.setAttribute('type','button');
        backBtn.addEventListener('click',backToProjects);

        // Add submit button
        let submitBtn = document.createElement('button');
        submitBtn.textContent = add_project_namespaceObject.RC;

        form.append(backBtn,submitBtn);

        // Add page content
        mainContent.append(form);

        // Cache Dom
        cacheDom();
    }

    return {
        load: render
    }

})(document||documentMock)
;// ./src/assets/json/projects.json
const projects_namespaceObject = /*#__PURE__*/JSON.parse('{"DD":"All Project","lA":"Add Project"}');
;// ./src/assets/js/projects.js








const Projects = (function(){
    // cacheDom
    let mainContent = document.querySelector('#content');

    let projectList;

    function addProjectPage() {
        PubSub.trigger('AddProject');
    }

    function deleteProject(event) {
        event.stopPropagation();
        let selectedProject = event.target.closest('.project-item').getAttribute('data-id');
        TodoProjectList.removeProject(projectList.findIndex(project => project.getId() == selectedProject));
        PubSub.trigger('UpdateProjects');
        render();
    }

    function setCurrentProject(eventTarget) {
        let selectedProject = eventTarget.closest('.project-item').getAttribute('data-id');
        RecentProject.set(projectList.find(project => project.getId() == selectedProject));
        PubSub.trigger('UpdateRecentProject');
    }

    function openProject(event) {
        event.stopPropagation();
        setCurrentProject(event.target);
        PubSub.trigger('OpenProject');
    }

    function editProject(event) {
        event.stopPropagation();
        setCurrentProject(event.target);
        PubSub.trigger('EditProject');
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('AllProjects');
        projectList = TodoProjectList.get();

        let projectsContainer = document.createElement('article');
        projectsContainer.classList.add('container','components-list');

        let projectsTitle = document.createElement('h2');
        projectsTitle.textContent = projects_namespaceObject.DD;

        let addProjectBtn = document.createElement('button');
        addProjectBtn.textContent = projects_namespaceObject.lA;
        addProjectBtn.addEventListener('click',addProjectPage);

        projectsContainer.append(projectsTitle,addProjectBtn);
        
        projectList.forEach(project => {
            //Create project article
            let projectSection = document.createElement('article');
            projectSection.classList.add('project-item');
            projectSection.setAttribute('data-id',project.getId());
            projectSection.addEventListener('click',openProject);

            //Create project Title
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
;// ./src/assets/js/recent-task.js
const RecentTask = (function() {

    let recentTask;

    function set(value) {
        recentTask = value;
    }

    function get() {
        return recentTask;
    }

    return {
        set,
        get
    }
})();
;// ./src/assets/json/project.json
const project_namespaceObject = /*#__PURE__*/JSON.parse('{"Gv":"Back To Projects","TZ":"Add Task","vx":[{"title":"High","value":"high"},{"title":"Medium","value":"medium"},{"title":"Low","value":"low"}],"LF":"Description","NC":"Due Date","WE":"Notes","HE":"Check List","B":"Priorities"}');
;// ./node_modules/date-fns/locale/en-US/_lib/formatDistance.js
const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};

;// ./node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

;// ./node_modules/date-fns/locale/en-US/_lib/formatLong.js


const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
};

;// ./node_modules/date-fns/locale/en-US/_lib/formatRelative.js
const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];

;// ./node_modules/date-fns/locale/_lib/buildLocalizeFn.js
/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}

;// ./node_modules/date-fns/locale/en-US/_lib/localize.js


const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = {
  ordinalNumber,

  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};

;// ./node_modules/date-fns/locale/_lib/buildMatchFn.js
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}

;// ./node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // [TODO] I challenge you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

;// ./node_modules/date-fns/locale/en-US/_lib/match.js



const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};

;// ./node_modules/date-fns/locale/en-US.js






/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

// Fallback for modularized imports:
/* harmony default export */ const en_US = ((/* unused pure expression or super */ null && (enUS)));

;// ./node_modules/date-fns/_lib/defaultOptions.js
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

;// ./node_modules/date-fns/constants.js
/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");

;// ./node_modules/date-fns/constructFrom.js


/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_constructFrom = ((/* unused pure expression or super */ null && (constructFrom)));

;// ./node_modules/date-fns/toDate.js


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return constructFrom(context || argument, argument);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_toDate = ((/* unused pure expression or super */ null && (toDate)));

;// ./node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js


/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

;// ./node_modules/date-fns/_lib/normalizeDates.js


function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}

;// ./node_modules/date-fns/startOfDay.js


/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfDay = ((/* unused pure expression or super */ null && (startOfDay)));

;// ./node_modules/date-fns/differenceInCalendarDays.js





/**
 * The {@link differenceInCalendarDays} function options.
 */

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options object
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);

  const laterTimestamp =
    +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp =
    +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_differenceInCalendarDays = ((/* unused pure expression or super */ null && (differenceInCalendarDays)));

;// ./node_modules/date-fns/startOfYear.js


/**
 * The {@link startOfYear} function options.
 */

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfYear = ((/* unused pure expression or super */ null && (startOfYear)));

;// ./node_modules/date-fns/getDayOfYear.js




/**
 * The {@link getDayOfYear} function options.
 */

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getDayOfYear = ((/* unused pure expression or super */ null && (getDayOfYear)));

;// ./node_modules/date-fns/startOfWeek.js



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = getDefaultOptions();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfWeek = ((/* unused pure expression or super */ null && (startOfWeek)));

;// ./node_modules/date-fns/startOfISOWeek.js


/**
 * The {@link startOfISOWeek} function options.
 */

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfISOWeek = ((/* unused pure expression or super */ null && (startOfISOWeek)));

;// ./node_modules/date-fns/getISOWeekYear.js




/**
 * The {@link getISOWeekYear} function options.
 */

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);

  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getISOWeekYear = ((/* unused pure expression or super */ null && (getISOWeekYear)));

;// ./node_modules/date-fns/startOfISOWeekYear.js




/**
 * The {@link startOfISOWeekYear} function options.
 */

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfISOWeekYear = ((/* unused pure expression or super */ null && (startOfISOWeekYear)));

;// ./node_modules/date-fns/getISOWeek.js





/**
 * The {@link getISOWeek} function options.
 */

/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getISOWeek = ((/* unused pure expression or super */ null && (getISOWeek)));

;// ./node_modules/date-fns/getWeekYear.js





/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();

  const defaultOptions = getDefaultOptions();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);

  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);

  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getWeekYear = ((/* unused pure expression or super */ null && (getWeekYear)));

;// ./node_modules/date-fns/startOfWeekYear.js





/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = getDefaultOptions();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_startOfWeekYear = ((/* unused pure expression or super */ null && (startOfWeekYear)));

;// ./node_modules/date-fns/getWeek.js





/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_getWeek = ((/* unused pure expression or super */ null && (getWeek)));

;// ./node_modules/date-fns/_lib/addLeadingZeros.js
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

;// ./node_modules/date-fns/_lib/format/lightFormatters.js


/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },

  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  },
};

;// ./node_modules/date-fns/_lib/format/formatters.js









const dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return lightFormatters.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = getWeekYear(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return addLeadingZeros(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = getISOWeekYear(date);

    // Padding
    return addLeadingZeros(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = getWeek(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return addLeadingZeros(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = getISOWeek(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return addLeadingZeros(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return lightFormatters.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = getDayOfYear(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return addLeadingZeros(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return lightFormatters.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return lightFormatters.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return addLeadingZeros(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return addLeadingZeros(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return lightFormatters.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return lightFormatters.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return lightFormatters.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(+date / 1000);
    return addLeadingZeros(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  },
};

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

;// ./node_modules/date-fns/_lib/format/longFormatters.js
const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
};

;// ./node_modules/date-fns/_lib/protectedTokens.js
const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

;// ./node_modules/date-fns/isDate.js
/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_isDate = ((/* unused pure expression or super */ null && (isDate)));

;// ./node_modules/date-fns/isValid.js



/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  return !((!isDate(date) && typeof date !== "number") || isNaN(+toDate(date)));
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_isValid = ((/* unused pure expression or super */ null && (isValid)));

;// ./node_modules/date-fns/format.js








// Rexports of internal for libraries to use.
// See: https://github.com/date-fns/date-fns/issues/3638#issuecomment-1877082874


// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;



/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = toDate(date, options?.in);

  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }

      if (formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          isProtectedWeekYearToken(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          isProtectedDayOfYearToken(token))
      ) {
        warnOrThrowProtectedError(token, formatStr, String(date));
      }

      const formatter = formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp, "'");
}

// Fallback for modularized imports:
/* harmony default export */ const date_fns_format = ((/* unused pure expression or super */ null && (format)));

;// ./src/assets/js/project.js










const Project = (function(){
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
        dueDateTitle.textContent = `${project_namespaceObject.NC}: `;
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
        descTitle.textContent = project_namespaceObject.LF;
        let taskDescription = document.createElement('p');
        taskDescription.textContent = task.getDescription();
        descContainer.append(descTitle,taskDescription)

        detailsContainer.append(descContainer);

        //Create notes list
        let taskNotes = task.getNotes();
        if(taskNotes.length > 0){
            let notesContainer = document.createElement('section');
            let notesTitle = document.createElement('h4');
            notesTitle.textContent = project_namespaceObject.WE;
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
            checkTitle.textContent = project_namespaceObject.HE;
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

        //Create project article
        let projectsContainer = document.createElement('article');
        projectsContainer.classList.add('container','components-list');

        //Create project title
        let projectsTitle = document.createElement('h2');
        projectsTitle.textContent = project.getTitle();

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

        //Create back button
        let backToProjectsBtn = document.createElement('button');
        backToProjectsBtn.textContent = project_namespaceObject.Gv;
        backToProjectsBtn.addEventListener('click',backToProjects);

        //Create add task button
        let addProjectBtn = document.createElement('button');
        addProjectBtn.textContent = project_namespaceObject.TZ;
        addProjectBtn.addEventListener('click',addTaskPage);

        //Create priority section
        let prioritySection = document.createElement('details');
        prioritySection.classList.add('priorities');
        let prioritySummary = document.createElement('summary');
        let priorityTitle = document.createElement('h3');
        priorityTitle.textContent = project_namespaceObject.B;
        prioritySummary.append(priorityTitle);
        prioritySection.append(prioritySummary);

        project_namespaceObject.vx.forEach(priority => {
            let priorityTitle = document.createElement('h4');
            priorityTitle.textContent = priority['title'];
            priorityTitle.classList.add(priority['value']);
            prioritySection.append(priorityTitle);
        })

        projectsContainer.append(projectsTitle,prioritySection,editItem,deleteItem,backToProjectsBtn,addProjectBtn);
        
        //Create tasks
        projectTasks.forEach(task => {
            projectsContainer.append(createTask(task));
        });

        mainContent.append(projectsContainer);
    }

    return {
        load: render
    }
})(document||documentMock);
;// ./src/assets/json/edit-task.json
const edit_task_namespaceObject = /*#__PURE__*/JSON.parse('{"DD":"Edit task","Gv":"Back To Project","RC":"Save Changes"}');
;// ./src/assets/js/edit-task.js









const EditTask = (function() {
    // cacheDom
    let mainContent = document.querySelector('#content');

    let currentTask,
        addTaskForm,
        titleField,
        descriptionField,
        dueDateField,
        priorityField;

    function cacheDom() {
        addTaskForm = document.querySelector('#editTask');
        titleField = document.querySelector('[name="todoItem.title"]');
        descriptionField = document.querySelector('[name="todoItem.description"]');
        dueDateField = document.querySelector('[name="todoItem.dueDate"]');
        priorityField = document.querySelector('[name="todoItem.priority"]');
    }

    function backToProject() {
        PubSub.trigger('OpenProject');
    }

    function setTaskDetails(event) {
        event.preventDefault();
        if(Form.validate(addTaskForm)) {
            currentTask.setTitle(titleField.value);
            currentTask.setDescription(descriptionField.value);
            currentTask.setDueDate(dueDateField.value);
            currentTask.setPriority(priorityField.value);
            PubSub.trigger('UpdateProjects');
            backToProject();
        }
    }

    function addFieldValues() {
        titleField.value = currentTask.getTitle();
        descriptionField.value = currentTask.getDescription();
        dueDateField.value = currentTask.getDueDate();
        priorityField.value = currentTask.getPriority();
    }

    function addTaskNote(additionField) {
        if(additionField.value) {
            currentTask.addNote(additionField.value);
            additionField.value = '';
        }
    }

    function removeTaskNote(event) {
        let itemId = event.target.closest('li').getAttribute('data-id');
        currentTask.removeNote(Number(itemId));
        renderNotes(event.target.closest('details'));
    }

    function createNote(note,index) {
        let listItem = document.createElement('li');
        listItem.setAttribute('data-id',index);

        let itemContent = document.createElement('span');
        itemContent.textContent = note;

        let deleteItem = document.createElement('span');
        deleteItem.classList.add('dlt-icon');
        deleteItem.textContent = '⌫';
        deleteItem.addEventListener('click',removeTaskNote);

        listItem.append(itemContent,deleteItem);
        return listItem;
    }

    function renderNotes(fieldContainer) {
        let containerList = fieldContainer.querySelector('ul');
        containerList.textContent = '';
        currentTask.getNotes().forEach((note,index) =>{
            containerList.append(createNote(note,index));
        })
    }

    function addTaskCheckItem(additionField) {
        if(additionField.value) {
            currentTask.addCheckListItem(additionField.value);
            additionField.value = '';
        }
    }

    function removeTaskCheckItem(event) {
        let itemId = event.target.closest('li').getAttribute('data-id');
        currentTask.removeCheckListItem(Number(itemId));
        renderCheckList(event.target.closest('details'));
    }

    function createCheckItem(checkListItem,index) {
        let listItem = document.createElement('li');
        listItem.setAttribute('data-id',index);

        let itemContent = document.createElement('span');
        itemContent.textContent = checkListItem.getTitle();

        let deleteItem = document.createElement('span');
        deleteItem.classList.add('dlt-icon');
        deleteItem.textContent = '⌫';
        deleteItem.addEventListener('click',removeTaskCheckItem);

        listItem.append(itemContent,deleteItem);
        return listItem;
    }

    function renderCheckList(fieldContainer) {
        let containerList = fieldContainer.querySelector('ul');
        containerList.textContent = '';
        currentTask.getCheckList().forEach((checkListItem,index) =>{
            containerList.append(createCheckItem(checkListItem,index));
        });
    }

    function additionEvent(event) {
        let additionContainer = event.target.closest('details');
        let additionField = additionContainer.querySelector('input');
        switch (additionField.getAttribute('name').split('.').pop()) {
            case 'notes':
                addTaskNote(additionField);
                renderNotes(additionContainer);
                break;
            case 'checkList':
                addTaskCheckItem(additionField);
                renderCheckList(additionContainer);
                break;
        }
    }

    function createAddField(field) {
        //Create collapse section parent
        let collapseParent = document.createElement('details');

        //Set name to make sure only one is open
        collapseParent.setAttribute('open',true);

        //Create collapse title
        let collapseTitle = document.createElement('summary');

        //Add field label as the title of collapse
        collapseTitle.append(Form.createLabel(field));

        //Create the list for added elements
        let fieldList = document.createElement('ul');
        fieldList.classList.add('field-list');
        switch(field['name'].split('.').pop()) {
            case 'notes':
                currentTask.getNotes().forEach((note,index) =>{
                    fieldList.append(createNote(note,index));
                });
                break;
            case 'checkList':
                currentTask.getCheckList().forEach((checkListItem,index) =>{
                    fieldList.append(createCheckItem(checkListItem,index));
                });
                break;
        }

        //Create input
        let additionInput = document.createElement('input');
        additionInput.setAttribute('name',field['name']);
        additionInput.setAttribute('type',field['inputType']);
        
        //Create button that adds elements
        let additionBtn = document.createElement('button');
        additionBtn.setAttribute('type','button');
        additionBtn.textContent = field['buttonTitle'];
        additionBtn.addEventListener('click',additionEvent);
        collapseParent.append(collapseTitle,fieldList,additionInput,additionBtn);
        return collapseParent;
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('EditTask');
        currentTask = RecentTask.get();

        //Create form element
        let form = document.createElement('form');
        form.id = 'editTask';
        form.classList.add('container','wmax-sm','add-form');
        form.addEventListener('submit',setTaskDetails); //,{ once: true }

        //Create form Title
        let formHeading = document.createElement('h2');
        formHeading.textContent = edit_task_namespaceObject.DD;
        form.append(formHeading);

        // Create fields
        add_task_namespaceObject.UQ.forEach(field => {
            switch (field['fieldType']) {
                case 'input':
                    form.append(Form.createLabel(field));
                    form.append(Form.createInput(field));
                    break;
                case 'textarea':
                    form.append(Form.createLabel(field));
                    form.append(Form.createTextArea(field));
                    break;
                case 'select':
                    form.append(Form.createLabel(field));
                    form.append(Form.createSelect(field));
                    break;
                case 'addition':
                    form.append(createAddField(field));
                    break;
            }
        });

        // Add back to project button
        let backBtn = document.createElement('button');
        backBtn.textContent = edit_task_namespaceObject.Gv;
        backBtn.setAttribute('type','button');
        backBtn.addEventListener('click',backToProject);

        // Add submit button
        let submitBtn = document.createElement('button');
        submitBtn.textContent = edit_task_namespaceObject.RC;

        form.append(backBtn,submitBtn);

        // Add page content
        mainContent.append(form);

        // Cache Dom
        cacheDom();

        //Add current values to fields
        addFieldValues();
    }

    return {
        load: render
    }
})(document||documentMock)
;// ./src/assets/json/edit-project.json
const edit_project_namespaceObject = /*#__PURE__*/JSON.parse('{"DD":"Edit project","Gv":"Back To Project","RC":"Save Changes"}');
;// ./src/assets/js/edit-project.js









const EditProject = (function(){
    // cacheDom
    let mainContent = document.querySelector('#content');

    let project,
        addProjectForm,
        titleField;

    function cacheDom() {
        addProjectForm = document.querySelector('#editProject');
        titleField = document.querySelector('[name="todoProject.title"]');
    }

    function backToProjects() {
        PubSub.trigger('AllProjects');
    }

    function setTaskDetails(event) {
        event.preventDefault();
        if(Form.validate(addProjectForm)) {
            project.setTitle(titleField.value);
            PubSub.trigger('UpdateProjects');
            PubSub.trigger('AllProjects');
        }
    }

    function addFieldValues() {
        titleField.value = project.getTitle();
    }

    function render() {
        mainContent.textContent = '';
        CurrentEvent.set('EditProject');
        project = RecentProject.get();

        //Create form element
        let form = document.createElement('form');
        form.id = 'editProject';
        form.classList.add('container','wmax-sm','add-form');
        form.addEventListener('submit',setTaskDetails);

        //Create form Title
        let formHeading = document.createElement('h2');
        formHeading.textContent = edit_project_namespaceObject.DD;
        form.append(formHeading);

        // Create fields
        add_project_namespaceObject.UQ.forEach(field => {
            switch (field['fieldType']) {
                case 'input':
                    form.append(Form.createLabel(field));
                    form.append(Form.createInput(field));
                    break;
            }
        });

        // Add back to project button
        let backBtn = document.createElement('button');
        backBtn.textContent = edit_project_namespaceObject.Gv;
        backBtn.setAttribute('type','button');
        backBtn.addEventListener('click',backToProjects);

        // Add submit button
        let submitBtn = document.createElement('button');
        submitBtn.textContent = edit_project_namespaceObject.RC;

        form.append(backBtn,submitBtn);

        // Add page content
        mainContent.append(form);

        // Cache Dom
        cacheDom();

        //Add field values
        addFieldValues();
    }

    return {
        load: render
    }

})(document||documentMock)
;// ./src/assets/js/index.js













const appInit = (function() {
    let navButtons,
        validationMsg = document.querySelector('.validation-msg'); 

    if (false) {}

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
/******/ })()
;
//# sourceMappingURL=main.js.map