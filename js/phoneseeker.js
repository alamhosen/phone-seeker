const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch (url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
}

// searchPhone();

const displaySearchResult = phones =>{
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="img">
            <h5 class="card-title">Brand: ${phone.brand}</h5>
            <h5 class="card-title">Phone: ${phone.phone_name}</h5>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary">Detailes</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = id =>{
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    console.log(url);
    fetch(url)
    .then (res => res.json())
    .then (data => displayPhoneDetail(data.data))
}

// loadPhoneDetail();

const displayPhoneDetail = phone =>{
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">Phone: ${phone.name}</h5>
    <h5 class="card-title">Release Date: ${phone.releaseDate}</h5>
        <h4>Main Features</h4>
        <h5 class="card-title">ChipSet: ${phone.mainFeatures.chipSet}</h5>
        <h5 class="card-title">DisplaySize: ${phone.mainFeatures.displaySize}</h5> 
        <h5 class="card-title">Memory: ${phone.mainFeatures.memory}</h5> 
    </div>
    `;
    phoneDetails.appendChild(div);
}