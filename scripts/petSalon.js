// Mitchell Pet Salon Project (petSalon.js)

// --- DARK MODE ---
$(function () {
  var KEY = "prefers-dark-mode";

  function apply(isDark) {
    $("body").toggleClass("dark-mode", isDark);
    $("#darkModeToggle").text(isDark ? "☀️ Light Mode" : "🌙 Dark Mode");
  }

  var stored = localStorage.getItem(KEY);
  apply(stored === "true");

  $(document).on("click", "#darkModeToggle", function () {
    var next = !$("body").hasClass("dark-mode");
    apply(next);
    localStorage.setItem(KEY, String(next));
  });
});

// ----- Helpers -----
function byId(id) {
  return document.getElementById(id);
}

// ----- Local Storage Helpers -----
const PETS_KEY = "registeredPets";

function savePets() {
  localStorage.setItem(PETS_KEY, JSON.stringify(pets));
}

function loadPets() {
  const stored = localStorage.getItem(PETS_KEY);
  if (stored) {
    try {
      pets = JSON.parse(stored);
    } catch (err) {
      console.error("Error parsing stored pets:", err);
    }
  }
}

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

// overwrite with saved pets if available
loadPets();

let editingIndex = null;

// ----- Stats -----
function displayPetCount() {
  const el = byId("petCount");
  if (el) el.textContent = pets.length;
}

function displayPetNames() {
  const petList = byId("petNames");
  if (!petList) return;
  petList.innerHTML = "";
  pets.forEach((p) => {
    let li = document.createElement("li");
    li.textContent = p.name;
    petList.appendChild(li);
  });
}

function displayAverageAge() {
  const avgEl = byId("avgAge");
  if (!avgEl) return;

  if (pets.length === 0) {
    avgEl.textContent = "0.0";
    return;
  }

  let totalAge = pets.reduce((sum, pet) => sum + Number(pet.age), 0);
  let avg = totalAge / pets.length;
  avgEl.textContent = avg.toFixed(1);
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

const salonInfo = byId("salonInfo");
if (salonInfo) {
  salonInfo.textContent = `${salon.name} - ${salon.address.street}, ${salon.address.city} | Phone: ${salon.phone}`;
}

// ----- Constructor -----
function Pet(name, age, gender, breed, service, type) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.breed = breed;
  this.service = service;
  this.type = type;
}

// ----- Validation -----
function validateForm() {
  let valid = true;
  const fields = ["name", "age", "gender", "breed", "service", "type"];

  fields.forEach((id) => {
    const input = byId(id);
    if (!input) return;
    const value = input.value.trim();

    if (
      (id === "age" && (isNaN(value) || Number(value) <= 0)) ||
      value === ""
    ) {
      input.classList.add("is-invalid");
      valid = false;
    } else {
      input.classList.remove("is-invalid");
    }

    input.addEventListener("input", function () {
      if (
        (id === "age" && !isNaN(this.value) && Number(this.value) > 0) ||
        (id !== "age" && this.value.trim() !== "")
      ) {
        this.classList.remove("is-invalid");
      }
    });
  });

  return valid;
}

// ----- Display Table -----
function displayRow() {
  const tableBody = byId("petTableBody");
  if (!tableBody) return;

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

// ----- Clear Form -----
function clearForm() {
  ["name", "age", "gender", "breed", "service", "type"].forEach((id) => {
    if (byId(id)) byId(id).value = "";
  });
  editingIndex = null;
  if (byId("updateBtn")) byId("updateBtn").style.display = "none";
  if (byId("registerBtn")) byId("registerBtn").style.display = "inline-block";
}

// ----- Delete -----
function deletePet(index) {
  pets.splice(index, 1);
  savePets();
  displayRow();
  updateStats();
}

// ----- Edit -----
function editPet(index) {
  editingIndex = index;
  const pet = pets[index];

  byId("name").value = pet.name;
  byId("age").value = pet.age;
  byId("gender").value = pet.gender;
  byId("breed").value = pet.breed;
  byId("service").value = pet.service;
  byId("type").value = pet.type;

  if (byId("updateBtn")) byId("updateBtn").style.display = "inline-block";
  if (byId("registerBtn")) byId("registerBtn").style.display = "none";
}

// ----- Register -----
const registerBtn = byId("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const newPet = new Pet(
      byId("name").value.trim(),
      Number(byId("age").value.trim()),
      byId("gender").value.trim(),
      byId("breed").value.trim(),
      byId("service").value.trim(),
      byId("type").value.trim()
    );

    pets.push(newPet);
    savePets();
    displayRow();
    updateStats();
    clearForm();
  });
}

// ----- Update -----
const updateBtn = byId("updateBtn");
if (updateBtn) {
  updateBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill out all fields correctly.");
      return;
    }

    if (editingIndex !== null) {
      pets[editingIndex].name = byId("name").value.trim();
      pets[editingIndex].age = Number(byId("age").value.trim());
      pets[editingIndex].gender = byId("gender").value.trim();
      pets[editingIndex].breed = byId("breed").value.trim();
      pets[editingIndex].service = byId("service").value.trim();
      pets[editingIndex].type = byId("type").value.trim();

      savePets();
      displayRow();
      updateStats();
      clearForm();
    }
  });
}

// ----- Reset -----
const resetBtn = byId("resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearForm();
  });
}

// ----- Init -----
window.onload = function () {
  displayRow();
  updateStats();
  if (byId("updateBtn")) byId("updateBtn").style.display = "none";
};
