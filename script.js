const eventsArr = JSON.parse(localStorage.getItem(".to_do_list")) || [];

renderList()
document.querySelector("#input").addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
      const input = document.querySelector("#input");
      addItem(input.value);
    }
      
  });
  
  document.querySelector("#add_item").addEventListener("click", () => {
    const input = document.querySelector("#input");
    addItem(input.value);
  });
  
  addItem = (input) => {
    const item = document.createElement("div");
    const div = document.createElement("div");
    const checkIcon = document.createElement("i");
    const trashIcon = document.createElement("i");
    const text = document.createElement("p");
  
    item.className = "item";
    text.textContent = input;
  
    checkIcon.className = "fas fa-check-square";
    checkIcon.style.color = "lightgray";
    checkIcon.addEventListener("click", () => {
      checkIcon.style.color = "limegreen";
      console.log(checkIcon.style.color)
    })
    div.appendChild(checkIcon);
  
    trashIcon.className = "fas fa-trash";
    trashIcon.style.color = "darkgray";
    trashIcon.addEventListener("click", (e) => {
      const text = e.target.parentNode.parentNode.childNodes[0].textContent
      const totalEvents = JSON.parse(localStorage.getItem(".to_do_list"))
      const editedEvents = totalEvents.filter(item => item !== text)
     
      localStorage.setItem(".to_do_list", JSON.stringify(editedEvents))

      item.remove();
    })
    div.appendChild(trashIcon);
  
    item.appendChild(text);
    item.appendChild(div);
  
    document.querySelector(".to_do_list").appendChild(item);
    document.querySelector("#input").value = "";

    eventsArr.push(input)
    saveEvents();
  }

  function createItem(event) {
    const item = document.createElement("div");
    const div = document.createElement("div");
    const checkIcon = document.createElement("i");
    const trashIcon = document.createElement("i");
    const text = document.createElement("p");
  
    item.className = "item";
    text.textContent = event;
  
    checkIcon.className = "fas fa-check-square";
    checkIcon.style.color = "lightgray";
    checkIcon.addEventListener("click", () => {
      if(checkIcon.style.color === 'lightgray') {
        checkIcon.style.color = "limegreen";
      } else {
        checkIcon.style.color = "lightgray";
      }
    })
    div.appendChild(checkIcon);
  
    trashIcon.className = "fas fa-trash";
    trashIcon.style.color = "darkgray";
    trashIcon.addEventListener("click", (e) => {
    const text = e.target.parentNode.parentNode.childNodes[0].textContent
    const totalEvents = JSON.parse(localStorage.getItem(".to_do_list"))
    const editedEvents = totalEvents.filter(item => item !== text)
    
      localStorage.setItem(".to_do_list", JSON.stringify(editedEvents))

      item.remove();
    })
    div.appendChild(trashIcon);
  
    item.appendChild(text);
    item.appendChild(div);

    return item
  } 

  function renderList() {
    const list = document.querySelector(".to_do_list");
    eventsArr.forEach(event => {
      const item = createItem(event)
      list.appendChild(item)
    })

  }

  //сохранение в локалсторе
function saveEvents() {
    localStorage.setItem(".to_do_list", JSON.stringify(eventsArr));
  }
  
  //функция получения записей из локалстора
  function getEvents() {
    //если запись уже есть в локалсторе, вернуть ее
    if (localStorage.getItem(".to_do_list") === null) {
      return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem(".to_do_list")));
  }