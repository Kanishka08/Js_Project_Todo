function handleFormSubmit(event) {
    event.preventDefault();
  
    const name = event.target.name.value;
    const description = event.target.description.value;
    
    const todo = {
        Name: name,
        Description: description,
    };
    
    axios
        .post(
            "https://crudcrud.com/api/949a06d6abd54072a0db07c008c9dcc1/todo",
            todo
        )
        .then((response) => {
            console.log(response.data);
            getData(); 
        })
        .catch((error) => console.log(error));        
}

function getData() {
    axios
        .get(
            "https://crudcrud.com/api/949a06d6abd54072a0db07c008c9dcc1/todo"
        )
        .then((response) => {
            console.log(response);
            const todoDetails = response.data;
            const todoList = document.getElementById("listItem");
            const completedList = document.getElementById("completedList");
            todoList.innerHTML = ""; 
            completedList.innerHTML = "";

            todoDetails.forEach((todos) => {
                const list = document.createElement("li");
                list.textContent = `Todo: ${todos.Name}, Description: ${todos.Description}`;
                
                const doneBtn = document.createElement("button");
                doneBtn.textContent = "✔";
                const dltBtn = document.createElement("button");
                dltBtn.textContent = "X";
                
                list.appendChild(doneBtn);
                list.appendChild(dltBtn);
                todoList.appendChild(list);

                dltBtn.addEventListener("click", function (event) {
                    axios
                        .delete(
                            `https://crudcrud.com/api/949a06d6abd54072a0db07c008c9dcc1/todo/${todos._id}`
                        )
                        .then(() => {
                            todoList.removeChild(list);
                        })
                        .catch((err) => console.log(err));
                });

                doneBtn.addEventListener("click", function (event) {
                    const completedItem = document.createElement("li");
                    completedItem.textContent = `Completed Todo: ${todos.Name}, Description: ${todos.Description}`;
                    completedList.appendChild(completedItem);
                    todoList.removeChild(list);
                });
            });            
        })
        .catch((error) => console.log(error));
}

getData(); 
