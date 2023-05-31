export function bestDay(table) {
  const counts = [];
  const colonnes = table.querySelectorAll("tbody tr:first-child td");

  colonnes.forEach((colonne) => {
    const cells = table.querySelectorAll(
      `td:nth-child(${colonne.cellIndex + 1})`
    );
    let count = 0;

    cells.forEach((cell) => {
      if (cell.textContent === "Yes") {
        count++;
      }
    });

    counts.push(count);
  });

  const maxCount = Math.max(...counts);
  const maxCountIndexes = [];

  counts.forEach((count, index) => {
    if (count === maxCount) {
      maxCountIndexes.push(index);
    }
  });

  colonnes.forEach((colonne, index) => {
    if (maxCountIndexes.includes(index)) {
      const cells = table.querySelectorAll(`td:nth-child(${index + 1})`);
      cells.forEach((cell) => {
        cell.classList.add("best_day");
      });
    }
  });
}
