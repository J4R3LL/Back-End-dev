document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        const questList = document.getElementById("questList");
        const main = document.getElementById("main");

        if(!token){
          main.innerHTML = `
            <h1 class="text-center mt-5"><a href="${currentUrl + '/login.html'}">Log in</a> or <a href="${currentUrl + '/register.html'}">Register</a> to look at Quests</h1>
          `
        }else{
        responseData.forEach((quest) => {
          
          const displayItem = document.createElement("div");
          displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
            <a href="${currentUrl}/questView.html?quest_id=${quest.quest_id}">
              <div class="row bg-secondary text-white text-center py-2 rounded-3">
                  <img src="../photos/default_profile_picture.png" class="col-4 img-fluid p-auto m-auto">
                  <div class="col-8">
                      <h5 class="">${quest.title}</h5>
                      <ul class="list-unstyled">
                        <li>Tier: ${quest.tier}</li>
                      </ul>
                  </div>
              </div>
            </a>
              `;
          questList.appendChild(displayItem);
        });
        }


      };
      
      fetchMethod(currentUrl + "/api/quest", callback);
      
      const searchQuest = document.getElementById('searchQuest')
      searchQuest.addEventListener('click', () => {
        const title = document.getElementById('title')
        const questList = document.getElementById('questList')
        if(title.value == "" || title.value == undefined){
          questList.innerHTML = `<h1>Please enter something<h1>`
        }else{
          const callback = (responseStatus, responseData) => {
            if(responseStatus == 404){
              questList.innerHTML = `<h1>${responseData.message}<h1>`
            }else{
              questList.innerHTML = ``
              responseData.forEach((quest) => {
                
                const displayItem = document.createElement("div");
                displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                displayItem.innerHTML = `
                  <a href="${currentUrl}/questView.html?quest_id=${quest.quest_id}">
                    <div class="row bg-secondary text-white text-center py-2 rounded-3">
                        <img src="../photos/default_profile_picture.png" class="col-4 img-fluid p-auto m-auto">
                        <div class="col-8">
                            <h5 class="">${quest.title}</h5>
                            <ul class="list-unstyled">
                              <li>Tier: ${quest.tier}</li>
                            </ul>
                        </div>
                    </div>
                  </a>
                    `;
                questList.appendChild(displayItem);
              });
            }
          }
          fetchMethod(currentUrl + `/api/quest/title/${title.value}`, callback)
        }

      })
    });