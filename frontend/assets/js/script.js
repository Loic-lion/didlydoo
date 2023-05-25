let options = { method: "GET" };

let url = `http://localhost:3000/api/events/`;

fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {
      ///////Afficher la description//////

      let descriptionApi = element.description;
      let descriptionEvent = document.createElement("div");
      descriptionEvent.textContent = descriptionApi;
      let sectionEvent = document.createElement("section");
      //   sectionEvent.classList.add("");     A COMPLETER SI BESOIN D UNE CLASS POUR LES SECTIONS
      const main = document.querySelector("main");

      /////////////////// Afficher le nom de l'event + auteur///////

      let nameApi = element.name;
      let authorApi = element.author;
      let nameEvent = document.createElement("div");
      nameEvent.textContent = authorApi + "'s " + nameApi;
      sectionEvent.appendChild(nameEvent);

      /////////////attaher la section au main/////

      sectionEvent.appendChild(descriptionEvent);
      main.appendChild(sectionEvent);

      ////////////////////////création du tableau////

      let table = document.createElement("table");
      let tr = document.createElement("tr");
      table.appendChild(tr);
      sectionEvent.appendChild(table);
      let trvoid = document.createElement("th");
      tr.appendChild(trvoid);

      ////////STOCKAGE DES INFOS DANS LE TABLEAU//////
      let infosTable = element.dates;

      infosTable.forEach((dates) => {
        console.log(dates);
        let datesEvent = document.createElement("th");
        datesEvent.textContent = dates.date;
        tr.appendChild(datesEvent);

        // let choicesPeople = dates.attendees;

        // choicesPeople.forEach((people) => {

        //   let namePeople = people.name;

        //   console.log(namePeople);

        // });
      });
    });
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });
