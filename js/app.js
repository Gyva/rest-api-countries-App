const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search1 = document.querySelector(".search1");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");
const countryInfor = location.href?.split('?')
let selectedCountry
if (countryInfor.length > 1) {
    selectedCountry = location.href?.split('?')?.[1]?.split('=')[1]?.replaceAll('%20', ' ')
}
if (localStorage.getItem("mode") == undefined) {
    localStorage.setItem('mode', "light");
}
changeMode(localStorage.getItem("mode"))
async function getCountry() {

    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    if (selectedCountry) {

        const data = res.find(country => country.name.official === selectedCountry)
        const currencies = data.currencies
        const languages = data.languages
        const tld = data.tld
        const name = data.name.nativeName
        console.log(name);
        console.log(Object.keys(name).map(dd => `<div><p>${name[dd].official}</p> <p>${name[dd].common}</p></div>`).join(''))

        document.querySelector('.outer').innerHTML = ` <a href="https://gyva.github.io/rest-api-countries-App">
   <button class="back"> <i class="fa fa-arrow-left-long"></i> Back</button>
</a>
    <div class="modal">
        <div class="leftModal">
            <img src="${data.flags.svg}" alt="">
        </div>
        <div class="rightModal">
            <h1> ${data.name.official}</h1>
           
            <div class="modalInfo">
                <div class="innerLeft inner">
                    <p><strong>Native Name:</strong> ${Object.keys(name).map(dd => `${name[dd].official} ${name[dd].common}`).join(', ')}</p>
                    <p><strong>Population:</strong> ${data.population}</p>
                    <p><strong>Region:</strong> ${data.region}</p>
                    <p><strong>Sub-region:</strong> ${data.subregion}</p>
                    <p><strong>Capital:</strong> ${data.capital}</p>
                </div>
                <div class="innerRight inner">
                    <p><strong>Top level Domain:</strong> ${Object.keys(tld).map(dd => `${tld[dd]}`).join(', ')}</p>
                    <p>${Object.keys(currencies).reduce((currencyEl, currency) => {
            return currencyEl + ` <strong>Currencies:</strong> ${currencies[currency].name}, ${currencies[currency].symbol} `
        }, '')}</p> 
                    <p><strong>Languages:</strong> ${Object.keys(languages).map(dd => `${languages[dd]}`).join(', ')} </p> 
                  
                </div>
            </div>
        </div>
    </div>`;
    } else {

        res.forEach(element => {
            showCountry(element)
        });
    }
}
getCountry()

function showCountry(data) {
    const country = document.createElement("div");
    country.classList.add("country")

    country.innerHTML = ` <a href="https://gyva.github.io/rest-api-countries-App/?country=${data.name.official}"><div class="country-img">
    <img src="${data.flags.svg}" alt="">
</div>
<div class="country-info">
    <h5 class= "countryName">${data.name.official}</h5>
    <p><strong>Population:</strong> ${data.population}</p>         
    <p class="regionName"><strong>Region:</strong> ${data.region}</p>         
    <p><strong>Capital:</strong> ${data.capital}</p>                 
</div></a>`;

    countriesElem.appendChild(country)
    country.addEventListener("click", () => {
        showCountryDetail(data)
    })
}

dropDown.addEventListener("click", () => {
    dropElem.classList.toggle("showDropDown");
    console.log("hello");
})

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");

region.forEach(element => {
    element.addEventListener("click", () => {
        console.log(element);
        Array.from(regionName).forEach(elem => {
            console.log(elem.innerText)
            if (elem.innerText.includes(element.innerText) || element.innerText == "All") {
                elem.closest('.country').style.display = "grid"
            } else {
                elem.closest('.country').style.display = "none"
            }
        });
    });
});

search1.addEventListener("input", () => {
    Array.from(countryName).forEach(elem => {
        if (elem.innerText.toLowerCase().includes(search1.value.toLowerCase())) {
            elem.closest('.country').style.display = "grid"
        } else {
            elem.closest('.country').style.display = "none"
        }
    });
})

toggle.addEventListener("click", () => {
    const mode = localStorage.getItem("mode") == "dark" ?
        "light" : "dark";
    changeMode(mode);
})

function changeMode(mode) {
    if (mode == "dark") {
        document.body.classList.toggle("dark")
        moon.classList.toggle("fas")
    }
    else {
        document.body.classList.remove("dark")
        moon.classList.remove("fas")
    }
    localStorage.setItem("mode", mode)
}
const countryModal = document.querySelector(".countryModal");
function showCountryDetail(data) {
    countryModal.classList.toggle("show")
    const currencies = data.currencies

    const back = countryModal.querySelector(".back")
    back.addEventListener("click", () => {
        countryModal.classList.toggle("show")
    })
} 