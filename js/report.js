const API_ENDPOINT = "/api/reports";

const MIN_DESCRIPTION_LENGTH = 10;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const reportForm = document.getElementById("reportForm");

const issueTitle = document.getElementById("issueTitle");
const category = document.getElementById("category");
const locationInput = document.getElementById("location");
const description = document.getElementById("description");
const imageInput = document.getElementById("image");

const imagePreviewContainer =
  document.getElementById("imagePreviewContainer");

const imagePreview =
  document.getElementById("imagePreview");

const imageFileName =
  document.getElementById("imageFileName");

const removeImageButton =
  document.getElementById("removeImageButton");

const successCard =
  document.getElementById("successCard");

const referenceId =
  document.getElementById("referenceId");

const submittedTitle =
  document.getElementById("submittedTitle");

const submittedCategory =
  document.getElementById("submittedCategory");

const submittedLocation =
  document.getElementById("submittedLocation");

const reportAnotherButton =
  document.getElementById("reportAnotherButton");

const selectedAreaBanner =
  document.getElementById("selectedAreaBanner");

const selectedAreaText =
  document.getElementById("selectedAreaText");

const characterCount =
  document.getElementById("characterCount");

const submitButton =
  document.getElementById("submitButton");

const submitButtonText =
  document.getElementById("submitButtonText");

const formStatus =
  document.getElementById("formStatus");

let selectedImageFile = null;


function validateForm() {

  let isValid = true;

  clearErrors();


  // Validate title
  if (issueTitle.value.trim() === "") {

    showError(
      issueTitle,
      "titleError",
      "Please enter an issue title."
    );

    isValid = false;
  }


  // Validate category
  if (category.value === "") {

    showError(
      category,
      "categoryError",
      "Please select an issue category."
    );

    isValid = false;
  }


  // Validate location
  if (locationInput.value.trim() === "") {

    showError(
      locationInput,
      "locationError",
      "Please enter the issue location."
    );

    isValid = false;
  }


  // Validate description
  if (
    description.value.trim().length <
    MIN_DESCRIPTION_LENGTH
  ) {

    showError(
      description,
      "descriptionError",
      "Please provide a little more information."
    );

    isValid = false;
  }


  // Validate image
  if (selectedImageFile) {

    if (!validateImage(selectedImageFile)) {
      isValid = false;
    }

  }


  return isValid;
}


function showError(field, errorId, message) {

  field.classList.add("error");
  field.setAttribute("aria-invalid", "true");

  document.getElementById(errorId).textContent =
    message;
}


function clearErrors() {

  const fields = [
    issueTitle,
    category,
    locationInput,
    description
  ];

  fields.forEach(function (field) {

    field.classList.remove("error");
    field.removeAttribute("aria-invalid");

  });


  document.getElementById("titleError").textContent = "";
  document.getElementById("categoryError").textContent = "";
  document.getElementById("locationError").textContent = "";
  document.getElementById("descriptionError").textContent = "";
  document.getElementById("imageError").textContent = "";
}

function validateImage(file) {

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];


  if (!allowedTypes.includes(file.type)) {

    document.getElementById("imageError").textContent =
      "Please choose a JPG, JPEG, PNG, or WEBP image.";

    return false;
  }


  if (file.size > MAX_IMAGE_SIZE) {

    document.getElementById("imageError").textContent =
      "Image must be smaller than 5 MB.";

    return false;
  }


  return true;
}

function previewImage() {

  const file = imageInput.files[0];


  // Remove previous preview
  removeImagePreview();


  if (!file) {
    return;
  }


  selectedImageFile = file;


  // Validate image
  if (!validateImage(file)) {

    imageInput.value = "";
    selectedImageFile = null;

    return;
  }


  const reader = new FileReader();


  reader.onload = function (event) {

    imagePreview.src =
      event.target.result;

    imageFileName.textContent =
      file.name;

    imagePreviewContainer.classList.remove(
      "hidden"
    );

  };


  reader.readAsDataURL(file);
}

function removeImage() {

  imageInput.value = "";

  removeImagePreview();
}


function removeImagePreview() {

  selectedImageFile = null;

  imagePreview.src = "";

  imageFileName.textContent = "";

  imagePreviewContainer.classList.add(
    "hidden"
  );

  document.getElementById(
    "imageError"
  ).textContent = "";
}

function generateIssueId() {

  const year =
    new Date().getFullYear();

  const randomNumber =
    Math.floor(
      100 + Math.random() * 900
    );


  return `FM-${year}-${randomNumber}`;
}

function setSubmitting(isSubmitting) {

  submitButton.disabled =
    isSubmitting;


  if (isSubmitting) {

    submitButtonText.textContent =
      "Submitting...";

  } else {

    submitButtonText.textContent =
      "Submit Report";

  }
}


function showFormStatus(message, type) {

  formStatus.classList.remove("hidden");


  if (type === "error") {

    formStatus.className =
      "mt-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-200";

  } else {

    formStatus.className =
      "mt-6 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-green-200";

  }


  formStatus.textContent =
    message;
}

function hideFormStatus() {

  formStatus.classList.add("hidden");

  formStatus.textContent = "";
}


