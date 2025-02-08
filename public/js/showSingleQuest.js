document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const quest_id = urlParams.get("quest_id");
    const message = urlParams.get("message")
    const loot = urlParams.get("loot")
    const coin = urlParams.get("coin")
    const diamond = urlParams.get("diamond")


    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const questInfo = document.getElementById("questInfo");
        const questTitle =document.getElementById('questTitle')
        const questPicture = document.getElementById('questPicture')
        var profile_pic

        if(message){
          const alert = document.getElementById('alert')
          const updateResponse = document.getElementById('updateResponse')
          var lootMessage, coinMessage, diamondMessage
          if(loot){
            lootMessage = `<p>loot:${loot}</p>`
          }else{
            lootMessage = ""
          }
          if(coin){
            coinMessage=`<p>coin:${coin}</p>`
          }else{
            coinMessage = ""
          }
          if(diamond){
            diamondMessage=`<p>diamond:${diamond}</p>`
          }else{
            diamondMessage = ""
          }
          updateResponse.innerHTML = `
          <p>${message}</p>
          ${lootMessage}
          ${coinMessage}
          ${diamondMessage}
          `

          alert.classList.remove('d-none')
        }

        if(responseData.profile_pic == undefined || responseData.profile_pic == ""){
          profile_pic = "../../photos/default_profile_picture.png"
        }else{
          profile_pic = responseData.profile_pic
        }

        questTitle.innerHTML = `
          <h1 class="text-center py-4 fw-medium">${responseData.title}</h1>
        `
        questPicture.innerHTML = `
          <img src="${profile_pic}" class="img-fluid h-auto w-auto"></img>
        `
      
        questInfo.innerHTML = `
          <ul class="list-unstyled ms-5 text-start">
            <li>Description: ${responseData.description}</li>
            <li>Tier: ${responseData.tier}</li>
          </ul>
        `
      };
      
      fetchMethod(currentUrl + `/api/quest/${quest_id}`, callback);

      const claimQuest = document.getElementById('claimQuest')
      
      
      claimQuest.addEventListener('click', () => {
        const data = {
          quest_id : quest_id,
        }
        const token = localStorage.getItem('token')

        const claimQuestCallback = (responseStatus, responseData) => {
          console.log(responseData)
          var EarnedLootName = [], coin, diamond
          if(responseData.EarnedLoot && responseData.EarnedLoot.length !=0){
          responseData.EarnedLoot.forEach(loot => {
            EarnedLootName.push(loot.name)
          });
          EarnedLootName.join('_')
          }else{
            EarnedLootName.push("")
          }
          if(responseData.currencyEarned){
            coin = responseData.currencyEarned.coin
            diamond = responseData.currencyEarned.diamond
          }else{
            coin = ""
            diamond = ""
          }
          if(responseStatus == 201){
          window.location.href = `questView.html?quest_id=${quest_id}&message=${responseData.message}&loot=${EarnedLootName}&coin=${coin}&diamond=${diamond}`
          }else{
          window.location.href = `questView.html?quest_id=${quest_id}&message=${responseData.message}`
          }
        }
        fetchMethod(currentUrl + `/api/task_progress/claimQuest`, claimQuestCallback, "POST", data, token)
      })
    });