export function contentEditable(sectionEvent) {
  let buttonEdit = document.createElement("button");
  buttonEdit.classList.add("button_edit");
  buttonEdit.innerText = "Edit event";
  sectionEvent.appendChild(buttonEdit);
  let buttonSave = document.createElement("button");
  buttonSave.classList.add("button_save");
  buttonSave.classList.add("hidden");
  buttonSave.innerText = "Save edit";
  sectionEvent.appendChild(buttonSave);

  let pAuthor = sectionEvent.querySelector(".card_name_author");
  let pEvent = sectionEvent.querySelector(".card_name_event");
  let divDescriptionEvent = sectionEvent.querySelector(".card_description");

  buttonEdit.addEventListener("click", () => {
    pAuthor.contentEditable = true;
    pEvent.contentEditable = true;
    divDescriptionEvent.contentEditable = true;
    buttonSave.classList.remove("hidden");
  });

  buttonSave.addEventListener("click", () => {
    pAuthor.contentEditable = false;
    pEvent.contentEditable = false;
    divDescriptionEvent.contentEditable = false;
    buttonSave.classList.add("hidden");

    let sectionParent = buttonSave.closest("section");
    let nameAuthorEdit = sectionParent.querySelector(".card_name_author");
    let nameEventEdit = sectionParent.querySelector(".card_name_event");
    let descriptionEventEdit = sectionParent.querySelector(".card_description");

    nameAuthorEdit = nameAuthorEdit.textContent;
    nameEventEdit = nameEventEdit.textContent;
    descriptionEventEdit = descriptionEventEdit.textContent;

    console.log(nameAuthorEdit);
    console.log(nameEventEdit);
    console.log(descriptionEventEdit);

    let cardId = sectionEvent.querySelector(".card_id_hidden");
    let id = cardId.textContent;
    console.log(id);
    let addUrl = `http://localhost:3000/api/events/${id}`;
    let addOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: nameAuthorEdit,
        name: nameEventEdit,
        description: descriptionEventEdit,
      }),
    };

    fetch(addUrl, addOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("Event updated:", data);
      })
      .catch((err) => {
        console.log(`Error updating event: ${err}`);
      });
  });
}
