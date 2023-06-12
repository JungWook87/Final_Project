const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const year = document.getElementById("year");
const month = document.getElementById("month");

leftBtn.addEventListener("click", function(){
	let yearNum = Number(year.value);
	let monthNum = Number(month.value);
	
	if(month.value != 1){
		monthNum -= 1;
	} else {
		yearNum -= 1;
		monthNum = 12; 
	}
	
	selectDate(yearNum, monthNum);
})

rightBtn.addEventListener("click", function(){

	let yearNum = Number(year.value);
	let monthNum = Number(month.value);
	
	if(month.value != 12){
		monthNum += 1;
	} else {
		yearNum += 1;
		monthNum = 1; 
	}
	
	selectDate(yearNum, monthNum);

})

function selectDate(yearNum, monthNum){
	if(monthNum < 10) monthNum = "0" + monthNum;
	
	$.ajax({
            url : "selectDate",
            type : "GET",
            dataType : "JSON",
            data : {
   				"year" : yearNum,  
            	"month" : monthNum },
            success : function(attendanceList){

				// 날짜
				const attnDate = document.getElementById("attnDate");
				
				attnDate.innerHTML = yearNum + ' 년 ' + monthNum + ' 월';

				year.value = yearNum;
				month.value = monthNum;
				
				// 목록
				// 리스트 삭제
				const attnList = document.getElementById("attnList");
				attnList.innerHTML = "";
				
				// for문 이용하여 리스트 출력
				for(let item of attendanceList){
					
					// tr 요소 생성
					const tr = document.createElement("tr");
					
					// td 요소 생성 및 내용 넣기
					const td1 = document.createElement("td");
					td1.innerText = item.attdTypeName;
					
					const td2 = document.createElement("td");
					td2.innerText = item.today;
					
					const td3 = document.createElement("td");
					td3.innerText = item.attnStart;
					
					const td4 = document.createElement("td");
					td4.innerText = item.attnEnd;
					
					const td5 = document.createElement("td");
					td5.innerText = item.workingHours;
					
					const td6 = document.createElement("td");
					td6.innerText = item.extendedWorkingHours;
					
					// tr에 요소 추가
					tr.append(td1, td2, td3, td4, td5, td6);
					
					// 리스트에 요소 추가
					attnList.append(tr);
				}
				
            },
			error : function(request, status, error){
            	console.log("AJAX 에러 발생");
           	 	console.log("상태코드 : " + request.status);
        	}
	})
}

