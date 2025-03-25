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
        const taskItem = document.createElement("button"); //creates Element
        taskItem.classList.add("btn", "btn-info", "mt-1"); //adds class to the new element 
        taskItem.innerText = taskText; //Adds the task text to the new element
        taskList.appendChild(taskItem); //Adds the new element into the list with the id taskList
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
    });

    //When a task is clicked, it is marked as complete and changes color to green
    const doneTask = (e) => {
        e.target.classList.toggle("btn-success");//Changes the color of the task to green when clicked
        e.target.classList.toggle("btn-info");//Changes the color of the task back to blue when clicked again
        console.log("Task done", `${e.target.innerText}`);
    };

    taskList.addEventListener("click", doneTask);//This listens for a click on the task list and runs the doneTask function

});



