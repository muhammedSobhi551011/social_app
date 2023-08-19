const usersContainer = document.querySelector("#users-container")
const params = new URLSearchParams(window.location.search)
const username = params.get("search")

async function search(){
    const token = localStorage.getItem("token")
    const searchBar = document.querySelector("#search-bar")
    searchBar.value=username
    usersContainer.innerHTML=""
    loading()
    let users
    if(localStorage.getItem("users")==null){
        users = await getUsers()
    }else{
        users = JSON.parse(localStorage.getItem("users"))
    }
    const filteredUsers = users.filter((user)=>{
        return user.username.toLowerCase().includes(searchBar.value.toLowerCase())
    })
    for (const user of filteredUsers){
        const userImage = typeof user.profile_image=="object"?("./images/abstract-user-flat-1.svg"):(user.profile_image)
        const username = user.username
        usersContainer.innerHTML+=`
            <div class="user rounded-3 d-flex flex-row column-gap-1 border-bottom border-top p-2" style="cursor:pointer" onclick="${token!=null?(`userProfile(${user.id})`):("unLoggedUserAlert()")}">
                <div class="poster-image">
                    <img src=${userImage} style="width: 100%;">
                </div>
                <div class="d-flex flex-column justify-content-around ">
                    <span>@${username}</span>
                </div>
            </div>
        `
    }
    loading()
}