
// GLOBAL VARIABLES
const baseURL = "https://tarmeezacademy.com/api/v1"
const myModal = new bootstrap.Modal(document.getElementById('modal'))
const addPostIcon = document.querySelector("#add-post-icon")
let token = localStorage.getItem("token")
let user = JSON.parse(localStorage.getItem("user"))

// END GLOBAL VARIABLES

// MAIN FUNCTIONS
function buildNavbar(){
  const navContainer = document.querySelector("nav")

  const navbar = `
  <div class="container-fluid">
    <a class="navbar-brand" href="./home.html"><img src="./images/logoAsset 2@100x.png" style="width: 66px"></img></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
      <ul class="navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link default-font-size" href="./home.html"> <svg  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
          <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
          </svg> Home</a>
        </li>
      </ul>
      <div class="d-flex mb-2 mb-lg-0 input-group-sm">
        <span class="input-group-text" id="basic-addon1">@</span>
        <input id="search-bar" class="form-control me-2" type="text" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1">
        
        <svg style="cursor:pointer" id="search-btn" onclick="${token!=null?(`usersSearch()`):("unLoggedUserAlert()")}"  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" id="search"><path fill="#200E32" d="M19.7555474,18.6065254 L16.3181544,15.2458256 L16.3181544,15.2458256 L16.2375905,15.1233001 C16.0877892,14.9741632 15.8829641,14.8901502 15.6691675,14.8901502 C15.4553709,14.8901502 15.2505458,14.9741632 15.1007444,15.1233001 L15.1007444,15.1233001 C12.1794834,17.8033337 7.6781476,17.94901 4.58200492,15.4637171 C1.48586224,12.9784243 0.75566836,8.63336673 2.87568494,5.31016931 C4.99570152,1.9869719 9.30807195,0.716847023 12.9528494,2.34213643 C16.5976268,3.96742583 18.4438102,7.98379036 17.2670181,11.7275931 C17.182269,11.9980548 17.25154,12.2921761 17.4487374,12.4991642 C17.6459348,12.7061524 17.9410995,12.794561 18.223046,12.7310875 C18.5049924,12.667614 18.7308862,12.4619014 18.8156353,12.1914397 L18.8156353,12.1914397 C20.2223941,7.74864367 18.0977423,2.96755391 13.8161172,0.941057725 C9.53449216,-1.08543846 4.38083811,0.250823958 1.68905427,4.08541671 C-1.00272957,7.92000947 -0.424820906,13.1021457 3.0489311,16.2795011 C6.5226831,19.4568565 11.8497823,19.6758854 15.5841278,16.7948982 L18.6276529,19.7705177 C18.9419864,20.0764941 19.4501654,20.0764941 19.764499,19.7705177 C20.0785003,19.4602048 20.0785003,18.9605974 19.764499,18.6502845 L19.764499,18.6502845 L19.7555474,18.6065254 Z" transform="translate(2 2)"></path></svg>
      </div>
      <ul id="tags" class="navbar-nav mb-2 mb-lg-0 column-gap-2 row-gap-2 default-font-size">
        <li class="nav-item"><span class="text-bg-dark ps-2 pe-2 rounded-5" style="padding: 2px 0 2px 0">Tag 1</span></li>
        
      </ul>
      <ul class="navbar-nav mb-2 mb-lg-0 column-gap-3 row-gap-2 ">
        <li class="nav-item">
          <button id="login" type="button" class="default-font-size btn btn-sm btn-outline-primary " onclick="updateModal(this)">Login</button>
        </li>
        <li class="nav-item">
          <button id="signup" type="button" class="default-font-size btn btn-sm btn-primary " onclick="updateModal(this)">Signup</button>
        </li>
        <li id="user-icon" style="cursor:pointer" class="nav-item">
          <div class="d-flex flex-row column-gap-2">
            <div id="current-user-image" style="width: 36px;height: 36px;">
              <img src="" style="width: 100%;">
            </div>
            <div class="d-flex flex-column justify-content-around ">
              <span id="current-user-username" class="default-font-size"></span>
            </div>
          </div>
        </li>
        <li class="nav-item">
          <button id="logout" type="button" class="default-font-size btn btn-sm btn-danger" onclick="logout()">Logout</button>
        </li>
      </ul>
    </div>
  </div>
  `
  navContainer.innerHTML=navbar
  getTags()
  document.querySelector("#search-bar").addEventListener("keypress",(e)=>{
    if (e.key==="Enter"){
      if (token!=null){
        usersSearch()
      }
      else{
        unLoggedUserAlert()
      }
    }
  })
}

