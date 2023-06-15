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

  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

  <!-- 날짜조회api-->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

  <title>결재</title>
</head>

<body>

  <jsp:include page="/WEB-INF/views/common/header.jsp"/>
  <section>

    <!-- 사이드 바 -->
    <div class="side-bar menu">
      <!-- 페이지마다 바뀌는 제목 -->
      <h1>결재</h1>

      <!-- 페이지마다 바뀌는 부제목 -->
      <ul>
        <li><a href="workSend"><span>상신함</span> </a></li>
        <li><a href="workInbox"><span>수신함</span> </a></li>
        <li><a href="workTemp"><span>임시저장</span> </a></li>
        <li><a href="workTemplate"><span>템플릿</span> </a></li>
      </ul>
    </div>

    <!-- 컨텐츠 내용 -->
    <div class="content-all-page">

      <!-- 컨텐츠 내용 윗부분 -->
      <div class="content-all-top-area">
        <p class="content-all-top-text1">결재 / </p>
        <p class="content-all-top-text2">내가 작성한 결재(${fn:length(list)})</p>
        <!-- 시작일 / 종료일 -->
        <div class="content-all-date">
          
          <div class="content-all-date-p">

            <p class="date-p">
              시작일
            </p>
            
            <p class="date-p">
              종료일
            </p>

          </div>

          <div class="content-all-date-input">
            <input type="text" id="dateClick" name="daterange" value="01/01/2023 - 01/15/2023" />
          </div>
          
        </div>
        
      </div>

      <!-- 컨텐츠 내용 아랫부분 -->
      <div class="content-all-bottom-area">
        
        <div class="content-all-bottom-area-header">

            <select placeholder="전체" id="attnTypeSelect">
              <option value="0">전체</option>
              <option value="1">일반</option>
              <option value="2">연차</option>
              <option value="3">출장</option>
            </select>

            <div class="button-box">

              <button type="button" class="search-btn" >검색하기</button>
              <button type="button" class="omen-btn" id="popupBtn">결재 작성하기</button>
              
            </div>    

        </div>

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
                  <option value="userCustom">직접작성</option>
                  <option value="normalEx1">경조금신청서(예시)</option>
                  <option value="normalEx2">구매요청서(예시)</option>
                  <option value="normalEx3">자산요청서(예시)</option>
                  <option value="normalEx4">지출결의서(예시)</option>
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
                onkeyup="handleResizeHeight(this)" spellcheck="false"></textarea>
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

        <div id="approver-modal-wrap">
          <div class="approver-modal-Body">
            <span id="approver-closeBtn">
              <img src="${contextPath}/resources/images/Xbtn.png" alt="">
            </span>
            <h1>결재 라인 설정</h1>
            <!-- 선1 -->
            <div class="approver-modal-line1"></div>

            
            <div class="approver-modal-container">
        
              <div class="boss"></div>      
              
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

      </div>

        <div class="content-all-bottom-area-content">

          <table>
            
            <thead>
              
              <tr>
                <th>종류</th>
                <th>결재 번호</th>
                <th>제목</th>
                <th>상태</th>
                <th>첨부파일</th>
                <th>작성일</th>
              </tr>
              
            </thead>

            <tbody id="listBody">

              <c:forEach var="list" items="${list}">
                <tr class="listTr">
                  <td class="listTypeNo" style="display: none;">${list.typeNo}</td>
                  <td>${list.typeName}</td>
                  <td>${list.workNo}</td>
                  <td>${list.title}</td>
                  <c:choose>
                    <c:when test="${list.workState == '진행중'}">
                      <td style="color: var(--primary400);">${list.workState}</td>
                    </c:when>
                    <c:when test="${list.workState == '승인'}">
                      <td style="color: var(--green);">${list.workState}</td>
                    </c:when>
                    <c:otherwise>
                      <td style="color: red;">${list.workState}</td>
                    </c:otherwise>
                  </c:choose>
                  <c:if test="${empty list.fileRename}">
                    <td>없음</td>
                  </c:if>
                  <c:if test="${not empty list.fileRename}">
                    <td>있음</td>
                  </c:if>
                  <td>${fn:substring(list.sendDate, 0, 11)}</td>
                </tr>
              </c:forEach>

            </tbody>

          </table>

        </div>

      </div>

    </div>

    <!-- 사용자가 작성한 공지사항 열기 -->
    <div id="check-modalWrap">
      <div class="check-modalBody">
        <span id="check-closeBtn">
          <img src="${contextPath}/resources/images/Xbtn.png" alt="">
        </span>
        <h1>결재상신</h1>
        <!-- 선1 -->
        <div class="modal-line"></div>

        <!-- 템플릿 -->
        <div class="check-modal-template">
          <p>템플릿</p>

          <div class="check-modal-template-select">

            <select name="" id="check-work-template">
              <option value="normal-check">일반</option>
              <option value="business-trip">출장</option>
              <option value="vacation">연차</option>
              <option value="project">프로젝트</option>
              <option value="assignment">과제</option>
            </select>
                  
            <select name="" id="check-normal-checked">
              <option value="">경조금신청서(예시)</option>
              <option value="">구매요청서(예시)</option>
              <option value="">자산요청서(예시)</option>
              <option value="">지출결의서(예시)</option>
            </select>

             <select name="" id="check-project-checked">
              <option value="">프로젝트1(예시)</option>
              <option value="">프로젝트2(예시)</option>
              <option value="">프로젝트3(예시)</option>
              <option value="">프로젝트4(예시)</option>
            </select>

            <select name="" id="check-assignment-checked">
              <option value="">과제1(예시)</option>
              <option value="">과제2(예시)</option>
              <option value="">과제3(예시)</option>
              <option value="">과제4(예시)</option>
            </select>
          </div>
        </div>
        <!-- 제목 -->
        <div class="check-modal-title">
          <p>제목</p>
          <input type="text" readonly>
        </div>
        <!-- 출장지 -->
        <div class="check-modal-businessArea">
          <p>출장지</p>
          <input type="text" readonly>
        </div>
        <!-- 시작날짜 -->
        <div class="check-modal-startDate">
          <p>시작날짜</p>
          <input type="date" readonly>
        </div>
        <!-- 종료날짜 -->
        <div class="check-modal-endDate">        
          <p>종료날짜</p>
          <input type="date" readonly>
        </div>        
        <!-- 내용 -->
        <div class="check-modal-detail">
          <p>내용</p>
          <textarea name="" id="" onkeydown="handleResizeHeight(this)"
          onkeyup="handleResizeHeight(this)" readonly></textarea>
        </div>

        <!-- 출장내용 -->
        
          <div class="check-modal-businessDetail">
            <p>출장 내용</p>
            <textarea name="" id="" onkeydown="handleResizeHeight(this)"
            onkeyup="handleResizeHeight(this)" readonly spellcheck="false"></textarea>
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
        <div class="check-modal-approver">
          <p>결재자</p>
          <input type="text" readonly>
        </div>
        <!-- 선택된 파일 -->
        <p>첨부파일</p>
        <div class="check-preview"></div>
        <!-- 선2 -->
        <div class="modal-line"></div>
        <!-- 버튼 -->
        <div class="notice-submit-reset-btns">
          <button id="check-remove-btn">삭제</button>
          <button type="reset" id="check-cancell-btn">닫기</button>
          <button id="check-success-btn">수정</button>
        </div>

      </div>
    </div>


    <!-- 채팅창 -->
    <div id="chatting-function" class="chatting-box">
      <a href="#">
        <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
      </a>
    </div>
  </section>
</body>

<script src="${contextPath}/resources/js/work/work-send.js"></script>
</html>