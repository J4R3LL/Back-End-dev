document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        const lootPoolList = document.getElementById("lootPoolList");
        responseData.forEach((loot) => {
        var profile_pic
        if(responseData.profile_pic == undefined || responseData.profile_pic == ""){
            profile_pic = "../photos/default_profile_picture.png"
          }else{
            profile_pic = responseData.profile_pic
          }

          const displayItem = document.createElement("div");
          displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
            <a href="${currentUrl}/lootView.html?loot_id=${loot.loot_id}">
              <div class="row bg-secondary text-white text-center py-2 rounded-3">
                  <img src="${profile_pic}" class="col-4 img-fluid p-auto m-auto">
                  <div class="col-8">
                      <h5 class="">${loot.name.slice(0,1).toUpperCase() + loot.name.slice(1)}</h5>
                      <ul class="list-unstyled">
                        <li>Rarity: ${loot.rarity}</li>
                      </ul>
                  </div>
              </div>
            </a>
              `;
          lootPoolList.appendChild(displayItem);
        });
      };
      
      fetchMethod(currentUrl + "/api/lootPool", callback);
      
      const searchLoot = document.getElementById('searchLoot')
      searchLoot.addEventListener('click', () => {
        const name = document.getElementById('name')
        const lootPoolList = document.getElementById("lootPoolList");
        if(name.value == "" || name.value == undefined){
          lootPoolList.innerHTML = `<h1>Please enter something<h1>`
        }else{
          const callback = (responseStatus, responseData) => {
            if(responseStatus == 404){
              lootPoolList.innerHTML = `<h1>${responseData.message}<h1>`
            }else{
              lootPoolList.innerHTML = ``
              responseData.forEach((loot) => {
                var profile_pic
                if(responseData.profile_pic == undefined || responseData.profile_pic == ""){
                    profile_pic = "../photos/default_profile_picture.png"
                  }else{
                    profile_pic = responseData.profile_pic
                  }
        
                  const displayItem = document.createElement("div");
                  displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                  displayItem.innerHTML = `
                    <a href="${currentUrl}/lootView.html?loot_id=${loot.loot_id}">
                      <div class="row bg-secondary text-white text-center py-2 rounded-3">
                          <img src="${profile_pic}" class="col-4 img-fluid p-auto m-auto">
                          <div class="col-8">
                              <h5 class="">${loot.name.slice(0,1).toUpperCase() + loot.name.slice(1)}</h5>
                              <ul class="list-unstyled">
                                <li>Rarity: ${loot.rarity}</li>
                              </ul>
                          </div>
                      </div>
                    </a>
                      `;
                  lootPoolList.appendChild(displayItem);
                });
            }
          }

          fetchMethod(currentUrl + `/api/lootPool/name/${name.value}`, callback)

        }


      })
    });