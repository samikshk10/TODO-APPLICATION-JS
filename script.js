window.onload = function () {
    display();
}
let taskarr = [];
const getitems = localStorage.getItem('tasks');

if (getitems) {
    taskarr = JSON.parse(getitems);
}
const msg = document.getElementById('msg');
const input = document.getElementById('task');
const createBtn = document.getElementById('add-task');


function display() {
    const taskcontainer = document.getElementById('tasks');
    let alltasks = '';
    taskarr.forEach((task, index) => {
        alltasks += `                                         
                <div class="task-item ">
                <button type="button" class="completed button ${task.completed == 'true' ?'completed-check':'not-check'}" onclick="todoCompleted('${task.id}')"><i class="fa-solid fa-circle-check"></i></button>
                    <div class="task-name">
                        <p class="${task.completed == 'true' ?'completed-task':'not-completed'}" id="taskname">${task.name}</p>
                    </div>
                    <div class="action">
                        <button type="button" id="editing" class="edit button" onclick="updateTodo('${task.id}')"><i class="fa-solid fa-edit"></i></button>
                        <button type="button" class=" delete button" onclick="deleteTodo('${task.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
    });
    taskcontainer.innerHTML = alltasks;
    localStorage.setItem('tasks', JSON.stringify(taskarr));
}

function addTodo(task) {
    const randomid = Math.floor(Math.random() * 9999);
    taskarr.push({
        id: randomid,
        name: task,
        completed: 'false',
    });
    display();
}

function todoCompleted(task) {
    taskarr.forEach(item => {
        if (`${item.id}` == task) {
            if (item.completed == 'false')
                item.completed = 'true';
            else
                item.completed = 'false';
        }
    });

    display();
}

function updateTodo(task) {
    const taskitems = document.querySelectorAll('.task-item');
    const taskinput = document.getElementById('task-input');
    const edit = document.querySelectorAll('.task-name');

    const editbtn = document.getElementById('editing');


    console.log(editbtn);
    editbtn.innerHTML = "Edit";

    taskarr.forEach((item, index) => {
        if (`${item.id}` == task) {
            taskitems[index].classList.add('task-editing');
            edit[index].innerHTML = `
            <div class="edit-container">
                    <input type="text" id="task-input" value="${item.name}" placeholder="Edit TODO Task" />
                    <div id="close-btn">X</div>
                    </div>
                `;

            const closebtn = document.getElementById('close-btn');
            closebtn.addEventListener('click', e => {
                display();
            });

            const taskinputs = document.querySelectorAll('#task-input');
            const edittodotask = document.querySelector('.edit');
            if (taskinputs) {
                taskinputs.forEach(input => {
                    input.addEventListener('keydown', e => {
                        if (e.key == 'Enter') {
                            edittodotask.addEventListener('click', e => {
                                let inputval = input.value;
                                if (inputval) {
                                    updateTodo(task, inputval);
                                }
                            });
                            edittodotask.click();
                        }
                    });
                });
            }

            if (taskinput.value == '') {
                return
            };

            item.name = taskinput.value;
        }
    });
    msg.innerHTML = "Task Edited Successfully";
    msg.style.visibility = "visible";
    setTimeout(() => {
        msg.style.visibility = "hidden";
    }, 3000);
    display();
}

function deleteTodo(task) {
    taskarr = taskarr.filter(item => `${item.id}` != task);
    msg.innerHTML = "Task Deleted Successfully";
    msg.style.visibility = "visible";
    setTimeout(() => {
        msg.style.visibility = "hidden";
    }, 3000);
    display();
}




createBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputval = input.value;
    if (inputval != '') {
        input.value = '';
        addTodo(inputval);
        msg.innerHTML = "Task Added Successfully";
        msg.style.visibility = "visible";
        setTimeout(() => {
            msg.style.visibility = "hidden";
        }, 3000);
    } else {
        alert('todo cant be empty');
    }
});



let form = document.querySelector('.form');
form.addEventListener('submit', e => {
    e.preventDefault();
});

input.addEventListener('keydown', e => {
    if (e.key == 'Enter') createBtn.click();

});
