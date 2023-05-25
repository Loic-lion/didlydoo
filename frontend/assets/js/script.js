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
    //   sectionEvent.classList.add("");     A COMPLETER 
      const main = document.querySelector("main");

      /////////////////// Afficher le nom de l'event///////

      let nameApi = element.name;
      let nameEvent = document.createElement("div");
      nameEvent.textContent = nameApi;
      sectionEvent.appendChild(nameEvent);

      ////////////////////////création du tableau////

      let table = document.createElement("table");

      /////////////attaher la section au main/////

      sectionEvent.appendChild(descriptionEvent);
      main.appendChild(sectionEvent);

    });
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });
