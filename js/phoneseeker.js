document.getElementById('error-message').style.display = 'none';

const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search filed data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    // empty search field error message
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch (url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
    .catch(error => displayError(error));
    }
    
}

// error handle
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

// display phone Search Result
const displaySearchResult = allphones =>{
    // display 20 result
    const phones  = allphones.slice(0, 20);
    const searchResult = document.getElementById('search-result');
    // clear previous search result
    searchResult.textContent = '';
    // phone not found message
    if(phones == 0){
        document.getElementById('error-message').style.display = 'block';
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="img">
            <div class="text-center mt-3">
            <h5 class="card-title">Phone: ${phone.phone_name}</h5>
            <h5 class="card-title">Brand: ${phone.brand}</h5>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary px-5">Show Details</button>

            </div>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        
    })
    
}

// load phone details
const loadPhoneDetail = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then (res => res.json())
    .then (data => displayPhoneDetail(data.data))
}

// display Phone Detail
const displayPhoneDetail = phone =>{
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone?.image}" class="card-img-top w-75 mx-auto mt-2" alt="img">
    <div class="card-body">
    <h3 class="card-title"> ${phone?.name}</h3>
        <h5 class="card-title">Release Date: ${phone.releaseDate === ""? "Not found" : phone.releaseDate}</h5>
        <h4 class="card-title mt-3">Main Features</h4>
        <h5 class="card-title">ChipSet: ${phone?.mainFeatures.chipSet}</h5>
        <h5 class="card-title">DisplaySize: ${phone?.mainFeatures.displaySize}</h5> 
        <h5 class="card-title">Sensors: ${phone.mainFeatures?phone.mainFeatures.sensors: "Not Found"}</h5>
        <h5 class="card-title">Memory: ${phone?.mainFeatures.memory}</h5> 
        <h5 class="card-title">Storage: ${phone?.mainFeatures.storage}</h5>
        <h4 class="card-title mt-3">Others Info</h4>
        <h5 class="card-title">Bluetooth: ${phone.others?phone.others.Bluetooth: "Not found"}</h5> 
        <h5 class="card-title">GPS: ${phone.others? phone.others.GPS: "Not found"}</h5> 
        <h5 class="card-title">NFC: ${phone.others?phone.others.NFC: "Not found"}</h5> 
        <h5 class="card-title">Radio: ${phone.others?phone.others.Radio: "Not found"}</h5> 
        <h5 class="card-title">USB: ${phone.others?phone.others.USB: "Not found"}</h5> 
        <h5 class="card-title">WLAN: ${phone.others?phone.others.WLAN: "Not found"}</h5>
    </div>
    `;
    
    phoneDetails.appendChild(div);
}