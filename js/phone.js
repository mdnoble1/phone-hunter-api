// fetch phone data from the api

const loadPhone = async (searchText='13', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones, isShowAll);
};

// showing phone data dynamically

const displayPhone = (phones, isShowAll) => {
  // console.log(phones);

  //   getting the container where I want to display phones

  const phoneContainer = document.getElementById("phone-container");

  // clearing the container before adding new phones

  phoneContainer.textContent = "";

  // showing show all button when there is more than 12 phones

  const showAllContainer = document.getElementById("show-all-container");

  // console.log('is show all', isShowAll)

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // console.log('is show all', isShowAll)

  // showing only 12 phones at first if show all button not pressed

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

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
        <h2 class="card-title mx-auto">${phone.phone_name}</h2>
        <p class="text-center">If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    `;

    // append the div to the container

    phoneContainer.appendChild(phoneCard);
  });

  // hiding the loadingSpinner after finishing loading operation of phones

  toggleLoadingSpinner(false);
};

// handle show details button modal

const handleShowDetail = async (id) => {
  // console.log('detail dekhte chai mama' , id)

  // loading single phone API data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetails = data.data;

  // calling the show details function

  handleShowDetails(phoneDetails);
};

// handle show details modal operatin

const handleShowDetails = (phone) => {
  // console.log(phone);

  // getting the div where I want to show details

  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );

  // setting innerHTML in the div

  showDetailsContainer.innerHTML = `
    <figure><img class="mx-auto my-4" src="${phone.image}" /></figure>
    <h3 class="font-bold text-2xl pt-4">${phone.name}</h3>
    <p class="py-2"> <span class="font-bold">Storage : </span> ${phone?.mainFeatures?.storage}</p>
    <p class="py-2"> <span class="font-bold">Display Size : </span> ${phone?.mainFeatures?.displaySize}</p>
    <p class="py-2"> <span class="font-bold">Chipset : </span> ${phone?.mainFeatures?.chipSet}</p>
    <p class="py-2"> <span class="font-bold">Memory : </span> ${phone?.mainFeatures?.memory}</p>
    <p class="py-2"> <span class="font-bold">Release Date : </span> ${phone?.releaseDate}</p>
    <p class="py-2"> <span class="font-bold">Brand : </span> ${phone?.brand}</p>
    <p class="py-2"> <span class="font-bold">GPS : </span> ${phone?.others?.GPS || ''}</p>
    <div class="modal-action">
    <form method="dialog">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </form>
    </div>`;

  // show the modal by click

  show_details_modal.showModal();
};

// handle search button operation

const handleButton = (isShowAll) => {
  // console.log('search kortase re mama')

  // calling te loadingSpinner function before loading operation is done

  toggleLoadingSpinner(true);

  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);

  // calling the load phone function

  loadPhone(searchText, isShowAll);
  // searchField.value = "";
};

// handle toggle operation of loading or spinner

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all button

const handleShowAllButton = () => {
  // console.log('sob dekhabe re mama');
  handleButton(true);
};
// globally calling functions

loadPhone();
