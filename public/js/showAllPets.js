document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        const petList = document.getElementById("petList");
        responseData.forEach((pet) => {
          
          const displayItem = document.createElement("div");
          displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
            <a href="${currentUrl}/petView.html?pet_id=${pet.pet_id}">
              <div class="row bg-secondary text-white text-center py-2 rounded-3">
                  <img src="../photos/${pet.name.toLowerCase()}.png" class="col-4 img-fluid p-auto m-auto">
                  <div class="col-8">
                      <h5 class="">${pet.name}</h5>
                      <ul class="list-unstyled">
                        <li>Health: ${pet.hp}</li>
                        <li>Damage: ${pet.dmg}</li>
                      </ul>
                  </div>
              </div>
            </a>
              `;
          petList.appendChild(displayItem);
        });
      };
      
      fetchMethod(currentUrl + "/api/pets", callback);

      const searchPet = document.getElementById('searchPet')
      searchPet.addEventListener('click', () => {
        const name = document.getElementById('name')
        const petList = document.getElementById("petList");
        if(name.value == "" || name.value == undefined){
          petList.innerHTML = `<h1>Please enter something<h1>`
        }else{
          const callback = (responseStatus, responseData) => {
            if(responseStatus == 404){
              petList.innerHTML = `<h1>${responseData.message}<h1>`
            }else{
              petList.innerHTML = ``
          responseData.forEach((pet) => {
            
            const displayItem = document.createElement("div");
            displayItem.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
              <a href="${currentUrl}/petView.html?pet_id=${pet.pet_id}">
                <div class="row bg-secondary text-white text-center py-2 rounded-3">
                    <img src="../photos/${pet.name.toLowerCase()}.png" class="col-4 img-fluid p-auto m-auto">
                    <div class="col-8">
                        <h5 class="">${pet.name}</h5>
                        <ul class="list-unstyled">
                          <li>Health: ${pet.hp}</li>
                          <li>Damage: ${pet.dmg}</li>
                        </ul>
                    </div>
                </div>
              </a>
                `;
            petList.appendChild(displayItem);
          });

            }

          }
          fetchMethod(currentUrl + `/api/pets/name/${name.value}`, callback)
        }
      })
      
    });