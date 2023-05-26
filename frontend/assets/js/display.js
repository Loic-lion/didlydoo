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

       
        let table = document.createElement("table");
        sectionEvent.appendChild(table);

        
        let thead = document.createElement("thead");
        table.appendChild(thead);

        
        let datesRow = document.createElement("tr");
        thead.appendChild(datesRow);

        
        let emptyHeaderCell = document.createElement("th");
        datesRow.appendChild(emptyHeaderCell);

       
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
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });

}
