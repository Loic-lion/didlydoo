export function newDate() {
  const addButton = document.querySelector(".button_add_date");

  function handleAddDateClick() {
    const container = document.querySelector(".container_date");
    const newDateInput = document.createElement("input");
    newDateInput.type = "date";
    container.appendChild(newDateInput);
  }

  addButton.addEventListener("click", handleAddDateClick);
}
