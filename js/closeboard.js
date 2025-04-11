// let data = {
//     "users": [
//         {
//             "id": 1,
//             "username": "john_doe",
//             "email": "john@example.com",
//             "password": "hashed_password",
//             "created_at": "2025-02-28T12:00:00Z",
//             "closeboard": [
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
//                 },
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
//             ],
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
//                 },
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
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser===""||currentUser===null) {
    window.location.href = "login.html";
}
console.log(currentUser);

let data = JSON.parse(localStorage.getItem("users")) || [];
let boardSection = document.getElementById("boardSection")
function renderBoards() {
    boardSection.innerHTML = ``;
    for (let i = 0; i < data.users[currentUser].closed_boards.length; i++) {
        let board = data.users[currentUser].closed_boards[i]
        let boardItem = document.createElement("div")
        boardItem.classList.add("col-6", "col-md-6", "col-lg-3")
        boardItem.innerHTML = `
          <div index="${i}" class="board-card" style="background-image: url('${board.backdrop}');">
            <div class="board-title">${board.title}</div>            
          </div>
          
    `
        boardSection.appendChild(boardItem)
    }
}
renderBoards()
let indexedit=0;
function editBoard(index) {
    indexedit=index
}
let boardTitle = document.getElementById("boardTitle");
let createBoardButton = document.getElementById("createBoardButton");
document.getElementById("formreate").addEventListener("submit", function (event) {
    event.preventDefault();
    let boardTitleValue = boardTitle.value.trim();
    let bgvalue = document.querySelector('input[name="color"]:checked').value;
    if (boardTitleValue === "") {
        alert("Vui lòng nhập tên bảng!");
        return;
    }
    let newBoard = {
        id: data.users[currentUser].closed_boards.length + 1,
        title: boardTitleValue,
        backdrop: bgvalue,
        is_starred: false,
        created_at: new Date().toISOString(),
        lists: []
    };
    data.users[currentUser].closed_boards.push(newBoard);
    localStorage.setItem("users", JSON.stringify(data));
    boardSection.innerHTML = ``;
    renderBoards()
    boardTitle.value = "";
    document.querySelector('input[name="color"]:checked').checked = false;
})
let valuedate = document.getElementById("valuedate")
document.getElementById("deleteboard").addEventListener("submit", function (event) {
    event.preventDefault();
    if (valuedate.value === "") {
        alert("Vui lòng nhập số thứ tự board cần xóa")
        return
    }
    let boardIndex = parseInt(valuedate.value) - 1;
    if (boardIndex < 0 || boardIndex >= data.users[currentUser].closed_boards.length) {
        alert("Số thứ tự không hợp lệ!");
        return;
    }
    data.users[currentUser].closed_boards.splice(boardIndex, 1);
    localStorage.setItem("users", JSON.stringify(data));
    renderBoards()
})



document.getElementById("formeditboard").addEventListener("submit", function (event) {
    event.preventDefault();
    let boardIndex = indexedit;
    if (boardIndex < 0 || boardIndex >= data.users[currentUser].closed_boards.length) {
        alert("Số thứ tự không hợp lệ!");
        return;
    }
    let newTitle = document.getElementById("editboardTitle").value.trim();
    let newBackdrop = document.querySelector('input[name="color"]:checked').value;
    if (newTitle === "") {
        alert("Vui lòng nhập tên bảng!");
        return;
    }
    data.users[currentUser].closed_boards[boardIndex].title = newTitle;
    data.users[currentUser].closed_boards[boardIndex].backdrop = newBackdrop;
    localStorage.setItem("users", JSON.stringify(data));
    renderBoards()
})