async function updateModal(target,postId){
  // EDIT AND DELETE POST
  if (postId!=null){
    const post = await getSpecificPost(postId)
    if(target.id===`edit-post${postId}`){
      const editPostModalBody = `
        <form class="row g-2 ">
          <div class="col-12">
          <textarea placeholder="Edit post." class="form-control" id="edit-post-body" rows="4">${post.body}</textarea>
          </div>
        </form>
      `
      const editModal = {
        title: "Edit Post",
        body: editPostModalBody,
        submitBtn: "Edit",
        submitBtnStyleAdd: "btn-primary",
        submitBtnStyleRemove: "btn-danger",
        callbackFunction: `editPost(${postId})`
      }
      insertModifiedModal(editModal)
    }
    else if(target.id===`delete-post${postId}`){
      const deleteModal = {
        title: "Delete Post",
        body: "Are you sure?",
        submitBtn: "Delete",
        submitBtnStyleAdd: "btn-danger",
        submitBtnStyleRemove: "btn-primary",
        callbackFunction: `deletePost(${postId})`
      }
      insertModifiedModal(deleteModal)
    }
  }
  // END EDIT AND DELETE POST

  // LOGIN AND SIGNUP
  if (target.id==="signup"){
    const signupModalBody=`
      <form class="row g-2 ">
        <div class="col-12">
          <lable class="form-lable">Profile Photo</lable>
          <input type="file" id="signup-image" class="form-control" aria-describedby="emailHelp">
        </div>
        <div class="col-6">
          <input type="text"  id="signup-first-name" placeholder="First Name" class="form-control" id="firstname-signup" aria-describedby="emailHelp">
        </div>
        <div class="col-6">
          <input type="text"  id="signup-last-name" placeholder="Last Name" class="form-control" id="lastname-signup">
        </div>
        <div class="col-5">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input type="text" id="signup-username" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </div>
        <div class="col-7">
          <input type="email" id="signup-email" placeholder="Email" class="form-control" id="email-signup" aria-describedby="emailHelp">
        </div>
        <div class="col-8">
          <input type="password" id="signup-password" placeholder="Password" class="form-control" id="password-signup">
        </div>
      </form>
    `
    const signupModal = {
      title: "Signup",
      body: signupModalBody,
      submitBtn: "Signup",
      submitBtnStyleAdd: "btn-primary",
      submitBtnStyleRemove: "btn-danger",
      callbackFunction: `signup()`
    }
    insertModifiedModal(signupModal)
    document.querySelector("#signup-first-name").addEventListener("keypress",(e=>{
      if (e.key==="Enter"){
        signup()
      }
    }))
    document.querySelector("#signup-last-name").addEventListener("keypress",(e=>{
      if (e.key==="Enter"){
        signup()
      }
    }))
    document.querySelector("#signup-username").addEventListener("keypress",(e=>{
      if (e.key==="Enter"){
        signup()
      }
    }))
    document.querySelector("#signup-email").addEventListener("keypress",(e=>{
      if (e.key==="Enter"){
        signup()
      }
    }))
    document.querySelector("#signup-password").addEventListener("keypress",(e=>{
      if (e.key==="Enter"){
        signup()
      }
    }))
  }
  if (target.id==="login"){
    const loginModalBody=`
      <form class="row g-2">
        <div class="col-12">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">@</span>
          <input type="text" id="login-username" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        </div>
        <div class="col-12">
          <input type="password" id="login-password" placeholder="Password" class="form-control" id="password-signup">
        </div>
      </form>
    `
    const loginModal = {
      title: "Login",
      body: loginModalBody,
      submitBtn: "Login",
      submitBtnStyleAdd: "btn-primary",
      submitBtnStyleRemove: "btn-danger",
      callbackFunction: `login()`
    }
    insertModifiedModal(loginModal)
    document.querySelector("#login-username").addEventListener("keypress",(e)=>{
      if (e.key==="Enter"){
        login()
      }
    })
    document.querySelector("#login-password").addEventListener("keypress",(e)=>{
      if (e.key==="Enter"){
        login()
      }
    })
  }
  // END LOGIN AND SIGNUP

  // ADD POST
  if(target.id==="add-post-icon"){
    const addPostModalBody = `
    <form class="row g-2 ">
        <div class="col-12">
          <lable class="form-lable">Photo</lable>
          <input type="file" id="add-post-image" class="form-control" aria-describedby="emailHelp">
        </div>
        <div class="col-12">
        <textarea placeholder="Write a post." class="form-control" id="add-post-body" rows="4"></textarea>
        </div>
      </form>
    `
    const addPostModal = {
      title: "Add Post",
      body: addPostModalBody,
      submitBtn: "Add",
      submitBtnStyleAdd: "btn-primary",
      submitBtnStyleRemove: "btn-danger",
      callbackFunction: ``
    }
    insertModifiedModal(addPostModal,target)
  }
  // END ADD POST
}

