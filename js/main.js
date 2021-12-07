const $mainItems = document.querySelector('.main-items');
const $main = document.querySelector('.main');
const $liContent = document.querySelector('.li-content');
const $detail = document.querySelector('.detail')
const $detailBtn = document.querySelector('.detail-btn');
const $buttonsConfirmSubmit = document.querySelector('.buttons-confirm-submit');
const $buttonsConfirmCancel = document.querySelector('.buttons-confirm-cancel');
const $detailContent = document.querySelector('.detail-content');

// 등록버튼, 등록 모달 창 레이어
const $mainSubmit = document.querySelector('.main-submit');
const $modalUploadLayer = document.querySelector('.modal-upload-layer');

// x버튼, 모달 창
const $closeButton = document.querySelector('.fa-times-circle');
const $modalUpload = document.querySelector('.modal-upload');

// add
const $uploadAddButton = document.querySelector('.upload-add-button');
const $uploadInputTitle = document.querySelector('.upload-input-title');
const $uploadTextarea = document.querySelector('.upload-textarea');
const $uploadModifyImgInput = document.querySelector('.profile-upload-img-input');
const $uploadModifyPreviewImg = document.querySelector('.profile-upload-preview-img');
const $profileUploadImg = document.querySelector('.profile-upload-img');


let todos = [];
let item = "";


// 함께하기 클릭시
const Together = () =>{
  alert('업데이트 중입니다 :-)');
}


// 글 디테일 보기
const renderDetail = (item) => {
  console.log('itmem',item)
  Authorization = localStorage.getItem('Authorization')
  fetch(`https://djangodailydiary.herokuapp.com/article/detail?article_id=${item}&`, {
  // fetch(`http://127.0.0.1:8000/article/detail?article_id=${item}`, {
    method: 'GET',
    headers : {
      "Authorization": Authorization
    },
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    let create_date = new Date(parseInt(data['article'][0]['created_at']) * 1000);
    create_date = create_date.getFullYear() + "/" + (create_date.getMonth() + 1) + "/" + create_date.getDate() + " " + create_date.getHours() + ":" + create_date.getMinutes()
    let update_date = new Date(parseInt(data['article'][0]['updated_at']) * 1000);
    update_date = update_date.getFullYear() + "/" + (update_date.getMonth() + 1) + "/" + update_date.getDate() + " " + update_date.getHours() + ":" + update_date.getMinutes()
    if (update_date == 'NaN/NaN/NaN NaN:NaN'){
      update_date = ' '
    }
    $detailContent.innerHTML =
      `<li>
  <img class="detail-img" src="${data['article'][0]['image']}" alt="올린이미지" onerror="this.src='img/img5.png'">
  <div class="profile-upload-img">
    <input class="profile-upload-img-input" type="file" name="image" width="50" ><br>
    <img src="" class="profile-upload-preview-img" onerror="this.src='${data['article'][0]['image']}'" onclick="ModifyImgInput(event)" onerror="this.src='img/img5.png'">
  </div>
  </li>
  <li class="detail-content-title">
  <label for="de-title" class="a11y-hidden">제목</label>
  <input class="toggle detail-input-title" type="text" placeholder="제목">
  <span class="toggle detail-span-title">${data['article'][0]['title']}</span>
  <div class="toggle detail-date">
  <span class="detail-span-date"><span class="far fa-calendar"></span>posted
    on<span class="date-underline">${create_date}</span></span><span class="detail-span-edited"><span
      class="far fa-calendar-check"></span>Edited on<span
      class="date-underline edited-date">${update_date}</span></span>
  </div>
  </li>
  <li class="detail-content-detail">
    <textarea name="detail-textarea" class="toggle detail-textarea" cols="30" rows="10" placeholder="내용"></textarea>
    <span class="toggle detail-span-textarea">${data['article'][0]['content']}</span>
  </li>`;
    document.querySelector('.buttons-confirm-submit' ).innerHTML = `
    <button class="detail-confirm-button" onclick=detailConfirmButton(${data['article'][0]['id']})>확인</button>`

    document.querySelector('.buttons-confirm-cancel').innerHTML = `
    <button class="detail-confirm-button" onclick=detailCancelButton()>취소</button>`

    document.querySelector('.detail-input-title').style.display = "none";
    document.querySelector('.detail-textarea').style.display = "none";
    document.querySelector('.buttons-confirm-cancel').style.display = "none";
    document.querySelector('.detail-span-title').style.display = "inline-block";
    document.querySelector('.detail-date').style.display = "block";
    document.querySelector('.detail-span-date').style.display = "inline-block";
    document.querySelector('.detail-span-textarea').style.display = "inline-block";
    document.querySelector('.detail-change-button').style.display = "inline-block";
    document.querySelector('.profile-upload-img').style.display='none';
    const $editedDate = document.querySelector('.edited-date');
    const $detailSpanEdited = document.querySelector('.detail-span-edited');
    $detailSpanEdited.style.display = $editedDate.textContent === "undefined" ? "none" : "inline-block";


  }).catch((error) => {
    console.log('error', error);
  })
}

