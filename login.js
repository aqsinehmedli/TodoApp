const container = document.getElementById("container")
const h2Item = document.getElementById("h2Item")
const todoInputEmail = document.getElementById("todoInputEmail")
const todoInputPassword = document.getElementById("todoInputPassword")
const todoBtn = document.getElementById("todoBtn")
const registerLink = document.getElementById("registerLink")

todoBtn.addEventListener("click",() => {
    const email = todoInputEmail.value
    const password = todoInputPassword.value
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email&&password)
        if (emailPattern.test(email)) {
            postTodos(email, password);
        } else {
            alert("Please enter a valid email address!");
        }
    else
        alert("Fill in all the blanks!")
})



const postTodos = async (email, password) => {
    const response = await fetch("http://localhost:5001/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();
    console.log("Login response data:", data);
 

    if (response.ok) {
        alert("Successfuly login!")
        // const data = await response.json()
        accessToken = data.token;
        localStorage.setItem('accessToken', accessToken)
        console.log("Access token saved")
        window.location.href = "TodoApp.html"
        console.log(data)

    }
    else {
        alert("Invalid email address or password!")
        showRegisterLink()
    }
};

const showRegisterLink = () => {
    const a = document.createElement("a");
    a.href = "/TodoAppFront/SignUp.html";
    a.innerHTML = "Don't have an Account?Register";
    a.classList.add("registerLink");  
    registerLink.appendChild(a);
};
showRegisterLink()
const addTodoItem = (data) => {
    data.map(item =>{
        const div = document.createElement("div")
        const h2 = document.createElement("h2")
        h2.innerText = item.title
        div.appendChild(h2)
        container.appendChild(div)
    })
}
