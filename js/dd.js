'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
{/* <img src="image/iphone 1.jpeg" width= "100%" height = "100%"  class="card-img-top" alt="..."> */}


function renderCountry(data){
    data.slice(1,10).forEach(element => {
        const card = document.createElement("div");
        card.innerHTML = `
        <article class="country p-1 d-block">
            <div class="card p-4"  style="width: 18rem;" >
            <img src="${element.url}" width= "100%" height = "100%"  class="card-img-top" alt="Any Image">
            <div class="card-body">
                <h5 class="card-title p-4 m-3" >Iphone</h5>
                <p class="card-text">We have a big sale on all devices.</p>
                <a href="#" class="btn btn-primary">Go to the main page</a>
            </div>
            </div>
          </div>
        </article>
        `;
        countriesContainer.appendChild(card);
        countriesContainer.style.opacity = 1;
    });
}


const URL = "https://jsonplaceholder.typicode.com/photos";
const callData = function(){
    fetch(URL).then(
        function(response){
            return response.json()
        }
    )
    .then(
        function(data){
            console.log(data);
            renderCountry(data);
        }
    )
}

callData()