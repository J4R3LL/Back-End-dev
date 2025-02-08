var intervalId, messageFunction
document.addEventListener("DOMContentLoaded", function () {
    event.preventDefault()

    const callback = (responseStatus, responseData) => {
        const messages = document.getElementById('messages')
        const user_id = localStorage.getItem('userId')
        messages.innerHTML = ``

        responseData.messages.forEach(message => {
            var buttons, profile_pic,bio,username
            if(message.user_id == user_id){
                buttons = `
                <div class="w-100 row text-center">
                <button onclick="editMessage(this)" class="col-12 btn btn-primary btn-block messageId_${message.message_id}">Edit</button>
                <button onclick="deleteMessage(this)" class="col-12 btn btn-primary btn-block messageId_${message.message_id}">Delete</button>
                </div>
                `
            }else{
                buttons = ""
            }
            userBio = responseData.bioList.find(obj => obj.user_id == message.user_id)
            if(userBio.profile_pic){
                profile_pic = userBio.profile_pic
            }else{
                profile_pic = "../photos/default_profile_picture.png"
            }
            if(userBio.bio){
                bio = userBio.bio
            }else{
                bio = ""
            }
            username = responseData.userInfo.find(obj => obj.user_id == message.user_id).username
            const displayItem = document.createElement("ul");
            displayItem.className = "list-group list-group-horizontal-sm list-unstyled";
            displayItem.setAttribute('id', `message_item_${message.message_id}`)
            displayItem.innerHTML = `
            <li class="row text-center w-25">
                <div class="col-12"><img src="${profile_pic}" class="img-fluid"></img><div>
                <h1 class="col-12 fs-4 text-start mt-2 ms-2">${username}</h1>
                <p class="fw-lighter w-100 text-start">${bio}</p>
                ${buttons}
            </li>
            <li class="text-end w-75">
                <p class="m-4 fs-4 text-start col-12" id="message_text_${message.message_id}" style="word-wrap: break-word">${message.message_text}</p>
                <textarea class="form-control d-none w-100 mx-3 fs-4 text-start col-12" id="text_area_${message.message_id}"></textarea>
                <button class="col-2 btn btn-primary btn-block d-none" id="button_${message.message_id}">Submit</button>
            </li>
            `
            messages.appendChild(displayItem)
        });

        if(!user_id){
            const postMessageForm = document.getElementById('postMessageForm')
            postMessageForm.classList = `list-group-item text-center`
            postMessageForm.innerHTML = `
            <h2>
             <a href="${currentUrl}/login.html">Sign in</a> or <a href="${currentUrl}/register.html">Register</a> to post in forum
            <h2>
            `
        }else{
            fetchMethod(currentUrl + `/api/bio/${user_id}`, (responseStatus, responseData) => {
                const profilePic = document.getElementById('profilePic')
                if(responseData.profile_pic){
                    profilePic.setAttribute('src', responseData.profile_pic)
                }else{
                    profilePic.setAttribute('src', "../photos/default_profile_picture.png")
                }
            })
        }

    }
    messageFunction = () => {
        fetchMethod(currentUrl + "/api/message", callback)
    }
    intervalId = setInterval(messageFunction, 1000)

    const postMessage = document.getElementById('postMessage')

    postMessage.addEventListener("click", () => {
        const newMessage = document.getElementById("newMessage")
        const token = localStorage.getItem('token')
        const data = {
            message_text : newMessage.value
        }

        const callback = (responseStatus, responseData) => {
            if(responseStatus == 201){
                const messagePosted = document.getElementById('messagePosted')
                messagePosted.classList.remove('d-none')
                newMessage.value =""
            }else{
                const postMessageForm = document.getElementById('postMessageForm')
                postMessageForm.classList = `list-group-item text-center`
                postMessageForm.innerHTML = `
                <h2>
                 Message creation not working, please reload page
                <h2>
                `
                
            }
        }

        fetchMethod(currentUrl + '/api/message', callback, "POST", data, token)
    })
});

function editMessage(element){
    const token = localStorage.getItem('token')
    message_id = element.className.split(" ").find(str => str.startsWith("messageId_"))
    message_id = message_id.split("_")[1]
    const message_text = document.getElementById('message_text_'+ message_id)
    const text_area = document.getElementById('text_area_'+ message_id)
    const button = document.getElementById('button_'+ message_id)


    clearInterval(intervalId)
    intervalId = null;

    text_area.classList.remove('d-none')
    button.classList.remove('d-none')
    message_text.classList.add('d-none')
    text_area.value = message_text.innerHTML



    button.addEventListener('click', () => {
        const user_id = localStorage.getItem('userId')
        const data = {
            message_text : text_area.value,
            user_id : user_id
        }
        const editCallback = (responseStatus, responseData) => {
            if(responseStatus = 200){
                message_text.innerHTML = data.message_text
            }
                text_area.classList.add('d-none')
                button.classList.add('d-none')
                message_text.classList.remove('d-none')
                intervalId = setInterval(messageFunction, 1000)
        }
        fetchMethod(currentUrl + `/api/message/${message_id}`, editCallback, "PUT", data, token)

        })
}
function deleteMessage(element){
    const user_id = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const data = {
        user_id : user_id
    }
    clearInterval(intervalId)
    intervalId = null;
    element.classList.add('bg-danger')
    element.innerHTML = `Delete message?`

element.addEventListener('click', () => {
        message_id = element.className.split(" ").find(str => str.startsWith("messageId_"))
        message_id = message_id.split("_")[1]

        const callback = (responseStatus, responseData) => {
            intervalId = setInterval(messageFunction, 1000)
            if(responseStatus == 200){
                const message_item = document.getElementById(`message_item_${message_id}`)
                message_item.classList.add('d-none')
            }
            element.classList.remove('bg-danger')
            element.innerHTML = `Delete`
        }
        fetchMethod(currentUrl + `/api/message/${message_id}`, callback, "DELETE", data, token)
    })
}