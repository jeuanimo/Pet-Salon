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
function byId(id) {
  return document.getElementById(id);
};

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
/* Services page */


(function () {
  "use strict";

  const servicesKey = "mps_services";
  let services = [];

  // -------- LocalStorage helpers --------
  function loadServices() {
    try {
      const raw = localStorage.getItem(servicesKey);
      services = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(services)) services = [];
    } catch (e) {
      console.warn("Failed to parse services from storage:", e);
      services = [];
    }
  }

  function saveServices() {
    localStorage.setItem(servicesKey, JSON.stringify(services));
  }

  // -------- UI helpers --------
  function fmtPrice(value) {
    const n = Number(value);
    if (!isFinite(n)) return "$0.00";
    return `$${n.toFixed(2)}`;
  }

  function renderServices() {
    const $tbody = $("#servicesTableBody");
    $tbody.empty();

    if (!services.length) {
      $("#emptyHint").show();
    } else {
      $("#emptyHint").hide();
    }

    services.forEach((svc, idx) => {
      const row = `
        <tr data-index="${idx}">
          <td>${escapeHtml(svc.name)}</td>
          <td>${escapeHtml(svc.description)}</td>
          <td class="text-end">${fmtPrice(svc.price)}</td>
          <td class="text-center">
            <button type="button" class="btn btn-sm btn-danger js-delete">Delete</button>
          </td>
        </tr>`;
      $tbody.append(row);
    });

    $("#servicesCount").text(services.length);
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function clearForm($form) {
    $form[0].reset();
    // Clear validation UI
    $form.find(".form-control").removeClass("is-invalid is-valid");
  }

  // -------- Validation --------
  function validateField($el) {
    const id = $el.attr("id");
    const val = $.trim($el.val());

    let valid = true;

    if (id === "serviceName" || id === "serviceDescription") {
      valid = val.length > 0;
    } else if (id === "servicePrice") {
      const n = parseFloat(val);
      valid = val.length > 0 && isFinite(n) && n > 0;
    }

    $el.toggleClass("is-invalid", !valid);
    $el.toggleClass("is-valid", valid);

    return valid;
  }

  function validateForm($form) {
    const $name = $("#serviceName");
    const $desc = $("#serviceDescription");
    const $price = $("#servicePrice");

    const v1 = validateField($name);
    const v2 = validateField($desc);
    const v3 = validateField($price);

    if (!(v1 && v2 && v3)) {
      // focus first invalid
      const $firstInvalid = $form.find(".is-invalid").first();
      if ($firstInvalid.length) $firstInvalid.trigger("focus");
      return false;
    }
    return true;
  }

  // -------- Event bindings --------
  $(function () {
    const $form = $("#servicesForm");

    // Live validation
    $form.on("input blur", ".form-control", function () {
      validateField($(this));
    });

    // Submit handler
    $form.on("submit", function (e) {
      e.preventDefault();

      if (!validateForm($form)) return;

      // Build new service
      const newService = {
        id: Date.now(),
        name: $.trim($("#serviceName").val()),
        description: $.trim($("#serviceDescription").val()),
        price: parseFloat($("#servicePrice").val())
      };

      // Save to storage
      services.push(newService);
      saveServices();
      renderServices();

      // Clear inputs and validation states
      clearForm($form);
    });

    // Reset button clears validation state too
    $form.on("reset", function () {
      clearForm($form);
    });

    // Delete service (event delegation)
    $(document).on("click", ".js-delete", function () {
      const $tr = $(this).closest("tr");
      const index = Number($tr.data("index"));
      if (Number.isInteger(index)) {
        services.splice(index, 1);
        saveServices();
        renderServices();
      }
    });

    // Initial load
    loadServices();
    renderServices();
  });
})();

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
