
let addTask = document.getElementById('second_input');
let taskInput = document.getElementById('first_input');
let penddingTask = document.getElementById("cart");

addTask.addEventListener("click", function (e) {
    if (taskInput.value) {
        //storing in local storage
        e.preventDefault();
        let task = taskInput.value.trim();
        let displayTask = localStorage.getItem('myTask') ? JSON.parse(localStorage.getItem('myTask')) : [];
        displayTask.unshift(task);
        localStorage.setItem('myTask', JSON.stringify(displayTask));
        // console.log(displayTask);
        taskInput.value = '';
    } else {
        alert('Please enter a task')
    }
    display();
    displayComplete();
})
display();
//display functionality
var completedTask;
function display() {
    let displayTask = localStorage.getItem('myTask') ? JSON.parse(localStorage.getItem('myTask')) : [];
    let eachTask = '';
    for (item of displayTask) {
        eachTask = eachTask + `<div class="card-body "id="cart"><input type="checkbox" name="" id="${item}"  class="form-check-input" value='${item}'><label for="${item}" class="form-check-label ps-2"><h6>${item}</h6></label></div>`
    }

    penddingTask.innerHTML = eachTask;
    //checkbox functionality
    let checkBoxes = document.querySelectorAll('.form-check-input');
    for (let checkBox of checkBoxes) {
        completedTask =localStorage.getItem('completedTask') ?JSON.parse(localStorage.getItem('completedTask')): [];

        checkBox.addEventListener('click', function () {
            if (checkBox.checked == true) {
                completedTask.unshift(checkBox.value);
            }
        })

    }
}
// complete warning
let deletePendding = document.querySelector(".cross");
let modalBox = document.getElementById("modal");
let closeModal = document.getElementById("cancle");
//show modal box
deletePendding.addEventListener('click', function () {
    modalBox.classList.remove('modal');
})
//hidding modal box
closeModal.addEventListener('click', function () {
    modalBox.classList.add('modal');
})
// localStorage.setItem('completedTask', JSON.stringify([]));

// filtering the completed task
let yes = document.querySelector('.yes');
yes.addEventListener('click', function () {
    modalBox.classList.add('modal');
    localStorage.setItem('completedTask', JSON.stringify(completedTask));
    // console.log(completedTask);
    let displayTask = JSON.parse(localStorage.getItem('myTask'));
    updatedTask = [];
    for (let i = 0; i < displayTask.length; i++) {
        let flag = false;
        for (let j = 0; j < completedTask.length; j++) {
            if (completedTask[i] == displayTask[j]) {
                flag = true;
            }
        }
        if (flag == false) {
            updatedTask.push(displayTask[i]);
        }
    }
    localStorage.setItem('myTask', JSON.stringify(updatedTask));
    display();
    displayComplete();
})
//display in complete box
let completeBox = document.getElementById('completed');
function displayComplete(){
    let completedTask =localStorage.getItem('completedTask') ?JSON.parse(localStorage.getItem('completedTask')): [];
    // console.log(completedTask);
    let eachCompletedTask = '';
    for (task of completedTask) {
        eachCompletedTask = eachCompletedTask + `<div class="card-body text"><h6>${task}</h6></div>`
    }

    completeBox.innerHTML = eachCompletedTask;
}
displayComplete();
//delete the complete box
let deleteTask=document.getElementById('delete');
deleteTask.addEventListener('click',function(){
    localStorage.setItem('completedTask', JSON.stringify([]));
    let eachCompletedTask = '';
    completeBox.innerHTML = eachCompletedTask;
})