function login(){
  const loginUsername = document.querySelector("#login-username")
  const loginPassword = document.querySelector("#login-password")
  if (loginUsername.value==="" && loginPassword.value===""){
    appendAlert(`<p style="margin:0">The username field is required.</p> <p style="margin:0">The password field is required.</p>`, 'danger')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
  }
  else if(loginUsername.value===""){
    appendAlert(`<p style="margin:0">The username field is required.</p>`, 'danger')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
  }
  else if(loginPassword.value===""){
    appendAlert(`<p style="margin:0">The password field is required.</p>`, 'danger')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
  }else{
    const body = {
      "username": `${loginUsername.value}`,
      "password": `${loginPassword.value}`
    }
    loading()
    axios.post(`${baseURL}/login`,body)
    .then(async (response)=>{
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("user",JSON.stringify(response.data.user))
      closeModal()
      appendAlert(`Logged in. Welcome ${response.data.user.username}!`, 'success')
      setTimeout(async ()=>{
        const bsAlert = new bootstrap.Alert('#myAlert')
        bsAlert.close()
        window.location="./home.html"
        await updateNavbar()
      },1000)
    })
    .catch(error=>{
      const errors = error.response.data.errors
      loading()
      if (errors.password){
        appendAlert(`${errors.password}`, 'danger')
        setTimeout(()=>{
          const bsAlert = new bootstrap.Alert('#myAlert')
          bsAlert.close()
        },3000)
      }else{
        appendAlert(`${errors.email}`, 'danger')
        setTimeout(()=>{
          const bsAlert = new bootstrap.Alert('#myAlert')
          bsAlert.close()
        },3000)
      }
    })
  }
}

function signup(){
  const signupUsername = document.querySelector("#signup-username")
  const signupPassword = document.querySelector("#signup-password")
  const signupEmail = document.querySelector("#signup-email")
  const signupFirstname = document.querySelector("#signup-first-name")
  const signupLastname = document.querySelector("#signup-last-name")
  const signupImage = document.querySelector("#signup-image")

  const formData = new FormData()
  formData.append("username",signupUsername.value)
  formData.append("password",signupPassword.value)
  formData.append("name",signupFirstname.value+' '+signupLastname.value)
  formData.append("email",signupEmail.value)
  if(signupImage.files[0]!=null){
    formData.append("image",signupImage.files[0])
  }
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  loading()
  axios.post(`${baseURL}/register`,formData,{
    headers: headers
  })
  .then(async (response)=>{
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("user",JSON.stringify(response.data.user))
    closeModal()
    loading()
    appendAlert(`Signed up. Welcome ${response.data.user.username}!`, 'success')
    setTimeout(async()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
      await updateNavbar()
      await getPosts(true,1)
    },3000)
  })
  .catch(error=>{
    loading()
    const errors = error.response.data.errors
    appendAlert(`${errors.username?(`<p style="margin:0">${errors.username}</p>`):("")} ${errors.email?(`<p style="margin:0">${errors.email}</p>`):("")} ${errors.password?(`<p style="margin:0">${errors.password}</p>`):("")} ${errors.image?(`<p style="margin:0">${errors.image}</p>`):("")}`, 'danger')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
  })
}

