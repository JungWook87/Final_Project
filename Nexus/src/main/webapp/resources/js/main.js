
const attn_btn2 = document.getElementsByClassName("main-attn-btn2");
const attn_start = document.getElementById("attn-start");
const attn_end = document.getElementById("attn-end");

attn_btn2[0].addEventListener("click", function() {
    
    const now = new Date();

    let attn_time_hours = now.getHours();
    let attn_time_minutes = now.getMinutes();
    
    let working_time = document.getElementsByClassName("main-font-title");

    attn_btn2[0].addEventListener('mouseover', function() {
        attn_btn2[0].style.backgroundColor = 'var(--gray500)';
      });
      
      attn_btn2[0].addEventListener('mouseout', function() {
        attn_btn2[0].style.backgroundColor = 'var(--gray400)';
      });


    if(attn_time_hours < 10){
        attn_time_hours = "0" + attn_time_hours;
    }

    if(attn_time_minutes < 10){
        attn_time_minutes = "0" + attn_time_minutes;
    }
    
    attn_start_hours = attn_time_hours;
    attn_start_minutes = attn_time_minutes;
    
    if(attn_btn2[0].innerText == "업무시작"){
        if(true){
            attn_start.innerText = attn_start_hours + " : " + attn_start_minutes;
            attn_btn2[0].innerText = "업무종료";
            attn_btn2[0].style.backgroundColor = 'var(--gray400)';
    
            document.getElementById("main-attn-circle").style.backgroundColor = 'springgreen';
            working_time[0].innerText = "업무중 : 0시간 0분";
    
            $.ajax({
                url : "attendance/attn_hours",
                type : "GET",
                dataType : "JSON",
                data : {"type" : "start",
                        "hours" : attn_start_hours,
                        "minutes" : attn_start_minutes}
    
            });
        } else{
            Swal.fire(
                '금일은 출근이 완료되었습니다.',
                '자세한 사항은 인사부에 문의해주세요.',
                'warning'
            );
        }

    } else{
        Swal.fire({
            title: '업무를 종료하시겠습니까?',
            text: '다시 되돌릴 수 없습니다. 신중하세요.',
            icon: 'warning',
            
            showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            confirmButtonText: '확인', // confirm 버튼 텍스트 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정
            
         }).then(result => {
            // 만약 Promise리턴을 받으면,
            if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
            
                attn_end.innerText = attn_time_hours + " : " + attn_time_minutes;
                attn_btn2[0].innerText = "업무시작";
                attn_btn2[0].style.backgroundColor = '#CEE0FA';
    
                document.getElementById("main-attn-circle").style.backgroundColor = '#B4BBC5';
            
                $.ajax({
                    url : "attendance/attn_hours",
                    type : "GET",
                    dataType : "JSON",
                    data : {"type" : "end",
                            "hours" : attn_time_hours,
                            "minutes" : attn_time_minutes}
                    
                });

                let workingHour = Number(attn_end.innerText.split(" : ")[0])  - Number(attn_start.innerText.split(" : ")[0]);
                let workingMinute = Number(attn_end.innerText.split(" : ")[1])  - Number(attn_start.innerText.split(" : ")[1]);

                document.getElementsByClassName("main-font-title")[0].innerText = "업무종료 : " + workingHour + " 시간 " + workingMinute + " 분";

               Swal.fire('퇴근이 완료되었습니다.', '오늘도 수고하셨습니다.', 'success');
            }
         });
        
    }

}); 



// 오늘의 알림 기능
const todayBtn = document.getElementById("main-today-alert-btn");
const todayInput = document.getElementById("main-today-input");

// 페이지가 로드될 때 저장된 값 설정
window.addEventListener('load', () => {
    const savedTodayText = localStorage.getItem('TODAY_TEXT');
    if (savedTodayText) {
        todayInput.value = savedTodayText;
    }
});

// 오늘의 알림 연필 눌렀을때 이벤트
todayBtn.addEventListener('click', () => {
    todayInput.readOnly = false;
    todayInput.focus();
    // 인풋창에 글을 쓰고 엔터 눌렀을때 이벤트
    todayInput.addEventListener('keyup', () => {
        if(window.event.keyCode == '13') {
            todayInput.readOnly = true;
            const todayText = todayInput.value;
            localStorage.setItem('TODAY_TEXT', todayText);
            const savedTodayText = localStorage.getItem('TODAY_TEXT');
            
            todayInput.value = savedTodayText;

            // 매 분마다 함수를 호출하여 시간을 체크합니다.
            setInterval(todayInputUpdate, 60000);
           
        }

    })
});


// 밤12시가 지나면 로컬스토리지 내용 삭제 되는 함수
function todayInputUpdate() {
    const day = new Date();
    const hour = day.getHours();
  
    if (hour >= 0 && hour < 1) {
      localStorage.removeItem('TODAY_TEXT');
      todayInput.value = '';
    }
  }
  


// 마이페이지 이동
const myPageBtn = document.querySelector(".main-attn-btn1");

myPageBtn.addEventListener('click', () => {
    
    const url = "member/myPageProfile";
    console.log(url);
    window.location.href = url;
})



// 로그아웃 클릭 이벤트
const logBtn = document.querySelector('.log-out-btn'),
logBtn2 = document.querySelector('.log-out');

logBtn.addEventListener('click', logoutEvent);
logBtn2.addEventListener('click', logoutEvent);

function logoutEvent() {
    Swal.fire({
        title: '로그아웃을 하시겠습니까?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '그래, 할거야!',
        cancelButtonText: '아직..나에게는 할일이 남아있어..'
      }).then((result) => {
        if (result.isConfirmed) {
            confetti({
                particleCount: 150,
                spread: 60
              });
          Swal.fire(
            '축하합니다',
            '퇴근하십시오.',
            'success'
          ).then((result) => {
            
                const url = "member/logout";
                window.location.href = url;
            
          })
        }
      })
}

  
// 메인화면 켈린더 추가(kjw)
(function(){
    var calendarEl = document.getElementById('calendar');
  
      // 프로젝트 막대 컬러 
      let bgColor = ['#525FE1', '#F86F03', '#FFA41B', '#6554AF', '#3AA6B9', '#9575DE', '#FF9EAA', '#C1ECE4'];
      // JSON으로 받은 데이터 객체화 시키기
      let proList = JSON.parse(pList);
  
      // 객체에 프로젝트 막대 컬러 추가
      for(let i = 0; i < proList.length; i++){
        let bIndex = i % 8;
        proList[i].backgroundColor = bgColor[bIndex];
      }
  
      // 캘린더 API
      var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        // editable: true, // 수정가능여부
        // selectable: true, // 달력 일자 드래그 설정가능
        // businessHours: true,
        // dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
        views: {
          dayGridMonth: {
            dayMaxEventRows: 4 // 최대 4줄 그 이상은 3줄 +more
          }
        },
        expandRows: true, // 화면에 맞게 높이 재설정
        locale: 'ko', // 한국어 설정
        events: proList
      });
  
      calendar.render();
  })();




  // 대시보드
  const jobNoRegex = /jobNo=(\d+)/;
  const jobNoMatch = loginMember.match(jobNoRegex);
  const loginMemberJobNo = jobNoMatch[1];
  const employeeRankChange = document.querySelector(".employee-rank-change");
  const responsiveEmployeeRankChange = document.querySelector(".Responsive-employee-rank-change");
  if (parseInt(loginMemberJobNo) === 4) {
    employeeRankChange.style.display = 'none';
    responsiveEmployeeRankChange.style.display = 'none'
  }


