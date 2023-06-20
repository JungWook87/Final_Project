const calendar = document.querySelector(".calendar"),
      date = document.querySelector(".date"),
      daysContainer = document.querySelector(".days"),
      prev = document.querySelector(".prev"),
      next = document.querySelector(".next"),
      todayBtn = document.querySelector(".today-btn"),
      gotoBtn = document.querySelector(".goto-btn"),
      dateInput = document.querySelector(".date-input"),
      eventDay = document.querySelector(".event-day"),
      eventDate = document.querySelector(".event-date"),
      eventsContainer = document.querySelector(".events"),
      addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

let eventsArr = [];

// getEvents();

// 날짜 함수
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = year + "년 " + months[month] + " ";

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date" > ${prevDays - x + 1}</div>`;
  }

  for(let i = 1; i <= lastDate; i++) {

    let event = false;
    eventsArr.forEach((eventObj) => {
      if(
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    })


    if(
      i === new Date().getDate() && 
      year === new Date().getFullYear() && 
      month === new Date().getMonth()
    ) {

      activeDay = i;
      getActiveDay(i);
      updateEvents(i);

      if(event) {
        days += `<div class="day today active event" > ${i}</div>`;
      } else {
        days += `<div class="day today active" > ${i}</div>`;
      }
    } 
    else if (new Date(year, month, i).getDay() === 0) {
      days += `<div class="day sun" > ${i}</div>`; 
    }
     else {
      if(event) {
        days += `<div class="day event" > ${i}</div>`;
      } else {
        days += `<div class="day" > ${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date" > ${j}</div>`;
  }

 
  daysContainer.innerHTML = days;
  addListner();
}

initCalendar();


// 이전 달
function prevMonth() {
  month--;
  if(month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// 다음 달
function nextMonth() {
  month++;
  if(month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth)


// 이벤트 추가
const addEventBtn = document.querySelector(".add-event"),
      addEventContainer = document.querySelector(".add-event-wrapper"),
      addEventCloseBtn = document.querySelector(".close");
      
// 더하기 버튼 누르면 모달창이 뜸
addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});
document.addEventListener("click", (e) => {
  if(e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
})


// 클릭했을때 이벤트
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      
      // 해당 날짜를 보여주는 콘솔로그
      console.log(day.innerHTML);

      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);

      days.forEach((day) => {
        day.classList.remove("active");
      })

      // 이전 달과 다음달을 오갈수 있는 클릭 이벤트
      if(e.target.classList.contains("prev-date")) {
        prevMonth();

        setTimeout(() => {
          const days = document.querySelectorAll(".day");

          days.forEach((day) => {
            if(
              !day.classList.contains("prev-date") && 
              day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
          });
        }, 100);
      } else if(e.target.classList.contains("next-date")) {
        nextMonth();

        setTimeout(() => {
          const days = document.querySelectorAll(".day");

          days.forEach((day) => {
            if(
              !day.classList.contains("next-date") && 
              day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
          });
        }, 100);
      }
      else {
        e.target.classList.add("active");
      }

    })
  })
}

// 오른쪽에 요일과 년도를 보여주는 함수
function getActiveDay(date) {
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const day = new Date(year, month, date);
  const dayName = dayNames[day.getDay()];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = year + "년" + " " + months[month] + " " + date + "일";
}