async function logout(){
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  localStorage.removeItem("users")
  appendAlert(`Logged out. Good bye!`, 'success')
  setTimeout(async ()=>{
    const bsAlert = new bootstrap.Alert('#myAlert')
    bsAlert.close()
    window.location="./home.html"
    await updateNavbar()
  },1000)
}

function userProfile(userId){
  window.location=`./profile.html?userId=${userId}`
}

function tagPosts(tagId){
  window.location=`./tagPosts.html?tagId=${tagId}`
}

function addPost(){
  const modalSubmitBtn = document.querySelector("#modal-submit-btn")
  modalSubmitBtn.addEventListener("click",()=>{
    const postImage = document.querySelector("#add-post-image")
    const postBody = document.querySelector("#add-post-body")
    const token = localStorage.getItem("token")
    const formData = new FormData()
    if(postImage.files[0]!=null){
      formData.append("image",postImage.files[0])
    }
    formData.append("body",postBody.value)
    const headers = {
      'Content-Type': 'multipart/form-data',
      'authorization': `Bearer ${token}`
    }
    loading()
    axios.post(`${baseURL}/posts`,formData,{
      headers: headers
    })
    .then(async ()=>{
      closeModal()
      loading()
      appendAlert(`Post added!`, 'success')
      setTimeout(()=>{
        const bsAlert = new bootstrap.Alert('#myAlert')
        bsAlert.close()
        window.location="./home.html"
      },1000)
    })
    .catch(error=>{
      loading()
      const errors = error.response.data.errors
      appendAlert(`${errors.body?(`<p style="margin:0">${errors.body}</p>`):("")} ${errors.image?(`<p style="margin:0">${errors.image}</p>`):("")}`, 'danger')
      setTimeout(()=>{
        const bsAlert = new bootstrap.Alert('#myAlert')
        bsAlert.close()
      },3000)
    })
  })
}

