const editField = function (e, field) {
  e.preventDefault();
  const editBtn = document.querySelector(`#edit_${field}`);
  const input = editBtn.previousElementSibling;
  if (input.disabled === true) {
    input.disabled = false;
    editBtn.textContent = "Cancel";
  } else {
    input.disabled = true;
    editBtn.textContent = "Edit";
  }
};
