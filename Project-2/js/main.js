/// <reference path="jquery-3.4.1.js" />

$(() => {

 
    
    function getAjaxData(url, callback){
        $.ajax({
            method: 'GET',
            url: url,
            error: err => alert(err.message),
            success: response => callback(response)
        });
    }
    
    function showData() {
        getAjaxData('https://api.coingecko.com/api/v3/coins/list', finalData => displayData(finalData));
    }
    
    function displayData(data) {
        for(let i = 0; i < 49; i++) {
            const card = `
                <div class="card">
                    <p class="symbol">${data[i].symbol}</p>
                    <p class="currency-name"> ${data[i].name}</p>
                    <button type="button" id="${data[i].id}" class="btn-info" data-toggle="collapse" data-target="#${data[i].id}-info"> More Info </button>
                    <div id="${data[i].id}-info" class="collapse info">
                        
                    </div>
                </div>
            `;
    
            $('.main').append(card);
        }

        $('.btn-info').click(function () {
         
            const id = $(this).attr('id');
            
            getAjaxData(`https://api.coingecko.com/api/v3/coins/${id}`, info => displayInfo(info));
        });
    }
    
    showData();


    
function displayInfo(info) {
    $('#' + info.id + '-info').empty();
    
    const moreInfo =   `
        <img src="${info.image.thumb}" />

        <ul class="price-list">
            <li>USD: ${info.market_data.current_price.usd} $</li>
            <li>EUR: ${info.market_data.current_price.eur} €</li>
            <li>ILS: ${info.market_data.current_price.ils} ₪</li>
        </ul>
    `;
    $('#' + info.id + '-info').append(moreInfo);
}



});




