// 모달창 스타일
const btn = document.getElementById('popupBtn');
const modal = document.getElementById('modalWrap');
const closeBtn = document.getElementById('closeBtn');
const modalBody = document.querySelector('.modalBody');
const cancellBtn = document.getElementById('cancell-btn');
const noticeTitle = document.querySelector('.modal-title > input');
const noticeContent = document.querySelector('.modal-detail > textarea');

// 공지사항 버튼 이벤트
btn.addEventListener("click", () => {
  // 초기화
  noticeTitle.value = '';
  noticeContent.value = '';
  if(preview.firstChild != null) {
    preview.firstChild.remove();
  }

  modal.style.display = 'block';
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

  noticeContent.style.overflow = 'hidden';

  noticeContent.style.height = 'inherit';
}



// 자동 높이 조정 textarea

function handleResizeHeight(obj) {
  obj.style.height = 'auto';
  obj.style.height = obj.scrollHeight + 'px';
 
  
  const computedStyles = window.getComputedStyle(obj);
  if (obj.scrollHeight >= parseInt(computedStyles.maxHeight)) {
    obj.style.overflow = "scroll";
    obj.style.overflowX = "hidden";
  } else {
    obj.style.overflow = "hidden";
  }
}


// 파일 업로드 스타일
const fileUpload = document.getElementById('file-uploads');
const preview = document.querySelector('.preview');

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
  // 이미지 파일
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
  
  // 텍스트 파일
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
  
  // 음악 파일
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  
  // 비디오 파일
  "video/mpeg",
  "video/mp4",
  "video/quicktime",
  
  // 문서 파일
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  
  // 압축 파일
  "application/zip",
  "application/x-rar-compressed",
  "application/x-tar",
  
  // 기타 파일 유형
  "application/octet-stream"
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

  if(noticeTitle.value == "") {
    Swal.fire('제목을 입력해 주세요');
  } else if(noticeContent.value == '') {
    Swal.fire('내용을 입력해 주세요')
  } else {
    
    // 모달 닫기
    modalClose();
  }

})



// 게시글 작성 유효성 검사
// function writeValidate(){
//   const noticeTitle = document.getElementsByName("noticeTitle")[0];
//   const noticeContent = document.querySelector("[name='noticeContent']");

//   if(noticeTitle.value.trim().length == 0){
//       alert("제목을 입력해주세요!!!");
//       noticeTitle.value = "";
//       noticeTitle.focus();
//       return false;
//   }

//   if(noticeContent.value.trim().length == 0){
//       alert("내용을 입력해주세요!!!");
//       noticeContent.value = "";
//       noticeContent.focus();
//       return false;
//   }
//   return true;
// }





// 게시글디테일
const contextPath = "${contextPath}";

const checkModal = document.getElementById('check-modalWrap');
const checkCloseBtn = document.getElementById('check-closeBtn');
const checkModalBody = document.querySelector('.check-modalBody');
const checkCancellBtn = document.getElementById('check-cancell-btn');
const checkModalTitle = document.querySelector('.check-modal-title');
const checkModalDetail = document.querySelector('.check-modal-detail');
const checkPreview = document.querySelector('.check-preview');

// 게시글 디테일 창 오픈
function detailModal(boardNo) {

  console.log(boardNo);

  $.ajax({
    url : "deptBoard/boardDetail",
    data : {"boardNo" : boardNo},
    type : "GET",
    dataType : "JSON",
    success : function(detail){

      const checkModalTitleSpan = document.createElement("span");
      checkModalTitleSpan.innerText = detail.boardTitle;
      checkModalTitle.append(checkModalTitleSpan);

      const checkModalDetailSpan = document.createElement("span");
      checkModalDetailSpan.innerHTML = detail.boardContent;
      checkModalDetail.append(checkModalDetailSpan);

      
      console.log(detail.fileRename);

      const checkPreviewA = document.createElement("a");
      checkPreviewA.innerText = detail.boardFileOrigin;
      checkPreviewA.href = "/intranet" + detail.boardFileRename;
      checkPreviewA.download = detail.boardFileOrigin;
      checkPreview.append(checkPreviewA); 
      
      // 모달창 열기
      checkModal.style.display = 'block';
      checkModalBody.classList.add('check-modal-open');    
    
    },
    error : function(req, status, error){
      console.log("에러 발생");
      console.log(req.responseText);
  }
  })
  

}

// 수정 모달창 닫기
// 수정 모달창 닫는 함수
function checkModalClose() {
  checkModalBody.classList.add('check-modal-close');


   // checkModalTitle 비우기
   checkModalTitle.innerHTML = '';
   // checkModalDetail 비우기
   checkModalDetail.innerHTML = '';
   // checkPreview 비우기
   checkPreview.innerHTML = '';

  setTimeout(() => {
    checkModal.style.display = 'none';
    checkModalBody.classList.remove("check-modal-close");
  }, 350);

  noticeContent.style.overflow = 'hidden';

  noticeContent.style.height = 'inherit';
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




