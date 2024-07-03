const handleSearchPhone = (isShowMore) =>{
    const searchPhoneField = document.getElementById('search-phone');
    const searchPhoneText = searchPhoneField.value;
    loadData(searchPhoneText, isShowMore);
}
const loadData = (searchPhoneText, isShowMore) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhoneText}`)
    .then(res=>res.json())
    .then(data=>displayData(data.data, isShowMore));
}


// displayData////////////////
const displayData = (phones, isShowMore) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    if(phones.length >10 && !isShowMore)
        {
            phones = phones.slice(0,10);
            document.getElementById('show-more-btn').classList.remove('hidden');
        }
    else if(isShowMore)
        {
            document.getElementById('show-more-btn').classList.add('hidden'); 
        }
        console.log(phones.length)
        phones.forEach(phone=>{
        const div = document.createElement('div');
        div.classList.add('card', 'bg-base-100',  'shadow-xl', 'p-2');
        div.innerHTML = `
        <figure>
        <img 
        class="w-1/3"
        src=${phone.image}
        alt="Shoes" />
        </figure>
        <div class="card-body mx-auto">
            <h2 class="card-title mx-auto">${phone.phone_name}</h2>
            <p class="mx-auto">There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions ">
            <button onclick="show_more.showModal(); handleShowDetails('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</button>
            </div>
        </div>
        `
        phonesContainer.appendChild(div); 
    })
}

// show more
const handleShowMore = () =>{
    handleSearchPhone(true);
}

// show details
const handleShowDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(data=>displayShowDetails(data.data));
}
const displayShowDetails = data =>{
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = data.name;

    const storage = document.getElementById('storage');
    storage.innerText = data.mainFeatures.storage;

    const displaySize = document.getElementById('display-size');
    displaySize.innerText = data.mainFeatures.displaySize;

    const memory = document.getElementById('memory');
    memory.innerText = data.mainFeatures.memory;

    const releaseDate = document.getElementById('release-date');
    releaseDate.innerText = data.mainFeatures.releaseDate;
    
    const img = document.getElementById(img);
    img.setAttribute('src') = data.img

}