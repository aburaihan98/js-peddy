//fetch category
const category = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const categories = await response.json();
  displayCategory(categories.categories);
};
const displayCategory = (categories) => {
  const categoryBtn = document.getElementById("categoryBtn");
  categories.forEach((category) => {
    const div = `
                <button data-id="${category.id}" onclick="activeCategoryBtn('${category.id}'); petsByCategory('${category.category}')" class="p-6 flex justify-center items-center gap-4  border rounded-2xl allActiveBtn">
                    <img src=${category.category_icon} alt="" />
                    <p class=" font-bold text-2xl">${category.category}</p>
                </button>
                `;
    categoryBtn.innerHTML += div;
  });
};
const activeCategoryBtn = (id) => {
  const allActiveBtn = document.querySelectorAll(".allActiveBtn");

  allActiveBtn.forEach((active) => {
    active.classList.remove("bg-[#0E7A811A]", "rounded-full");
    active.classList.add("rounded-2xl");
  });

  const activeCategory = document.querySelector(`[data-id="${id}"]`);
  activeCategory.classList.remove("rounded-2xl");
  activeCategory.classList.add("bg-[#0E7A811A]", "rounded-full");
};

// Fetch Pets by Category
const petsByCategory = (category) => {
  document.getElementById("petsCard").innerHTML = "";
  document.getElementById("spinner").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("spinner").classList.add("hidden");
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((response) => response.json())
      .then((data) => displayPetsByCategory(data.data))
      .catch((err) => console.log(err));
  }, 2000);
};
const displayPetsByCategory = (pets) => {
  if (pets.length > 0) {
    document.getElementById("petsCard").innerHTML = "";
    const petsCard = document.getElementById("petsCard");
    petsCard.classList.add("grid");
    pets.forEach((pet) => {
      const div = `
                <div  class="card w-[312px] bg-base-100 shadow-xl mb-5">
                    <figure>
                    <img
                        src=${pet.image}
                        alt="Shoes"
                    />
                    </figure>
                    <div class="card-body">
                    <h2 class="card-title font-bold text-xl">${
                      pet.pet_name
                    }</h2>
                    <div class=" flex gap-2.5 items-center mb-2.5">
                    <i class="fa-solid fa-table-cells-large"></i>
                    <p class="text-[#131313B3]">Breed: ${
                      pet.breed ? pet.breed : "Not Published"
                    }</p>
                    </div>
                    <div class=" flex gap-2.5 items-center mb-2.5">
                    <i class="fa-solid fa-cake-candles"></i>
                    <p class="text-[#131313B3]">Breed: ${
                      pet.date_of_birth ? pet.date_of_birth : "Not Published"
                    }</p>
                    </div>
                    <div class=" flex gap-2.5 items-center mb-2.5">
                    <i class="fa-solid fa-person-dress"></i>
                    <p class="text-[#131313B3]">Breed: ${
                      pet.gender ? pet.gender : "Not Published"
                    }</p>
                    </div>
                    <div class=" flex gap-2.5 items-center mb-2.5 pb-4 border-b">
                    <i class="fa-solid fa-dollar-sign"></i>
                    <p class="text-[#131313B3]">Breed: ${
                      pet.price ? pet.price : "Not Published"
                    }</p>
                    </div>
                     <div class="flex justify-between items-center">
                    <button onclick="likedBtn('${
                      pet.image
                    }')" class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
                    <button class="btn font-bold text-lg text-[#0E7A81]">Adopt</button>
                    <button onclick="petDetailsById('${
                      pet.petId
                    }')" class="btn font-bold text-lg text-[#0E7A81]">Details</button>
                    </div>
                    </div>
                </div>
             `;
      petsCard.innerHTML += div;
    });
  } else {
    document.getElementById("petsCard").innerHTML = "";
    const petsCard = document.getElementById("petsCard");
    petsCard.classList.remove("grid");
    const div = `
                <div
                    class="py-[100px] mx-6 bg-[#13131308] rounded-2xl flex flex-col justify-center items-center"
                    >
                    <div class="mb-[30px]">
                        <img src="./assets/images/error.webp" alt="" />
                    </div>
                    <h2 class="font-bold text-3xl text-[#131313] mb-4">
                        No Information Available
                    </h2>
                    <p class="text-[#131313B3] text-center">
                        It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at <br />
                        its layout. The point of using Lorem Ipsum is that it has a.
                    </p>
                </div>
               `;
    petsCard.innerHTML += div;
  }
};
category();

// Sort pets
const sortByPrice = () => {
  document.getElementById("petsCard").innerHTML = "";
  const petsCard = document.getElementById("petsCard");
  petsCard.classList.add("grid");
  document.getElementById("spinner").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("spinner").classList.add("hidden");

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((response) => response.json())
      .then((data) => {
        const pets = data.pets.sort((a, b) => {
          let aa = a.price;
          let bb = b.price;
          return bb - aa;
        });
        displayAllPets(pets);
      })
      .catch((error) => console.log(error));
  }, 2000);
};
const sortBtn = document.getElementById("sortBtn");
sortBtn.onclick = sortByPrice;

// Fetch All Pets
const allPets = () => {
  document.getElementById("spinner").classList.remove("hidden");

  setTimeout(async () => {
    document.getElementById("spinner").classList.add("hidden");
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const pets = await response.json();
    displayAllPets(pets.pets);
  }, 2000);
};