const getTodos = () => {
  if (localStorage.getItem('Authorization') ==  null){
    // window.location.replace("http://127.0.0.1:5501/login.html");
    window.location.replace("https://daily-diary.netlify.app/login.html");
  }

  Authorization = localStorage.getItem('Authorization')
  fetch("https://djangodailydiary.herokuapp.com/article", {
  // fetch("http://127.0.0.1:8000/article", {
    method: 'GET',
    headers: {
      
      "Authorization":Authorization,
    },
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    document.querySelector('.main-infor').innerText = `환영해요 ! ${data['user']}님`

    for (let i = 0; i < data['articles'].length; i++) {
      let create_date = new Date(parseInt(data['articles'][i]['created_at']) * 1000);
      create_date = create_date.getFullYear() + "/" + (create_date.getMonth() + 1) + "/" + create_date.getDate()
      $mainItems.innerHTML +=
        `<li class="li-item li-item${data['articles'][i]['id']}">
      <img src="${data['articles'][i]['image']}" alt="item이미지" class="img" onerror="this.src='img/img5.png'">
      <span class="far fa-times-circle item-close" onclick = deleteItem('${data['articles'][i]['id']}')></span>
      <span class="li-date">${create_date}</span>
      <span class="li-title">${data['articles'][i]['title']}</span>
    </li>`
    }
  }).catch((error) => {
    console.log('error', error);
  })
}


document.addEventListener("DOMContentLoaded", getTodos);

// 등록 클릭 시 등록 모달창 display
$mainSubmit.onclick = () => {
  $modalUploadLayer.style.display = 'inherit'
};

// x버튼, 레이어 클릭시 모달창 none
const closeUploadModal = () => {
  $modalUploadLayer.style.display = 'none'
  $uploadInputTitle.value = '';
  $uploadTextarea.value = '';
  $uploadPreviewImg.setAttribute("src", "");
  reader = '';
}
$closeButton.onclick = () => {
  closeUploadModal()
};
$modalUploadLayer.onclick = (e) => {
  if (e.target !== $modalUploadLayer) return
  closeUploadModal()
};

// 이미지 업로드 기능(article create시에)
const $uploadImgInput = document.querySelector('.upload-img-input');
const $uploadPreviewImg = document.querySelector('.upload-preview-img');
let reader = '';
$uploadImgInput.onchange = (e) => {
  const imgFile = e.target.files[0];
  reader = new FileReader();
  reader.onload = () => {

    $uploadPreviewImg.setAttribute("src", reader.result);
  }
  reader.readAsDataURL(imgFile);
}

// 모달창 + 이미지 선택시 이미지 업로드 기능
$uploadPreviewImg.onclick = () => {
  $uploadImgInput.click();
}

// x버튼 클릭 시 item 삭제
const deleteItem = (id) => {
  Authorization = localStorage.getItem('Authorization')
  
  fetch(`https://djangodailydiary.herokuapp.com/article/delete/${id}`, {
  // fetch(`http://127.0.0.1:8000/article/delete/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization" : Authorization
    }
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    $mainItems.innerHTML = '';
    for (let i = 0; i < data['articles'].length; i++) {
      let create_date = new Date(parseInt(data['articles'][i]['created_at']) * 1000);
      create_date = create_date.getFullYear() + "/" + (create_date.getMonth() + 1) + "/" + create_date.getDate()
      $mainItems.innerHTML +=
        `<li class="li-item li-item${data['articles'][i]['id']}">
      <img src="${data['articles'][i]['image']}" alt="item이미지" class="img", onerror="this.src='img/img5.png'">
      <span class="far fa-times-circle item-close" onclick = deleteItem('${data['articles'][i]['id']}')></span>
      <span class="li-date">${create_date}</span>
      <span class="li-title">${data['articles'][i]['title']}</span>
    </li>`
    }
  }).catch((error) => {
    console.log('error', error);
  })
}

