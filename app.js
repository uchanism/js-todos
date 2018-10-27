/*
[ISSUE]
- 프로그램 작성시 고려할 사항
  - 사용자 이벤트 관점
  - 프로그램 이벤트 관점
- 실행 컨텍스트란?
- this란?
- pseudocode(슈도코드) 작성법은?

[pseudocode]
  - ADD
  1. 값을 가져온다
  2. 값을 검사한다.
  3. 추가할 엘리먼트를 만든다.
  4. addBtn에 이벤트 발생 시 1,2,3 실행한다.

  - DELETE
  1. 

  - EDITE

*/

// [TODO] 즉시 실행 함수(IIFE)란? 사용한 이유는?
(function(){
  // [TODO] 변수를 사용하는 함수 스코프가 아닌, app.js 전역에 선언한 이유?
  var inpTask = document.getElementById('new-task'),
      addBtn = document.getElementById('btn-add'),
      incompleteList = document.getElementById('incomplete-tasks');
  
  // [TODO] 함수 선언식이 아닌 리터럴(표현식)으로 정의한 이유는?
  var addTask = function(event) {
      /* [TODO] 
        - 버블링, 캡처링이란? 
        - 버블링, 캡처링를 방지하는 법은?
        - this가 아닌 event.target을 지향하는 이유는? 
      */
      event.stopPropagation();
      
      // [TODO] 변수를 app.js 전역이 아닌 함수 스코프에 선언한 이유는?
      var task = validate(inpTask.value);

      if(task){
        incompleteList.appendChild(creatNewTaskElement(task));
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
      return false;
    }
    return task;
  }


  var creatNewTaskElement = function(task){
    // 각 요소 생성
    var listItem = document.createElement('li'),
        checkbox = document.createElement('input'),
        label = document.createElement('label'),
        btnEdit = document.createElement('button'),
        btnDelete = document.createElement('button');
        

        
    // 생성된 각 요소에 필요한 속성값 추가
    checkbox.type = "checkbox";
    btnEdit.className = "edit";
    btnEdit.innerText = "Edit";
    btnDelete.className = "delete";
    btnDelete.innerText = "Delete";

        
    // 사용자 입력 값 추가
    label.innerText = task;

    // 각 요소 머지
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(btnEdit);
    listItem.appendChild(btnDelete);

    console.log(listItem);

    return listItem;
  }

  addBtn.addEventListener('click', addTask);
})()