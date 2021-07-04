const toggleBtn = document.getElementById('toggle');
const countryName = document.querySelectorAll('#countryName')
let nameB;

async function start() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    var data = await response.json();
    console.log(data);

    displayCountries(data);

    const html = (data.map(regionList => {
        return ` ${regionList.region}`
    }))
    console.log(html);
    //const newhtml = jQuery.unique(html);
    var outputArray = Array.from(new Set(html))
    outputArray.pop()
    //console.log(newhtml);
    console.log(outputArray);
    
    document.querySelector('.dropdown').innerHTML = `
        <option > Filter by Region </option>
        ${outputArray.map(function (x) {
        return `<option >${x}</option>`
            
    })}
    

`}
function displayCountries(data) {
    document.querySelector('.grid').innerHTML = `
    ${data.map(function (image, index) {
        
        return `
        <div class='flex'>
            <div id='row1' >
                <img src=${image.flag} style='object-fit:contain'>
            </div >
            <div id='row2'>
                <h3 id='countryName' onclick='myData(${index})'> ${image.name} </h3>
                <p>Population : ${image.population} </p>
                <p class='countryRegion'> Region : ${image.region} </p>
                <p> Capital : ${image.capital} </p>
            </div>
        </div>
      `
      
        
    }).join('')
    
    
        }
`/*
    document.querySelector('#countryName').addEventListener('click', () => {
    myData(image);
})*/
    
   
}
start()
async function myData(detail) {

    const response = await fetch('https://restcountries.eu/rest/v2/all');
    var data = await response.json();
    console.log(data);

    console.log(typeof (detail));
    document.querySelector('.search').innerHTML = `
            <button class="back"><a href="index.html"> <i> &#8592; </i>  Back </a></button>
            `
    document.querySelector('.grid').style.display = 'none';
    document.querySelector('.data-flex').innerHTML = `
            <div class=data-col1>
            <img src=${data[detail].flag}>
        </div>
        <div class=data-col2>
            <div class='item1'>${data[detail].name}</div>
            <div class='item2'>Native name : ${data[detail].nativeName}<br> Population : ${data[detail].population} <br>  Region : ${data[detail].region}<br> Sub Region : ${data[detail].subregion} <br> Capital : ${data[detail].capital}</div>
            
    `

}



    document.querySelector('.darkMode').addEventListener('click', darkMode);
    function darkMode() {
        document.body.classList.toggle('light');
    }


    function regionFilter(filter) {
        const countryRegion = document.querySelectorAll('.countryRegion');
        console.log(filter);
        countryRegion.forEach(namep => {
            console.log(namep.innerText);
                if(filter=='Filter by Region'){
                    namep.parentElement.parentElement.style.display = 'block';
                }
                else if(namep.innerText.toLowerCase().includes(filter.toLowerCase())) {
                    namep.parentElement.parentElement.style.display = 'block';
                }
                else {
                    namep.parentElement.parentElement.style.display = 'none';
                }  
            
        }
        
    )
    }
        

    document.querySelector('.search-bar').addEventListener('input', search);
function search(e) {
    const val = e.target.value;
    const countryName = document.querySelectorAll('#countryName');
    console.log(val);
    

    countryName.forEach(name => {
        console.log(name.innerText);

        if (name.innerText.toLowerCase().includes(val.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block';
        } else {
            name.parentElement.parentElement.style.display = 'none';
        }   
    })
    
}
