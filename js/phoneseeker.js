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
        <div onclick="loadMealDetail(${phone.brand})" class="card h-100">
            <div class="card-body">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="img">
            <h5 class="card-title">Brand: ${phone.brand}</h5>
            <h5 class="card-title">Phone: ${phone.phone_name}</h5>
            <button type="button" class="btn btn-primary">Detailes</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}