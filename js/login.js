let $username = document.querySelector('.username');
let $password = document.querySelector('.password');
let $passwordChk = document.querySelector('.password-chk');


const Login = () => {
  param = {
    'username': $username.value,
    'password': $password.value
  }
    fetch("https://djangodailydiary.herokuapp.com/user/signin", {
    // fetch("http://127.0.0.1:8000/user/signin", {

      method: 'POST',
      body: JSON.stringify(param)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data['error']){
        $username.value = "";
        $password.value = "";
        alert('아이디 또는 비밀번호를 확인해주세요 !');
        return
      }
      localStorage.setItem('Authorization',data['token'])
      window.location.replace("https://daily-diary.netlify.app/");
      // window.location.replace("http://127.0.0.1:5501/");
      return data
    }).catch((error) => {
      console.log('error', error);
    })
  }


const SignUp = () => {
  if ($username.value == '' || $passwordChk.value == '' || $passwordChk.value == ''){
    alert('모든 내용을 입력해주세요 !');
    return
  }
  else if ($password.value != $passwordChk.value){
    $password.value = "";
    $passwordChk.value = "";
    alert('비밀번호가 다릅니다. 확인해주세요 !');
    return
  }
  param = {
    'username': $username.value,
    'password': $password.value,
  }
    fetch("https://djangodailydiary.herokuapp.com/user/signup", {
    // fetch('http://127.0.0.1:8000/user/signup', {

      method: 'POST',
      body: JSON.stringify(param)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data['error']){
        $username.value = "";
        $password.value = "";
        $passwordChk.value = "";
        alert(`${data['error']}`)
        return
      }
      location.href = "https://daily-diary.netlify.app/login.html";
      // location.href = "http://127.0.0.1:5501/login.html";
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
    localStorage.removeItem('Authorization');
    alert('로그아웃 성공 !')
    location.href = "https://daily-diary.netlify.app/login.html";
  }
  else
  {
    return;
  }
}
