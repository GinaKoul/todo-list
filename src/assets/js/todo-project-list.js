export const TodoProjectList = (function() {
    let projectList = [];

    function addProject(project) {
        projectList.push(project);
    }

    function removeProject(index) {
        projectList.splice(index,1)
    }

    function getProjectList() {
        return projectList;
    }

    return {
        addProject,
        removeProject,
        getProjectList
    }

})();