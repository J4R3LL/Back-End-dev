document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const trade_id = urlParams.get("trade_id");

    const receive = document.getElementById('receive')
    const give = document.getElementById('give')

    const callback = (responseStatus, responseData) => {
        var lootReceive, lootGive
        if(responseData.inventory2){
            lootReceive = responseData.lootPool.find(obj => obj.loot_id == responseData.inventory2).name
        }else{
            lootReceive = ""
        }
        if(responseData.inventory1){
            lootGive = responseData.lootPool.find(obj => obj.loot_id == responseData.inventory1).name
        }else{
            lootGive = ""
        }
        receive.innerHTML = `
            <h1>What you will receive</h1>
            <p>Coin: ${responseData.coin2}</p>
            <p>Diamond: ${responseData.diamond2}</p>
            <p>Loot: ${lootReceive}</p>
        `

        give.innerHTML = `
        <h1>What you will give</h1>
        <p>Coin: ${responseData.coin1}</p>
        <p>Diamond: ${responseData.coin1}</p>
        <p>Loot: ${lootGive}</p>
        `

    }

    fetchMethod(currentUrl + `/api/trading/${trade_id}`, callback)
})

function acceptButton(){
    const acceptButton = document.getElementById('acceptButton')

    acceptButton.classList.add('bg-success')
    acceptButton.innerHTML = `
        Accept offer?
    `
    acceptButton.addEventListener('click', () => {
        url = new URL(document.URL);
        const urlParams = url.searchParams;
        const trade_id = urlParams.get("trade_id");
        const callback = (responseStatus, responseData) => {
            if(responseStatus == 200){
                window.location.href = "profile.html"
            }
        }
        
        fetchMethod(currentUrl + `/api/trading/accept/${trade_id}`, callback, "PUT")
    })
}

function rejectButton(){
    const rejectButton = document.getElementById('rejectButton')

    rejectButton.classList.add('bg-danger')
    rejectButton.innerHTML = `
        Reject offer?
    `
    rejectButton.addEventListener('click', () => {
        url = new URL(document.URL);
        const urlParams = url.searchParams;
        const trade_id = urlParams.get("trade_id");
        const callback = (responseStatus, responseData) => {
            if(responseStatus == 200){
                window.location.href = "profile.html"
                const page = document.getElementById('page')
                page.innerHTML = `
                <h1>This trade has been closed</h1>
                `
            }
        }
        
        fetchMethod(currentUrl + `/api/trading/reject/${trade_id}`, callback, "DELETE")

    })

}