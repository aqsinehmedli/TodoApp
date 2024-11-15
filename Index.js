
const containerTodo = document.getElementById("containerTodo");
const inputTodo = document.getElementById("inputTodo");
const TodoAppBtn = document.getElementById("TodoAppBtn");
const deleteIcon = document.getElementById("deleteIcon");
const firstRow = document.getElementById("firstRow");
let editMode = false;


const getTodos = async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    if (!accessToken) {
        console.log("Access token not found, please login.");
        return;
    }

    const response = await fetch("http://localhost:5001/todos/", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    console.log(data);

    firstRow.innerHTML = "";

    data.forEach((item) => {
        addTodoToDOM(item);
    });
};


TodoAppBtn.addEventListener("click", () => {
    const inputData = inputTodo.value;
    if (!inputData) {
        alert("Please enter the text");
    } 
    if(editMode==false){
        createNewTodo(inputData)
    }
    else{
        updatedData(editId,inputData)
    }
    
});
const createNewTodo = async (inputData) => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    const response = await fetch("http://localhost:5001/todos/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: inputData
        })
    });

    const data = await response.json();
    console.log("Login response data:", data);
    
    addTodoToDOM(data);
    inputTodo.value = ""; 
};

const addTodoToDOM = (item) => {
    const newDiv = document.createElement("div");
    const newInput = document.createElement("input");
    
    newDiv.classList.add("firstRowDiv");
    newInput.readOnly = true;
    newInput.value = item.title;
    
    newDiv.id = `todo-${item._id}`;

    const i = document.createElement("i");
    i.classList.add("fas", "fa-trash");

    const edit = document.createElement("i");
    edit.classList.add("fas", "fa-edit");
    edit.style.marginRight = "30px";

    i.addEventListener("click", () => {
        deleteTodoItem(item._id); 
        console.log(item._id) 
    });

    edit.addEventListener("click",() => {
        inputTodo.value = item.title;  
        editMode = true;  
        editId = item._id;  
        TodoAppBtn.innerText = "Save"; 
        console.log(item._id)
        console.log(item)
    });

    newDiv.appendChild(newInput);
    newDiv.appendChild(i);
    newDiv.appendChild(edit);

    firstRow.appendChild(newDiv);
    containerTodo.appendChild(firstRow);
};



const deleteTodoItem = async (id) => {
    const token = localStorage.getItem('accessToken');

    const response = await fetch(`http://localhost:5001/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json(); // API yanıtını bekleyin

    if (response.ok) {
        console.log("Todo item deleted successfully:", data);

        const todoElement = document.getElementById(`todo-${id}`);
        if (todoElement) {
            todoElement.remove(); 
        }
    } else {
        console.error("Failed to delete todo item:", data);
    }
};


const editTodo = async(id, updatedData) => {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`http://localhost:5001/todos/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            title: updatedData
        })
    });

    if (response.ok) {
        console.log("Todo item updated successfully");
        getTodos(); 
    } else {
        const errorData = await response.json();
        console.error("Failed to update todo item:", errorData);
    }
}
