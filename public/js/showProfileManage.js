document.addEventListener("DOMContentLoaded", function () {
    const user_id = localStorage.getItem("userId");
    const saveChanges = document.getElementById('saveChanges')
    const token = localStorage.getItem('token')

    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const message = urlParams.get("message");
  
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        const userProfilePic = document.getElementById("userProfilePic");
        const userAccount = document.getElementById("userAccount")

        var profile_pic, checked_currency = "", checked_inventory = ""
  
        if(responseData.profile_pic == undefined || responseData.profile_pic == ""){
          profile_pic = "../../photos/default_profile_picture.png"
        }else{
          profile_pic = responseData.profile_pic
        }
        if(responseData.currency_status){
            checked_currency = "checked"
        }
        if(responseData.inventory_status){
            checked_inventory = "checked"
        }
        if(message != undefined){
            const alert = document.getElementById('alert')
            const updateResponse = document.getElementById('updateResponse')
            
            alert.classList.remove('d-none')
            updateResponse.innerHTML = message.replace(/_/g, " ")
            
        }

        userProfilePic.innerHTML = `
        <div class="row">
            <img src="${profile_pic}" class="img-fluid w-75"></img>
        </div>
        `
        userAccount.innerHTML = `
            <div class="mt-5">
                <label for="username" class="form-label">Username:</label>
                <input type="text" class="form-control w-75 fs-5" id="username" value="${responseData.username}">
            </div>
            <div class="mt-5">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control w-75 fs-5" id="email" value="${responseData.email}">
            </div>
            <div class="form-check form-switch mt-5">
                <input class="form-check-input" type="checkbox" id="currency" onclick="toggleCurrency()" ${checked_currency}>
                <label class="form-check-label" for="currency">Show Currency to public</label>
                <p class="d-none" id="checked_currency">${checked_currency}</p>
            </div>
            <div class="form-check form-switch mt-2">
                <input class="form-check-input" type="checkbox" id="inventory" onclick="toggleInventory()" ${checked_inventory}>
                <label class="form-check-label" for="inventory">Show Inventory to public</label>
                <p class="d-none" id="checked_inventory">${checked_inventory}</p>
            </div>
            
        `
        
      };
      
      if(user_id){
        fetchMethod(currentUrl + `/api/users/profile/${user_id}`, callback);
      }else{
        const userAccount = document.getElementById("userAccount")
        userAccount.classList = `fs-2 mt-5`
        userAccount.innerHTML = `
        Please <a href="${currentUrl}/login.html">Sign in</a> or <a href="${currentUrl}/register.html">Register</a> to manage your account
        `
        saveChanges.classList.add("d-none")
      }


    saveChanges.addEventListener("click", () => {
    const username = document.getElementById('username')
    const email = document.getElementById('email')
    const checked_currency = document.getElementById('checked_currency')
    const checked_inventory = document.getElementById('checked_inventory')

    const data = {
        user_id : user_id,
        username : username.value,
        email : email.value,
        currency_status : Boolean(checked_currency.innerHTML),
        inventory_status : Boolean(checked_inventory.innerHTML),
    }
    const saveChangesCallback = (responseStatus, responseData) => {

    window.location.href = `manageAccount.html?message=${responseData.message.replace(/ /g, "_")}`;

    }
        fetchMethod(currentUrl + `/api/users/profile/${user_id}`, saveChangesCallback, method="PUT", data, token);
    })
    
    });

function toggleCurrency(){
    const checked = document.getElementById('checked_currency')
    if(checked.innerHTML == ""){
        checked.innerHTML = "checked"
    }else{
        checked.innerHTML = ""
    }
}
function toggleInventory(){
    const checked = document.getElementById('checked_inventory')
    if(checked.innerHTML == ""){
        checked.innerHTML = "checked"
    }else{
        checked.innerHTML = ""
    }
}