// function handleFormSubmit(event) {
//     event.preventDefault();
  
//     const name = event.target.name.value;
//     const description = event.target.description.value;
    
//     const todo = {
//         Name: name,
//         Description: description,
//     };
    
//     axios
//         .post(
//             "https://crudcrud.com/api/b6c4c2086cc1496f89a87712cdb10371/todo",
//             todo
//         )
//         .then((response) => {
//             console.log(response.data);
//             getData(); 
//         })
//         .catch((error) => console.log(error));        
// }

// function getData() {
//     axios
//         .get(
//             "https://crudcrud.com/api/b6c4c2086cc1496f89a87712cdb10371/todo"
//         )
//         .then((response) => {
//             console.log(response);
//             const todoDetails = response.data;
//             const todoList = document.getElementById("listItem");
//             const completedList = document.getElementById("completedList");
//             todoList.innerHTML = ""; 
//             completedList.innerHTML = "";

//             todoDetails.forEach((todos) => {
//                 const list = document.createElement("li");
//                 list.textContent = `Todo: ${todos.Name}, Description: ${todos.Description}`;
                
//                 const doneBtn = document.createElement("button");
//                 doneBtn.textContent = "✔";
//                 const dltBtn = document.createElement("button");
//                 dltBtn.textContent = "X";
                
//                 list.appendChild(doneBtn);
//                 list.appendChild(dltBtn);
//                 todoList.appendChild(list);

//                 dltBtn.addEventListener("click", function (event) {
//                     axios
//                         .delete(
//                             `https://crudcrud.com/api/b6c4c2086cc1496f89a87712cdb10371/todo/${todos._id}`
//                         )
//                         .then(() => {
//                             todoList.removeChild(list);
//                         })
//                         .catch((err) => console.log(err));
//                 });

//                 doneBtn.addEventListener("click", function (event) {
//                     const completedItem = document.createElement("li");
//                     completedItem.textContent = `Completed Todo: ${todos.Name}, Description: ${todos.Description}`;
//                     completedList.appendChild(completedItem);
//                     todoList.removeChild(list);
//                 });
//             });            
//         })
//         .catch((error) => console.log(error));
// }

// getData(); 

async function handleFormSubmit(event) {
    event.preventDefault();
  
    const name = event.target.name.value;
    const description = event.target.description.value;
  
    const todo = {
      Name: name,
      Description: description,
      completed: false,
    };
  
    try {
      const response = await axios.post("https://crudcrud.com/api/f322da1e9cba4fee8eb9a7e997b836f4/todo", todo);
      console.log(response.data);
      await getData();
    } catch (error) {
      console.log(error);
    }
  }
  
  async function getData() {
    try {
      const response = await axios.get("https://crudcrud.com/api/f322da1e9cba4fee8eb9a7e997b836f4/todo");
      const todoDetails = response.data;
      const todoList = document.getElementById("listItem");
      const completedList = document.getElementById("completedList");
  
      todoList.innerHTML = "";
      // completedList.innerHTML = "";
  
      todoDetails.forEach((todos) => {
        const list = document.createElement("li");
        list.textContent = `Todo: ${todos.Name}, Description: ${todos.Description}`;
  
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✔";
        const dltBtn = document.createElement("button");
        dltBtn.textContent = "X";
        const removebtn = document.createElement("button");
        removebtn.textContent="Remove";
  
        list.appendChild(doneBtn);
        list.appendChild(dltBtn);
  
        dltBtn.addEventListener("click", async function (event) {
          try {
            await axios.delete(`https://crudcrud.com/api/f322da1e9cba4fee8eb9a7e997b836f4/todo/${todos._id}`);
            todoList.removeChild(list);
          } catch (err) {
            console.log(err);
          }
        });

        removebtn.addEventListener('click', async function(event){
          try {
            await axios.delete(`https://crudcrud.com/api/f322da1e9cba4fee8eb9a7e997b836f4/todo/${todos._id}`);
            completedList.removeChild(list);
          } catch (err) {
            console.log(err);
          }
        })

        doneBtn.addEventListener("click", async function (event) {
          todos.completed = true;
          list.textContent = `Completed Todo: ${todos.Name}, Description: ${todos.Description}`;
          todoList.removeChild(list);
          completedList.appendChild(list);
          list.appendChild(removebtn);
        
          try {
            await axios.put(`https://crudcrud.com/api/f322da1e9cba4fee8eb9a7e997b836f4/todo/${todos._id}`, { completed: true });
          } catch (err) {
            console.log(err);
          }
        });
  
        if (!todos.completed) {
          todoList.appendChild(list);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  getData();

