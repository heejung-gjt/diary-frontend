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
let todos = [];
let item = "";


const renderDetail = (item) => {

  fetch(`http://127.0.0.1:8000/article/detail?id=${item}&`, {
    method: 'GET',

  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    console.log('세부페이지', data, data['article'][0]['id'])
    let create_date = new Date(parseInt(data['article'][0]['created_at']) * 1000);
    create_date = create_date.getFullYear() + "/" + (create_date.getMonth() + 1) + "/" + create_date.getDate() + " " + create_date.getHours() + ":" + create_date.getMinutes()
    let update_date = new Date(parseInt(data['article'][0]['updated_at']) * 1000);
    update_date = update_date.getFullYear() + "/" + (update_date.getMonth() + 1) + "/" + update_date.getDate() + " " + update_date.getHours() + ":" + update_date.getMinutes()
    if (update_date == 'NaN/NaN/NaN NaN:NaN'){
      update_date = ' '
    }
    $detailContent.innerHTML =
      `<li>
  <img class="detail-img" src="${data['article'][0]['image']}" alt="올린이미지">
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
    const $editedDate = document.querySelector('.edited-date');
    const $detailSpanEdited = document.querySelector('.detail-span-edited');
    $detailSpanEdited.style.display = $editedDate.textContent === "undefined" ? "none" : "inline-block";


  }).catch((error) => {
    console.log('error', error);
  })
}

const getTodos = () => {
  // ajax로 backend에 요청 !

  fetch("http://127.0.0.1:8000/", {
    method: 'GET',
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
  }).then(function (response) {
    return response.json()
  }).then(function (data) {

    console.log(data['articles'][0], data.length)
    for (let i = 0; i < data['articles'].length; i++) {
      let create_date = new Date(parseInt(data['articles'][i]['created_at']) * 1000);
      create_date = create_date.getFullYear() + "/" + (create_date.getMonth() + 1) + "/" + create_date.getDate()
      console.log(data['articles'][i]['id'])
      $mainItems.innerHTML +=
        `<li class="li-item li-item${data['articles'][i]['id']}">
      <img src="${data['articles'][i]['image']}" alt="item이미지" class="img">
      <span class="far fa-times-circle item-close" onclick = deleteItem('${data['articles'][i]['id']}')></span>
      <span class="li-date">${create_date}</span>
      <span class="li-title">${data['articles'][i]['title']}</span>
    </li>`
    }
  }).catch((error) => {
    console.log('error', error);
  })
}

// getTodos
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

// 이미지 업로드 기능
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

// add
const addTodo = (title, content, date, img) => {
  const todo = {
    id: Math.max(...todos.map(todo => todo.id), 0) + 1,
    title,
    content,
    date,
    img
  };
  todos = [todo, ...todos];
  render();
};

// x버튼 클릭 시 item 삭제
const deleteItem = (id) => {
  param = {
    'id': id
  }
  fetch("http://127.0.0.1:8000/article/delete/", {
    method: 'POST',
    body: JSON.stringify(param)
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    $mainItems.innerHTML = '';
    for (let i = 0; i < data['articles'].length; i++) {
      let create_date = new Date(parseInt(data['articles'][i]['created_at']) * 1000);
      create_date = create_date.getFullYear() + "/" + (create_date.getMonth() + 1) + "/" + create_date.getDate()
      $mainItems.innerHTML +=
        `<li class="li-item li-item${data['articles'][i]['id']}">
      <img src="${data['articles'][i]['image']}" alt="item이미지" class="img">
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
  console.log('와우와우')
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
  // $detailBtn.style.display = 'none';

  $buttonsConfirmSubmit.style.display = 'block';
    $buttonsConfirmCancel.style.display = 'block';

}

// modify function
const modifyTodo = (title, content, edited) => {
  todos = JSON.parse(localStorage.getItem("key")).map(todo =>
    todo.id === +item ? { ...todo, title, content, edited } : todo);
  renderDetail(item);
  render()
}

// 확인 버튼 클릭 시
detailConfirmButton = (id) => {
  const detailInputTitle = document.querySelector('.detail-input-title');
  const detailTextarea = document.querySelector('.detail-textarea');
  if (!detailInputTitle.value || !detailTextarea.value) {
    alert('제목과 내용을 작성해주세요');
  } else {
    const modifiedTitle = detailInputTitle.value;
    const modifiedContent = detailTextarea.value;
    let editedDate = new Date();
    editedDate = editedDate.toISOString().slice(0, 10);
    toggleDetailClass();
    param = {
      'title': modifiedTitle,
      'content': modifiedContent,
      'id': id
    }
    fetch("http://127.0.0.1:8000/article/update/", {
      method: 'POST',
      body: JSON.stringify(param)
    }).then(function (response) {
      return response.json()
    }).then(function (data) {
      let create_date = new Date(parseInt(data['article'][0]['created_at']) * 1000);
      create_date = create_date.getFullYear() + "/" + (create_date.getMonth() + 1) + "/" + create_date.getDate() + " " + create_date.getHours() + ":" + create_date.getMinutes()
      let update_date = new Date(parseInt(data['article'][0]['updated_at']) * 1000);
      update_date = update_date.getFullYear() + "/" + (update_date.getMonth() + 1) + "/" + update_date.getDate() + " " + update_date.getHours() + ":" + update_date.getMinutes()
      $detailContent.innerHTML =
        `<li>
    <img class="detail-img" src="${data['article'][0]['image']}" alt="올린이미지">
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
      const $editedDate = document.querySelector('.edited-date');
      const $detailSpanEdited = document.querySelector('.detail-span-edited');
      $detailSpanEdited.style.display = $editedDate.textContent === "undefined" ? "none" : "inline-block";
      
    }).catch((error) => {
      console.log('error', error);
    })

    // modifyTodo(modifiedTitle, modifiedContent, editedDate);
    detailInputTitle.value = "";
    detailTextarea.value = "";
    // $detailBtn.style.display = 'inline-block';
    $buttonsConfirmSubmit.style.display = 'none';
    $buttonsConfirmCancel.style.display = 'none';
    $detailChangeButton.style.display = 'inline-block';
  }
}
// 취소 버튼 클릭 시
// const $detailCancelButton = document.querySelector('.detail-cancel-button');
detailCancelButton = () => {
  toggleDetailClass();
  renderDetail(item);
  // $detailBtn.style.display = 'inline-block';
  $buttonsConfirmSubmit.style.display = 'none';
    $buttonsConfirmCancel.style.display = 'none';
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
    } else {
      liItem.style.display = 'none';
    }
  })
}
// 모달창 + 이미지 선택시 이미지 업로드 기능
$uploadPreviewImg.onclick = () => {
  $uploadImgInput.click();
}


function ArticleSubmit(e) {
  e.preventDefault();
  console.log('d')
  if (!$uploadInputTitle.value || !$uploadTextarea.value || !reader.result) {
    alert('제목과 내용, 이미지 모두 입력해주세요.')
    return
  }

  document.querySelector('.article-upload-form').addEventListener('submit', CreateArticle(e));
  closeUploadModal();
}

function CreateArticle(e) {
  event.preventDefault();
  image = document.querySelector('.upload-img-input').files[0];
  title = document.querySelector('.upload-input-title').value;
  content = document.querySelector('.upload-textarea').value;
  // imageList = image.files;
  // let reader = new FileReader();
  let formData = new FormData();
  formData.append('image', image);
  formData.append('title', title);
  formData.append('content', content);

  // ajax통신
  fetch("http://127.0.0.1:8000/article/create/", {
    method: 'POST',
    body: formData
  }).then(function (response) {
    return response.json()
  }).then(function (data) {
    location.href = "http://127.0.0.1:5500/index.html";
  }).catch((error) => {
    console.log('error', error);
  })
}