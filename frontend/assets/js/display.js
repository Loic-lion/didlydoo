import { contentEditable } from "./edit-content.js";

export function display() {
  let options = { method: "GET" };

  let url = `http://localhost:3000/api/events/`;

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((event) => {
        let sectionEvent = document.createElement("section");
        const main = document.querySelector("main");
        main.appendChild(sectionEvent);

        let nameEvent = document.createElement("div");
        // nameEvent.textContent = event.author + "'s " + event.name;

        nameEvent.innerHTML = `
  <p class="card_name_author">${event.author}</p>'s
  <p class="card_name_event">${event.name}</p>
`;

        sectionEvent.appendChild(nameEvent);
        nameEvent.classList.add("card_name");

        let idEvent = document.createElement("div");
        idEvent.textContent = event.id;
        sectionEvent.appendChild(idEvent);
        idEvent.classList.add("card_id_hidden");

        let descriptionEvent = document.createElement("div");
        descriptionEvent.textContent = event.description;
        sectionEvent.appendChild(descriptionEvent);
        descriptionEvent.classList.add("card_description");
        

        contentEditable(sectionEvent);

        let table = document.createElement("table");
        sectionEvent.appendChild(table);

        let thead = document.createElement("thead");
        table.appendChild(thead);

        let datesRow = document.createElement("tr");
        thead.appendChild(datesRow);

        let emptyHeaderCell = document.createElement("th");
        datesRow.appendChild(emptyHeaderCell);
        emptyHeaderCell.style.backgroundColor = "white";

        event.dates.forEach((date) => {
          let dateHeaderCell = document.createElement("th");
          dateHeaderCell.textContent = date.date;
          datesRow.appendChild(dateHeaderCell);
        });

        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        let groupedAttendees = {};
        event.dates.forEach((date) => {
          date.attendees.forEach((attendee) => {
            if (!groupedAttendees[attendee.name]) {
              groupedAttendees[attendee.name] = {
                name: attendee.name,
                responses: {},
              };
            }
            groupedAttendees[attendee.name].responses[date.date] =
              attendee.available;
          });
        });

        Object.values(groupedAttendees).forEach((attendee) => {
          let attendeeRow = document.createElement("tr");
          tbody.appendChild(attendeeRow);

          let nameCell = document.createElement("td");
          nameCell.textContent = attendee.name;
          attendeeRow.appendChild(nameCell);

          event.dates.forEach((date) => {
            let responseCell = document.createElement("td");
            let response = attendee.responses[date.date];
            responseCell.textContent =
              response !== undefined
                ? response !== null
                  ? response
                    ? "Yes"
                    : "No"
                  : ""
                : "N/A";
            attendeeRow.appendChild(responseCell);
          });
        });

        let attendeeRow = document.createElement("tr");
        tbody.appendChild(attendeeRow);

        let nameCell = document.createElement("td");
        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.classList.add("input_name_attend");
        nameCell.appendChild(nameInput);
        attendeeRow.appendChild(nameCell);

        event.dates.forEach((date) => {
          let responseCell = document.createElement("td");
          let select = document.createElement("select");
          select.classList.add("input_select_date");
          let option1 = document.createElement("option");
          let option2 = document.createElement("option");

          option1.value = "true";
          option1.text = "Yes";
          option2.value = "false";
          option2.text = "No";

          select.appendChild(option1);
          select.appendChild(option2);
          responseCell.appendChild(select);
          attendeeRow.appendChild(responseCell);
        });

        let buttonAddAttend = document.createElement("button");
        buttonAddAttend.textContent = "Add attend";
        sectionEvent.appendChild(buttonAddAttend);
        buttonAddAttend.classList.add("card_add");

        buttonAddAttend.addEventListener("click", () => {
          let sectionParent = buttonAddAttend.closest("section");
          let nameAttend = sectionParent.querySelector(".input_name_attend");
          let nameValueAttend = nameAttend.value;
          console.log(nameValueAttend);

          let dateCells = sectionParent.querySelectorAll(
            "table thead tr:first-child th:not(:first-child)"
          );
          let selectElements =
            sectionParent.querySelectorAll(".input_select_date");
          let selectedValues = Array.from(selectElements).map(
            (select, index) => {
              let dateCell = dateCells[index];
              let date = dateCell.textContent;
              let available = select.value === "true";
              return { date, available };
            }
          );
          console.log(selectedValues);

          let cardId = event.id;
          let addUrl = `http://localhost:3000/api/events/${cardId}/attend`;
          let addOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nameValueAttend,
              dates: selectedValues,
            }),
          };

          fetch(addUrl, addOptions)
            .then((res) => res.json())
            .then((data) => {
              console.log("Dates added:", data);
            })
            .catch((err) => {
              console.log(`Error adding dates: ${err}`);
            });
        });

        let buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Delete event";
        sectionEvent.appendChild(buttonDelete);
        buttonDelete.classList.add("card_delete");

        buttonDelete.addEventListener("click", () => {
          let cardId = event.id;
          let deleteUrl = `http://localhost:3000/api/events/${cardId}`;
          let deleteOptions = {
            method: "DELETE",
          };

          fetch(deleteUrl, deleteOptions)
            .then((res) => res.json())
            .then((data) => {
              console.log("Event deleted:", data);
            })
            .catch((err) => {
              console.log(`Error deleting event: ${err}`);
            });
        });
      });
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}
