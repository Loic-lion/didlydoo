export function calculateBestDate() {
  const dateInputs = document.querySelectorAll('input[type="date"]');
  let bestDate = null;
  let maxPositiveResponses = 0;

  dateInputs.forEach((input) => {
    const date = input.value;
    const responseInputs = document.querySelectorAll(
      `td[data-date="${date}"] select`
    );
    let positiveResponses = 0;

    responseInputs.forEach((responseInput) => {
      const response = responseInput.value;
      if (response === "oui") {
        positiveResponses++;
      }
    });

    if (positiveResponses > maxPositiveResponses) {
      maxPositiveResponses = positiveResponses;
      bestDate = date;
    }
  });

  const tableContainer = document.querySelector(".container_table");

  const attendeeCountDiv = document.createElement("div");
  attendeeCountDiv.classList.add("count_container");
  attendeeCountDiv.textContent = `Best date : ${bestDate}`;

  tableContainer.appendChild(attendeeCountDiv);
}
