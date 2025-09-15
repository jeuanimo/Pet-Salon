// Service constructor
function Service(name, description, price) {
  this.name = name;
  this.description = description;
  this.price = price;
}

$(document).ready(function () {
  // handle form submit
  $("#servicesRegistrationForm").on("submit", function (event) {
    event.preventDefault();

    const serviceName = $("#serviceName").val().trim();
    const serviceDescription = $("#serviceDescription").val().trim();
    const servicePrice = $("#servicePrice").val().trim();

    let isValid = true;

    // clear old error states
    $(this).find(".form-group").removeClass("has-error");
    $(this).find(".help-block").hide();

    // validate fields
    if (!serviceName) {
      $("#serviceName")
        .closest(".form-group")
        .addClass("has-error")
        .find(".help-block")
        .show();
      isValid = false;
    }
    if (!serviceDescription) {
      $("#serviceDescription")
        .closest(".form-group")
        .addClass("has-error")
        .find(".help-block")
        .show();
      isValid = false;
    }
    if (!servicePrice || isNaN(servicePrice) || parseFloat(servicePrice) <= 0) {
      $("#servicePrice")
        .closest(".form-group")
        .addClass("has-error")
        .find(".help-block")
        .show();
      isValid = false;
    }

    // stop if invalid
    if (!isValid) return;

    // create Service object
    const newService = new Service(
      serviceName,
      serviceDescription,
      servicePrice
    );

    // add to HTML (append to list)
    $("#servicesList").append(`
      <li class="list-group-item">
        <strong>${newService.name}</strong> - ${newService.description} ($${newService.price})
      </li>
    `);

    // reset form on success
    this.reset();
    $(this).find(".form-group").removeClass("has-error");
    $(this).find(".help-block").hide();
  });

  // handle reset button
  $("#servicesRegistrationForm").on("reset", function () {
    $(this).find(".form-group").removeClass("has-error");
    $(this).find(".help-block").hide();
  });

  // live validation: clear error when user fixes input
  $("#serviceName, #serviceDescription, #servicePrice").on(
    "input blur",
    function () {
      const value = $(this).val().trim();
      const $formGroup = $(this).closest(".form-group");

      if (this.id === "servicePrice") {
        if (value && !isNaN(value) && parseFloat(value) > 0) {
          $formGroup.removeClass("has-error").find(".help-block").hide();
        }
      } else {
        if (value) {
          $formGroup.removeClass("has-error").find(".help-block").hide();
        }
      }
    }
  );
});

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
