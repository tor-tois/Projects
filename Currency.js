const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
let msg = document.querySelector(".msg");


for (let select of dropdowns){
    for (Code in countryList){
        let Option = document.createElement("option");
        Option.innerText = Code;
        Option.value = Code;
        if(select.name === "from" && Code === "USD"){
            Option.selected = "selected";
        }
        else if(select.name === "to" && Code === "BDT"){
            Option.selected = "selected";
        }
        select.append(Option);
    }    
    select.addEventListener("change", (evt) => {
        Flag(evt.target);
    })
}

const Flag = (element) =>{
    let Code = element.value;
    let countryCode = countryList[Code]; 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const getExchangeRate = async () =>{
    let ammount = document.querySelector(".amount input");
    let amtVal = ammount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        ammount.value = "1";
    }

    let from = fromCurrency.value.toUpperCase();
    let to = toCurrency.value.toUpperCase();

    
    const URL = `${BASE_URL}/${from}`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data.rates[to];
    
    let totalExchangeRate = amtVal * exchangeRate;
    msg.innerText = `${amtVal} ${from} = ${totalExchangeRate.toFixed(2)} ${to}`;
};

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    getExchangeRate();
});
window.addEventListener("load", () =>{
    getExchangeRate();
});
