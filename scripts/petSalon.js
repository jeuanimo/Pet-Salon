// Mitchell Pet Salon Project (petSalon.js)
// --- DARK MODE: bind safely and persist preference ---
$(function () {
  var KEY = "prefers-dark-mode";

  function apply(isDark) {
    $("body").toggleClass("dark-mode", isDark);
    $("#darkModeToggle").text(isDark ? "☀️ Light Mode" : "🌙 Dark Mode");
  }

  // Initialize from storage (or default to light)
  var stored = localStorage.getItem(KEY);
  apply(stored === "true");

  // Click to toggle
  $(document).on("click", "#darkModeToggle", function () {
    var next = !$("body").hasClass("dark-mode");
    apply(next);
    localStorage.setItem(KEY, String(next));
  });
});
// Safe helper
function byId(id){ return document.getElementById(id); }

// Only attach if the element exists on this page:
var registerBtn = byId("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // ... your register logic ...
  });
}

var updateBtn = byId("updateBtn");
if (updateBtn) {
  updateBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // ... your update logic ...
  });
}

var resetBtn = byId("resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // ... your reset logic ...
  });
}

// Guard functions that assume table elements exist:
function displayPetCount() {
  var el = byId("petCount");
  if (el) el.textContent = pets.length;
}

function displayRow() {
  var tableBody = byId("petTableBody");
  if (!tableBody) return;         // <-- guard
  tableBody.innerHTML = "";
  // ... build rows ...
}

// Init only if elements exist on the current page
window.addEventListener("load", function () {
  if (byId("petTableBody")) displayRow();
  displayPetCount();              // guarded above
  if (byId("updateBtn")) byId("updateBtn").style.display = "none";
});


// ----- Initial Pets -----
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
    age: 45,
    gender: "Male",
    service: "Vaccination",
    breed: "Bulldog",
    type: "Dog",
  },
  {
    name: "Maxine",
    age: 60,
    gender: "Female",
    service: "Nail Trim",
    breed: "Poodle",
    type: "Dog",
  },
];

let editingIndex = null;

// ----- Stats -----
function displayPetCount() {
  document.getElementById("petCount").textContent = pets.length;
}

function displayPetNames() {
  let petList = document.getElementById("petNames");
  if (!petList) return; // guard in case element doesn't exist
  petList.innerHTML = "";
  pets.forEach((p) => {
    let li = document.createElement("li");
    li.textContent = p.name;
    petList.appendChild(li);
  });
}
// Average Age is killing me again..SMDH
function displayAverageAge() {
  const avgEl = document.getElementById("avgAge");
  if (!avgEl) return; // stop if the element doesn't exist

  if (pets.length === 0) {
    avgEl.textContent = "0.0";
        return;
  }

  let totalAge = 0;
  for (let pet of pets) {
    totalAge += Number(pet.age);
  }

  let avg = totalAge / pets.length;
  avgEl.textContent = avg.toFixed(1); // show one decimal place
  console.log("displayAverageAge")
}


function updateStats() {
  displayPetCount();
  displayPetNames();
  displayAverageAge();
}

// ----- Salon Info -----
const salon = {
  name: "Mitchell Pet Salon",
  address: {
    street: "12 Brandonwood Dr",
    city: "O'Fallon",
    state: "IL",
    zip: "62269",
  },
  phone: "618-215-5444",
};

document.getElementById(
  "salonInfo"
).textContent = `${salon.name} - ${salon.address.street}, ${salon.address.city} | Phone: ${salon.phone}`;

// ----- Constructor -----
function pet(name, age, gender, breed, service, type) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.breed = breed;
  this.service = service;
  this.type = type;
}

// ----- Display Table -----
function displayRow() {
  let tableBody = document.getElementById("petTableBody");
  tableBody.innerHTML = "";

  pets.forEach((pet, index) => {
    let row = `
      <tr>
        <td>${pet.name}</td>
        <td>${pet.age}</td>
        <td>${pet.gender}</td>
        <td>${pet.breed}</td>
        <td>${pet.service}</td>
        <td>${pet.type}</td>
        <td><button class="btn btn-warning btn-sm" onclick="editPet(${index})">Edit</button></td>
        <td><button class="btn btn-danger btn-sm" onclick="deletePet(${index})">Delete</button></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  updateStats();
}
// ----- Helper: Clear Form Clear without reset fingers crossed -----
function clearForm() {
  console.log("clearForm is running..."); // debug
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("breed").value = "";
  document.getElementById("service").value = "";
  document.getElementById("type").value = "";

  editingIndex = null;
  document.getElementById("updateBtn").style.display = "none";
  document.getElementById("registerBtn").style.display = "inline-block";
}





// ----- Delete -----
function deletePet(index) {
  pets.splice(index, 1);
  displayRow();
}

// ----- Edit -----
function editPet(index) {
  editingIndex = index;
  let pet = pets[index];

  document.getElementById("name").value = pet.name;
  document.getElementById("age").value = pet.age;
  document.getElementById("gender").value = pet.gender;
  document.getElementById("breed").value = pet.breed;
  document.getElementById("service").value = pet.service;
  document.getElementById("type").value = pet.type;

  // show Update button
  document.getElementById("updateBtn").style.display = "inline-block";

  // hide Register button so user doesn’t accidentally add instead of update
  document.getElementById("registerBtn").style.display = "none";
}

// ----- Register New -----
document.getElementById("registerBtn").addEventListener("click", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const breed = document.getElementById("breed").value;
  const service = document.getElementById("service").value;
  const type = document.getElementById("type").value;

  const newPet = new pet(name, age, gender, breed, service, type);
  pets.push(newPet);

  displayRow();
  clearForm();
});

// ----- Update Existing -----
document.getElementById("updateBtn").addEventListener("click", function (e) {
 e.preventDefault();

 if (editingIndex !== null) {
    // update pet in array
   pets[editingIndex].name = document.getElementById("name").value;
   pets[editingIndex].age = document.getElementById("age").value;
    pets[editingIndex].gender = document.getElementById("gender").value;
    pets[editingIndex].breed = document.getElementById("breed").value;
    pets[editingIndex].service = document.getElementById("service").value;
    pets[editingIndex].type = document.getElementById("type").value; //
// refresh the table with updated data
   
    displayRow();
// clear form and reset state
    clearForm();
  }
});

// ----- Reset -----
document.getElementById("resetBtn").addEventListener("click", function (e) {
  e.preventDefault();
  clearForm();
});


// ----- Init -----
window.onload = function () {
  displayRow();
  updateStats();
  document.getElementById("updateBtn").style.display = "none"; // hide Update at start
};


