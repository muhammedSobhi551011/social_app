// GLOBAL VARIABLES
let counter=1
const postsContainer = document.querySelector("#posts-container")
postsContainer.innerHTML=''

// END GLOBAL VARIABLES

// HOME FUNCTIONS
async function getPosts(update,counter){
  const searchBar = document.querySelector("#search-bar")
  searchBar.value=""
  let postsURL = `${baseURL}/posts?limit=5&page=${counter}`
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))
  if(update){
    await emptyPosts()
  }
  loading()
  axios.get(postsURL)
  .then((response)=>{
    const posts = response.data.data
    for(const post of posts){
      const postId=post.id
      const postUserImg=typeof post.author.profile_image==="object"? ("./images/abstract-user-flat-1.svg"):(post.author.profile_image)
      const postUsername=post.author.username
      const postCreatedAt=post.created_at
      const postImg=typeof post.image==="object"? (""):(`<img src=${post.image} class="img-fluid">`)
      const postBody=post.body
      const commentsCounts=post.comments_count
      const addCommentForm =`
        <form class="d-flex flex-row m-2 ms-0 me-0 column-gap-2">
          <div class="w-100">
            <input onkeypress="enter(event,${postId})" type="text" class="form-control form-control-sm default-font-size" id="add-comment${postId}" placeholder="Add comment...">
          </div>
          <div>
            <svg class="bg-primary rounded-2" onclick="addComment(${postId},true)" style="cursor: pointer;width: 21px;height: 22px;" xmlns="http://www.w3.org/2000/svg" id="add" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path fill="none" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M14.5 22V7M7 14.5h15"></path></svg>
          </div>
        </form>
      `
      const postOptionMenu=`
        <div class="dropdown dropstart">
          <?xml version="1.0" standalone="no"?>
          <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
          "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">  <svg style="cursor:pointer" data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle" viewBox="0 0 16 16"> <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/> </svg>  
          <ul class="dropdown-menu">
              <li><button id="edit-post${postId}" onclick="updateModal(this,${postId})" type="button" class="dropdown-item modal-btn">Edit</button></li>
              <li><button id="delete-post${postId}" onclick="updateModal(this,${postId})" type="button" class="dropdown-item btn btn-danger">Delete</button></li>
          </ul>
        </div>
      `
      const postContent=`
      <!-- POST -->
      <div id="post${postId}" class="bg-light text-dark rounded-3" style="box-shadow: 1px 1px 9px black;">
        <div class="d-flex flex-row justify-content-between border-bottom p-2">
          <div class="d-flex flex-row column-gap-1" style="cursor:pointer" onclick="${token!=null?(`userProfile(${post.author.id})`):("unLoggedUserAlert()")}">
            <div class="poster-image">
              <img src=${postUserImg!=null?(postUserImg):("./images/WhatsApp_Image_2023-07-08_at_20.11.29.jpg")} style="width: 100%;">
            </div>
            <div class="d-flex flex-column justify-content-around ">
              <span>@${postUsername}</span>
              <span class="created-at">${postCreatedAt}</span>
            </div>
          </div>
          ${user==null?(""):(user.id===post.author.id?(postOptionMenu):(''))}
        </div>
        <div class="m-2" style="cursor:pointer" onclick="${token!=null?(`postDetails(${postId})`):("unLoggedUserAlert()")}">
          <div>
            <p>${postBody}</p>
          </div>
          <div class="d-flex justify-content-center">
            ${postImg}
          </div>
        </div>
        <div class="border-top ">
          <div class="m-2 d-flex flex-column default-font-size">
            <div style="cursor:pointer; width:100%" onclick="${token!=null?(`postDetails(${postId})`):("unLoggedUserAlert()")}">
              <span><svg style="width:23px; height:23px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="chat"><path d="M13,11H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4-4H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Zm2-5H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"></path></svg><span id="comments${postId}-number"> ${commentsCounts}</span> Comments</span>
            </div>
            ${token!=null?(addCommentForm):("")}
            <div id="tags${postId}">
              
            </div>
          </div>
        </div>
      </div>
      <!-- END POST -->
      `
    postsContainer.innerHTML+=postContent
    getPostTags(post.tags,postId)
    }
    loading()
  })
  .catch((error)=>{
    console.log(error)
    loading()
  })
}
// END HOME FUNCTIONS

// HELPER FUNCTIONS
function homeInfiniteScroll(){
  window.addEventListener("scroll",()=>{
    if(window.scrollY + window.innerHeight + 1 >= document.body.offsetHeight){
      counter+=1
      postsURL=`${baseURL}/posts?limit=3&page=${counter}`
      getPosts(false,counter)
    }
  })
}
async function emptyPosts(){
  postsContainer.innerHTML=''
}

// END HELPER FUNCTIONS