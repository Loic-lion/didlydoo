import { display } from "./display.js";
import { newDate } from "./new-date.js";

const form = document.querySelector(".container");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.querySelector(".container_name");
  const eventInput = document.querySelector(".container_event");
  const descriptionInput = document.querySelector(".container_description");
  const dateInput = document.querySelector(".container_date_calendar");

  nameInput.value = "";
  eventInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";

  const containerDate = document.querySelector(".container_date");
  const allNewDate = document.querySelectorAll(".new");

  allNewDate.forEach((newDate) => {
    containerDate.removeChild(newDate);
  });
});

display();
newDate();
