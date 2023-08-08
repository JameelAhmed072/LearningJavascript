// const addUserBtn = document.getElementById('addUser');
// const btnText = addUserBtn.innerText;

// const userNametextField = document.getElementById('userName');
// const displayRecords = document.getElementById('records');

// let myTasks = [];
// edit_id = null;

// addUserBtn.onclick=()=>{
//     // const task = userNametextField.value;

//     // if(edit_id != null){
//     //     //edit
//     //     myTasks.splice(edit_id,1,{'task':task});
//     //     edit_id = null;
//     // }else{
//     //     myTasks.push({'task':task});
//     // }
//     // DisplayInfo();
//     // userNametextField.value = '';
//     // addUserBtn.innerText = btnText;

//     var obj = {
//         task: "gym"
//     }
//     let ajax = new XMLHttpRequest()
//     ajax.open('POST' , 'http://localhost:3008/task')
//     ajax.setRequestHeader('content-type' , 'application/json')
//     ajax.onprogress = function(){} // inprogress
//     ajax.onload = function(){
//         var data = this.response
//         console.log(this.response);
//         ajax.addEventListener('load',function(){
//             data = JSON.parse(ajax.responseText);

//             var html = '';
//             data.forEach(data =>{
//                 html += `
//                     <div>
//                         <h1>${data.title}</h1>
//                         <p>${data.author}</p>
//                         <p>${data.id}</p>
//                     </div>
//                 `; 
//             });
//             document.getElementById('data').innerHTML = html
//         })
//         // request.addEventListener('load',function(){
//         //     // convert JSON string to JavaScript Object,
//         //  data = JSON.parse(ajax.responseText);
//         //     // console.log(data);
//         //     console.log(ajax.responseText);
    
//         //     var html = '';
//         //     debugger
    
//         //     data.forEach(data => {
//         //         html += `
//         //             <div>
//         //                 <h1>${data.title}</h1>
//         //                 <p>${data.author}</p>
//         //                 <p>${data.id}</p>
//         //             </div>
//         //         `;
//         //     });
//         //     // // finally insert this html into web
//             // let authorList = document.querySelector('.data');
//             // authorList.insertAdjacentHTML('beforeend', html);
    
//             // document.getElementById('data').innerHTML = html
//         // });
//     }

//     ajax.send(JSON.stringify(obj))

// }

// function DisplayInfo(){
//     let statement = '';
//     myTasks.forEach((data,i) => {
//         statement += `<tr class="user-row">
//         <td>${i + 1}</td>
//         <td>${data.task}</td>
//         <td><i id="edit" class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i>
//         <i class="btn btn-danger text-white fa fa-trash-o" onclick='DeleteInfo(${i})'></i></td>
//         <td><input class="form-check-input" type="checkbox" onchange='ToggleRowBackgroundColor(this, ${i})'></td>
        
//     </tr>`
//     });
//     displayRecords.innerHTML = statement;
// }
// function ToggleRowBackgroundColor(checkbox, index) {
//     const row = checkbox.closest('.user-row');
//     if (checkbox.checked) {
//         row.classList.add('checked-row');
//         // Add a delay before calling DeleteInfo
//         setTimeout(function() {
//             DeleteInfo(index);
//         }, 1000); // Adjust the delay time as needed
//     } else {
//         row.classList.remove('checked-row');
//     }
// }
// function EditInfo(id){
//     edit_id = id;
//     userNametextField.value = myTasks[id].task;
//     addUserBtn.innerText = 'Save Changes';
// }
// function DeleteInfo(id){
//     myTasks.splice(id,1);
//     DisplayInfo();
// }


//---------------------------------------------------------------------------------------------------------------//


const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;

const userNametextField = document.getElementById('userName');
const displayRecords = document.getElementById('data');

edit_id = null;

addUserBtn.onclick = () => {
    const taskText = userNametextField.value;
    const taskData = { task: taskText };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3008/task', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201) {
                userNametextField.value = '';
                fetchAndDisplayTasks();
                
            } else {
                console.error('Error adding task:', xhr.status, xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(taskData));
};
function fetchAndDisplayTasks() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3008/task', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                DisplayInfo(data);
            } else {
                console.error('Error fetching tasks:', xhr.status, xhr.statusText);
            }
        }
    };
    xhr.send();
}
function DisplayInfo(tasks) {
    let html = '';
    tasks.forEach((data, i) => {
        html += `
            <tr class="user-row">
                <td>${i + 1}</td>
                <td>${data.task}</td>
                <td><i class="fa fa-edit" onclick="EditInfo(${data.id})"></i> 
                <i class="fa fa-trash" onclick="DeleteInfo(${data.id})"></i></td>
                <td><input class="form-check-input" type="checkbox" onchange="ToggleRowBackgroundColor(this, ${data.id})"></td>
            </tr>
        `;
    });
    displayRecords.innerHTML = html;
}

function EditInfo(id) {
    edit_id = id;
    userNametextField.value = tasks[id].task;
    addUserBtn.innerText = 'Save Changes';
}

function DeleteInfo(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:3008/task/${id}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                fetchAndDisplayTasks();
            } else {
                console.error('Error deleting task:', xhr.status, xhr.statusText);
            }
        }
    };
    xhr.send();
}

// Fetch and display tasks when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayTasks);