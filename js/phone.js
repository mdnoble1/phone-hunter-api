// fetch phone data from the api

const loadPhone = async (searchText, isShowAll) => {
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

  if(!isShowAll){
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
        <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>
    `;

    // append the div to the container

    phoneContainer.appendChild(phoneCard);
  });

  // hiding the loadingSpinner after finishing loading operation of phones

  toggleLoadingSpinner(false);
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

// loadPhone();
