
let data = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser);
if (currentUser === "" || currentUser === null) {
    window.location.href = "login.html";
}
let nameboard = document.getElementById("nameboard");
let starboard = document.getElementById("starboard");
let board = data.users[currentUser].boards[0];
starboard.addEventListener("click", function () {
    if (board.is_starred) {
        board.is_starred = false;
        starboard.src = "/assets/icons/Starorunstarboard1.png";
    } else {
        board.is_starred = true;
        starboard.src = "/assets/icons/Starorunstarboard.png";
    }
    localStorage.setItem("users", JSON.stringify(data));
})
function renderBoard() {
    let mainTask = document.getElementById("main-task");
    mainTask.innerHTML = "";
    nameboard.textContent = `${board.title}`;
    if (board.is_starred) {
        starboard.src = "/assets/icons/Starorunstarboard.png";
    } else {
        starboard.src = "/assets/icons/Starorunstarboard1.png";
    }
    // Lặp qua từng list trong board
    board.lists.forEach((list, listIndex) => {        // Tạo container cho list
        let listContainer = document.createElement("div");
        listContainer.className = "todo col-3 border rounded ms-3";
        listContainer.innerHTML = `
            <div class="navtodo d-flex justify-content-between">
                <p>${list.title}</p>
                <span>▪▪▪</span>
            </div>
            <div id="list-${list.id}"></div>
        `;
        // Container chứa các task của list
        let tasksContainer = listContainer.querySelector(`#list-${list.id}`);
        list.tasks.forEach((task) => {
            let iconStatus = task.status === "pending" ? "✏️" : "✅";
            let taskItem = document.createElement("div");
            taskItem.className = "contentodo border rounded shadow-lg bg-light mb-2 p-2";
            taskItem.innerHTML = `
    <div>
      <span onclick="statusChange(${task.id})">${iconStatus}</span>
      <span onclick="editTask(${task.id})" >${task.title}</span>
    </div>
  `;
            tasksContainer.appendChild(taskItem);
        });
        // Container phần "Add card" và icon xoá list
        let actionContainer = document.createElement("div");
        actionContainer.className = "d-flex justify-content-between align-items-center";
        actionContainer.innerHTML = `
            <span id="add-card-${listIndex}" data-list-index="${listIndex}" style="cursor: pointer;">+ Add card</span>
            <span id="delete-list-${listIndex}" data-list-index="${listIndex}" style="cursor: pointer;">🗑️</span>
        `;
        actionContainer.querySelector(`#add-card-${listIndex}`).addEventListener("click", (e) => {
            let index = parseInt(e.target.getAttribute("data-list-index"));
            renderAddCardForm(index);
        });
        actionContainer.querySelector(`#delete-list-${listIndex}`).addEventListener("click", (e) => {
            let index = parseInt(e.target.getAttribute("data-list-index"));
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    board.lists.splice(index, 1);
                    localStorage.setItem("users", JSON.stringify(data));
                    renderBoard();
                }
            });
        });
        listContainer.appendChild(actionContainer);
        mainTask.appendChild(listContainer);
    });
    // Phần cuối: nút "Add another list" liên kết với modal
    let addListDiv = document.createElement("div");
    addListDiv.className = "todo col-3 border rounded ms-3 h-auto";
    let addListInner = document.createElement("div");
    addListInner.className = "d-flex justify-content-between align-items-center";
    addListInner.setAttribute("data-bs-toggle", "modal");
    addListInner.setAttribute("data-bs-target", "#addlist");
    let addListP = document.createElement("p");
    addListP.className = "pt-2";
    addListP.textContent = "+ Add another list";
    addListInner.appendChild(addListP);
    addListDiv.appendChild(addListInner);
    mainTask.appendChild(addListDiv);
}
// Hàm tạo 1 card task đã có
function createTaskCard(task) {
    let iconStatus = task.status === "pending" ? "✏️" : "✅";
    let taskItem = document.createElement("div");

    taskItem.className = "contentodo border rounded shadow-lg bg-light mb-2 p-2";
    taskItem.innerHTML = `
    <div>
      <span onclick="statusChange(${task.id})">${iconStatus}</span>
      <span onclick="editTask(${task.id})" >${task.title}</span>
    </div>
  `;
    return taskItem;
}
let task;
let listIndex;
let editModal = new bootstrap.Modal(document.getElementById("exampleModal1"));
// Hàm xử lý sự kiện khi nhấn vào icon chỉnh sửa task
function statusChange(taskId) {
    // Tìm task và list chứa task đó
    board.lists.forEach((list, index) => {
        let foundTask = list.tasks.find((t) => t.id === taskId);
        if (foundTask) {
            task = foundTask;
            listIndex = index;
        }
    });
    if (!task) {
        alert("Task không tồn tại!");
        return;
    }
    // Chuyển đổi trạng thái task
    if (task.status === "pending") {
        task.status = "completed";
    } else {
        task.status = "pending";
    }
    localStorage.setItem("users", JSON.stringify(data));
    renderBoard();
}
function editTask(taskId) {
    // Tìm task và list chứa task đó
    board.lists.forEach((list, index) => {
        let foundTask = list.tasks.find((t) => t.id === taskId);
        if (foundTask) {
            task = foundTask;
            listIndex = index;
        }
    });
    if (!task) {
        alert("Task không tồn tại!");
        return;
    }
    // Gán giá trị hiện tại của task vào modal
    let modalTitleInput = document.getElementById("modalTitleInput");
    modalTitleInput.value = task.title;
    //Hiển thị modal  
    editModal.show();
    //xử lý sự kiện xoá task
    // Xử lý sự kiện lưu
    let saveButton = document.getElementById("save-btn");
    saveButton.onclick = function () {
        let newTitle = modalTitleInput.value.trim();
        if (newTitle === "") {
            alert("Task title không được để trống!");
            return;
        }
        task.title = newTitle;
        localStorage.setItem("users", JSON.stringify(data));
        // Render lại board sau khi chỉnh sửa
        renderBoard();
        // Ẩn modal
        editModal.hide();
    };
    // Xử lý sự kiện xoá task
    // let formDeleteTask = document.getElementById("swal2-confirm");
    // formDeleteTask.addEventListener("click", function (event) {
    //     event.preventDefault();

    //     // Tìm và xoá task trong list
    //     board.lists[listIndex].tasks = board.lists[listIndex].tasks.filter((t) => t.id !== taskId);
    //     localStorage.setItem("users", JSON.stringify(data));
    //     renderBoard();
    //     editModal.hide();

    // })
}
// Hàm render form nhập cho "Add card" trong 1 list theo index
function renderAddCardForm(listIndex) {
    let list = board.lists[listIndex];
    let addCardBtn = document.getElementById(`add-card-${listIndex}`);
    let deleteListBtn = document.getElementById(`delete-list-${listIndex}`);
    let tasksContainer = document.getElementById(`list-${list.id}`);
    addCardBtn.style.display = "none";
    deleteListBtn.style.display = "none";

    let formContainer = document.createElement("div");
    formContainer.className = "contentodo border rounded shadow-lg bg-light mb-2 p-2 ";
    formContainer.innerHTML = `
        <input type="text" placeholder="Enter task title" class="form-control mb-2" id="task-input-${listIndex}">
        <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-primary btn-sm" id="save-task-${listIndex}">Save</button>
            <button class="btn btn-secondary btn-sm" id="cancel-task-${listIndex}">Cancel</button>
        </div>
    `;

    addCardBtn.parentNode.insertBefore(formContainer, addCardBtn);

    document.getElementById(`cancel-task-${listIndex}`).addEventListener("click", () => {
        formContainer.remove();
        addCardBtn.style.display = "inline";
        deleteListBtn.style.display = "inline";
    });

    document.getElementById(`save-task-${listIndex}`).addEventListener("click", () => {
        let inputField = document.getElementById(`task-input-${listIndex}`);
        let title = inputField.value.trim();
        if (title === "") {
            alert("Task title không được để trống");
            return;
        }
        let newTask = {
            id: Date.now(),
            title: title,
            description: "",
            status: "pending",
            due_date: null,
            tag: [],
            created_at: new Date().toISOString()
        };
        list.tasks.push(newTask);
        localStorage.setItem("users", JSON.stringify(data));
        let newTaskCard = createTaskCard(newTask);
        tasksContainer.appendChild(newTaskCard);
        formContainer.remove();
        addCardBtn.style.display = "inline";
        deleteListBtn.style.display = "inline";
    });
}
// Sự kiện cho form "Add list" (modal)
document.getElementById("addListForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    let listTitle = document.getElementById("listTitle").value.trim(); // Lấy giá trị tiêu đề list từ input

    if (listTitle === "") {
        alert("Tiêu đề list không được để trống!");
        return;
    }
    // Tạo một list mới và thêm vào board
    let newList = {
        id: Date.now(),
        title: listTitle,
        created_at: new Date().toISOString(),
        tasks: []
    };
    board.lists.push(newList);
    localStorage.setItem("users", JSON.stringify(data));
    // Render lại board sau khi thêm list mới
    renderBoard();
    // Đóng modal sau khi thêm list
    let modalEl = document.getElementById("addlist");
    // Sử dụng bootstrap Modal instance để ẩn modal (nếu đã khởi tạo)
    let modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
        modalInstance.hide();
    }
});
// Gọi hàm render khi trang được tải
renderBoard();
let id = "";
let listBorad = document.getElementById("list-board");
listBorad.innerHTML = "";
for (i = 0; i < data.users[currentUser].boards.length; i++) {
    let list = document.createElement("li");
    list.className = "d-flex align-items-center"
    list.setAttribute("data-id", i);
    list.innerHTML = `
    <img src="${data.users[currentUser].boards[i].backdrop}" alt="" width="24px" height="20px" class="me-3">
                    <span class="mb-0">${data.users[currentUser].boards[i].title}</span>
                    `
    listBorad.appendChild(list);
    list.addEventListener("click", function () {
        id = this.getAttribute("data-id");
        board = data.users[currentUser].boards[id];
        console.log(id)
        renderBoard();
        console.log(board)
    })
}

function hideModal() {
    editModal.hide();
}
let formCloseBoard = document.getElementById("formCloseBoard");
formCloseBoard.addEventListener("submit", function (event) {
    event.preventDefault();
    data.users[currentUser].boards[id].statusBoard = false;
    localStorage.setItem("users", JSON.stringify(data));
})
let deletetasktest = document.getElementById("deletetasktest");
deletetasktest.addEventListener("click", function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            board.lists[listIndex].tasks = board.lists[listIndex].tasks.filter((t) => t.id !== task.id);
            localStorage.setItem("users", JSON.stringify(data));
            renderBoard();
            editModal.hide();
        }
    });
})