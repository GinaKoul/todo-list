export function CheckListItem() {
  let title;
  let status = false;

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
    getStatus,
  };
}
