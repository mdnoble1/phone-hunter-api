// fetch phone data from the api

const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones);
};

// showing phone data dynamically

const displayPhone = (phones) => {
    // console.log(phones);

    // showing show all button when there is more than 12 phones 

    const showAllContainer = document.getElementById('show-all-container');

    if( phones.length > 12) {
      showAllContainer.classList.remove('hidden');
    }

    else {
      showAllContainer.classList.add('hidden');
    }

    // showing only 12 phones at first 

    phones = phones.slice(0 , 12);
    // console.log(phones)

  //   getting the container where I want to display phones

  const phoneContainer = document.getElementById("phone-container");

  // clearing the container before adding new phones 

  phoneContainer.textContent = '';

  phones.forEach((phone) => {
    // console.log(phone)

    // creating div where I want to display phone

    const phoneCard = document.createElement("div");

    // adding classes to the div 

    phoneCard.classList = `card w-11/12 bg-gray-300 p-8 shadow-xl mx-auto`;

    // setting inner HTML in the div

    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>
    `;

    // append the div to the container 

    phoneContainer.appendChild(phoneCard);
  });
};

// handle search button operation 

const handleButton = () => {
  // console.log('search kortese re mama')
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText);

  // calling the load phone function 

  loadPhone(searchText);
  searchField.value = '';
}
// globally calling functions

loadPhone();