const displayAllPets = (pets) => {
  const petsCard = document.getElementById("petsCard");

  pets.forEach((pet) => {
    const div = `
            <div  class="card w-full lg:w-[300px] bg-base-100 shadow-xl mb-5">
                <figure>
                <img
                    src=${pet.image}
                    alt="Shoes"
                />
                </figure>
                <div class="card-body">
                <h2 class="card-title font-bold text-xl">${pet.pet_name}</h2>
                <div class=" flex gap-2.5 items-center mb-2.5">
                <i class="fa-solid fa-table-cells-large"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.breed ? pet.breed : "Not Published"
                }</p>
                </div>
                <div class=" flex gap-2.5 items-center mb-2.5">
                <i class="fa-solid fa-cake-candles"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.date_of_birth ? pet.date_of_birth : "Not Published"
                }</p>
                </div>
                <div class=" flex gap-2.5 items-center mb-2.5">
                <i class="fa-solid fa-person-dress"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.gender ? pet.gender : "Not Published"
                }</p>
                </div>
                <div class=" flex gap-2.5 items-center mb-2.5 pb-4 border-b">
                <i class="fa-solid fa-dollar-sign"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.price ? pet.price : "Not Published"
                }</p>
                </div>
                 <div class="flex justify-between items-center">
                <button onclick="likedBtn('${
                  pet.image
                }')" class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
                <button onclick="adopt()" class="btn font-bold text-lg text-[#0E7A81]">Adopt</button>
                <button onclick="petDetailsById('${
                  pet.petId
                }')" class="btn font-bold text-lg text-[#0E7A81]">Details</button>
                </div>
                </div>
            </div>
         `;
    petsCard.innerHTML += div;
  });
};
allPets();

// Fetch Pet Details by ID
const petDetailsById = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayPetDetailsById(data.petData))
    .catch((error) => console.log(error));
};
const displayPetDetailsById = (pet) => {
  my_modal_5.showModal();
  const details = document.getElementById("details");

  const div = `
            <div  class="card  bg-base-100 shadow-xl mb-5">
                <figure>
                <img
                    src=${pet.image}
                    alt="Shoes"
                />
                </figure>
                <div class="card-body">
                <h2 class="card-title font-bold text-xl">${pet.pet_name}</h2>
                <div class="grid grid-cols-2 border-b">
                <div class=" flex gap-2.5 items-center mb-2.5">
                <i class="fa-solid fa-table-cells-large"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.breed ? pet.breed : "Not Published"
                }</p>
                </div>
                <div class=" flex gap-2.5 items-center mb-2.5">
                <i class="fa-solid fa-cake-candles"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.date_of_birth ? pet.date_of_birth : "Not Published"
                }</p>
                </div>
                <div class=" flex gap-2.5 items-center mb-2.5">
                <i class="fa-solid fa-person-dress"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.gender ? pet.gender : "Not Published"
                }</p>
                </div>
                <div class=" flex gap-2.5 items-center mb-2.5">
                <i class="fa-solid fa-dollar-sign"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.price ? pet.price : "Not Published"
                }</p>
                </div>
                <div class=" flex gap-2.5 items-center mb-2.5">
                <i class="fa-solid fa-person-dress"></i>
                <p class="text-[#131313B3]">Breed: ${
                  pet.vaccinated_status
                    ? pet.vaccinated_status
                    : "Not Published"
                }</p>
                </div>
                </div>
                <div class="mt-4">
                <h2 class="font-semibold mb-3">Details Information</h2>
                <p class="text-[#131313B3]">${
                  pet.pet_details ? pet.pet_details : "Not Published"
                }</p>
                </div>
                 <div class="flex justify-between items-center mt-4">
                    <button class="btn"><i class="fa-solid fa-thumbs-up"></i></button>
                    <button class="btn font-bold text-lg text-[#0E7A81]">Adopt</button>
                    <button onclick="petDetailsById('${
                      pet.petId
                    }')" class="btn font-bold text-lg text-[#0E7A81]">Details</button>
                </div>
                  <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                  </div>
                </div>
            </div>
         `;
  details.innerHTML = div;
};

// likedBtn
const likedBtn = (img) => {
  const likedImage = document.getElementById("likedImage");
  const image = `
              <div class="w-[47%]">
                  <img class="rounded-xl w-full" src="${img}" alt="">
              </div> `;
  likedImage.innerHTML += image;
};

// adopt
function adopt() {
  my_modal_6.showModal();
  let countDown = 3;
  countDownFun(countDown);
  function decrement() {
    countDown -= 1;
    countDownFun(countDown);
  }
  const intervalId = setInterval(() => {
    decrement();
    if (countDown === 0) {
      clearInterval(intervalId);
      my_modal_6.close();
    }
  }, 1000);
}

function countDownFun(count) {
  const modalBox2 = document.getElementById("modal-box2");
  const div = `
            <div>
                <div class="mb-4">
                    <img
                    class="m-auto"
                    src="https://img.icons8.com/?size=80&id=JDJpJPFVUvFU&format=png"
                    alt=""
                    />
                </div>
                <h2 class="font-black text-5xl mb-4 text-center">congratulated</h2>
                <p class="mb-4 text-2xl text-center">Adoption: Providing Love, A New Beginning</p>
                <h6 class="mb-4 font-black text-5xl text-center">${count}</h6>
            </div> `;

  modalBox2.innerHTML = div;
}