const scrollDetail = () => {

  $detail.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
  setTimeout(function () {
    $main.style.display = 'none';
    $detailBtn.style.opacity = '1';
  }, 1000)
}

$mainItems.onclick = e => {
  if (e.target.classList.contains('far')) {
    item = e.target.parentNode.classList[1].slice(7);
    deleteItem(item);
  };
  if (e.target.classList.contains('img')) {
    $detail.style.display = 'block';
    item = e.target.parentNode.classList[1].slice(7)
    renderDetail(item);
    scrollDetail();
  }
}

$detailBtn.onclick = () => {
  $detailBtn.style.opacity = '0';
  $main.style.display = 'flex';
  $main.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  })
  setTimeout(function () {
    $detail.style.display = 'none';
  }, 1000)
}


// detail button toggle
const toggleDetailClass = () => {
  $toggleTags = document.querySelectorAll('.toggle');
  $toggleTags.forEach(tag => {
    tag.style.display = tag.style.display !== "none" ? "none" : "inline-block"
  });
}

// 수정 버튼 클릭 시
const $detailChangeButton = document.querySelector('.detail-change-button');
$detailChangeButton.onclick = () => {
  toggleDetailClass()
  
  document.querySelector('.detail-input-title').value =
  document.querySelector('.detail-span-title').textContent;
  document.querySelector('.detail-textarea').value =
  document.querySelector('.detail-span-textarea').textContent;

  $buttonsConfirmSubmit.style.display = 'block';
  $buttonsConfirmCancel.style.display = 'block';
  document.querySelector('.profile-upload-img').style.display='block';
  document.querySelector('.detail-img').style.display = 'none';
}


// 사진업로드(글 수정시에 )
$uploadModifyImgInput.onchange = (e) => {
  const imgFile = e.target.files[0];
  let reader = new FileReader();

  reader.onload = () =>{
    document.querySelector('.profile-upload-preview-img').setAttribute('src', reader.result); // 재선언 필요
  }    
  reader.readAsDataURL(imgFile);
}

function ModifyImgInput(e){
  $uploadModifyImgInput.click();
}


