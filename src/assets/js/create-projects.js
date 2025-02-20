import { TodoProjectList } from "./todo-project-list.js";
import { TodoProject } from "./todo-project.js";
import { TodoItem } from "./todo-item.js";

export const CreateProjects = (function () {
  function setProject(project) {
    const newProject = TodoProject();
    newProject.setId(project.id);
    newProject.setTitle(project.title);

    project.taskList.forEach((task) => {
      const newTask = TodoItem();
      newTask.setId(task.id);
      newTask.setTitle(task.title);
      newTask.setDescription(task.description);
      newTask.setDueDate(task.dueDate);
      newTask.setPriority(task.priority);
      if (task.status) {
        newTask.changeStatus();
      }

      task.notes.forEach((note) => {
        newTask.addNote(note);
      });

      task.checkList.forEach((checkListItem, index) => {
        newTask.addCheckListItem(checkListItem.title);
        if (checkListItem.status) {
          newTask.getCheckListItem(index).changeStatus();
        }
      });

      newProject.addTask(newTask);
    });

    return newProject;
  }

  function setProjects(projects) {
    TodoProjectList.reset();
    projects.forEach((project) => {
      TodoProjectList.addProject(setProject(project));
    });
  }

  function run(projectsJSON) {
    setProjects(JSON.parse(projectsJSON));
  }

  return {
    run,
  };
})();
