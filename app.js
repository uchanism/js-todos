/*
[ISSUE]
- 프로그램 작성시 고려할 사항
  - 사용자 이벤트 관점
  - 프로그램 이벤트 관점
- 실행 컨텍스트란?
- this란?
- pseudocode(슈도코드) 작성법은?

[pseudocode]
  - BASE
  1. 각 버튼(delete, edit, checkbox)에 이벤트 바인딩
    1-1. 각 아이템에 접근
    1-2. 각 버튼별 이벤트 바인딩

  - ADD
  1. 값을 가져온다
  2. 값을 검사한다.
  3. 추가할 엘리먼트를 만든다.
  4.  
  5. addBtn에 이벤트 발생 시 completedList에 가공된 listItem을 추가한다.

  - DELETE
  1. 이벤트가 일어난 해당 요소를 가져온다.
    1. TODO, COMPLETED 리스트의 각 아이템을 가져온다.
    2. 각 아이템에 이벤트를 바인딩 해준다.
  2. 해당 요소를 삭제한다.
    1. 이벤트가 바인딩된 각 아이팀에 삭제 이벤트가 발생하도록 콜백함수를 연결한다.

  - EDITE

*/

// [TODO] 즉시 실행 함수(IIFE)란? 사용한 이유는?
(function(){
  // [TODO] 변수를 사용하는 함수 스코프가 아닌, app.js 전역에 선언한 이유?
  var inpTask = document.getElementById('new-task'),
      addBtn = document.getElementById('btn-add'),
      incompleteList = document.getElementById('incomplete-tasks'),
      completedList = document.getElementById('completed-tasks');
      
  var createNewTaskElement = function(task){
    // 각 요소 생성
    var listItem = document.createElement('li'),
        checkbox = document.createElement('input'),
        label = document.createElement('label'),
        inpEdit = document.createElement('input'),
        btnEdit = document.createElement('button'),
        btnDelete = document.createElement('button');
        

        
    // 생성된 각 요소에 필요한 속성값 추가
    checkbox.type = "checkbox";
    inpEdit.type = "text";

    btnEdit.className = "btn-edit";
    btnEdit.innerText = "Edit";
    btnDelete.className = "btn-delete";
    btnDelete.innerText = "Delete";

        
    // 사용자 입력 값 추가
    label.innerText = task;

    // 각 요소 머지
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(inpEdit);
    listItem.appendChild(btnEdit);
    listItem.appendChild(btnDelete);

    console.log(listItem);

    return listItem;
  }
      
  // [TODO] 함수 선언식이 아닌 리터럴(표현식)으로 정의한 이유는?
  var addTask = function(event) {
      /* [TODO] 
        - 버블링, 캡처링이란? 
        - 버블링, 캡처링를 방지하는 법은?
        : https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/
        - event.target을 지향하는 이유는? 
        : https://www.zerocho.com/category/JavaScript/post/57432d2aa48729787807c3fc
        - event.target과 event.current
        : https://webisfree.com/2017-09-06/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-event-target-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0%EC%99%80-currenttarget-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%80
      */

      // 이벤트 전파 방지  
      event.stopPropagation();

      var task = validate(inpTask.value);

      if(task){
        var listItem = createNewTaskElement(task);
        incompleteList.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        inpTask.value = "";
      }
  }

  var validate = function(task){
    /*[TODO] 검증하기
      - 사용자 입력값이 null 일때
      - 사용자 입력값이 undefined 일때
      - 사용자 입력값이 '' 일때

      [3.1.4 null과 undefined]
      https://github.com/uchanism/hello-javascript/tree/master/inside/03%20%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%ED%83%80%EC%9E%85%EA%B3%BC%20%EC%97%B0%EC%82%B0%EC%9E%90
    */
    if(task === null || task == undefined || task.trim() == ''){
      alert('할일을 입력해주세요');
      inpTask.focus();
      return false;
    }
    return task;
  }

  addBtn.addEventListener('click', addTask);


  /*
  [pseudocode]

  - DELETE
  1. 이벤트가 일어난 해당 요소를 가져온다.
    1-1. TODO, COMPLETED 리스트의 각 아이템을 가져온다.
    1-2. 각 아이템에 이벤트를 바인딩 해준다.
  2. 해당 요소를 삭제한다.
    2-1. 이벤트가 바인딩된 각 아이팀에 삭제 이벤트가 발생하도록 콜백함수를 연결한다.
  */

  var deleteTask = function() {
    console.log('deleteTask');
    event.stopPropagation();

    var listItem = this.parentNode,
        ul = listItem.parentNode;

        ul.removeChild(listItem);
  }

  var taskCompleted=function() {
    console.log('Complete Task...');

    var listItem = this.parentNode;
    completedList.appendChild(listItem);
      bindTaskEvents(listItem, taskIncomplete)
  }

  var taskIncomplete=function() {
    console.log('Incomplete Task...');

    var listItem = this.parentNode;
    incompleteList.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted)
  }

  var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log('bind list item events');
    var checkBox = taskListItem.querySelector("input[type=checkbox]"),
        editButton = taskListItem.querySelector(".btn-edit"),
        deleteButton = taskListItem.querySelector(".btn-delete");

        // checkBox.addEventListener('change', checkBoxEventHandler);
        // console.log(checkBoxEventHandler)
        // deleteButton.addEventListener('click', deleteTask);
        // editButton.addEventListener('click', editTask);

        checkBox.onchange=checkBoxEventHandler;
        deleteButton.onclick=deleteTask;
        editButton.onclick=editTask;
  }

  var editTask = function() {
    console.log("Edit Task...");


    var listItem = this.parentNode;
    console.dir(listItem)

    var editInput = listItem.querySelector('input[type=text]'),
        label = listItem.querySelector('label'),
        containsClass = listItem.classList.contains('editMode');

        if(containsClass) {
          label.innerText = editInput.value;
        } else {
          console.dir(editInput)
          editInput.value = label.innerText;
        }

        listItem.classList.toggle('editMode');
  }


  // BASE
  for (var i = 0; i<incompleteList.children.length; i++) {
    bindTaskEvents(incompleteList.children[i], taskCompleted)
  }

  for (var i = 0; i<completedList.children.length; i++) {
    bindTaskEvents(completedList.children[i], taskIncomplete)
  }

})()