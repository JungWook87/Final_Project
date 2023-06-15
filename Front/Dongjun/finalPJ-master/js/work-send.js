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
    "startDate": "2023-06-5",
    "endDate": "2023-06-30",
    "drops": "down"
}, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});

  // 모달창 스타일
const btn = document.getElementById('popupBtn');
const modal = document.getElementById('modalWrap');
const approverModal = document.getElementById('approver-modal-wrap')
const closeBtn = document.getElementById('closeBtn');
const approverCloseBtn = document.getElementById('approver-closeBtn');
const plusBtn = document.getElementById('pulsProject');
const pulsApproverBtn = document.getElementById('pulsApprover'); 
const modalBody = document.querySelector('.work-modalBody');
const approverModalBody = document.querySelector('.approver-modal-Body');
const cancellBtn = document.getElementById('cancell-btn');
const approverCancellBtn = document.getElementById('approver-cancell-btn');
const workModaltitle = document.querySelector('.work-modal-title');
const workStartDate = document.querySelector('.work-modal-startDate');
const workEndDate = document.querySelector('.work-modal-endDate');
const workTitle = document.querySelector('.work-modal-title > input');
const workContent = document.querySelector('.work-modal-detail textarea');
const workApprover = document.querySelector('.work-modal-approver > input');
const workTemplateSelect = document.getElementById('work-template');
const normalCheckSelect = document.getElementById('normal-checked');
const projectCheckSelect = document.getElementById('project-checked');
const assignmentCheckSelect = document.getElementById('assignment-checked');
const workDetail = document.querySelector('.work-modal-detail');
const workProjectbox = document.querySelector('.projectBox');
const workBusinessDetail = document.querySelector('.work-modal-businessDetail');
const workBusinessArea = document.querySelector('.work-modal-businessArea');
const modalProjectbox = document.querySelector('.work-modal-projectBox');



// 결제창 버튼 이벤트
btn.addEventListener("click", () => {
  workTitle.value = '';
  workContent.value = '';
  workApprover.value = '';
  workBusinessArea.querySelector('input').value = '';
  workBusinessDetail.querySelector('textarea').value = '';
  workProjectbox.querySelectorAll('input').forEach(input => input.value = '');
  

  workTemplateSelect.value = 'normal-check';

  modal.style.display = 'block';
  workModaltitle.style.display = 'block';
  normalCheckSelect.style.display='block';
  modalProjectbox.style.display ='none';
  workProjectbox.style.display = 'none';
  workStartDate.style.display = 'none'; 
  workEndDate.style.display = 'none';
  workBusinessDetail.style.display = 'none' 
  workBusinessArea.style.display = 'none';
  projectCheckSelect.style.display = 'none';
  assignmentCheckSelect.style.display = 'none';
  modalBody.classList.add('modal-open');

}) 

// 모달창 엑스 버튼
closeBtn.addEventListener("click", () => {
  modalClose();
  console.log("hi");
});

// 모달창 플러스 버튼
plusBtn.addEventListener("click", () => {

  const div = document.createElement('div');
  div.style.borderTop = '1px solid var(--gray400)';
  div.style.marginBlockStart = '20px';
  div.style.padding = '10px';
  const projectName = document.createElement('p');
  projectName.innerText = "과제명"
  const projectcontentName = document.createElement('p');
  projectcontentName.innerText = "과제내용"
  const projectcontent1 = document.createElement('input');
  const projectcontent2 = document.createElement('input');
  const buttonDiv = document.createElement('div'); // 취소 버튼을 감싸는 div 요소
  buttonDiv.style.display = 'flex';
  buttonDiv.style.justifyContent = 'end';
  const xbutton = document.createElement('button');
  xbutton.innerText = "취소";

  buttonDiv.appendChild(xbutton); // 취소 버튼을 buttonDiv에 추가
  div.append(projectName, projectcontent1, projectcontentName, projectcontent2, buttonDiv);
  workProjectbox.append(div);

  xbutton.addEventListener("click", () => {
    workProjectbox.removeChild(div);
  })

  btn.addEventListener("click", () =>{
     workProjectbox.removeChild(div);
  })

  workTemplateSelect.addEventListener('change', () => {
     workProjectbox.removeChild(div);
  })

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

  console.log("selectedValue",selectedValue);
  workTitle.value = '';
  workContent.value = '';
  workApprover.value = '';
  workBusinessArea.querySelector('input').value = '';
  workBusinessDetail.querySelector('textarea').value = '';
  workProjectbox.querySelectorAll('input').forEach(input => input.value = '');


  normalCheckSelect.style.display='none';
  workModaltitle.style.display='none';
  workBusinessArea.style.display ='none';
  workStartDate.style.display = 'none';
  workEndDate.style.display = 'none'; 
  workBusinessDetail.style.display = 'none';
  workDetail.style.display = 'none';
  workProjectbox.style.display = 'none';
  modalProjectbox.style.display = 'none';
  projectCheckSelect.style.display = 'none';
  assignmentCheckSelect.style.display = 'none';

  if (selectedValue === 'normal-check') {
    normalCheckSelect.style.display = 'block';
    workModaltitle.style.display = 'block'; 
    workDetail.style.display = 'block';

  } 

  if(selectedValue === 'business-trip') {
    workBusinessArea.style.display = 'block'; 
    workStartDate.style.display = 'block'; 
    workEndDate.style.display = 'block'; 
    workBusinessArea.style.display = 'block'; 
    workBusinessDetail.style.display = 'block'; 
  }

  if(selectedValue === 'vacation') {
    workStartDate.style.display = 'block'; 
    workEndDate.style.display = 'block'; 

  }

  if(selectedValue === 'project') {
    workModaltitle.style.display = 'block'; 
    workDetail.style.display = 'block'
    workProjectbox.style.display = 'block';
    modalProjectbox.style.display = 'block';
  }

  if(selectedValue === 'assignment') {
    projectCheckSelect.style.display = 'block';
    assignmentCheckSelect.style.display = 'block';
    workDetail.style.display = 'block'
  }
  
})

