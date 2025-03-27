document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskBtn = document.getElementById("taskBtn");
    const taskClear = document.getElementById("clearTskBtn");
    
    
    //When the Add Task button is clicked, the task text is added to the list and saved to local storage
    taskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }
        
        addTask(taskText); //Runs the addTask function
        saveTask(taskText); //Runs the saveTask function
        taskInput.value = ""; //Clears the input field
        
    });
    
    
    //When the Enter key is pressed, the task text is added to the list and saved to local storage
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            taskBtn.click();
            console.log("Enter key pressed");
        }
    });
    
    
    const addTask = (taskText) => {
      const taskWrap = document.createElement("div");
      taskWrap.classList.add('container','text-center' );

      const taskItem = document.createElement('button');
      taskItem.classList.add('col-md-8', 'btn', 'btn-info', 'mb-2', 'mx-3');
      taskItem.innerText = taskText;

      const urgentTask = document.createElement('button');
      urgentTask.classList.add("col-md-2", 'btn', 'btn-outline-warning', 'mb-2', 'mx-3');
      urgentTask.innerText = "Urgent";

      urgentTask.addEventListener("click", () => {
        taskItem.classList.toggle("btn-danger");
        taskItem.classList.toggle("btn-info");
        urgentTask.classList.toggle("btn-outline-warning");
        urgentTask.classList.toggle("btn-warning");
      });

      taskWrap.appendChild(taskItem);
      taskWrap.appendChild(urgentTask);
      taskList.appendChild(taskWrap);


    }
    
    const  saveTask = (taskText) => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //Get the task array from local storage or create an empty array
        tasks.push(taskText); //Add the new task to the array
        localStorage.setItem("tasks", JSON.stringify(tasks)); //Save the array back to local storage
    };
    
    const loadTasks = () => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //Get the task array from local storage or create an empty array
        tasks.forEach(task => addTask(task)); //Add each task to the list
    };
    
    loadTasks();//Load tasks from local storage
    
    //Clears the list from the page and local storage
    taskClear.addEventListener("click", () => {
        taskInput.value = ""; //Clears the input field
        localStorage.clear(); //Clears local storage
        taskList.remove(); //Clears the list
        urgentTask.remove();
    });

    //When a task is clicked, it is marked as complete and changes color to green
    const doneTask = (e) => {
        e.target.classList.toggle("btn-success");//Changes the color of the task to green when clicked
        e.target.classList.toggle("btn-info");//Changes the color of the task back to blue when clicked again
        console.log("Task done", `${e.target.innerText}`);
    };

    taskList.addEventListener("click", doneTask);//This listens for a click on the task list and runs the doneTask function

    //When a task is double clicked, it is removed from the list and local storage
    const removeTask = (e) => {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
        console.log("Task removed", `${e.target.innerText}`);
    }//Removes the task from the list
    localStorage.clear();//Clears the task from local storage
    };

    taskList.addEventListener('dblclick', removeTask);//This listens for a double click on the task list and runs the removeTask function
});



