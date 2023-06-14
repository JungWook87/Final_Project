
// 날짜 조회
$(function() {
  $('input[name="daterange"]').daterangepicker({
    "locale": {
        "format": "YYYY-MM-DD",
        "separator": " ~ ",
        "applyLabel": "확인",
        "cancelLabel": "취소",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": ["월", "화", "수", "목", "금", "토", "일"],
        "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],   
    },
    "firstDayOfWeek": 1,
    "startDate": new Date(),
    "endDate": new Date(),
    "drops": "down"
}, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

    $.ajax({
      url : "workSendSelectDate",
      type : "GET",
      dataType : "JSON",
      data : {"start" : start.format('YYYY-MM-DD'),
              "end" : end.format('YYYY-MM-DD')
              },
      success : function(list){
        const listBody = document.getElementById("listBody");
        listBody.innerText = "";

        for(let item of list){
          const tr = document.createElement("tr");
          tr.classList.add('listTr');
          
          const td1 = document.createElement("td");
          td1.innerText = item.typeNo;
          td1.classList.add('listTypeNo');
          td1.style.display = 'none';

          const td2 = document.createElement("td");
          td2.innerText = item.typeName;

          const td3 = document.createElement("td");
          td3.innerText = item.workNo;

          const td4 = document.createElement("td");
          td4.innerText = item.title;

          const td5 = document.createElement("td");
          td5.innerText += item.workState;
          if(item.workState == '진행중'){
            td5.style.color = "var(--black)";
          } else if(item.workState == '승인'){
            td5.style.color = "var(--green)";
          } else{
            td5.style.color = "red";
          }

          const td6 = document.createElement("td");
          if(item.fileRename == null){
            td6.innerText = "없음";
          } else{
            td6.innerText = "있음";
          }

          const td7 = document.createElement("td");
          item.sendDate = item.sendDate.substring(0, 11);
          td7.innerText = item.sendDate;

          tr.append(td1, td2, td3, td4, td5, td6, td7);

          listBody.append(tr);
        }

        const attnTypeSelect = document.getElementById("attnTypeSelect");
        attnTypeSelect.value = 0;

      }
    });
  });
});

  // 모달창 스타일
const btn = document.getElementById('popupBtn');
const modal = document.getElementById('modalWrap');
const closeBtn = document.getElementById('closeBtn');
const modalBody = document.querySelector('.work-modalBody');
const cancellBtn = document.getElementById('cancell-btn');
const workModaltitle = document.querySelector('.work-modal-title');
const workStartDate = document.querySelector('.work-modal-startDate');
const workEndDate = document.querySelector('.work-modal-endDate');
const workTitle = document.querySelector('.work-modal-title > input');
const workContent = document.querySelector('.work-modal-detail > textarea');
const workApprover = document.querySelector('.work-modal-approver > input');
const workTemplateSelect = document.getElementById('work-template');
const normalCheckSelect = document.getElementById('normal-check');
const workDetail = document.querySelector('.work-modal-detail');
const workBusinessDetail = document.querySelector('.work-modal-businessDetail');
const workBusinessArea = document.querySelector('.work-modal-businessArea');



// 결제창 버튼 이벤트
btn.addEventListener("click", () => {
  workTitle.value = '';
  workContent.value = '';
  workApprover.value = '';

  modal.style.display = 'block';
  normalCheckSelect.style.display = 'block'; // 보이기
  workStartDate.style.display = 'none'; // 숨기기
  workEndDate.style.display = 'none'; // 숨기기
  workBusinessDetail.style.display = 'none' // 숨기기
  workBusinessArea.style.display = 'none'; // 숨기기
  modalBody.classList.add('modal-open');

}) 

// 모달창 엑스 버튼
closeBtn.addEventListener("click", () => {
  modalClose();
});

// 모달창 외부 영역 이벤트
window.onclick = function(event) {
  if (event.target == modal) {
    modalClose();
  }
}

// 취소버튼 이벤트
cancellBtn.addEventListener("click", () => {
  modalClose();
})

