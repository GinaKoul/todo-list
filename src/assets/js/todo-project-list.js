export const TodoProjectList = (function () {
  let projectList = [];

  function addProject(project) {
    projectList.push(project);
  }

  function removeProject(index) {
    projectList.splice(index, 1);
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
    reset,
  };
})();
