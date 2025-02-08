document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const user_id = urlParams.get("user_id");
  const message = urlParams.get("message")

  const battleButton = document.getElementById('battle')
  const tradeButton = document.getElementById('trade')



  const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const userInfo = document.getElementById("userInfo");
      const userInventory = document.getElementById("userInventory")
      const token = localStorage.getItem('token')
      var profile_pic, pet, coin, diamond, loot = []

      if(responseData.profile_pic == undefined || responseData.profile_pic == ""){
        profile_pic = "../../photos/default_profile_picture.png"
      }else{
        profile_pic = responseData.profile_pic
      }
      if(responseData.currency.pet_id == undefined){
        pet = "No current pet"
      }else{
        pet = `<a href="${currentUrl}/petView.html?pet_id=${responseData.pet.pet_id}">${responseData.pet.name}</a>`
      }
      if(responseData.currency_status){
        coin = responseData.currency.coin
        diamond = responseData.currency.diamond
      }else{
        coin = "User has kept this private"
        diamond = "User has kept this private"
        pet = "User has kept this private"
      }

      if(!token){
        battleButton.classList="d-none"
        tradeButton.classList="d-none"
      }
      if(message){
        const alert = document.getElementById("alert")
        const updateResponse = document.getElementById("updateResponse")
        alert.classList.remove("d-none")
        updateResponse.innerHTML = message.replace(/_/g, " ")
      }

      userInfo.innerHTML = `
      <div class="row ms-4">
          <img src="${profile_pic}" class="img-fluid w-75"></img>
      </div>
      <div class="row fs-5">
        <ul class="list-unstyled ms-md-5">
          <li class="mt-3">Username: ${responseData.username}</li>
          <li class="mb-5">Email: ${responseData.email}</li>
          <li>Coin: ${coin}</li>
          <li>Diamond: ${diamond}</li>
          <li>Pet: ${pet}</li>
        </ul>
      </div>
      `
      
      if(responseData.inventory_status){
      responseData.inventory.forEach(item => {
        loot.push(item.loot_id)
      });
      loot.forEach(loot => {
        lootData = responseData.lootPool.find(obj => obj.loot_id == loot)
        const displayItem = document.createElement("div");
        displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
        <a href="${currentUrl}/lootView.html?loot_id=${loot}">
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
      }else{
        userInventory.innerHTML = `
          <h1 class="text-center mt-5">User has kept Inventory private</h1>
        `
      }
    };
    if(user_id){
    fetchMethod(currentUrl + `/api/users/profile/${user_id}`, callback);
    }else{
      window.location.href = "index.html"
    }


    battleButton.addEventListener("click", () => {
      const data = {
        attacker_id : localStorage.getItem("userId"),
        defender_id : user_id
      }
      const battleCallback = (responseStatus, responseData) => {
        window.location.href = `publicProfile.html?user_id=${user_id}&message=${responseData.message.replace(/ /g, "_")}`
      }
      if(data.attacker_id == data.defender_id){
        window.location.href = `publicProfile.html?user_id=${user_id}&message=You_cannot_battle_yourself`
      }else{
        fetchMethod(currentUrl + `/api/battle/${data.attacker_id}/${data.defender_id}`, battleCallback)
      }
    });

    tradeButton.addEventListener("click", () => {
      const data = {
        requester_id : localStorage.getItem('userId'),
        receiver_id : user_id
      }
      const callback = (responseStatus, responseData) => {
        const coin_left_requester = document.getElementById('coin_left_requester')
        const diamond_left_requester = document.getElementById('diamond_left_requester')
        const coin_left_receiver = document.getElementById('coin_left_receiver')
        const diamond_left_receiver = document.getElementById('diamond_left_receiver')
        const select_my_item = document.getElementById('select_my_item')
        const select_their_item = document.getElementById('select_their_item')

        coin_left_requester.innerHTML = "coins left:" + responseData.requesterCurrency[0].coin
        diamond_left_requester.innerHTML = "diamonds left:" + responseData.requesterCurrency[0].diamond
        if(responseData.currency_status){
          coin_left_receiver.innerHTML = "coins left:" + responseData.receiverCurrency[0].coin
          diamond_left_receiver.innerHTML = "diamonds left:" + responseData.receiverCurrency[0].diamond
        }
        responseData.requesterInventory.forEach(item => {
          const displayItem = document.createElement("option");
          displayItem.value = `${item.loot_id}`
          displayItem.innerHTML = `${responseData.lootPool.find(obj => obj.loot_id == item.loot_id).name}`

          select_my_item.appendChild(displayItem)
        })
        if(responseData.inventory_status){
          responseData.receiverInventory.forEach(item => {
            const displayItem = document.createElement("option");
            displayItem.value = `${item.loot_id}`
            displayItem.innerHTML = `${responseData.lootPool.find(obj => obj.loot_id == item.loot_id).name}`
  
            select_their_item.appendChild(displayItem)
          })
        }else{
          responseData.lootPool.forEach(item => {
            if(item.loot_id > 6){
            const displayItem = document.createElement("option");
            displayItem.value = `${item.loot_id}`
            displayItem.innerHTML = `${item.name}`
  
            select_their_item.appendChild(displayItem)
            }
          })
        }
      }

      fetchMethod(currentUrl + `/api/trading/possessions/${data.requester_id}/${data.receiver_id}`, callback, "GET")

      const sendTrade = document.getElementById('sendTrade')
      sendTrade.addEventListener('click', () => {
        const coinRequester = document.getElementById('coinRequester')
        const diamondRequester = document.getElementById('diamondRequester')
        const coinReceiver = document.getElementById('coinReceiver')
        const diamondReciever = document.getElementById('diamondReceiver')
        const select_my_item = document.getElementById('select_my_item')
        const select_their_item = document.getElementById('select_their_item')

        var data = {
          coin1:coinRequester.value,
          diamond1:diamondRequester.value,
          inventory_id1:select_my_item.value,
          coin2:coinReceiver.value,
          diamond2:diamondReciever.value,
          inventory_id2:select_their_item.value
        }
        Object.keys(data).forEach(key => {
          if(!data[key]){
            data[key]=0
          }

        })

        const sendTradeCallback = (responseStatus, responseData) => {
            window.location.href=`publicProfile.html?user_id=${user_id}&message=${responseData.message}`
        }

        fetchMethod(currentUrl + `/api/trading/${localStorage.getItem('userId')}/user2/${user_id}`, sendTradeCallback, "POST", data)
      })
    });


  });