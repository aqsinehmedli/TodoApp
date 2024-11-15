const containerSignUp = document.getElementById("containerSignUp")
const h2ItemForSign = document.getElementById("h2ItemForSign")
const todoInputUserName = document.getElementById("todoInputUserName")
const todoInputEmailForSign = document.getElementById("todoInputEmailForSign")
const todoInputPasswordForSign = document.getElementById("todoInputPasswordForSign")
const todoBtnSign = document.getElementById("todoBtnSign")


todoBtnSign.addEventListener("click", () => {
    const username = todoInputUserName.value;
    const emailForSign = todoInputEmailForSign.value;
    const passwordForSign = todoInputPasswordForSign.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (username && emailForSign && passwordForSign) {
        if (emailPattern.test(emailForSign)) {
            postTodosSign(username, emailForSign, passwordForSign);
            showRegisterLink()
        } else {
            alert("Please enter a valid email address!");
        }
    } else {
        alert("Fill in all the blanks!");
    }
});
const addTodoItemForSign = (data) => {
    data.map(item =>{
        const div = document.createElement("div")
        const h2 = document.createElement("h2")
        h2.innerText = item.title
        div.appendChild(h2)
        containerSignUp.appendChild(div)
    })
}



const postTodosSign = async (username, emailForSign, passwordForSign) => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmY5N2Q3OWZhMWFhODZhNmQ5NmYyOCIsImlhdCI6MTczMTY2NTM3MCwiZXhwIjoxNzMxNjY4OTcwfQ.Bpq7RAlU3B1lFvZcibL8ClYEIx-_SduFMLA1lf2vY94";

    const response = await fetch("http://localhost:5001/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            username: username,
            email: emailForSign,
            password: passwordForSign
        })
    });
    if (response.ok) {
        alert("Successfuly Register!");
        window.location.href = "/TodoAppFront/Login.html"
    } else {
        alert("Occured an error!")
    }
}
