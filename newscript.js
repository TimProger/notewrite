let tasklist = [];
let listEL = document.querySelector(".taskList");
let h2 = document.querySelector("h2");
let p = document.querySelector("p");
let container = document.querySelector(".taskBody");
const saveLocal = () => {
  localStorage.setItem("tasklist", JSON.stringify(tasklist));
};
if (localStorage.getItem("tasklist")) {
  var arrayFromStroage = JSON.parse(localStorage.getItem("tasklist"));
  tasklist = arrayFromStroage;
}
const createTask = (evt) => {
  evt.preventDefault();
  let title = document.querySelector(".title");
  let text = document.querySelector("#story");
  if (title.value != "" && text.value != "") {
    let task = {
      title: title.value,
      text: text.value,
    };
    tasklist.push(task);
    saveLocal();
    let taskEL = document.createElement("div");
    taskEL.classList.add("task");
    taskEL.innerText = task.title;
    listEL.appendChild(taskEL);
    title.value = "";
    text.value = "";
    const select = () => {
      let tasks = document.querySelectorAll(".task");
      tasks.forEach((el) => el.classList.remove("active"));
      taskEL.classList.add("active");
      h2.innerText = `${task.title}`;
      p.innerText = `${task.text}`;
      container.classList.remove("unselectable");
    };
    taskEL.addEventListener("click", select);
    let del = document.createElement("div");
    del.classList.add("del");
    del.addEventListener("click", function (evt) {
      listEL.removeChild(taskEL);
      h2.innerText = ``;
      p.innerText = `There's nothing...`;
      container.classList.add("unselectable");
      let indexOfTask = tasklist.indexOf(taskEL);
      tasklist.splice(indexOfTask, 1);
      saveLocal();
      evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
    });
    taskEL.appendChild(del);
  } else {
    console.log("Error");
  }
};
let submit = document.querySelector(".submit");
submit.addEventListener("click", createTask);

const myInput = document.querySelector('input[type="text"]');
myInput.oninput = function () {
  if (this.value.length > 14) {
    this.value = this.value.slice(0, 14);
  }
};
if (localStorage.getItem("tasklist")) {
  var arrayFromStroage = JSON.parse(localStorage.getItem("tasklist"));
  for (let i = 0; i < arrayFromStroage.length; i++) {
    let parsed = arrayFromStroage[i];
    let taskEL = document.createElement("div");
    taskEL.classList.add("task");
    taskEL.innerText = parsed.title;
    listEL.appendChild(taskEL);
    const select = () => {
      let tasks = document.querySelectorAll(".task");
      tasks.forEach((el) => el.classList.remove("active"));
      taskEL.classList.add("active");
      h2.innerText = `${parsed.title}`;
      p.innerText = `${parsed.text}`;
      container.classList.remove("unselectable");
    };
    taskEL.addEventListener("click", select);
    let del = document.createElement("div");
    del.classList.add("del");
    del.addEventListener("click", function (evt) {
      listEL.removeChild(taskEL);
      h2.innerText = ``;
      p.innerText = `There's nothing...`;
      container.classList.add("unselectable");
      let indexOfTask = tasklist.indexOf(taskEL);
      tasklist.splice(indexOfTask, 1);
      console.log(listEL.childNodes.length);
      saveLocal();
      evt.stopPropagation ? evt.stopPropagation() : (evt.cancelBubble = true);
    });
    taskEL.appendChild(del);
    saveLocal();
  }
}