// 모달창 닫는 함수
function modalClose() {
  modalBody.classList.add('modal-close');
  
  setTimeout(() => {
    modal.style.display = 'none';
    modalBody.classList.remove("modal-close");
  }, 350);

  workContent.style.overflow = 'hidden';

  workContent.style.height = 'inherit';
}



// work-template 선택란의 값이 변경될 때마다 이벤트 핸들러 실행
workTemplateSelect.addEventListener('change', () => {
  // 선택된 옵션의 값 가져오기
  const selectedValue = workTemplateSelect.value;

  // vaction 선택란 보이거나 숨기기
  if (selectedValue === 'vacation') {
    workStartDate.style.display = 'block'; // 보이기
    workEndDate.style.display = 'block'; // 보이기
    workModaltitle.style.display = 'none'; // 숨기기
    workBusinessArea.style.display = 'none'; // 숨기기
    workBusinessDetail.style.display = 'none'; // 보이기
    workDetail.style.display = 'none'; // 숨기기
  } else {
  }


  // work-modal-businessArea 선택란을 보이거나 숨기기
  if (selectedValue === 'business trip') {
    workBusinessArea.style.display = 'block'; // 보이기
    workStartDate.style.display = 'block'; // 보이기
    workEndDate.style.display = 'block'; // 보이기
    workBusinessArea.style.display = 'block'; // 보이기
    workBusinessDetail.style.display = 'block'; // 보이기
    workModaltitle.style.display = 'none'; // 숨기기
    workDetail.style.display = 'none'// 보이기
  } else {

  }


  // normal-check 선택란을 보이거나 숨기기
  if (selectedValue === 'normal-check') {
    normalCheckSelect.style.display = 'block'; // 보이기
    workModaltitle.style.display = 'block'; // 보이기
    workStartDate.style.display = 'none'; // 숨기기
    workEndDate.style.display = 'none'; // 숨기기
    workBusinessDetail.style.display = 'none' // 숨기기
    workBusinessArea.style.display = 'none'; // 숨기기
    workDetail.style.display = 'block'// 보이기
    
  } else {
    normalCheckSelect.style.display = 'none'; // 숨기기
  }
});



// 자동 높이 조정 textarea

function handleResizeHeight(obj) {
  obj.style.height = 'auto';
  obj.style.height = obj.scrollHeight + 'px';
 
  
  const computedStyles = window.getComputedStyle(obj);
  if (obj.scrollHeight >= parseInt(computedStyles.maxHeight)) {
    obj.style.overflow = "scroll";
  } else {
    obj.style.overflow = "hidden";
  }
}


// 파일 업로드 스타일
const fileUpload = document.getElementById('file-uploads');
const preview = document.querySelector('.work-preview');

fileUpload.style.opacity = 0;

fileUpload.addEventListener('change', updateImageDisplay);

