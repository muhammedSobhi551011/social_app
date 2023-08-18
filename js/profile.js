const params = new URLSearchParams(window.location.search)
const userId = params.get("userId")
const searchBar = document.querySelector("#search-bar")
searchBar.value=""
function getUserPosts(){
    const postsContainer = document.querySelector("#posts-container")
    postsContainer.innerHTML=''
    loading()
    axios.get(`${baseURL}/users/${userId}/posts?sortBy=created_at`)
    .then((response)=>{
        const posts = response.data.data
        document.querySelector("title").textContent=`@${posts[0].author.username}'s Profile`
        for (let i=posts.length-1; i>=0; i--){
            const postId=posts[i].id
            const postUserImg=typeof posts[i].author.profile_image==="object"? ("./images/abstract-user-flat-1.svg"):(posts[i].author.profile_image)
            const postUsername=posts[i].author.username
            const postCreatedAt=posts[i].created_at
            const postImg=typeof posts[i].image==="object"? (""):(`<img src=${posts[i].image} class="img-fluid">`)
            const postBody=posts[i].body
            const commentsCounts=posts[i].comments_count
            const addCommentForm =`
                <form class="d-flex flex-row m-2 column-gap-2">
                <div class="w-100">
                    <input type="text" class="form-control form-control-sm default-font-size" id="add-comment${postId}" placeholder="Add comment...">
                </div>
                <div>
                <svg class="bg-primary rounded-2" onclick="addComment(${postId},false)" style="cursor: pointer;width: 21px;height: 22px;" xmlns="http://www.w3.org/2000/svg" id="add" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M14.5 22V7M7 14.5h15"></path></svg>
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
                <div class="d-flex flex-row justify-content-between border-bottom p-2 ">
                <div class="d-flex flex-row column-gap-1">
                    <div class="poster-image">
                    <img src=${postUserImg!=null?(postUserImg):("./images/WhatsApp_Image_2023-07-08_at_20.11.29.jpg")} style="width: 100%;">
                    </div>
                    <div class="d-flex flex-column justify-content-around ">
                    <span>${postUsername}</span>
                    <span class="created-at">${postCreatedAt}</span>
                    </div>
                </div>
                ${user==null?(""):(user.id===posts[i].author.id?(postOptionMenu):(''))}
                </div>
                <div class="m-2">
                <div>
                    <p>${postBody}</p>
                </div>
                <div class="d-flex justify-content-center">
                    ${postImg}
                </div>
                </div>
                <div class="border-top ">
                    <div class="m-2 d-flex flex-row justify-content-between ">
                        <span><span><svg style="width:23px; height:23px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="chat"><path d="M13,11H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4-4H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Zm2-5H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"></path></svg><span id="comments${postId}-number"> ${commentsCounts}</span> Comments</span></span>
                        <div id="tags${postId}">
                        
                        </div>
                    </div>

                    <div id="comments${postId}" class="d-flex flex-column row-gap-3  m-2">
                        
                    </div>
                
                    ${addCommentForm}
                </div>
            </div>
            <!-- END POST -->
            `
            postsContainer.innerHTML+=postContent
            getComments(postId)
            getPostTags(posts[i].tags,postId)
        }
        loading()
    })
    .catch(error=>{
        console.log(error)
        loading()
    })
}
function getUser(){
    axios.get(`${baseURL}/users/${userId}`)
    .then(response=>{
        const user = response.data.data
        const userImg=typeof user.profile_image==="object"? ("./images/abstract-user-flat-1.svg"):(user.profile_image)
        const username = user.username
        const name = user.name
        const email = user.email==null?(""):(user.email)
        const commentsCount = user.comments_count
        const postsCount = user.posts_count
        const detailsCard = document.querySelector("#details-card")
        
        detailsCard.innerHTML=`
            <div class="d-flex flex-column align-items-center row-gap-3 ">
                <div id="profile-image" class="">
                <img src=${userImg} style="width: 100%;" >
                </div>
                <div class="d-flex flex-column align-items-center">
                <span>@${username}</span>
                <span>${name}</span>
                <span>${email}</span>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-around ">
                <span class="fw-light "><span class="counts">${postsCount}</span> Posts</span>
                <span class="fw-light "><span class="counts">${commentsCount}</span> Comments</span>
            </div>
        `
    })
    .catch(error=>{
        console.log(error)
    })
}