function editPost(postId){
  const editPostTitle = document.querySelector("#edit-post-title")
  const editPostBody = document.querySelector("#edit-post-body")
  if (!editPostBody.value){
    appendAlert(`<p style="margin:0">The body field is required.</p>`, 'danger')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
    return
  }
  loading()
  axios.put(`${baseURL}/posts/${postId}`,{
    "title": editPostTitle.value,
    "body": editPostBody.value
  },{
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
  .then(async ()=>{
    const params = new URLSearchParams(window.location.search)
    if(params.get("postId")==null){
      await getPosts(true,1)
    }
    else{
      await getPost()  
    }
    closeModal()
    loading()
    appendAlert(`Post edited!`, 'success')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
  })
  .catch(error=>{
    loading()
    const errors = error.response.data.errors
    appendAlert(`${errors.body?(`<p style="margin:0">${errors.body}</p>`):("")} ${errors.image?(`<p style="margin:0">${errors.image}</p>`):("")}`, 'danger')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
  })
}

function deletePost(postId){
  const token = localStorage.getItem("token")
  const closeBtn = document.querySelector("#modal-close-btn")
  loading()
  axios.delete(`${baseURL}/posts/${postId}`,{
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
  .then(async ()=>{
    const params = new URLSearchParams(window.location.search)
     if(params.size!=0){
       if (params.get("userId")!=null){
         getUserPosts()
       }
       else if(params.get("postId")!=null){
         window.location="./home.html"
       }
      }else if(params.size==0){
      await getPosts(true,1)
      }
    closeBtn.click()
    loading()
    appendAlert(`Post Deleted.`, 'success')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
  })
  .catch(error=>{
    console.log(error)
    loading()
  })
}

function addComment(postId,isHome){
  const token = localStorage.getItem("token")
  const commentsNumber = document.querySelector(`#comments${postId}-number`)
  const addCommentInput = document.querySelector(`#add-comment${postId}`)
  loading()
  axios.post(`${baseURL}/posts/${postId}/comments`,{
    "body": addCommentInput.value
  },{
    headers: {
      "authorization": `Bearer ${token}`
    }
  })
  .then(()=>{
    axios.get(`${baseURL}/posts/${postId}`)
    .then((response)=>{
      appendAlert(`Comment added!`, 'success')
      commentsNumber.textContent=`${response.data.data.comments_count}`
      addCommentInput.value=''
      if(isHome){
        setTimeout(()=>{
          const bsAlert = new bootstrap.Alert('#myAlert')
          bsAlert.close()
          postDetails(postId)
        },1000)
      }
      else{
        setTimeout(()=>{
          const bsAlert = new bootstrap.Alert('#myAlert')
          bsAlert.close()
        },1000)
        getComments(postId)
      }
      loading()
    })
    .catch(error=>{
      console.log(error)
      loading()
    })
  })
  .catch(error=>{
    loading()
    const errors = error.response.data.errors
    appendAlert(`${errors.body?(`<p style="margin:0">${errors.body}</p>`):("")}`, 'danger')
    setTimeout(()=>{
      const bsAlert = new bootstrap.Alert('#myAlert')
      bsAlert.close()
    },3000)
  })
}
// END MAIN FUNCTIONS

// HELPER FUNCTIONS
async function updateNavbar(){
  const loginNavbar = document.querySelector("#login")
  const signupNavbar = document.querySelector("#signup")
  const logout = document.querySelector("#logout")
  const currentUserImage = document.querySelector("#current-user-image").firstElementChild
  const userIcon = document.querySelector("#user-icon")
  const currentUserName = document.querySelector("#current-user-username")
  const token=localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  if (token!=null){
    if(addPostIcon!==null){
      addPostIcon.style.display="block"
    }
    loginNavbar.parentElement.classList.add("d-none")
    signupNavbar.parentElement.classList.add("d-none")
    logout.parentElement.classList.remove("d-none")
    userIcon.classList.remove("d-none")
    currentUserImage.src= typeof user.profile_image ==="object"? (`./images/abstract-user-flat-1.svg`):(user.profile_image)
    currentUserName.textContent=`@${user.username}`
    userIcon.onclick=()=>{userProfile(user.id)}
  }
  else{
    if(addPostIcon!==null){
      addPostIcon.style.display="none"
    }
    loginNavbar.parentElement.classList.remove("d-none")
    signupNavbar.parentElement.classList.remove("d-none")
    logout.parentElement.classList.add("d-none")
    userIcon.classList.add("d-none")
    
  }
}
async function getSpecificPost(postId){
  return axios.get(`${baseURL}/posts/${postId}`).then((response)=>{return (response.data.data)}).catch(error=>{console.log(error)
    loading()})
}
function insertModifiedModal(modalData){
  
  const modalBody = document.querySelector(".modal-body")
  const modalTitle = document.querySelector(".modal-title")
  const modalSubmitBtn = document.querySelector("#modal-submit-btn")

  addPostIcon.classList.remove("d-block")
  addPostIcon.classList.add("d-none")
  modalTitle.textContent=modalData.title
  modalBody.innerHTML=modalData.body
  modalSubmitBtn.textContent=modalData.submitBtn
  modalSubmitBtn.classList.add(modalData.submitBtnStyleAdd)
  modalSubmitBtn.classList.remove(modalData.submitBtnStyleRemove)
  modalSubmitBtn.setAttribute("onclick",modalData.callbackFunction)
  myModal.toggle()
}
function closeModal(){
  if (localStorage.getItem("token")!=null){
    addPostIcon.classList.remove("d-none")
    addPostIcon.classList.add("d-block")
  }
  myModal.toggle()
}
function getPostTags(tags,postId){
  const tagsContainer = document.querySelector(`#tags${postId}`)
  const allTags = JSON.parse(localStorage.getItem("tags"))
  if(tags!=null){
    tagsContainer.innerHTML=""
    for (const postTag of tags){
      for (const tag of allTags){
        if (postTag.name===tag.name){
          tagsContainer.innerHTML+=`
          <span class="btn rounded-5 btn-sm btn-outline-dark ps-1 pe-1 p-1 default-font-size" style="cursor: pointer;font-size:0.9rem" onclick="tagPosts(${tag.id})">${postTag.name}</span>
          `
        }
      }
    }
  }
}
function loading(){
  const loadingIcon = document.querySelector("#loading-icon")
  loadingIcon.classList.toggle("d-none")
}
function getComments(postId){
  axios.get(`${baseURL}/posts/${postId}`)
  .then((response)=>{
    const postComments = response.data.data.comments
    const comments = document.querySelector(`#comments${postId}`)

    const commentsCount = document.querySelector(`#comments${postId}-number`)
    commentsCount.textContent=response.data.data.comments_count
    comments.innerHTML=''
    if(postComments.length!==0){
      for (const comment of postComments){
          const commentUserImg=typeof comment.author.profile_image==="object"? ("./images/abstract-user-flat-1.svg"):(comment.author.profile_image)
          const commentBody=comment.body
          const commentUsername=comment.author.username
          comments.innerHTML+=`
          <div class="d-flex flex-column row-gap-2 bg-body-secondary  text-dark rounded-3 shadow-sm default-font-size" style="padding: 5px">
              <div class="d-flex flex-row column-gap-2 border-bottom border-dark" style="padding-bottom: 5px;cursor: pointer" onclick="${token!=null?(`userProfile(${comment.author.id})`):("unLoggedUserAlert()")}">
                  <div class="poster-image bg-white" >
                      <img src=${commentUserImg} style="width: 100%;">
                  </div>
                  <div class="d-flex flex-column justify-content-around ">
                      <span>${commentUsername}</span>
                  </div>
              </div>
              <div>
                  <span>${commentBody}</span>
              </div>
          </div>
          `
      }
    }
  })
  .catch(error=>{
    console.log(error)
    loading()
  })
}
function usersSearch(){
  const searchBar = document.querySelector("#search-bar")
  if (searchBar.value!=""){
    window.location=`./userSearch.html?search=${searchBar.value}`
  }
}
async function getUsers(){
  if (localStorage.getItem("users")==null){
    return axios.get(`${baseURL}/users?limit=4000`)
    .then((response)=>{
      localStorage.setItem("users",JSON.stringify(response.data.data))
      return response.data.data
    })
    .catch(error=>{
      console.log(error)
      loading()
    })
  }
}
function getTags(){
  const tagsContainer = document.querySelector("#tags")
  tagsContainer.innerHTML=""
  axios.get(`${baseURL}/tags`)
  .then(response=>{
    let tags = response.data.data
    for (let i=0; i<tags.length; i++){
      tags[i].id = i+1
      tagsContainer.innerHTML+=`
      <li class="nav-item"><span class="btn rounded-5 btn-sm btn-outline-dark " onclick="tagPosts(${i+1})">${tags[i].name}</span></li>
      `
    }
    localStorage.setItem("tags",JSON.stringify(tags))
  })
  .catch(error=>{
    console.log(error)
  })
}
function postDetails(postId){
  window.location=`./postDetails.html?postId=${postId}`
}
function unLoggedUserAlert(){
  appendAlert(`You must login!`, 'warning')
  setTimeout(()=>{
    const bsAlert = new bootstrap.Alert('#myAlert')
    bsAlert.close()
  },3000)
}
// ALERTS
const alertPlaceholder = document.getElementById('alerts-container')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show default-font-size" id="myAlert" role="alert">`,
      `   <div>${message}</div>`,
      '   ',
      '</div>'
    ].join('')
    
    alertPlaceholder.append(wrapper)
}
// END ALERTS

// END HELPER FUNCTIONS
