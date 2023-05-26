export function addEvent() {
  let nameInput = document.querySelector(".container_name");
  let eventInput = document.querySelector(".container_event");
  let descriptionInput = document.querySelector(".container_description");
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const selectedDates = [];

  let nameValue = nameInput.value;
  let eventValue = eventInput.value;
  let descriptionValue = descriptionInput.value;
  dateInputs.forEach((input) => {
    selectedDates.push(input.value);
  });
  console.log("Nom:", nameValue);
  console.log("Événement:", eventValue);
  console.log("Description:", descriptionValue);
  console.log("Dates sélectionnées:", selectedDates);

  let eventData = {
    name: eventValue,
    dates: selectedDates,
    author: nameValue,
    description: descriptionValue,
  };

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  };

  let url = "http://localhost:3000/api/events/";

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log("Événement ajouté avec succès:", data);
    })
    .catch((err) => {
      console.log(`Erreur lors de l'ajout de l'événement: ${err}`);
    });
}
