
// x버튼 클릭 시 item 삭제
const Login = () => {
  $username = document.querySelector('.username').value;
  $password = document.querySelector('.password').value;
  param = {
    'username': $username,
    'password': $password
  }
    fetch("http://127.0.0.1:8000/user/login/", {
      method: 'POST',
      body: JSON.stringify(param)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      localStorage.setItem('access_token',data['token'])
      // getTodos();
      window.location.replace("https://daily-diary.netlify.app/");
      return data
    }).catch((error) => {
      console.log('error', error);
    })
  }

  // document.addEventListener("DOMContentLoaded", getTodos);


const SignUp = () => {
  $username = document.querySelector('.username').value;
  $password = document.querySelector('.password').value;
  
  param = {
    'username': $username,
    'password': $password
  }
    fetch("http://127.0.0.1:8000/user/signup/", {
      method: 'POST',
      body: JSON.stringify(param)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      location.href = "https://daily-diary.netlify.app/login.html";
      return data
      
    }).catch((error) => {
      console.log('error', error);
    })
  }
  

const kakaoLogin = () => {
  Kakao.init('34f96d651397872375f369ee032d1484'); //발급받은 키 중 javascript키를 사용해준다.
  console.log(Kakao.isInitialized()); // sdk초기화여부판단
  //카카오로그인
      Kakao.Auth.authorize({
        success: function (response) {
          console.log('흠냐')
          Kakao.API.request({
            url: '/v2/user/me',
            success: function (response) {
              console.log('흠냐')
              console.log(response)
            },
            fail: function (error) {
              console.log('흠냐')
              console.log(error)
            },
          })
        },
        fail: function (error) {
          console.log('흠냐')
          console.log(error)
        },
      })
    } 