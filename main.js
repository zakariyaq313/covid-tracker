window.onload = () => {
    document.querySelector("div.container").style.opacity = "1";
}

function fillData(data, index) {
    let container = document.querySelector("div.container"),
        field = document.createElement("span");
        container.appendChild(field);
        field.innerHTML = `<h2></h2>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>`;
        field.classList.add("field");

    field.children[0].textContent = data[index].country;
    field.children[1].textContent = data[index].cases;
    field.children[2].textContent = data[index].todayCases;
    field.children[3].textContent = data[index].active;
    field.children[4].textContent = data[index].deaths;
    field.children[5].textContent = data[index].recovered;
    field.children[6].textContent = data[index].population;
    field.children[7].textContent = data[index].tests;
}

function getData() {
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
}

getData();