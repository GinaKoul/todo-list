import "../css/form.css";
import { PubSub } from "./pubsub.js";
import { CurrentEvent } from "./current-event.js";
import { documentMock } from "./document-mock.js";
import { Form } from "./form.js";
import { TodoItem } from "./todo-item.js";
import { RecentProject } from "./recent-project.js";
import addTaskPage from "../json/add-task.json";

export const AddTask = (function () {
  // Cache Dom
  const mainContent = document.querySelector("#content");

  let newTask;
  let addTaskForm;
  let titleField;
  let descriptionField;
  let dueDateField;
  let priorityField;

  function cacheDom() {
    addTaskForm = document.querySelector("#addTask");
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
      newTask.setTitle(titleField.value);
      newTask.setDescription(descriptionField.value);
      newTask.setDueDate(dueDateField.value);
      newTask.setPriority(priorityField.value);
      const currentProject = RecentProject.get();
      currentProject.addTask(newTask);
      PubSub.trigger("UpdateProjects");
      backToProject();
    }
  }

  function addTaskNote(additionField) {
    if (additionField.value) {
      newTask.addNote(additionField.value);
      additionField.value = "";
    }
  }

  function removeTaskNote(event) {
    const itemId = event.target.closest("li").getAttribute("data-id");
    newTask.removeNote(Number(itemId));
    renderNotes(event.target.closest("details"));
  }

  function renderNotes(fieldContainer) {
    const containerList = fieldContainer.querySelector("ul");
    containerList.textContent = "";
    newTask.getNotes().forEach((note, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-id", index);

      const itemContent = document.createElement("span");
      itemContent.textContent = note;

      const deleteItem = document.createElement("span");
      deleteItem.classList.add("dlt-icon");
      deleteItem.textContent = "⌫";
      deleteItem.addEventListener("click", removeTaskNote);

      listItem.append(itemContent, deleteItem);
      containerList.append(listItem);
    });
  }

  function addTaskCheckItem(additionField) {
    if (additionField.value) {
      newTask.addCheckListItem(additionField.value);
      additionField.value = "";
    }
  }

  function removeTaskCheckItem(event) {
    const itemId = event.target.closest("li").getAttribute("data-id");
    newTask.removeCheckListItem(Number(itemId));
    renderCheckList(event.target.closest("details"));
  }

  function renderCheckList(fieldContainer) {
    const containerList = fieldContainer.querySelector("ul");
    containerList.textContent = "";
    newTask.getCheckList().forEach((checkListItem, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-id", index);

      const itemContent = document.createElement("span");
      itemContent.textContent = checkListItem.getTitle();

      const deleteItem = document.createElement("span");
      deleteItem.classList.add("dlt-icon");
      deleteItem.textContent = "⌫";
      deleteItem.addEventListener("click", removeTaskCheckItem);

      listItem.append(itemContent, deleteItem);
      containerList.append(listItem);
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
    collapseParent.setAttribute("name", "todo-item");

    // Create collapse title
    const collapseTitle = document.createElement("summary");

    // Add field label as the title of collapse
    collapseTitle.append(Form.createLabel(field));

    // Create the list for added elements
    const fieldList = document.createElement("ul");
    fieldList.classList.add("field-list");

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
    CurrentEvent.set("AddTask");
    newTask = TodoItem();

    // Create form element
    const form = document.createElement("form");
    form.id = "addTask";
    form.classList.add("container", "wmax-sm", "add-form");
    form.addEventListener("submit", setTaskDetails);

    // Create form Title
    const formHeading = document.createElement("h2");
    formHeading.textContent = addTaskPage["title"];
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
    backBtn.textContent = addTaskPage["backButton"];
    backBtn.setAttribute("type", "button");
    backBtn.addEventListener("click", backToProject);

    // Add submit button
    const submitBtn = document.createElement("button");
    submitBtn.textContent = addTaskPage["submitButton"];

    form.append(backBtn, submitBtn);

    // Add page content
    mainContent.append(form);

    // Cache Dom
    cacheDom();
  }

  return {
    load: render,
  };
})(document || documentMock);