// 결재자 클릭 이벤트
pulsApproverBtn.addEventListener("click",() => {
  approverModal.style.display = 'block';
  approverModalBody.classList.add('approver-modal-open')
})

// 결재자 모달창 외부 영역 이벤트 (수정해야됨)
window.onclick = function(event) {
  if (event.target == approverModal) {
    aproverModalClose();
  }
}

approverCloseBtn.addEventListener("click", () =>{
  aproverModalClose();
})

// 결재자 모달창 취소버튼 이벤트
approverCancellBtn.addEventListener("click", () => {
  aproverModalClose();
})


// 결재자 모달창 닫는 함수
function aproverModalClose() {
  approverModalBody.classList.add('approver-modal-close');
  
  setTimeout(() => {
    approverModal.style.display = 'none';
    approverModalBody.classList.remove("approver-modal-close");
  }, 350);

  // workContent.style.overflow = 'hidden';

  // workContent.style.height = 'inherit';
}

 // 결재자 클릭 이벤트 핸들러
  // const approverCheck = document.querySelectorAll('#approver-checkBox');
  // const approverCheckData = document.querySelectorAll('');

  // approverCheck.addEventListener('click', ()=> {
  
// var anchorTags = document.querySelectorAll('#menu2 a'); // #menu2 내부의 모든 <a> 태그 선택
//   for (var i = 0; i < anchorTags.length; i++) {
//     var checkbox = anchorTags[i].querySelector('input[type="checkbox"]'); // <a> 태그 내부의 체크박스 선택
//     checkbox.addEventListener('change', function() {
//       if (this.checked) {
//         var clickedData = this.parentNode.textContent.trim(); // 클릭한 <a> 태그의 텍스트 데이터 가져오기
//         console.log(clickedData); // 가져온 데이터 콘솔에 출력 (원하는 작업으로 대체 가능)
//       }
//     });
//   }
// });
const approverSuccessBtn = document.getElementById('approver-success-btn');
const pTags = document.querySelectorAll('#menu2 p'); // #menu2 내부의 모든 <p> 태그 선택

