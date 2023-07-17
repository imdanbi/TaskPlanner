# TaskPlanner
업무 일정 관리 사이트
### 개요
이 프로젝트는 Node.js와 Vue CLI 4.5 이상을 사용합니다.  
서버와 통신을 위해 axios를 설치해야 합니다.  
### 프로젝트 시작
```shell
vue create {프로젝트명}
```  
### 개발 서버 시작
```shell
npm run serve
```
### 개발 서버 실행
```shell
json-server --watch db.json
```
<br/>  

📅 **개발 기간**  
* 22.11.07 - 22.11.25   
<br/>  

💻 **개발 목표**  
* Vue.js 3.0 학습  
    Vue.js에 대한 이해를 높이고 기본 개념과 동작 원리 습득  
* 컴포넌트 개발  
    컴포넌트의 구조와 상태 관리를 이해하고 활용
* 기능 구현  
    업무 일정에 필요한 주요 기능 구현 (작성, 편집, 삭제, 검색)  
* BootstrapVue 활용  
    커스터마이징 가능한 테마 및 스타일링 사용
<br/>

💡 **특징**
* Nav바를 이용한 페이지 구분  
  ![image](https://github.com/imdanbi/TaskPlanner/assets/97159236/678d13d5-b7ac-47c9-8f78-02d5112aeddc)

    Nav바를 사용하여 사용자는 Home과 Memo 페이지 간에 전환할 수 있습니다.
* 주요 기능 구현  
      ![image](https://github.com/imdanbi/TaskPlanner/assets/97159236/52f391c3-80b0-4c2c-b8fe-f60e37cef954)
        작성, 편집, 삭제, 검색, 페이지처리, 체크처리 기능이 포함됩니다.<br/>  
      ![image](https://github.com/imdanbi/TaskPlanner/assets/97159236/b71f5f61-69f5-45df-b86c-fbeeea6226e7)

    
    위의 사진은 작성 기능에 대한 부분을 보여줍니다.  
    "Memo Plus" 버튼을 클릭한 뒤 "추가" 버튼을 클릭하면 성공적으로 완료됩니다.
* Toast 메시지 표시  
    ![image](https://github.com/imdanbi/TaskPlanner/assets/97159236/e51abcb2-2d1d-4cda-833c-8bef1e4ac6dd)

    사용자의 작업에 대한 관련 메시지를 Toast로 표시합니다.  
    위의 사진은 성공적으로 저장되었음을 나타내는 Toast 메시지를 보여줍니다.
  <br/>
  
🔥 **개선 사항**  
* Nav바 부분의 제한
    현재 두개의 Nav바가 존재하지만 사용자 경험을 향상시키기 위해 각각의 Nav바에 다른 페이지 또는 기능을 할당 할 수 있도록 개선
* 기능 개선 및 추가
    검색 필터링 추가, 메모 목록의 정렬 기능 구현 등 다른 기능 추가
* Props와 Emit에 대한 이해도 부족
    이해도를 개선시키기 위한 문서, 튜토리얼 등을 참고하여 심층적인 학습
