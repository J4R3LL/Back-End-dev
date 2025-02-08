document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      
        const userList = document.getElementById("userList");
        responseData.users.forEach((user) => {
          userBio = responseData.bio.find(obj => obj.user_id == user.user_id)
          var bio
          if(userBio.bio != undefined){
            bio = `
                      <p class="card-text">
                      ${userBio.bio}<br>
                      </p>
                  `
          }else{
            bio=""
          }
          
          const displayItem = document.createElement("div");
          displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
            <a href="${currentUrl}/publicProfile.html?user_id=${user.user_id}">
              <div class="card bg-secondary text-white h-100 text-center">
                  <img src="../photos/default_profile_picture.png" class="card-img-top img-fluid">
                  <div class="card-body">
                      <h5 class="card-title">${user.username}</h5>
                      ${bio}
                  </div>
              </div>
            </a>
              `;
          userList.appendChild(displayItem);
        });
      };
      
      fetchMethod(currentUrl + "/api/users/random", callback);

      const searchStat = document.getElementById('searchStat')
      searchStat.addEventListener('click', () => {
        const username = document.getElementById('username')
          const userList = document.getElementById("userList");
        if(username.value == "" || username.value == undefined){
          userList.innerHTML = `<h1>Please enter something<h1>`
        }else{
        const callback = (responseStatus, responseData) => {
          console.log(responseData)
          if(responseStatus == 404){
            userList.innerHTML = `<h1>${responseData.message}<h1>`
          }else{
            userList.innerHTML = ``
          responseData.users.forEach((user) => {
            
            const displayItem = document.createElement("div");
            displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
              <a href="${currentUrl}/publicProfile.html?user_id=${user.user_id}">
                <div class="card bg-secondary text-white h-100 text-center">
                    <img src="../photos/default_profile_picture.png" class="card-img-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title">${user.username}</h5>
                    </div>
                </div>
              </a>
                `;
            userList.appendChild(displayItem);
          });
          }
        }
      fetchMethod(currentUrl + `/api/users/username/${username.value}`, callback);

        }
      })
      
    });