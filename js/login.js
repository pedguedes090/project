let email =document.getElementById("email")
let password =document.getElementById("password")
let loginBtn =document.getElementById("login")
let loginEro = document.getElementById("alert-danger")
let loginsuccess = document.getElementById("alert-success")
let data = JSON.parse(localStorage.getItem("users")) || [];
localStorage.removeItem("currentUser"); 
console.log(loginEro);


function login() {
    if (email.value === "" || password.value === "") {
        loginEro.innerHTML = "";
        loginEro.style.display = "block";
        loginEro.innerHTML = `<b><img src="/assets/icons/ero.png" alt="">Error</b>Email hoặc password không được để trống`;
        setTimeout(function () {
            loginEro.style.display = "none";
        }, 3000);
        return;
    }

    let userFound = data.users.some((user, index) => {
        if (user.email === email.value && user.password === password.value) {
            localStorage.setItem("currentUser", JSON.stringify(index));
            loginsuccess.style.display = "block";
            setTimeout(function () {
                loginsuccess.style.display = "none";
                window.location.href = "dashboard.html";
            }, 1000);
            return true;
        }
        return false;
    });

    if (!userFound) {
        loginEro.innerHTML = "";
        loginEro.style.display = "block";
        loginEro.innerHTML = `<b><img src="/assets/icons/ero.png" alt="">Error</b>Email hoặc password không đúng`;
        setTimeout(function () {
            loginEro.style.display = "none";
        }, 3000);
    }
}
loginBtn.onclick = function () {
    login()
}