// 확인 버튼 클릭 시
detailConfirmButton = (id) => {  
  let image = $uploadModifyImgInput.files[0]; // 위에서 선언한 input사용, 재선언 안됨
  let title = document.querySelector('.detail-input-title').value;
  let content = document.querySelector('.detail-textarea').value;
  let formData = new FormData();
  formData.append('image', image);
  formData.append('title', title);
  formData.append('content', content);

  if (!title || !content) {
    alert('제목과 내용을 작성해주세요');
  } else {
    let editedDate = new Date();

    editedDate = editedDate.toISOString().slice(0, 10);
    toggleDetailClass();
    fetch(`https://djangodailydiary.herokuapp.com/article/${id}`, {
    // fetch(`http://127.0.0.1:8000/article/${id}`, {
      method: 'POST',
      headers: {
        "Authorization" : Authorization
      },
      body: formData
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      let create_date = new Date(parseInt(data['article'][0]['created_at']) * 1000);
      let created_at = create_date.getFullYear() + "/" + (create_date.getMonth() + 1) + "/" + create_date.getDate() + " " + create_date.getHours() + ":" + create_date.getMinutes()
      let update_date = new Date(parseInt(data['article'][0]['updated_at']) * 1000);
      update_date = update_date.getFullYear() + "/" + (update_date.getMonth() + 1) + "/" + update_date.getDate() + " " + update_date.getHours() + ":" + update_date.getMinutes()
      
      $detailContent.innerHTML =
        `<li>
    <img class="detail-img" src="${data['article'][0]['image']}" alt="올린이미지">
    <div class="profile-upload-img">
    <input class="profile-upload-img-input" type="file" name="image" width="50" ><br>
    <img src="" class="profile-upload-preview-img" onerror="this.src='${data['article'][0]['image']}'" onclick="ModifyImgInput(event)">
  </div>
    </li>
    <li class="detail-content-title">
    <label for="de-title" class="a11y-hidden">제목</label>
    <input class="toggle detail-input-title" type="text" placeholder="제목">
    <span class="toggle detail-span-title">${data['article'][0]['title']}</span>
    <div class="toggle detail-date">
    <span class="detail-span-date"><span class="far fa-calendar"></span>posted
      on<span class="date-underline">${created_at}</span></span><span class="detail-span-edited"><span
        class="far fa-calendar-check"></span>Edited on<span
        class="date-underline edited-date">${update_date}</span></span>
    </div>
    </li>
    <li class="detail-content-detail">
      <textarea name="detail-textarea" class="toggle detail-textarea" cols="30" rows="10" placeholder="내용"></textarea>
      <span class="toggle detail-span-textarea">${data['article'][0]['content']}</span>
    </li>`;
      document.querySelector('.buttons-confirm-submit' ).innerHTML = `
      <button class="detail-confirm-button" onclick=detailConfirmButton(${data['article'][0]['id']})>확인</button>`
  
      document.querySelector('.buttons-confirm-cancel').innerHTML = `
      <button class="detail-confirm-button" onclick=detailCancelButton()>취소</button>`
  
      document.querySelector('.detail-input-title').style.display = "none";
      document.querySelector('.detail-textarea').style.display = "none";
      document.querySelector('.buttons-confirm-cancel').style.display = "none";
      document.querySelector('.detail-span-title').style.display = "inline-block";
      document.querySelector('.detail-date').style.display = "block";
      document.querySelector('.detail-span-date').style.display = "inline-block";
      document.querySelector('.detail-span-textarea').style.display = "inline-block";
      document.querySelector('.detail-change-button').style.display = "inline-block";
      document.querySelector('.profile-upload-img').style.display='none';
      
      const $editedDate = document.querySelector('.edited-date');
      const $detailSpanEdited = document.querySelector('.detail-span-edited');
      $detailSpanEdited.style.display = $editedDate.textContent === "undefined" ? "none" : "inline-block";
      
    }).catch((error) => {
      console.log('error', error);
    })

    title = "";
    content = "";

    $buttonsConfirmSubmit.style.display = 'none';
    $buttonsConfirmCancel.style.display = 'none';
    $detailChangeButton.style.display = 'inline-block';
    
  }
}

// 취소 버튼 클릭 시
detailCancelButton = () => {
  toggleDetailClass();
  renderDetail(item);

  $buttonsConfirmSubmit.style.display = 'none';
  $buttonsConfirmCancel.style.display = 'none';
  
  document.querySelector('.profile-upload-img').style.display='none';
  document.querySelector('.detail-img').style.display = 'block';
}

// 서치 동적 기능
const $mainInput = document.querySelector('.main-input');

$mainInput.oninput = () => {
  const $liItems = document.querySelectorAll('.li-item');
  
  $liItems.forEach(liItem => {
    let name = liItem.querySelector(".li-title");
    let calender = liItem.querySelector(".li-date");
    
    if (name.innerHTML.indexOf($mainInput.value) > -1 || calender.innerHTML.indexOf($mainInput.value) > -1) {
      liItem.style.display = 'block';
    } 
    else {
      liItem.style.display = 'none';
    }
  })
}


const ArticleSubmit = (e) => {
  e.preventDefault();

  if (!$uploadInputTitle.value || !$uploadTextarea.value || !reader.result) {
    alert('제목과 내용, 이미지를 모두 입력해주세요.')
    return
  }

  document.querySelector('.article-upload-form').addEventListener('submit', CreateArticle(e));
  closeUploadModal();
}

const CreateArticle = (e) => {
  e.preventDefault();
  let image = document.querySelector('.upload-img-input').files[0];
  let title = document.querySelector('.upload-input-title').value;
  let content = document.querySelector('.upload-textarea').value;
  const Authorization = localStorage.getItem('Authorization');

  let formData = new FormData();
  formData.append('image', image);
  formData.append('title', title);
  formData.append('content', content);

  // ajax통신
  fetch("https://djangodailydiary.herokuapp.com/article", {
  // fetch("http://127.0.0.1:8000/article", {
    method: 'POST',
    headers: {
      "Authorization": Authorization
    },
    body: formData
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    // location.href = "http://127.0.0.1:5501/";
    location.href = "https://daily-diary.netlify.app/";
  }).catch((error) => {
    console.log('error', error);
  })
}