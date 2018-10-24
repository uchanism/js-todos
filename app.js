(function(){
  var inpTask = document.getElementById('new-task'),
      addBtn = document.getElementById('add-btn'),
      taskList = document.getElementById('incomplete-tasks');


  var creatNewTaskElement = function(){
    var listItem = document.createElement('li'),
        checkbox = document.createElement('input'),
        label = document.createElement('label'),
        btnEdit = document.createElement('button'),
        btnDelete = document.createElement('button');
        
        console.dir(btnEdit);

        checkbox.type = "checkbox";
        label.innerText = inpTask.value;
        btnEdit.className = "edit";
        btnEdit.innerText = "Edit";
        btnDelete.class = "delete";
        btnDelete.innerText = "Delete";


        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(btnEdit);
        listItem.appendChild(btnDelete);

        console.log(listItem);

        taskList.appendChild(listItem);
  }


  var addNewTaskEleemnt = function(event){
    event.stopPropagation();
    creatNewTaskElement();
  }
  

  addBtn.addEventListener('click',addNewTaskEleemnt);
  

})()