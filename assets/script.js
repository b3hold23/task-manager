document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskBtn = document.getElementById("taskBtn");
    const urgentCheck = document.getElementById("urgentCheck");
    const taskClear = document.getElementById("clearTskBtn");

    taskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.innerText = taskText;
        taskList.appendChild(taskItem);
    });
});


