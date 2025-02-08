document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const pet_id = urlParams.get("pet_id");
    const message = urlParams.get("message");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const petProfile = document.getElementById("petProfile");
        const petName = document.getElementById('petName')
        const petPicture = document.getElementById('petPicture')
        
        if(message != undefined){
          const alert = document.getElementById('alert')
          const updateResponse = document.getElementById('updateResponse')
          
          alert.classList.remove('d-none')
          updateResponse.innerHTML = `
              ${message.replace(/_/g, " ")}
          `
          
      }
      
        petName.innerHTML = `
          <h1 class="text-center py-4 fw-medium">${responseData.name}</h1>
        `
        petPicture.innerHTML = `
          <img src="../photos/${responseData.name.toLowerCase()}.png" class="col-4 img-fluid w-100 h-auto">
        `

        petProfile.innerHTML = `
          <ul class="list-unstyled ms-5 text-start">
            <li>Health: ${responseData.hp}</li>
            <li>Damage: ${responseData.dmg}</li>
            <li>Damage offset: ${responseData.dmg_offset}</li>
          </ul>

          <ul class="list-unstyled ms-5 mt-5 pt-5 col-12 text-start">
            <li>Coin Cost: ${responseData.cost_coin}</li>
            <li>Diamond Cost: ${responseData.cost_diamond}</li>
          </ul>
        `
        
      };
      
      fetchMethod(currentUrl + `/api/pets/${pet_id}`, callback);

      const buyButton = document.getElementById('buyButton')

      buyButton.addEventListener("click", () => {
      const token = localStorage.getItem('token')
      const data = {}

      const buyCallback = (responseStatus, responseData) => {
        window.location.href = `petView.html?pet_id=${pet_id}&message=${responseData.message.replace(/ /g, "_")}`;
      }
      
      fetchMethod(currentUrl + `/api/currency/${pet_id}`, buyCallback, "PUT", data, token);
        
      })
    });