function updateImageDisplay(event) {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = fileUpload.files;
  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = '선택된 파일이 없습니다.';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if(validFileType(file)) {
        para.innerHTML = `파일 이름 - ${file.name}<br> 파일 크기 - ${returnFileSize(file.size)}.`;
  
        listItem.appendChild(para);
      } else {
        para.textContent = `파일 이름 - ${file.name}: 해당파일은 불러올수 없습니다.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }

  // 올린파일 들고오기
  const upFile = event.target.files[0];
  const reader = new FileReader();
  const fileInfo = `${upFile.name}`;

  reader.onload = function(e) {
    checkPreview.innerText = fileInfo;
  };

  reader.readAsDataURL(upFile);


  // 다운로드
  

}

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

// 파일 지우기
const fileRemove = document.getElementById("file-remove");

fileRemove.addEventListener("click", () => {
  preview.firstChild.remove();
  
})


// 글 추가시 나타나는 기능
const successBtn = document.getElementById('success-btn');


successBtn.addEventListener("click", () => {

  if(workTitle.value == "") {
    Swal.fire('제목을 입력해 주세요');
  } else if(workContent.value == '') {
    Swal.fire('내용을 입력해 주세요')
  }  else if(workApprover.value == '') {
      Swal.fire('결재자를 입력해 주세요')
  } else {
    
    const tr = document.createElement('tr');
    const tdType = document.createElement('td');
    const tdNum = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdSituation = document.createElement('td');
    const tdNode = document.createTextNode(workTitle.value);
    const tdFile = document.createElement('td');
    const tdDate = document.createElement('td');
  
    tdTitle.append(tdNode);
    tr.append(tdType,tdNum, tdTitle, tdSituation, tdFile, tdDate);
  
    document.querySelector('tbody').append(tr);
    
    // 수정 모달창 열기
    tr.addEventListener("click", function() {
      modifyModal();
    })
    
    // 모달 닫기
    modalClose();
  }

})

// 수정모달창
const checkModal = document.getElementById('check-modalWrap');
const checkCloseBtn = document.getElementById('check-closeBtn');
const checkModalBody = document.querySelector('.check-modalBody');
const checkCancellBtn = document.getElementById('check-cancell-btn');
const checkModalTitle = document.querySelector('.check-modal-title > input');
const checkModalDetail = document.querySelector('.check-modal-detail');
const checkPreview = document.querySelector('.check-preview');
const checkTemplate = document.querySelector('check-modal-template');


// 수정 모달창 오픈
function modifyModal() {
  
  // // 템플릿 밸류값 들고오기
  // checkTemplate.value = 

  // 제목 밸류값 들고오기
  checkModalTitle.value = workTitle.value;

  // textarea 밸류값 들고오기
  checkModalDetail.innerHTML = "";
  const checkModalDetailLines = workContent.value.split("\n");
  let resultString = "<p>";
  
  for (let i = 0; i < checkModalDetailLines.length; i++) {
    resultString += checkModalDetailLines[i] + "<br>";
  }

  resultString += "</p>";

  checkModalDetail.innerHTML = resultString;


  // 모달창 열기
  checkModal.style.display = 'block';
  checkModalBody.classList.add('check-modal-open');

}

// 수정 모달창 닫기
// 수정 모달창 닫는 함수
function checkModalClose() {
  checkModalBody.classList.add('check-modal-close');
  
  setTimeout(() => {
    checkModal.style.display = 'none';
    checkModalBody.classList.remove("check-modal-close");
  }, 350);

  workContent.style.overflow = 'hidden';

  workContent.style.height = 'inherit';
}

// 모달창 엑스 버튼
checkCloseBtn.addEventListener("click", () => {
  checkModalClose();
});

// 모달창 외부 영역 이벤트
$(window).click(function(event) {
  if (event.target == checkModal) {
    checkModalClose();
  }
});

// 취소버튼 이벤트
checkCancellBtn.addEventListener("click", () => {
  checkModalClose();
});

// 근무 타입 select
const attnTypeSelect = document.getElementById("attnTypeSelect");

attnTypeSelect.addEventListener("change", function(){
  
  let attnTypeSelectValue = attnTypeSelect.value;
  let tbody = document.getElementById("listBody");
  let trCount = tbody.getElementsByTagName("tr").length;
  let listTr = document.getElementsByClassName("listTr");
  const listTypeNo = document.getElementsByClassName("listTypeNo");

  console.log("trCount : " + trCount);

  for(let i = 0; i < trCount; i++){
    listTr[i].removeAttribute("style", "display:none");
  }

  if(attnTypeSelectValue == 1){ 
    for(let i = 0; i < trCount; i++){
      if(listTypeNo[i].innerText != 1){
        listTr[i].setAttribute("style", "display:none");
      }
    }
  } else if(attnTypeSelectValue == 2){
    for(let i = 0; i < trCount; i++){
      if(listTypeNo[i].innerText != 2){
        listTr[i].setAttribute("style", "display:none");
      }
    }
  } else if(attnTypeSelectValue == 3){
    for(let i = 0; i < trCount; i++){
      if(listTypeNo[i].innerText != 3){
        listTr[i].setAttribute("style", "display:none");
      }
    }
  } else{
    for(let i = 0; i < trCount; i++){
      listTr[i].removeAttribute("style", "display:none");
    }
  }

})



  