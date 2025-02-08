document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const userInfo = document.getElementById("userInfo");
        const userInventory = document.getElementById("userInventory")
        var profile_pic, pet, loot = []

        if(responseData.profile_pic == undefined || responseData.profile_pic == ""){
          profile_pic = "../../photos/default_profile_picture.png"
        }else{
          profile_pic = responseData.profile_pic
        }
        if(responseData.currency.pet_id == undefined){
          pet = "No current pet"
        }else{
          pet = `<a href="${currentUrl}/petView.html?pet_id=${responseData.currency.pet_id}">${responseData.pet.name}</a>`
        }
      
        userInfo.innerHTML = `
        <div class="row m-5 mb-0">
            <img src="${profile_pic}" class="h-100 w-75"></img>
        </div>
        <div class="row fs-5 container mx-auto">
          <ul class="list-unstyled ms-5">
            <li class="mt-3">Username: ${responseData.username}</li>
            <li class="mb-5">Email: ${responseData.email}</li>
            <li>Coin: ${responseData.currency.coin}</li>
            <li>Diamond: ${responseData.currency.diamond}</li>
            <li>Pet: ${pet}</li>
          </ul>
          <div class="row mx-auto">
            <a href="${currentUrl}/manageAccount.html"><button type="button" class="btn btn-primary btn-block mt-3 rounded-button col-12">
              Manage Account Settings
            </button></a>
          </div>
        </div>
        `
        
        
        responseData.inventory.forEach(item => {
          loot.push(item.loot_id)
        });
        loot.forEach(loot => {
          lootData = responseData.lootPool.find(obj => obj.loot_id == loot)
          const displayItem = document.createElement("div");
          displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
          <a href="${currentUrl + '/lootView.html?loot_id=' + loot}">
          <div class="card">
            <img class="card-img-top" src="../photos/default_profile_picture.png">
            <div class="card-body">
              Name: ${lootData.name} <br>
              Rarity: ${lootData.rarity}
            </div>
          </div>
          </a>
          `
          userInventory.appendChild(displayItem);
        });

        const trades = document.getElementById('trades')
        responseData.trades.forEach(trade => {
          
          const displayItem = document.createElement("div");
          displayItem.className = "col-lg-2 col-md-3 col-sm-4 col-xs-6 p-3";
          displayItem.innerHTML = `
          <a href="${currentUrl}/tradeView.html?trade_id=${trade.trade_id}">
          <div class="card">
          <div class="card-body">
            User ${trade.user_id1} has a trade request
          </div>
          </div>
          </a>
          `

          trades.appendChild(displayItem)
        })

      };
      
      fetchMethod(currentUrl + `/api/users/profile/${userId}`, callback);
    });