const loadLessions = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLessions(data.data)); // <-- note the .data here
};
const manageSpiner = (status )=>{
      if(status==true){
        document.getElementById("spiner").classList.remove("hidden");
        document.getElementById("word-container").classList.add('hidden');
      }else{
         document.getElementById("spiner").classList.add("hidden");
         document.getElementById("word-container").classList.remove("hidden");
      }
}

const displayLessions = (lessons) => {
  const level = document.getElementById("level-container");
  level.innerHTML = "";

  for (const lesson of lessons) {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})"  class="leson-btn btn btn-soft btn-primary">
        <i class="fa-brands fa-leanpub"></i>
        Lesson - ${lesson.level_no}
      </button>
    `;

    level.appendChild(btnDiv);
  }
};

// Level Loader

const loadLevelWord = (id) => {
  manageSpiner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      const lessonBtn = document.querySelectorAll(".leson-btn");
      lessonBtn.forEach((items) => items.classList.remove("active"));
      clickBtn.classList.add("active");
      console.log(clickBtn);
      displayLevelWOrd(data.data);
    });
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
    word.innerHTML = newElement;
     manageSpiner(false)
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
      <button onClick="loadWordDetails(${element.id})" class="hover:text-blue-500 transition-colors">
        <i class="fa-solid fa-circle-info text-xl"></i>
      </button>
      <button onClick="pronounceWord(${element.id})" class="hover:text-blue-500 transition-colors">
        <i class="fa-solid fa-volume-low text-xl"></i>
      </button>
    </div>

  </div>


     `;
    word.innerHTML += newWord;
    manageSpiner(false)
  });
  // console.log(word);
};
const pronounceWord =(id)=>{
    // console.log(id)
      const url = `https://openapi.programming-hero.com/api/word/${id}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const word = (data.data.word);
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.lang = "en-EN"; // English
          window.speechSynthesis.speak(utterance);
        });
}

const loadWordDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      
      disPlayWordDetails(data.data);
    });
};
const disPlayWordDetails = (details) => {
  const detail = document.getElementById("details_container_xyz");
  detail.innerHTML = "";

  const newElement1 = `
    <div class="flex gap-3 flex-col">
      <h2 class="text-2xl font-bold mb-2">${details.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation})</h2>
      <h3 class="font-black text-blue-600">${details.meaning}</h3>
      <h3 class="font-semibold mb-2">${details.pronunciation}</h3>
      <h2 class="font-black">Example</h2>
      <p class="text-gray-600 italic">"The kids were eager to open their gifts."</p>
      <h2 class="bangla font-bold">সমার্থক শব্দ গুলো:</h2>
      <div id="synonym-wrapper" class="flex flex-wrap gap-2 mt-2"></div>
    </div>
  `;

  detail.insertAdjacentHTML("beforeend", newElement1);

  const synonymWrapper = document.getElementById("synonym-wrapper");
  if (details.synonyms && details.synonyms.length > 0) {
    details.synonyms.forEach((items) => {
      const newElement2 = `<button class="btn btn-sm btn-outline btn-primary">${items}</button>`;
      synonymWrapper.insertAdjacentHTML("beforeend", newElement2);
    });
  }
  const btn = ` <button class="btn btn-active btn-primary rounded-full mt-2">Complete Learning</button>`;
  detail.insertAdjacentHTML('beforeend',btn);
  document.getElementById("my_modal_5").showModal();
};
loadLessions();

document.getElementById("btn-search").addEventListener('click',()=>{
     const input = document.getElementById("inputsearch");
     const searchValue = input.value.toLowerCase();
     //console.log(searchValue)
     fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res=>res.json())
        .then(data=>{
            const allowWord =data.data;
            //  console.log(allowWord)
             const filterWord = allowWord.filter((word) =>
               word.word.toLowerCase().includes(searchValue),
             );
             displayLevelWOrd(filterWord)
        })
});
