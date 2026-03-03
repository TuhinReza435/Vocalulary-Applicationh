const loadLessions = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessions(data.data)); // <-- note the .data here
};

const displayLessions = (lessons) => {
  const level = document.getElementById("level-container");
  level.innerHTML = "";

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
const displayLevelWOrd = (element) => {
  const word = document.getElementById("word-container");
  word.innerHTML = "";
  if (element.length == 0) {
    const newElement = `
           <div class="col-span-3 flex justify-center items-center flex-col gap-5">
        <div class="text-center">
         <img src="./english-janala-resources/assets/alert-error.png" alt="">
        </div>

        <p class="bangla font-semibold text-2xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-3xl bangla">নেক্সট Lesson এ যান</h2>
      </div>
       `;
      word.innerHTML=newElement;

     return;
  }

  element.forEach((element) => {
    const newWord = `
      <div class="flex flex-col gap-4 justify-center items-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
    
    <h2 class="text-2xl font-bold text-blue-600 tracking-wide uppercase ">${element.word}</h2>
    
    <div class="text-center">
      <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">${element.meaning}</p>
      <h1 class="text-xl font-semibold text-gray-800">${element.pronunciation}</h1>
    </div>

    <div class="flex items-center justify-between w-full mt-4 px-4 border-t pt-4 text-gray-500">
      <button class="hover:text-blue-500 transition-colors">
        <i class="fa-solid fa-circle-info text-xl"></i>
      </button>
      <button class="hover:text-blue-500 transition-colors">
        <i class="fa-solid fa-volume-low text-xl"></i>
      </button>
    </div>

  </div>


     `;
   word.innerHTML+=newWord;
    
  });
  // console.log(word);
};
loadLessions();
