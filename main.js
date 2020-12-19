let numberFormat = new Intl.NumberFormat("en-US");

window.onload = () => {
    document.querySelector("body").style.opacity = "1";
}

function globalStats(data) {
    let grandTotal = document.querySelector("div.global-scale");
    let total = grandTotal.children[1];
    let deaths = grandTotal.children[3];
    let recovered = grandTotal.children[5];

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.textContent = numberFormat.format(Math.floor(progress * (end - start) + start));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
    }

    animateValue(total, 0, data.cases, 4000);
    animateValue(deaths, 0, data.deaths, 4000);
    animateValue(recovered, 0, data.recovered, 4000);

    let span = document.querySelectorAll("span.column");
    span[0].children[1].textContent = numberFormat.format(data.active);
    span[1].children[1].textContent = numberFormat.format((data.active) - (data.critical));
    span[2].children[1].textContent = numberFormat.format(data.critical);
    span[3].children[1].textContent = numberFormat.format((data.deaths) + (data.recovered));
    span[4].children[1].textContent = numberFormat.format(data.deaths);
    span[5].children[1].textContent = numberFormat.format(data.recovered);
}

(function(){
    fetch("https://corona.lmao.ninja/v2/all")

    .then( (response) => {
        return response.json();
    })

    .then( (data) => {
        globalStats(data);
    })

    .catch( () => {

    })
}())

function fillData(data, index) {
    let container = document.querySelector("div.container"),
        field = document.createElement("span");
        container.appendChild(field);
        field.innerHTML = `<span class="country-info">
                                <img src="" alt="Country flag">
                                <h2></h2>
                            </span>
                            <p></p>
                            <p class="today"></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p class="population"></p>
                            <p class="tests"></p>`;

        field.classList.add("field");

    field.children[0].children[0].src = data[index].countryInfo.flag;
    field.children[0].children[1].textContent = data[index].country;
    field.children[1].textContent = numberFormat.format(data[index].cases);
    field.children[3].textContent = numberFormat.format(data[index].active);
    field.children[4].textContent = numberFormat.format(data[index].deaths);
    field.children[6].textContent = numberFormat.format(data[index].population);
    field.children[7].textContent = numberFormat.format(data[index].tests);
    if(data[index].todayCases === 0){
        field.children[2].textContent = "-";
    } else {
        field.children[2].textContent = numberFormat.format(data[index].todayCases);
    }

    if (data[index].recovered === 0){
        field.children[5].textContent = "N/A";
    } else {
        field.children[5].textContent = numberFormat.format(data[index].recovered);
    }
}

(function() {
    fetch("https://corona.lmao.ninja/v2/countries?sort=country")
    .then( (response) => {
        return response.json();
    })
    
    .then( (data) => {
        for (let i = 0; i < data.length; i++) {
            data.sort( (a, b) => {
                return b.cases - a.cases;
            });
            fillData(data, i);
        }
    })
    
    .catch( (error) => {
        console.log(error);
    })
}());

let toggleButton = document.getElementById("toggle");

toggleButton.addEventListener("click", () => {
    let body = document.querySelector("body"),
        globalScale = document.querySelector("div.global-scale"),
        globalStats = document.querySelector("div.global-stats"),
        logo = document.querySelector("div.logo");
        globalScale.style.opacity = "0";
        globalStats.style.opacity = "0";
        logo.style.opacity = "0";

    setTimeout(() => {
        globalScale.style.opacity = "1";
        globalStats.style.opacity = "1";
        logo.style.opacity = "1";
        body.classList.toggle("light-body");
        let field = document.querySelectorAll("span.field");
        for (let i = 0; i < field.length; i++) {
            field[i].classList.toggle("light-field");
        }
    }, 1000);
})