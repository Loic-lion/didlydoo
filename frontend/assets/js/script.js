import { display } from "./display.js";
import { newDate } from "./new-date.js";
import { addEvent } from "./add-event.js";
// import { Delete } from "./delete-event.js";

const form = document.querySelector(".container");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.querySelector(".container_name");
  const eventInput = document.querySelector(".container_event");
  const descriptionInput = document.querySelector(".container_description");
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const dateInputNew = [];

  dateInputs.forEach((input) => {
    dateInputNew.push(input.value);
  });

  if (nameInput.value === "") {
    alert('Le champ "Nom" est vide');
    return;
  }

  if (eventInput.value === "") {
    alert('Le champ "Événement" est vide');
    return;
  }

  if (descriptionInput.value === "") {
    alert('Le champ "Description" est vide');
    return;
  }

  let allDatesEmpty = true;
  dateInputNew.forEach((date) => {
    if (date !== "") {
      allDatesEmpty = false;
    }
  });

  if (allDatesEmpty) {
    alert('Le champ "Date" est vide');
    return;
  }

  addEvent();

  nameInput.value = "";
  eventInput.value = "";
  dateInputs.forEach((input) => {
    input.value = "";
  });
  descriptionInput.value = "";

  const containerDate = document.querySelector(".container_date");
  const allNewDate = document.querySelectorAll(".new");

  allNewDate.forEach((newDate) => {
    containerDate.removeChild(newDate);
  });
});

display();
newDate();
// Delete();
