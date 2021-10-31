
// x버튼 클릭 시 item 삭제
const Login = () => {
  $username = document.querySelector('.username').value;
  $password = document.querySelector('.password').value;
  param = {
    'username': $username,
    'password': $password
  }
    fetch("https://djangodailydiary.herokuapp.com/user/login/", {
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
  $passwordChk = document.querySelector('.password-chk').value;
  if ($username == '' || $passwordChk == '' || $passwordChk == ''){
    alert('모든 내용을 입력해주세요 !');
    return
  }
  else if ($password != $passwordChk){
    alert('비밀번호가 다릅니다. 확인해주세요 !');
    return
  }
  param = {
    'username': $username,
    'password': $password,
  }
    fetch("https://djangodailydiary.herokuapp.com/user/signup/", {
      method: 'POST',
      body: JSON.stringify(param)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data['error']){
        $username = ' ';
        $password = ' ';
        $passwordChk = ' ';
        alert(`${data['error']}`)
        return
      }
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
          Kakao.API.request({
            url: '/v2/user/me',
            success: function (response) {
              console.log(response)
            },
            fail: function (error) {
              console.log(error)
            },
          })
        },
        fail: function (error) {
          console.log(error)
        },
      })
    } 


const Logout = () => {
  if (confirm('정말 로그아웃 하시겠어요 ?') == true){
    localStorage.removeItem('access_token');
    alert('로그아웃 성공 !')
    location.href = "https://daily-diary.netlify.app/login.html";
  }
  else{
    return;
  }
}