// 이벤트 업데이트 함수
function updateEvents(date) {
  // let resvBox = "";
  // let availableRooms = 8; 

  // 날짜를 보여줌(지우면 날짜가 안보이게 댐)
  eventsArr.forEach((event) => {
    if(
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {

      // 오른쪽에 나타나는 이벤트 추가
      // event.resvBox.forEach((event) => {
      //   resvBox += `
      //   <div class = "event">
      //     <div class = "title">
      //       <i class = "fas fa-circle"></i>
      //       <h3 class = "event-title">${event.title}</h3>
      //     </div>
      //     <div class = "event-time">
      //       <span class = "event-time">${event.time}</span>
      //     </div>
      //   </div>`

        // 회의실을 선택할때마다 예약가능한 수가 1씩 줄어듬
        // if (event.title !== "회의실 선택") {
        //   availableRooms--; 
        // }


      // })

    }
  })

}

// 예약버튼 눌렀을 때 이벤트
addEventSubmit.addEventListener("click", () => {
  // 드롭다운 요소 선택
  const dropdown = document.querySelector(".drop .option.active");
  // 라디오 버튼 선택
  const morningRadio = document.getElementById("morning");
  const afternoonRadio = document.getElementById("afternoon");


  // 선택된 값 가져오기
  const selectedValue = dropdown.dataset.value;
  const selectedText = dropdown.textContent.trim();
  const morningChecked = morningRadio.checked;
  const afternoonChecked = afternoonRadio.checked;

  // 값 출력
  console.log("Selected value:", selectedValue);
  console.log("Selected text:", selectedText);
  console.log("Morning radio checked:", morningChecked);
  console.log("Afternoon radio checked:", afternoonChecked);

  // 회의실을 선택 안했거나 오전과 오후중 선택을 안했을때 알림창이 뜸
  if(selectedValue === "placeholder") {
    Swal.fire("회의실을 선택해 주세요");
  } else if(morningChecked === false && afternoonChecked === false) {
    Swal.fire("오전과 오후중 선택해 주세요");
  }


  // 예약 버튼을 누르면 모달창이 닫힘
  addEventContainer.classList.remove("active");

  morningRadio.checked = false;
  afternoonRadio.checked = false;


  updateEvents(activeDay);

})

// 사이트 진입시 ajax 연결 (모든 예약정보 받아오기)
$(document).ready(function() {
  $.ajax({
    url: 'allReservation', 
    method: 'GET',
    success: function(result) {

      var resvList = result['resvList'];
      
      for (var i = 0; i < resvList.length; i++) {
        var item = resvList[i];
  
        var reservationNo = item.reservationNo;
        var memNo = item.memNo;
        var reservationDate = item.reservationDate;
        var reservationTime = item.reservationTime;
        var roomNo = item.roomNo;
  
        console.log("Reservation No: " + reservationNo);
        console.log("Member No: " + memNo);
        console.log("Reservation Date: " + reservationDate);
        console.log("Reservation Time: " + reservationTime);
        console.log("Room No: " + roomNo);
  
        $('#reservationTable').append('<tr><td>' + reservationNo + '</td><td>' + memNo + '</td><td>' + reservationDate + '</td><td>' + reservationTime + '</td><td>' + roomNo + '</td></tr>');
      }
    },
    error: function(xhr, status, error) {
      
      console.log('Error:', status, error);
    }
  });
});



// 회의실 예약 ajax
const reservationBox = document.querySelector(".reservation-box");

$(".add-event-btn").click(function() {
  var selectedRoom = $(".drop .option.active").attr("data-value");
  var selectedReservationTime = $("input[name='time']:checked").val();
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var day = String(currentDate.getDate()).padStart(2, '0');
  var todayDate = year + "-" + month + "-" + day;

  // 전송전 값 확인
  console.log("selectedRoom:", selectedRoom);
  console.log("selectedReservationTime:", selectedReservationTime);

  $.ajax({
    url: "reservationRoom",
    type: "GET",
    dataType : "JSON",
    data: { room: selectedRoom, time: selectedReservationTime, reservationDate: todayDate}, 
    success: function(result) {
            
      eventsArr.forEach((result) => {
        if(
          date === result.day &&
          month + 1 === result.month &&
          year === result.year
        ) {

          result.events.forEach((event) => {
            events += `
            <div class = "event">
              <div class = "title">
                <i class = "fas fa-circle"></i>
                <h3 class = "event-title">회의실 ${result.roomNo}</h3>
              </div>
              <div class = "event-time">
                <span class = "event-time">${result.reservationTime}</span>
              </div>
            </div>`
            if (event.title !== "회의실 선택") {
              availableRooms--; 
            }
          })

        }
      })
    },
    error: function(int) {
      console.log(int);
    }
  });
});


// 회의실 예약 스타일
$(document).ready(function() {
  $(".drop .option").click(function() {
    var val = $(this).attr("data-value"),
        $drop = $(".drop"),
        prevActive = $(".drop .option.active").attr("data-value"),
        options = $(".drop .option").length;
    $drop.find(".option.active").addClass("mini-hack");
    $drop.toggleClass("visible");
    $drop.removeClass("withBG");
    $(this).css("top");
    $drop.toggleClass("opacity");
    $(".mini-hack").removeClass("mini-hack");
    if ($drop.hasClass("visible")) {
      setTimeout(function() {
        $drop.addClass("withBG");
      }, 400 + options*100); 
    }
    triggerAnimation();
    if (val !== "placeholder" || prevActive === "placeholder") {
      $(".drop .option").removeClass("active");
      $(this).addClass("active");
    };
  });
  
  function triggerAnimation() {
    var finalWidth = $(".drop").hasClass("visible") ? 100 : 100;
    $(".drop").css("width", "100%");
    setTimeout(function() {
      $(".drop").css("width", finalWidth + "%");
    }, 400);
  }
});