approverSuccessBtn.addEventListener("click", () => {
  let checkedValue = null;
  for (let i = 0; i < pTags.length; i++) {
    let radio = pTags[i].querySelector('input[type="radio"]'); // <p> 태그 내부의 라디오 버튼 선택
    if (radio.checked) {
      checkedValue = radio.value; // 체크된 라디오 버튼의 값 가져오기
      break; // 첫 번째 선택된 값을 가져왔으면 반복문 종료
    }
  }

  if (checkedValue) {
    console.log("라디오 버튼이 체크되었습니다. 선택된 값:", checkedValue);
    approverModalWrap.style.display = 'none'; // 모달창 숨기기
  } else {
    console.log("라디오 버튼이 체크되지 않았습니다.");
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

  // if(workTitle.value == "") {
  //   Swal.fire('제목을 입력해 주세요');
  // } else if(workContent.value == '') {
  //   Swal.fire('내용을 입력해 주세요')
  // }  else 
  if(workApprover.value == '') {
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
const checkModalBody = document.querySelector('.check-modalBody');
const checkCancellBtn = document.getElementById('check-cancell-btn');
const checkCloseBtn = document.getElementById('check-closeBtn');
const checkSuccessBtn = document.getElementById('check-success-btn');
const checkModalTitle = document.querySelector('.check-modal-title');
const checkModalTitleText = document.querySelector('.check-modal-title > input');
const checkBusinessArea = document.querySelector('.check-modal-businessArea');
const checkBusinessAreaText = document.querySelector('.check-modal-businessArea > input');
const checkStartDate = document.querySelector('.check-modal-startDate');
const checkStartDateText = document.querySelector('.check-modal-startDate > input');
const checkEndDate = document.querySelector('.check-modal-endDate');
const checkEndDateText = document.querySelector('.check-modal-endDate > input');
const checkTemplate = document.querySelector('check-modal-template');
const checkModalDetail = document.querySelector('.check-modal-detail');
const checkModalDetailText = document.querySelector('.check-modal-detail textarea');

// 올릴꺼
const workBusinessAreaText = document.querySelector('.work-modal-businessArea > input');

//올릴꺼
const workStartDateText = document.querySelector('.work-modal-startDate > input');
//올릴꺼
const workEndDateText = document.querySelector('.work-modal-endDate > input');
//올릴꺼
const workBusinessDetailText = document.querySelector('.work-modal-businessDetail > textarea');

const checkBusinessDetail = document.querySelector('.check-modal-businessDetail');
const checkBusinessDetailText = document.querySelector('.check-modal-businessDetail > textarea');

const checkApprover = document.querySelector('.check-modal-approver');
const checkApproverText = document.querySelector('.check-modal-approver > input');

const checkPreview = document.querySelector('.check-preview');




// 수정 모달창 오픈
function modifyModal() {
  
  // // 템플릿 밸류값 들고오기
  // checkTemplate.value = workTemplateSelect.value

  // 제목 밸류값 들고오기
  checkModalTitleText.value = workTitle.value;

  // 출장지 밸류값 들고오기
  checkBusinessAreaText.value = workBusinessAreaText.value;
  // 시작날짜 밸류값 들고오기
  checkStartDateText.value = workStartDateText.value;
  // 종료날짜 밸류값 들고오기
  checkEndDateText.value= workEndDateText.value;

  // textarea 밸류값 들고오기
  checkModalDetailText.value = workContent.value;
 
  // 출장내용 밸류값 들고오기
    checkBusinessDetailText.value = workBusinessDetailText.value



  // 결재자 밸류값 들고오기
   checkApproverText.value = workApprover.value

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



// 수정버튼 이벤트
let isEditMode = false; // 초기 상태는 편집 모드가 아님

checkSuccessBtn.addEventListener('click', function() {
  if (!isEditMode) {
    // 제목
    const titleInput = document.querySelector('.check-modal-title input');
    titleInput.readOnly = false;

    // 출장지
    const businessAreaInput = document.querySelector('.check-modal-businessArea input');
    businessAreaInput.readOnly = false;

    // 시작날짜
    const startDateInput = document.querySelector('.check-modal-startDate input');
    startDateInput.readOnly = false;

    // 종료날짜
    const endDateInput = document.querySelector('.check-modal-endDate input');
    endDateInput.readOnly = false;

    // 출장 내용
    const businessDetailTextarea = document.querySelector('.check-modal-businessDetail textarea');
    businessDetailTextarea.readOnly = false;

    // 결재자
    const approverInput = document.querySelector('.check-modal-approver input');
    approverInput.readOnly = false;

    isEditMode = true; // 편집 모드로 변경
    checkSuccessBtn.textContent = '저장'; // 버튼 텍스트 변경
  } else {
    // 수정된 내용을 저장하는 로직 추가
    // ...

    // 제목
    const titleInput = document.querySelector('.check-modal-title input');
    titleInput.readOnly = true;

    // 출장지
    const businessAreaInput = document.querySelector('.check-modal-businessArea input');
    businessAreaInput.readOnly = true;

    // 시작날짜
    const startDateInput = document.querySelector('.check-modal-startDate input');
    startDateInput.readOnly = true;

    // 종료날짜
    const endDateInput = document.querySelector('.check-modal-endDate input');
    endDateInput.readOnly = true;

    // 출장 내용
    const businessDetailTextarea = document.querySelector('.check-modal-businessDetail textarea');
    businessDetailTextarea.readOnly = true;

    // 결재자
    const approverInput = document.querySelector('.check-modal-approver input');
    approverInput.readOnly = true;

    isEditMode = false; // 편집 모드 비활성화
    checkSuccessBtn.textContent = '수정'; // 버튼 텍스트 변경
  }
});

 // 결재자 클릭 이벤트 핸들러
  // const approverCheck = document.querySelectorAll('#approver-checkBox');
  // const approverCheckData = document.querySelectorAll('');

  // approverCheck.addEventListener('click', ()=> {

  // })
