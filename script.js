
    const taskContainer = document.querySelector(".task_container");
    console.log(taskContainer);

    const globalStore = [];

    const newCard = ({
        id,
        imageurl,
        tasktitle,
        tasktype,
        taskdescription,
    })=> `<div class="col-md-4" id=${id}>
    <div class="card">
        <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success"><i class="fa fa-edit"></i></button>
            <button type="button" class="btn btn-outline-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        <img src= ${imageurl}>
        <div class="card-body">
          <h5 class="card-title">${tasktitle}</h5>
          <p class="card-text">${taskdescription}</p>
          <span class="badge bg-primary">${tasktype}</span>
        </div>
        <div class="card-footer text-muted ">
          <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
        </div>
      </div>
  </div>`;

 

  //loadInitialTaskCards function is used so that upon refreshing the page we do not lose our previous data.
    const loadInitialTaskCards = () => {
      const getInitialData = localStorage.getItem("tasky");
      if(!getInitialData)  return;  //If we open the webiste in a new browser/machine and 'tasky' key isnot found, we would get error

      const {cards} = JSON.parse(getInitialData);

      //map around the array to generate HTML card and inject it to DOM
      cards.map((cardObject) => {
        const createNewCard = newCard(cardObject);

        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(cardObject);
      });

    };
    

  const saveChanges = () => {
    var taskData = {
        id : `${Date.now()}`,
        imageurl : document.getElementById("imageurl").value,
        tasktitle : document.getElementById("tasktitle").value,
        tasktype : document.getElementById("tasktype").value,
        taskdescription : document.getElementById("taskdescription").value,
        };
        //console.log(taskData);

        const createNewCard = newCard(taskData);

        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalStore.push(taskData);

        //localStorage.setItem("tasky",{cards: globalStore});  We need to convert the object to string. For that use Stringify()
        localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));   //Add to localStorage
    };

   

    
