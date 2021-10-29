
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
      window.location.replace("http://127.0.0.1:5501/");
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
      location.href = "http://127.0.0.1:5501/login.html";
      return data
      
    }).catch((error) => {
      console.log('error', error);
    })
  }
  