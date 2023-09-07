// fetch phone data from the api

const loadPhone = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhone(phones);
};

// showing phone data dynamically

const displayPhone = (phones) => {
  //   console.log(phones);

  //   getting the container where I want to display phones

  const phoneContainer = document.getElementById("phone-container");

  phones.forEach((phone) => {
    // console.log(phone)

    // creating div where I want to display phone

    const phoneCard = document.createElement("div");

    // adding classes to the div 

    phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;

    // setting inner HTML in the div

    phoneCard.innerHTML = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
        </div>
    </div>
    </div>
    `;

    // append the div to the container 
    
    phoneContainer.appendChild(phoneCard);
  });
};


// globally calling functions

loadPhone();
