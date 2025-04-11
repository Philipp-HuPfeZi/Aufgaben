

document.getElementById("defaultOpen").click();

clicks = parseInt(localStorage.getItem("Count")) || 0

for (let i = 1; i < clicks+100; i++) {
  if (localStorage.getItem(i) !== null){
    myTask.innerHTML += localStorage.getItem(i);
  }
}

//myTask.innerHTML = localStorage.clear()
//localStorage.Count = localStorage.Count - 1

function addTask(){
    let Day = new Date().getDate();
    let Month = new Date().getMonth();
    let Year = new Date().getFullYear();
    let ToDo = myToDo.value;

    clicks += 1;
    localStorage.setItem("Count", clicks)
    
    if (ToDo == "")
      {alert("Eine Aufgabe muss eingetragen werden!")
      }
    else{
      Task = `<div id=${clicks} class="list-item"><input type = "checkbox" onclick="finished(id) id="checkbox${clicks}"></input>
            ${clicks}.
             | ${Day}.${Month+1}.${Year} | 
            <label for="Person"></label>
            <select type = "selectbox" name="Person" id="selectbox${clicks}">
            <option value="---">---</option>
            <option value="Bibiana">Bibiana</option>
            <option value="Barbara">Barbara</option>
            <option value="Wilhelm">Wilhelm</option>
            <option value="Philipp">Philipp</option>
            </select> | 
            ${ToDo} | 
            <span id=${clicks} onclick="deleteTask(id)" class="button button2" >&times;</span></div>`;
          }
    localStorage.setItem(clicks, Task);
    select = document.getElementById("selectbox"+clicks);
    check = document.getElementById("checkbox"+clicks);
    localStorage.setItem("selectbox"+clicks, select);
    localStorage.setItem("checkbox"+clicks, check);

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

    for (let i = clicks; i < clicks+1; i++) {
      myTask.innerHTML += localStorage.getItem(String(i));
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
    localStorage.removeItem(String(id));
    localStorage.removeItem(checkboxes.id);
    localStorage.removeItem(selectboxes.id);
    localStorage.removeItem("checkbox"+String(id));
    localStorage.removeItem("selectbox"+String(id));
    localStorage.Count -= 1;
  }
}

function openTask(evt, task) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks_task");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(task).style.display = "block";
  evt.currentTarget.className += " active";
}

function saveCheckboxStates() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    localStorage.setItem('checkbox'+clicks, checkbox.checked);
  });
}

function loadCheckboxStates() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const savedState = localStorage.getItem('checkbox'+clicks);
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

function finished(id){
  alert("Aufgabe wird gespeichert!")
}







currentDate = new Date();

function openCalender(evt, task) {

  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks_calender");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(task).style.display = "block";
  evt.currentTarget.className += " active";

  function updateCalender() {
    monthYearElement = document.getElementById("monthYear");
    datesElement = document.getElementById("dates");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();

    firstDay = new Date(currentYear, currentMonth, 1);
    lastDay = new Date(currentYear, currentMonth + 1, 0);
    totalDays = lastDay.getDate();
    firstDayIndex = firstDay.getDay() - 1;
    lastDayIndex = lastDay.getDay();
    
    monthYearString = currentDate.toLocaleString
    ('default', {month: 'short', year: 'numeric'});
    monthYearElement.textContent = monthYearString;
    
    datesHTML = '';
  
    for(let i = firstDayIndex; i > 0; i--) {
      prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
      datesHTML += `<div class="date_empty inactive">${prevDate.getDate()}</div>`;
    }
  
    for(let i = 1; i <= totalDays; i++) {
      date = new Date(currentYear, currentMonth, i);
      activeClass = date.toDateString() === new Date().toDateString() ? 
      'active' : '';
      month = date.getMonth() + 1;
      year = date.getFullYear();
      date_var = String(i)+String(month)+String(year)+"_notice";
      if(localStorage.getItem(date_var) == null){
        datesHTML += `<button id = ${i} class = "date_empty ${activeClass}" onclick="openDay(id)">${i}</button>`;
      }
      else{
        datesHTML += `<button id = ${i} class = "date_loaded ${activeClass}" onclick="openDay(id)">${i}</button>`;
      }
    }

    for (let i = 1; i <= 7 - lastDayIndex; i++) {
      nextDate = new Date(currentYear, currentMonth + 1, i);
      datesHTML += `<div class = "date_empty inactive">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHTML;
  }

  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalender();
  })
  
  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalender();
  })

  updateCalender();

}

function openDay(day) {

  month = date.getMonth() + 1;
  year = date.getFullYear();
  id = day+month+year+"_notice";

  bool_notice = true;

  if(localStorage.getItem(id) != null) {
    notice = localStorage.getItem(id)
    bool_notice = confirm('-' + String(notice) + '\n' + 'Bestehende Notiz ändern?');
  }

  if(bool_notice == true) {
    let input_string = prompt("Notiz eingeben");
    if(input_string == null){
      alert("Es wurde keine Notiz angelegt.");
      }
    else if(input_string == ""){
      alert("Es wurde keine Notiz gefunden.")
    }
    else if(input_string == "clear"){
      localStorage.removeItem(id);
    }
    else{
      localStorage.setItem(id,input_string);
    }
  }

}
