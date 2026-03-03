const loadLessions = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessions(data.data)); // <-- note the .data here
};

const displayLessions = (lessons) => {
  const level = document.getElementById("level-container");
  level.innerHTML = "";

  if (!lessons || lessons.length === 0) {
    level.innerHTML = "<p>No lessons found!</p>";
    return;
  }

  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
      <button  onClick="loadLevelWord(${lesson.level_no})"  class="btn btn-soft btn-primary">
        <i class="fa-brands fa-leanpub"></i>
        Lesson - ${lesson.level_no}
      </button>
    `;

    level.appendChild(btnDiv);
  }
};

// Level Loader

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWOrd(data.data));
};
const displayLevelWOrd=(element)=>{
    const word = document.getElementById("word-contarinar");
     word.innerHTML='';
     const newWord = `
     
     `;
}
loadLessions();
