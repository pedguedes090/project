// let data = {
//     "users": [
//         {
//             "id": 1,
//             "username": "john_doe",
//             "email": "john@example.com",
//             "password": "hashed_password",
//             "created_at": "2025-02-28T12:00:00Z",
//             "closed_boards": [
//                  {
//                     "id": 101,
//                     "title": "Dự án Website",
//                     "description": "Quản lý tiến độ dự án website",
//                     "backdrop": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
//                     "is_starred": true,
//                     "created_at": "2025-02-28T12:30:00Z",
//                     "lists": [
//                         {
//                             "id": 201,
//                             "title": "Việc cần làm",
//                             "created_at": "2025-02-28T13:00:00Z",
//                             "tasks": [
//                                 {
//                                     "id": 301,
//                                     "title": "Thiết kế giao diện",
//                                     "description": "Tạo wireframe cho trang chủ",
//                                     "status": "pending",
//                                     "due_date": "2025-03-05T23:59:59Z",
//                                     "tag": [
//                                         {
//                                             "id": 401,
//                                             "content": "Urgent",
//                                             "color": "#fff"
//                                         }
//                                     ],
//                                     "created_at": "2025-02-28T13:30:00Z"
//                                 }
//                             ]
//                         }
// ],
//             "boards": [
//                 {
//                     "id": 101,
//                     "title": "Dự án Website",
//                     "description": "Quản lý tiến độ dự án website",
//                     "backdrop": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
//                     "is_starred": true,
//                     "created_at": "2025-02-28T12:30:00Z",
//                     "lists": [
//                         {
//                             "id": 201,
//                             "title": "Việc cần làm",
//                             "created_at": "2025-02-28T13:00:00Z",
//                             "tasks": [
//                                 {
//                                     "id": 301,
//                                     "title": "Thiết kế giao diện",
//                                     "description": "Tạo wireframe cho trang chủ",
//                                     "status": "pending",
//                                     "due_date": "2025-03-05T23:59:59Z",
//                                     "tag": [
//                                         {
//                                             "id": 401,
//                                             "content": "Urgent",
//                                             "color": "#fff"
//                                         }
//                                     ],
//                                     "created_at": "2025-02-28T13:30:00Z"
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// } 
// localStorage.setItem("users", JSON.stringify(data))
let data = JSON.parse(localStorage.getItem("users")) || [];
let username = document.getElementById("userName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let signUpBtn = document.getElementById("Sign-up");
let loginEro = document.getElementById("alert-danger")
let loginsuccess = document.getElementById("alert-success")

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
function validate() {
    let usernameValue = username.value.trim()
let emailValue = email.value.trim()
let passwordValue = password.value.trim()

    if (usernameValue === "") {
        loginEro.innerHTML = ""
        loginEro.style.display = "block";
        loginEro.innerHTML =`<b><img src="/assets/icons/ero.png" alt="">Error</b>Vui lòng nhập tên đăng nhập`
        setTimeout(function(){
            loginEro.style.display = "none";
        }, 3000) 
        return false
    }
    if (emailValue === "") {
        loginEro.innerHTML = ""
        loginEro.style.display = "block";
        loginEro.innerHTML =`<b><img src="/assets/icons/ero.png" alt="">Error</b>Vui lòng nhập email`
        setTimeout(function(){
            loginEro.style.display = "none";
        }, 3000) 
        return false
    }
    if (passwordValue === "") {
        loginEro.innerHTML = ""
        loginEro.style.display = "block";
        loginEro.innerHTML =`<b><img src="/assets/icons/ero.png" alt="">Error</b>Vui lòng nhập mật khẩu`
        setTimeout(function(){
            loginEro.style.display = "none";
        }, 3000) 
        return false
    }
    if (!validateEmail(emailValue)) {
        loginEro.innerHTML = ""
        loginEro.style.display = "block";
        loginEro.innerHTML =`<b><img src="/assets/icons/ero.png" alt="">Error</b>Email không hợp lệ`
        setTimeout(function(){
            loginEro.style.display = "none";
        }, 3000) 
        return false
    }
    
    if (passwordValue.length < 8) {
        loginEro.innerHTML = ""
        loginEro.style.display = "block";
        loginEro.innerHTML =`<b><img src="/assets/icons/ero.png" alt="">Error</b>Mật khẩu phải có ít nhất 8 ký tự`
        setTimeout(function(){
            loginEro.style.display = "none";
        }, 3000) 
        return false
    }
    
    for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].email === emailValue) {
            loginEro.innerHTML = ""
            loginEro.style.display = "block";
            loginEro.innerHTML =`<b><img src="/assets/icons/ero.png" alt="">Error</b>Email đã tồn tại`
            setTimeout(function(){
                loginEro.style.display = "none";
            }, 3000) 
            return false;
        }
    }
    return true
}
signUpBtn.onclick = function () {
    if (validate()) {
        let newUser = {
            id: data.users.length>0 ? data.users[data.users.length - 1].id + 1 : 1,
            username: username.value,
            email: email.value,
            password: password.value,
            created_at: new Date().toISOString(),
            boards: []
        }
        data.users.push(newUser)
        localStorage.setItem("users", JSON.stringify(data))
        loginsuccess.style.display = "block";
        loginsuccess.innerHTML ="";
        loginsuccess.innerHTML =`<img src="/assets/icons/check_circle.png" alt="">Đăng kí thành công</div>`
        setTimeout(function(){
            loginsuccess.style.display = "none";
            window.location.href = "login.html"
        }, 3000)
       
    }
}

