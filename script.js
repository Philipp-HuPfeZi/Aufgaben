document.getElementById("defaultOpen").click();

clicks = parseInt(localStorage.getItem("Count")) || 0

for (let i = 1; i < clicks+1; i++) {
  myTask.innerHTML += localStorage.getItem("Task_"+i);
}
myTask.innerHTML = localStorage.clear()
localStorage.Count = localStorage.Count - 1

function addTask(){
    let currentDay = new Date().getDate();
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let ToDo = myToDo.value;

    clicks += 1;
    localStorage.setItem("Count", clicks)
    
    if (ToDo == "")
      {alert("Eine Aufgabe muss eingetragen werden!")
      }
    else{
      Task = `<div id=${clicks} class="list-item"><input type = "checkbox" onclick="finished()"></input>
            ${clicks}.
             | ${currentDay}.${currentMonth+1}.${currentYear} | 
            <label for="Person"></label>
            <select type = "selectbox" name="Person" id="myPeople${clicks}">
            <option value="---">---</option>
            <option value="Bibiana">Bibiana</option>
            <option value="Barbara">Barbara</option>
            <option value="Wilhelm">Wilhelm</option>
            <option value="Philipp">Philipp</option>
            </select> | 
            ${ToDo} | 
            <span id=${clicks} onclick="deleteTask(id)" class="button button2" >&times;</span></div>`;
    }
    localStorage.setItem("Task_"+clicks, Task);
    
    //file = new File("C:/Users/phili/OneDrive/Documents/HuPfeZi/Arbeitszeiten/www/global_storage.txt");
    for (let i = clicks; i < clicks+1; i++) {
      myTask.innerHTML += localStorage.getItem("Task_"+i);
    }
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', saveCheckboxStates);
});
document.addEventListener('DOMContentLoaded', loadCheckboxStates);

const selectboxes = document.querySelectorAll('select[type="selectbox"]');
selectboxes.forEach((selectbox) => {
  selectbox.addEventListener('change', saveSelectboxStates);
});
document.addEventListener('DOMContentLoaded', loadSelectboxStates);











function deleteTask(id){
  bool = confirm("Soll diese Aufgabe wirklich gelöscht werden?")
  if(bool == true){
    document.getElementById(id).remove();
    localStorage.removeItem("Task_"+id);
    localStorage.removeItem(checkboxes.id);
    localStorage.removeItem(selectboxes.id);
    localStorage.Count = localStorage.Count - 1
  }
}

function openTask(evt, task) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(task).style.display = "block";
  evt.currentTarget.className += " active";
}

function saveCheckboxStates() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var count = 0;
  checkboxes.forEach((checkbox) => {
    count += 1;
    localStorage.setItem('checkbox'+count, checkbox.checked);
  });
}

function loadCheckboxStates() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var count = 0;
  checkboxes.forEach((checkbox) => {
    count += 1;
    const savedState = localStorage.getItem('checkbox'+count);
    if(savedState !== null){
      checkbox.checked = savedState === 'true';
    }
  });
}

function saveSelectboxStates() {
  const selectboxes = document.querySelectorAll('select[type="selectbox"]');
  selectboxes.forEach((selectbox) => {
    localStorage.setItem(selectbox.id, selectbox.value);
  });
}

function loadSelectboxStates() {
  const selectboxes = document.querySelectorAll('select[type="selectbox"]');
  selectboxes.forEach((selectbox) => {
    const savedSelectboxStates = localStorage.getItem(selectbox.id);
    selectbox.value = savedSelectboxStates;
  });
}

function finished(){
  alert("Aufgabe wird gespeichert!")
}
