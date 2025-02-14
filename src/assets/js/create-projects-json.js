import { TodoProjectList } from "./todo-project-list";

export const CreateProjectsJson = (function() {

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
        return TodoProjectList.getProjectList().map((project) => {
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

