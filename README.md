## ✍ 프로젝트 소개
![](https://img.shields.io/badge/Project-모아부자!-blue?style=for-the-badge)

<img src="https://user-images.githubusercontent.com/66179677/161751055-39b83dd6-2cc0-41f8-9027-9a5a656a87f3.gif" width="100" height="100"/>

### 0. 배포링크
경제습관 형성 서비스 [모아부자!](https://moabuza.com)
https://moabuza.com

### 1. About
모아부자는 ‘모바일 기반 챌린지를 통한 :돈가방:경제습관 형성 서비스’ 입니다.
1. 하루내역을 추가해 나의 소비를 확인해요.
2. 같이해부자 - 친구들과 하나의 목표금액을 함께 모아요.
3. 도전해부자 - 같은 목표를 친구들과 같이 진행해봐요.

**챌린지 진행도에 따라 캐릭터가 성장해요!**

### 2. 기술 스택 소개 
![Component 1](https://user-images.githubusercontent.com/66179677/161750377-398d22da-65cd-4f1f-a119-2c832ca8196e.png)

## ✍ 핵심기능 소개

### 😀 이현규 Front-End

[github page](https://github.com/Aiden76005588)

### 😀 박재현 Front-End

[github page](https://github.com/Aiden76005588)

1. **GitHub Actions를 이용한 CI/CD 구축**  
개발리소스 감소, 백엔드 및 디자이너와의 즉각적인 소통을 위해 배포 자동화를 구현하였습니다.

2. Use **React-query && Recoil**  🌟  
Global state를 recoil로 관리하고 비동기 데이터는 React-query로 관리하기 위해 두 가지 스택을 동시에 사용하였습니다.

3. **같이해부자 && 도전해부자** 🌟  
같이해부자와 도전해부자는 모아부자의 핵심 기능으로 혼자 또는 단체로 목표를 정하여 그 목표를 향해 모두가 도달 할 수 있도록 돕는 기능입니다.
목표에 가까워 질 수록 캐릭터들의 모습이 변하면서 다음 캐릭터에 대한 궁금증을 유발하여 목표달성까지 동기부여가 될 수 있도록 구현하였습니다.

4. **PWA**           
저희 팀은 모아부자가 단순히 웹에서만 돌아가는 것이 아닌 오프라인에서도 사용하면서 목표에 도달하는 것에 조금이라도 도움이 되면 좋겠다는 생각으로 pwa를 적용하였습니다.

5. **카카오 로그인 및 토큰 관리**  
브라우저에서 GET 요청 시 카카오 로그인으로 인가코드를 요청한 후 유저가 카카오 로그인 & 서비스 이용등록 수락 시 리다이렉트 호출을 시킵니다. 그 후 인가 코드를 이용해 토큰정보를 백엔드로부터 받아 axios interceptors를 통해 엑세스토큰과 리프레쉬토큰을 가져와 백엔드에서 유저에 관한 정보를 리턴 받습니다. 

## ✍ 기획
### I. 핵심 기능

#### 1-1. 도전해부자 page
개인의 목표를 설정하고 혼자 또는 여럿이서 같이 목표를 관리해가는 기능입니다. 


![ezgif com-gif-maker](https://user-images.githubusercontent.com/66179677/161878951-da4bbb67-dd46-464f-b867-5530347e3dd3.gif)


#### 1-2. 같이해부자 page
공동의 목표를 위해 모두가 같이 목표를 관리해가는 기능입니다.


### II. Flow Chart
#### Main Page

<img width="1154" alt="moabuza-flowchart" src="https://user-images.githubusercontent.com/66179677/161878985-20976070-6fff-4455-87f5-3d2849d77a0f.png">

### III. API 문서
https://www.notion.so/fizzehyun/62186ff738a843bd82bc4f005eead01e?v=57212b6f572d444ab7a24d06a5b0b591


## ✍ Final App view
### I. KakaoLogin, Main page 
1. 카카오 로그인을 통해 유저들의 회원가입을 간소화
2. 메인페이지에서 핵심기능으로 바로 이동할 수 있도록 메인페이지 구성

![kakaologin-mainpage](https://user-images.githubusercontent.com/66179677/161879774-16ba9430-81c0-44d6-bf39-e9bb06ed5eb8.gif)


### II. ChallengeBuza
도전해부자 한가지 목표를 설정하고 개인 혹은 여럿이서 목표달성을 하는 페이지
![challengebuza](https://user-images.githubusercontent.com/66179677/161881226-0791865e-4f85-4e2a-86e2-c5232e6843d0.gif)

### III. GroupBuza
그룹부자는 하나의 목표를 설정하고 모두 다 같이 목표를 달성하는 페이지

### IV. OneDayBuza
1. 하루부자를 통해서 모든 입력을 할 수 있습니다. 수입/ 지출/ 도전해부자/ 같이해부자를 선택하여 입금을 할 수 있습니다.

![onedaybuza](https://user-images.githubusercontent.com/66179677/161882124-1eb9da29-156b-4bd7-b47b-6f0ad8f636f0.gif)


### V. AlarmBuza
1. 모아부자에서 활동하는 모든 행위들이 알람을 통해서 오게 됩니다. 
2. 친구를 추가하거나 확인하는 작업등 전부 알람부자를 통해 볼 수 있습니다.


***

# 🗣 우리를 소개합니다.


<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/Aiden76005588">
          <sub>
            <b>이현규</b>
          </sub>
        </a>
        <br>
      </td>
      <td>
        <strong>🚩 Front-end</strong>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/ifizzyou">
          <sub>
            <b>박재현</b>
          </sub>
        </a>
        <br>
      </td>
      <td>
        <strong>🚩 Front-end</strong>
      </td>
    </tr>
     
  </tbody>
</table>
