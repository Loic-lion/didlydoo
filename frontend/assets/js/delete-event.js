export function deletebutton() {
  let deleteButtons = document.querySelectorAll(".card_delete");
  console.log(deleteButtons);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      event.stopPropagation();
      let section = button.closest("section");

      let cardIdDiv = section.querySelector(".card_id_hidden");

      let cardId = cardIdDiv.textContent;

      console.log("Contenu de card_id_hidden:", cardId);

      let url = `http://localhost:3000/api/events/` + cardId + "/";
      let options = {
        method: "DELETE",
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          console.log("Event deleted:", data);
        })
        .catch((err) => {
          console.log(`Error deleting event: ${err}`);
        });
    });
  });
}
