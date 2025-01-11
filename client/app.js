

function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value); 
        }
    } 
    return -1
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value); 
        }
    }
    return -1; 
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft").value;
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations").value;
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    if (!sqft || !bhk || !bathrooms || !location) {
        estPrice.innerHTML = "<h2>Please fill all fields.</h2>";
        return;
    }

    //var url = "http://127.0.0.1:5000/predict_home_price"; 
    var url = "/api/predict_home_price"
    
    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bathrooms,
        location: location
    }, function(data, status) {
        if (status === "success") {
            console.log(data.estimated_price);
            estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
        } else {
            console.error("Failed to fetch estimated price");
            estPrice.innerHTML = "<h2>Error in fetching price</h2>";
        }
    }).fail(function() {
        console.error("POST request failed");
        estPrice.innerHTML = "<h2>Server error occurred</h2>";
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Whitefield', 'Indiranagar', 'Koramangala', 'HSR Layout'],
            datasets: [{
                label: 'Average Price (₹ Lakhs)',
                data: [80, 75, 70, 60],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});



function onPageLoad() {
    console.log( "document loaded" );
   // var url = "http://127.0.0.1:5000/get_location_names"; // for without nginx
   var url = "/api/get_location_names" // for with ngnix
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }

window.onload = onPageLoad;