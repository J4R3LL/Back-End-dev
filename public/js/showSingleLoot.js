document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const loot_id = urlParams.get("loot_id");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const lootInfo = document.getElementById("lootInfo");
        var profile_pic

        if(responseData.profile_pic == undefined || responseData.profile_pic == ""){
          profile_pic = "../../photos/default_profile_picture.png"
        }else{
          profile_pic = responseData.profile_pic
        }
      
        lootInfo.innerHTML = `
        
        <div class="row container">
        <div class="col-12">
          <h1 class="text-center py-4 fw-medium">${responseData.name.slice(0,1).toUpperCase() + responseData.name.slice(1)}</h1>
        </div>
        <div class="col-lg-3 col-md-12">
            <img src="${profile_pic}" class="img-fluid h-auto w-auto"></img>
        </div>
        <div class="col-6 my-5 fs-4">
          <ul class="list-unstyled ms-5 text-start">
            <li>Rarity: ${responseData.rarity}</li>
            <li class="mt-4">Obtain by completing <a class="text-decoration-none text-info" href="${currentUrl+'/quest.html'}">Quests<a></li>
          </ul>
        </div>
        </div>
        `
        

      };
      
      fetchMethod(currentUrl + `/api/lootPool/${loot_id}`, callback);
    });