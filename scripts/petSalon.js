
// Mitchell Pet Salon Project (petSalon.js)


// Step 1: Create pets array with 3 pets (object literals)
let pets = [
  {
    name: "Juanito",
    age: 3,
    gender: "Male",
    service: "Grooming",
    breed: "Rottweiler",
  },
  {
    name: "Sol",
    age: 2,
    gender: "Male",
    service: "Vaccination",
    breed: "Bulldog",
  },
  {
    name: "Maxine",
    age: 5,
    gender: "Female",
    service: "Nail Trim",
    breed: "Poodle",
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
    displayPetCount();
    displayPetNames();
    displayAverageAge();
};