function readLocationParameters() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const city =
    params.get("city");

  const area =
    params.get("area");


  if (!city && !area) {
    return;
  }


  const cleanCity =
    city ? city.trim() : "";

  const cleanArea =
    area ? area.trim() : "";


  let selectedLocation = "";


  if (cleanArea && cleanCity) {

    selectedLocation =
      `${cleanArea}, ${cleanCity}`;

  } else {

    selectedLocation =
      cleanArea || cleanCity;

  }


  if (selectedLocation) {

    locationInput.value =
      selectedLocation;

    selectedAreaText.textContent =
      selectedLocation;

    selectedAreaBanner.classList.remove(
      "hidden"
    );

  }
}

function createFormData(issueId) {

  const formData =
    new FormData();


  formData.append(
    "issueId",
    issueId
  );

  formData.append(
    "title",
    issueTitle.value.trim()
  );

  formData.append(
    "category",
    category.value
  );

  formData.append(
    "location",
    locationInput.value.trim()
  );

  formData.append(
    "description",
    description.value.trim()
  );


  if (selectedImageFile) {

    formData.append(
      "image",
      selectedImageFile
    );

  }


  return formData;
}


async function submitReport() {

  hideFormStatus();


  // Validate before submitting
  if (!validateForm()) {

    const firstError =
      document.querySelector(".error");


    if (firstError) {
      firstError.focus();
    }


    return;
  }


  // Generate demo reference ID
  const issueId =
    generateIssueId();


  // Create form data
  const formData =
    createFormData(issueId);


  setSubmitting(true);


  try {

    /*
     * Send report to backend.
     *
     * The backend should:
     * 1. Save report information to JSON.
     * 2. Save uploaded image to:
     *    assets/images/uploads/
     */

    const response =
      await fetch(
        API_ENDPOINT,
        {
          method: "POST",
          body: formData
        }
      );


    let result = {};


    const contentType =
      response.headers.get(
        "content-type"
      ) || "";


    if (
      contentType.includes(
        "application/json"
      )
    ) {

      result =
        await response.json();

    }


    if (
      !response.ok ||
      result.success === false
    ) {

      throw new Error(
        result.message ||
        "Report submission failed."
      );

    }


    // Use backend ID if available
    const finalIssueId =
      result.referenceId ||
      result.issueId ||
      issueId;


    showSuccessMessage(
      finalIssueId
    );


  } catch (error) {

    console.error(
      "Report submission error:",
      error
    );


    showFormStatus(
      "The report could not be submitted. Please make sure the backend API is running.",
      "error"
    );


  } finally {

    setSubmitting(false);

  }
}


function showSuccessMessage(issueId) {

  referenceId.textContent =
    issueId;


  submittedTitle.textContent =
    issueTitle.value.trim();


  submittedCategory.textContent =
    category.value;


  submittedLocation.textContent =
    locationInput.value.trim();


  reportForm.classList.add(
    "hidden"
  );


  successCard.classList.remove(
    "hidden"
  );


  successCard.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


function reportAnotherIssue() {

  reportForm.reset();

  clearErrors();

  removeImagePreview();

  hideFormStatus();


  successCard.classList.add(
    "hidden"
  );


  reportForm.classList.remove(
    "hidden"
  );


  // Restore location from URL
  readLocationParameters();


  updateCharacterCount();


  issueTitle.focus();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function updateCharacterCount() {

  const count =
    description.value.length;


  characterCount.textContent =
    `${count} character${count === 1 ? "" : "s"}`;
}


function setupLiveValidation() {

  issueTitle.addEventListener(
    "input",
    function () {

      if (
        issueTitle.value.trim() !== ""
      ) {

        issueTitle.classList.remove(
          "error"
        );

        document.getElementById(
          "titleError"
        ).textContent = "";

      }

    }
  );


  category.addEventListener(
    "change",
    function () {

      if (category.value !== "") {

        category.classList.remove(
          "error"
        );

        document.getElementById(
          "categoryError"
        ).textContent = "";

      }

    }
  );


  locationInput.addEventListener(
    "input",
    function () {

      if (
        locationInput.value.trim() !== ""
      ) {

        locationInput.classList.remove(
          "error"
        );

        document.getElementById(
          "locationError"
        ).textContent = "";

      }

    }
  );


  description.addEventListener(
    "input",
    function () {

      updateCharacterCount();


      if (
        description.value.trim().length >=
        MIN_DESCRIPTION_LENGTH
      ) {

        description.classList.remove(
          "error"
        );

        document.getElementById(
          "descriptionError"
        ).textContent = "";

      }

    }
  );
}


// ============================================
// MOBILE MENU
// ============================================

function setupMobileMenu() {

  const button =
    document.getElementById(
      "mobileMenuButton"
    );

  const menu =
    document.getElementById(
      "mobileMenu"
    );


  button.addEventListener(
    "click",
    function () {

      const isOpen =
        button.getAttribute(
          "aria-expanded"
        ) === "true";


      button.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );


      menu.classList.toggle(
        "hidden",
        isOpen
      );

    }
  );
}


// ============================================
// EVENT LISTENERS
// ============================================

reportForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();

    submitReport();

  }
);


imageInput.addEventListener(
  "change",
  previewImage
);


removeImageButton.addEventListener(
  "click",
  removeImage
);


reportAnotherButton.addEventListener(
  "click",
  reportAnotherIssue
);


// ============================================
// INITIALIZE PAGE
// ============================================

setupLiveValidation();

setupMobileMenu();

readLocationParameters();

updateCharacterCount();