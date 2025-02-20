import "../css/form.css";
import { PubSub } from "./pubsub.js";
import { CurrentEvent } from "./current-event.js";
import { documentMock } from "./document-mock.js";
import { Form } from "./form.js";
import { RecentTask } from "./recent-task.js";
import addTaskPage from "../json/add-task.json";
import editTaskPage from "../json/edit-task.json";

export const EditTask = (function () {
  // Cache Dom
  const mainContent = document.querySelector("#content");

  let currentTask;
  let addTaskForm;
  let titleField;
  let descriptionField;
  let dueDateField;
  let priorityField;

  function cacheDom() {
    addTaskForm = document.querySelector("#editTask");
    titleField = document.querySelector('[name="todoItem.title"]');
    descriptionField = document.querySelector('[name="todoItem.description"]');
    dueDateField = document.querySelector('[name="todoItem.dueDate"]');
    priorityField = document.querySelector('[name="todoItem.priority"]');
  }

  function backToProject() {
    PubSub.trigger("OpenProject");
  }

  function setTaskDetails(event) {
    event.preventDefault();
    if (Form.validate(addTaskForm)) {
      currentTask.setTitle(titleField.value);
      currentTask.setDescription(descriptionField.value);
      currentTask.setDueDate(dueDateField.value);
      currentTask.setPriority(priorityField.value);
      PubSub.trigger("UpdateProjects");
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
    if (additionField.value) {
      currentTask.addNote(additionField.value);
      additionField.value = "";
    }
  }

  function removeTaskNote(event) {
    const itemId = event.target.closest("li").getAttribute("data-id");
    currentTask.removeNote(Number(itemId));
    renderNotes(event.target.closest("details"));
  }

  function createNote(note, index) {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-id", index);

    const itemContent = document.createElement("span");
    itemContent.textContent = note;

    const deleteItem = document.createElement("span");
    deleteItem.classList.add("dlt-icon");
    deleteItem.textContent = "⌫";
    deleteItem.addEventListener("click", removeTaskNote);

    listItem.append(itemContent, deleteItem);
    return listItem;
  }

  function renderNotes(fieldContainer) {
    const containerList = fieldContainer.querySelector("ul");
    containerList.textContent = "";
    currentTask.getNotes().forEach((note, index) => {
      containerList.append(createNote(note, index));
    });
  }

  function addTaskCheckItem(additionField) {
    if (additionField.value) {
      currentTask.addCheckListItem(additionField.value);
      additionField.value = "";
    }
  }

  function removeTaskCheckItem(event) {
    const itemId = event.target.closest("li").getAttribute("data-id");
    currentTask.removeCheckListItem(Number(itemId));
    renderCheckList(event.target.closest("details"));
  }

  function createCheckItem(checkListItem, index) {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-id", index);

    const itemContent = document.createElement("span");
    itemContent.textContent = checkListItem.getTitle();

    const deleteItem = document.createElement("span");
    deleteItem.classList.add("dlt-icon");
    deleteItem.textContent = "⌫";
    deleteItem.addEventListener("click", removeTaskCheckItem);

    listItem.append(itemContent, deleteItem);
    return listItem;
  }

  function renderCheckList(fieldContainer) {
    const containerList = fieldContainer.querySelector("ul");
    containerList.textContent = "";
    currentTask.getCheckList().forEach((checkListItem, index) => {
      containerList.append(createCheckItem(checkListItem, index));
    });
  }

  function additionEvent(event) {
    const additionContainer = event.target.closest("details");
    const additionField = additionContainer.querySelector("input");
    switch (additionField.getAttribute("name").split(".").pop()) {
      case "notes":
        addTaskNote(additionField);
        renderNotes(additionContainer);
        break;
      case "checkList":
        addTaskCheckItem(additionField);
        renderCheckList(additionContainer);
        break;
      default:
        break;
    }
  }

  function createAddField(field) {
    // Create collapse section parent
    const collapseParent = document.createElement("details");

    // Set name to make sure only one is open
    collapseParent.setAttribute("open", true);

    // Create collapse title
    const collapseTitle = document.createElement("summary");

    // Add field label as the title of collapse
    collapseTitle.append(Form.createLabel(field));

    // Create the list for added elements
    const fieldList = document.createElement("ul");
    fieldList.classList.add("field-list");
    switch (field["name"].split(".").pop()) {
      case "notes":
        currentTask.getNotes().forEach((note, index) => {
          fieldList.append(createNote(note, index));
        });
        break;
      case "checkList":
        currentTask.getCheckList().forEach((checkListItem, index) => {
          fieldList.append(createCheckItem(checkListItem, index));
        });
        break;
      default:
        break;
    }

    // Create input
    const additionInput = document.createElement("input");
    additionInput.setAttribute("name", field["name"]);
    additionInput.setAttribute("type", field["inputType"]);

    // Create button that adds elements
    const additionBtn = document.createElement("button");
    additionBtn.setAttribute("type", "button");
    additionBtn.textContent = field["buttonTitle"];
    additionBtn.addEventListener("click", additionEvent);
    collapseParent.append(collapseTitle, fieldList, additionInput, additionBtn);
    return collapseParent;
  }

  function render() {
    mainContent.textContent = "";
    CurrentEvent.set("EditTask");
    currentTask = RecentTask.get();

    // Create form element
    const form = document.createElement("form");
    form.id = "editTask";
    form.classList.add("container", "wmax-sm", "add-form");
    form.addEventListener("submit", setTaskDetails); //,{ once: true }

    // Create form Title
    const formHeading = document.createElement("h2");
    formHeading.textContent = editTaskPage["title"];
    form.append(formHeading);

    // Create fields
    addTaskPage["formFields"].forEach((field) => {
      switch (field["fieldType"]) {
        case "input":
          form.append(Form.createLabel(field));
          form.append(Form.createInput(field));
          break;
        case "textarea":
          form.append(Form.createLabel(field));
          form.append(Form.createTextArea(field));
          break;
        case "select":
          form.append(Form.createLabel(field));
          form.append(Form.createSelect(field));
          break;
        case "addition":
          form.append(createAddField(field));
          break;
        default:
          break;
      }
    });

    // Add back to project button
    const backBtn = document.createElement("button");
    backBtn.textContent = editTaskPage["backButton"];
    backBtn.setAttribute("type", "button");
    backBtn.addEventListener("click", backToProject);

    // Add submit button
    const submitBtn = document.createElement("button");
    submitBtn.textContent = editTaskPage["submitButton"];

    form.append(backBtn, submitBtn);

    // Add page content
    mainContent.append(form);

    // Cache Dom
    cacheDom();

    // Add current values to fields
    addFieldValues();
  }

  return {
    load: render,
  };
})(document || documentMock);
