
// Mitchell Pet Salon Project (petSalon.js)


// Step 1: Create pets array with 3 pets (object literals)
let pets = [
  {
    name: "Juanito",
    age: 3,
    gender: "Male",
    service: "Grooming",
    breed: "Rottweiler",
    type: "Dog",
  },
  {
    name: "Sol",
    age: 2,
    gender: "Male",
    service: "Vaccination",
    breed: "Bulldog",
    type: "Dog",
  },
  {
    name: "Maxine",
    age: 5,
    gender: "Female",
    service: "Nail Trim",
    breed: "Poodle",
    type: "Dog",
  },
];

// Step 2: Function to display total pet count
function displayPetCount() {
  document.getElementById("petCount").textContent = pets.length;
  
}

// Step 3: Function to display pet names
function displayPetNames() {
  let petList = document.getElementById("petNames");
  petList.innerHTML = ""; // Clear any old content

  for (let i = 0; i < pets.length; i++) {
    let li = document.createElement("li");
    li.textContent = pets[i].name;
    petList.appendChild(li);
  }
}

// Step 4 (Extra Challenge): Function to calculate average age
function displayAverageAge() {
  let totalAge = 0;

  for (let i = 0; i < pets.length; i++) {
    totalAge += pets[i].age;
  }

  let avg = totalAge / pets.length;
  document.getElementById("avgAge").textContent = avg.toFixed(1); // show 1 decimal
}

// Step 5: Initialize on page load
window.onload = function () {
    displayRow();
    displayAverageAge();
    displayPetCount();
    displayPetNames(); 
};

// Step 6: Salon object literal
const salon = {
  name: "Mitchell Pet Salon",
  address: {
    street: "12 Brandonwood Dr",
    city: "O'Fallon",
    state: "IL",
    zip: "62269"
  },
  phone: "618-215-5444"
};

// Display salon info on the page
document.getElementById("salonInfo").textContent = 
  `${salon.name} - ${salon.address.street}, ${salon.address.city} | Phone: ${salon.phone}`;

// Step 2: Pet constructor
function pet(name, age, gender, breed, service, type) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.breed = breed;
  this.service = service;
  this.type = type;
}



// Step 4: Display pets
/*
function displayPets() {
  const petList = document.getElementById("petList");
  petList.innerHTML = "";

  for (let i = 0; i < pets.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${pets[i].name} (${pets[i].type}) - ${pets[i].service}`;
    petList.appendChild(li);
  } */
// New function to display pets in rows
function displayRow() {
  let tableBody = document.getElementById("petTableBody");
  tableBody.innerHTML = ""; // clear old rows

  for (let pet of pets) {
    let row = `
      <tr>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.gender}</td>
        <td>${pet.breed}</td>
        <td>${pet.service}</td>
        <td>${pet.type}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  }
} 

  // Update pet count
  document.getElementById("petCount").textContent = pets.length;


// Step 5: Register new pet via form
document.getElementById("petForm").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent form reload

  // Get form values
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const breed = document.getElementById("breed").value;
  const service = document.getElementById("service").value;
  const type = document.getElementById("type").value;

  // Create new pet using constructor
  const newPet = new pet(name, age, gender, breed, service, type);

  // Add to pets array
  pets.push(newPet);

  // Refresh pet list
  displayRow();

  // Clear form
  document.getElementById("petForm").reset();
});

// Step 6: Initialize
/*
window.onload = function () {

  displayRow();
  displayAverageAge();
  displayPetCount();
  displayPetNames();
};*/

