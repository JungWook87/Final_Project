<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/work-send.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/work-inbox(1).css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/work-inbox-end(3).css">

  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

    <!-- 폰트어썸 -->
    <script src="https://kit.fontawesome.com/3cd0aae50a.js" crossorigin="anonymous"></script>

  <!-- 날짜조회api-->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

  <title>결재-수신함-결재 완료</title>
</head>

<body>

  <jsp:include page="/WEB-INF/views/common/header.jsp"/>
  <section>

<!--------------------------------------------------- 사이드 바 --------------------------------------------------->
<div class="side-bar menu">
  <div class="side-barTitle">
    <a href="work-send.html" id="side-barTitle-a">
      <img src="${contextPath}/resources/images/leftArrow.png" alt="">
    </a>
  <h1>수신함</h1>
  </div>
  

    <ul>
      <li><a href="work-inbox(1).html"><span>결재할문서</span> </a></li>
      <li><a href="work-inbox-ing(2).html"><span>결재진행중</span> </a></li>
      <li><a href="work-inbox-end(3).html"><span>결재완료</span> </a></li>
      <li><a href="work-inbox-cancle(4).html"><span>결재취소</span> </a></li>
    </ul>
    

  
</div>
<!------------------------------------------------- 사이드바 영역 끝 ------------------------------------------------->
<!------------------------------------------------- 컨텐츠 내용 ------------------------------------------------->
<div class="content-all-page">

  <!--------------------------------------------------- 컨텐츠 내용 윗부분 --------------------------------------------------->
  <div class="content-all-top-area">
    <p class="content-all-top-text1">결재 / </p>
    <p class="content-all-top-text2">결재 완료</p>
    <!-------------------- 시작일 / 종료일 (DATE.API) 영역 -------------------->
    <div class="content-all-date">
      
      <div class="content-all-date-p">

        <p class="date-p">
          시작일
        </p>
        
        <p class="date-p">
          종료일
        </p>

      </div>
      <!-------------------------- 날짜 API (DATE.API) -------------------------->
      <div class="content-all-date-input">           
        <input type="text" id="dateClick" name="daterange" value="01/01/2023 - 01/15/2023" />
      </div>
      <!-------------------------- 날짜 API (DATE.API) 끝------------------------->
    </div>
    <!------------------------- 시작일 / 종료일 (DATE.API) 영역 끝------------------------->
  </div>
  <!---------------------------------- 컨텐츠 내용 윗부분 영역 끝---------------------------------->
  <!-- 컨텐츠 내용 아랫부분 -->
  <div class="content-all-bottom-area">
    <!------------------------------------------ 컨텐츠 내용 아랫부분 헤더------------------------------------------>
    <div class="content-all-bottom-area-header">

        <select placeholder="전체">
          <option value="전체">전체</option>
          <option value="진행중">근태</option>
          <option value="근무">근무</option>
          <option value="비용">비용</option>
          <option value="일반">일반</option>
        </select>

        <div class="button-box">

          <button type="button" class="search-btn" >검색하기</button>
          <button type="button" class="omen-btn" id="popupBtn">결재 작성하기</button>
          
        </div>    

    </div>
    <!----------------------------------------- 컨텐츠 내용 아랫부분 헤더 끝----------------------------------------->
    <!------------------------------------------------ 결재 작성하기 모달창 영역------------------------------------------------> 
    <div id="modalWrap">
      <div class="work-modalBody">
        <span id="closeBtn">
          <img src="${contextPath}/resources/images/Xbtn.png" alt="">
        </span>
        <h1>결제상신</h1>
        <!-- 선1 -->
        <div class="work-modal-line"></div>

        <!-- <form action="#" method="post" enctype="multipart/form-data"> -->
          <!-- 템플릿 -->
          <div class="work-modal-template">
            <p>결재 타입</p>

            <div class="work-modal-template-select">

              <select name="" id="work-template">
                <option value="normal-check">일반</option>
                <option value="business-trip">출장</option>
                <option value="vacation">연차</option>
                <option value="project">프로젝트</option>
                <option value="assignment">과제</option>
              </select>
              
              <select name="" id="normal-checked">
                <option value="">경조금신청서(예시)</option>
                <option value="">구매요청서(예시)</option>
                <option value="">자산요청서(예시)</option>
                <option value="">지출결의서(예시)</option>
              </select>

              <select name="" id="project-checked">
                <option value="">프로젝트1(예시)</option>
                <option value="">프로젝트2(예시)</option>
                <option value="">프로젝트3(예시)</option>
                <option value="">프로젝트4(예시)</option>
              </select>

              <select name="" id="assignment-checked">
                <option value="">과제1(예시)</option>
                <option value="">과제2(예시)</option>
                <option value="">과제3(예시)</option>
                <option value="">과제4(예시)</option>
              </select>

            </div>
          </div>   
        <!-- 제목 -->
        <div class="work-modal-title">
          <p>제목</p>
          <input type="text" placeholder="제목을 입력해주세요" required>
        </div>
        <!-- 시작날짜 -->
        <div class="work-modal-startDate">
          <p>시작날짜</p>
          <input type="date">
        </div>
        <!-- 종료날짜 -->
        <div class="work-modal-endDate">
          <p>종료날짜</p>
          <input type="date">
        </div>
        <!-- 내용 -->
        <div class="work-modal-detail">
          <p>내용</p>
          <textarea name="" id="" onkeydown="handleResizeHeight(this)"
            onkeyup="handleResizeHeight(this)"></textarea>
        </div>
        <!-- 출장내용 -->
        <div class="work-modal-businessDetail">
          <p>출장 내용</p>
          <textarea name="" id="" onkeydown="handleResizeHeight(this)"
            onkeyup="handleResizeHeight(this)"></textarea>
        </div>
        <!-- 프로젝트박스 -->
        <div class="work-modal-projectBox">
          <span id="pulsProject">
            <img src="${contextPath}/resources/images/plus.png" alt="">
            과제 추가
          </span>
        </div>
          <div class="projectBox"> 
            <p>과제명</p>
            <input type="text">
            <p>과제내용</p>
            <input type="text">
          </div>
        <!-- 결재자 -->
        <div class ="work-modal-approverBox">
          <span id="pulsApprover">
            <img src="${contextPath}/resources/images/plus.png" alt="">
            결재자 추가
          </span>  
        </div>
        <div class="work-modal-approver">
          <p>결재자</p>
          <input type="text">
        </div>
        <!-- 파일 업로드 -->
        <div class="work-file-box">
          <button type="button" id="file-remove">파일 지우기</button>
          <label for="file-uploads">파일 올리기</label>
          <input type="file" id="file-uploads" name="file-uploads" accept="" multiple>
        </div>
        <!-- 선택된 파일 -->
        <div class="work-preview"></div>
        <!-- 선2 -->
        <div class="work-modal-line"></div>
        <!-- 임시저장 버튼 -->
        <div class="work-modal-save">
          <button type="button" id="save-draft">임시 저장</button>
        </div>
        <!-- 버튼 -->
        <div class="work-submit-reset-btns">
          <button type="reset" id="cancell-btn">취소</button>
          <button id="success-btn">확인</button>
        </div>
        <!-- </form> -->
      </div>
    </div>
    <!------------------------------------------------ 결재 작성하기 모달창 영역 끝------------------------------------------------>
    <!------------------------------------------------ 결재 작성하기 결재자 추가 모달창 영역 ------------------------------------------------>
    <div id="approver-modal-wrap">
      <div class="approver-modal-Body">
        <span id="approver-closeBtn">
          <img src="${contextPath}/resources/images/Xbtn.png" alt="">
        </span>
        <h1>결재 라인 설정</h1>
        <!-- 선1 -->
        <div class="approver-modal-line1"></div>

        <div class="approver-modal-container">


          <div id="approver-box">

            <ul class="M01">
        
                <li><p href="#">임원</p>
        
                    <ul class="M02">
        
                        <li><p href="#">대표이사<input type="radio" name="appprover-check" class="approver-checkBox" value="대표이사"></p></li>
        
                        <li><p href="#">전무이사<input type="radio" name="appprover-check" class="approver-checkBox" value="전무이사"></p></li>
        
                    </ul>
        
                </li>
        
                <li><p href="#">부서</p>
        
                    <ul class="M02 dept">
        
                        <li><p href="#">관리기획부</p>
        
                            <ul class="M03">
        
                                <li><p href="#">A직원<input type="radio" name="appprover-check" class="approver-checkBox" value="A직원"></p></li>
        
                                <li><p href="#">B직원<input type="radio" name="appprover-check" class="approver-checkBox" value="B직원"></p></li>
        
                                <li><p href="#">C직원<input type="radio" name="appprover-check" class="approver-checkBox" value="C직원"></p></li>
        
                            </ul>
        
                        </li>
        
                        <li><p href="#">인사총무팀</p>
        
                            <ul class="M03">
        
                                <li><p href="#">A직원<input type="radio" name="appprover-check" class="approver-checkBox" value="A직원"></p></li>
        
                                <li><p href="#">B직원<input type="radio" name="appprover-check" class="approver-checkBox" value="B직원"></p></li>
        
                                <li><p href="#">C직원<input type="radio" name="appprover-check" class="approver-checkBox" value="C직원"></p></li>
        
                            </ul>
        
                        </li>
        
                        <li><p href="#">기술영업팀</p>
        
                            <ul class="M03">
        
                                <li><p href="#">A직원<input type="radio" name="appprover-check" class="approver-checkBox" value="A직원"></p></li>
        
                                <li><p href="#">B직원<input type="radio" name="appprover-check" class="approver-checkBox" value="B직원"></p></li>
        
                                <li><p href="#">C직원<input type="radio" name="appprover-check" class="approver-checkBox" value="C직원"></p></li>
        
                            </ul>
        
                        </li>
        
                    </ul>
        
                </li>
        
        
            </ul>
        
          </div>

        </div>


        <!-- 선2 -->
        <div class="approver-modal-line2"></div>
        <!-- 버튼 -->
        <div class="approver-submit-reset-btns">
          <button type="reset" id="approver-cancell-btn">취소</button>
          <button id="approver-success-btn">확인</button>
        </div>
        <!-- </form> -->
      </div>
    </div>
    <!------------------------------------------------ 결재 작성하기 결재자 추가 모달창 영역 끝------------------------------------------------>

        <div class="content-all-bottom-area-content">

          <table>
            
            <thead>
              
              <tr>
                <th>종류</th>
                <th>결재 번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>첨부파일</th>
                <th>결재의견</th>
                <th>작성일</th>
              </tr>
              
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>1234</td>
                <td>테스트입니다</td>
                <td>테스터</td>
                <td>없음</td>
                <td>없음</td>
                <td>2023.5.10</td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>

      <div id="check-modalWrap">
        <div class="check-modalBody">
          <span id="check-closeBtn">
            <img src="${contextPath}/resources/images/Xbtn.png" alt="">
          </span>
          <!-- <form action="#" method="post" enctype="multipart/form-data"> -->
            
            <!-- 모달창 시작 -->
            <div class="check-modal-header">
              <!-- 제목 -->
              <h1 class="check-modal-title">결재 예시</h1>
              <!-- 결재항목박스 -->
              <div class="check-modal-modal-headerbox">
                <!-- 결재항목 내용 -->
                <div class="check-modal-headerbox-content">
                  <!-- 문서번호 -->
                  <span class="check-modal-modal-headerbox-content-a">문서번호 :</span>  
                  <span class="check-modal-modal-headerbox-content-b">2023-05-26-20001990</span>
                </div>
                
                <div class="check-modal-headerbox-content">
                  <!-- 작성자 -->
                  <span class="check-modal-headerbox-content-a">작성자 :</span>  
                  <span class="check-modal-headerbox-content-b">이재혁 ( abcde@gmail.com )</span>
                </div>
                <div class="check-modal-headerbox-content">
                  <!-- 작성일 -->
                  <span class="check-modal-modal-headerbox-content-a">작성일 :</span>  
                  <span class="check-modal-modal-headerbox-content-b">2023-05-26 14:19</span>
                </div>

                <div class="check-modal-headerbox-footer">
                    <button class="modal-headerbox-footer-btn">
                      <span>꓋ 문서복사</span>
                    </button>
                    <button class="check-modal-headerbox-footer-btn">
                      <span> ✁  문서출력</span>
                    </button>
                </div>
            
              </div>
              
            </div>
            
            <div class="check-modal-table-body">
              
              <h2>결재경로</h2>

              <table>
          
                <thead>
                  
                  <tr>
                    <th>순서</th>
                    <th>이름</th>
                    <th>결재상태</th>
                    <th>구분</th>
                  </tr>
                  
                </thead>
    
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>류정훈</td>
                    <td>승인</td>
                    <td>결재자 / 팀(전체)</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>이동준</td>
                    <td>승인</td>
                    <td>결재자 / 팀(전체)</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>김정욱</td>
                    <td>승인</td>
                    <td>결재자 / 팀(전체)</td>
                  </tr>
                </tbody>
              </table>
            

            </div>

          <!-- 내용 -->
          <div class="check-modal-detail">
            <p>내용</p>
            <textarea name="" id="" onkeydown="handleResizeHeight(this)"
              onkeyup="handleResizeHeight(this)"></textarea>
          </div>
          <!-- 의견 -->
          <div class="check-modal-coment">
            <p>의견</p>
            <input type="text">
          </div>
           <!-- 결재자 -->
           <div class="check-modal-approver">
            <p>결재자</p>
            <input type="text">
          </div>
          <!-- 선택된 파일 -->
          <p>선택파일</p>
          <div class="check-preview"></div>
          <!-- 파일 업로드 -->
          <div class="work-file-box">
            <button type="button" id="file-remove">파일 지우기</button>
            <label for="file-uploads">파일 올리기</label>
            <input type="file" id="file-uploads" name="file-uploads" accept="" multiple>
          </div>
          <!-- 선2 -->
          <div class="work-modal-line"></div>
           <!-- 최종승인 버튼 -->
           <div class="check-modal-checkbox">
            <label for="">
              <input type="checkbox" id='check-modal-checkbox' onclick='is_checked()'> 
              최종 승인
            </label>
          </div>
          

          <!-- 버튼 -->
          <div class="work-submit-reset-btns">
            <button type="submit" id="companion-btn">반려</button>
            <button type="reset" id="check-cancell-btn">취소</button>
            <button id="check-success-btn">승인</button>
          </div>
          <!-- </form> -->
        </div>
      </div>

    </div>

    <!-- 채팅창 -->
   <jsp:include page="/WEB-INF/views/common/chat-modal.jsp" />
  </section>
</body>

<script src="${contextPath}/resources/js/work/work-inbox-ing(2).js"></script>
</html>