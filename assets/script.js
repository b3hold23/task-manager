document.addEventListener("DOMContentLoaded", () => {//This ensures that the script runs after the page has loaded
    const taskInput = document.getElementById("taskInput");//This gets the taskInput element from the HTML to be manipulated by the script
    const taskList = document.getElementById("taskList");//This gets the taskList element from the HTML to be manipulated by the script
    const taskBtn = document.getElementById("taskBtn");//This gets the taskBtn element from the HTML to be manipulated by the script
    const taskClear = document.getElementById("clearTskBtn");//This gets the clearTskBtn element from the HTML to be manipulated by the script
    
    
    //When the Add Task button is clicked, the task text is added to the list and saved to local storage
    taskBtn.addEventListener("click", () => { //This listens for a click on the Add Task button, then it will run the function
        const taskText = taskInput.value.trim(); //This gets the value of the taskInput element and removes any white space
        if (taskText === "") { //If the task text is empty, an alert will pop up
            alert("Please enter a task"); //This is the alert that pops up if the task text is empty
            return; //This stops the function from running if the task text is empty
        }
        
        addTask(taskText); //Runs the addTask function
        saveTask(taskText); //Runs the saveTask function
        taskInput.value = ""; //Clears the input field
        
    });
    
    
    //When the Enter key is pressed, the task text is added to the list and saved to local storage
    taskInput.addEventListener('keypress', (e) => { //This listens for a key press in the taskInput element, then it will run the function
        if (e.key === "Enter") { //If the key pressed is the Enter key, the task text will be added to the list and saved to local storage
            taskBtn.click(); //This will run the taskBtn click on line 9 when the Enter key is pressed
        }
    });
    
    
    const addTask = (taskText) => { //This function adds the task text to the list
      const taskWrap = document.createElement("div"); //This creates a div element
      taskWrap.classList.add('container','text-center' ); //This adds the class name container and text-center to the div element

      const taskItem = document.createElement('button'); //This creates a button element
      taskItem.classList.add('col-md-8', 'btn', 'btn-info', 'mb-2', 'mx-3'); //This adds the class name col-md-8, btn, btn-info, mb-2, and mx-3 to the button element
      taskItem.innerText = taskText; //This adds the task text to the button element

      const urgentTask = document.createElement('button'); //This creates a button element
      urgentTask.classList.add("col-md-2", 'btn', 'btn-outline-warning', 'mb-2', 'mx-3'); //This adds the class name col-md-2, btn, btn-outline-warning, mb-2, and mx-3 to the button element
      urgentTask.innerText = "Urgent"; //This adds the text "Urgent" to the button element

      urgentTask.addEventListener("click", () => { //This AddEventListener listens for a click on the Urgent button, then it will run the function inside the curly braces
        taskItem.classList.toggle("btn-danger"); //This toggles the class name btn-danger on the taskItem element
        taskItem.classList.toggle("btn-info"); //This toggles the class name btn-info on the taskItem element
        urgentTask.classList.toggle("btn-outline-warning"); //This toggles the class name btn-outline-warning on the urgentTask element
        urgentTask.classList.toggle("btn-warning"); //This toggles the class name btn-warning on the urgentTask element
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



