// import { deletebutton } from "./delete-event.js";
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
        nameEvent.textContent = event.author + "'s " + event.name;
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
                    ? "Oui"
                    : "Non"
                  : ""
                : "N/A";
            attendeeRow.appendChild(responseCell);
          });
        });

        ////////ajout ligne nouveau participants/////////

        let attendeeRow = document.createElement("tr");
        tbody.appendChild(attendeeRow);

        let nameCell = document.createElement("td");
        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameCell.appendChild(nameInput);
        attendeeRow.appendChild(nameCell);

        event.dates.forEach((date) => {
          let responseCell = document.createElement("td");
          let select = document.createElement("select");
          let option1 = document.createElement("option");
          let option2 = document.createElement("option");

          option1.value = "oui";
          option1.text = "Oui";
          option2.value = "non";
          option2.text = "Non";

          select.appendChild(option1);
          select.appendChild(option2);
          responseCell.appendChild(select);
          attendeeRow.appendChild(responseCell);
        });

        ////////boutons delete/////////

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
      console.log(`error ${err}`);
    });
}
