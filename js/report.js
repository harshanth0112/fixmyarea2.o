const MIN_DESCRIPTION_LENGTH = 10;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const REPORTS_STORAGE_KEY = "fixmyarea_reports";

const reportForm = document.getElementById("reportForm");
const issueTitle = document.getElementById("issueTitle");
const category = document.getElementById("category");
const citySelect = document.getElementById("city");
const areaSelect = document.getElementById("area");
const locationInput = document.getElementById("location");
const description = document.getElementById("description");
const imageInput = document.getElementById("image");
const imagePreviewContainer = document.getElementById("imagePreviewContainer");
const imagePreview = document.getElementById("imagePreview");
const imageFileName = document.getElementById("imageFileName");
const removeImageButton = document.getElementById("removeImageButton");
const successCard = document.getElementById("successCard");
const referenceId = document.getElementById("referenceId");
const submittedTitle = document.getElementById("submittedTitle");
const submittedCategory = document.getElementById("submittedCategory");
const submittedLocation = document.getElementById("submittedLocation");
const reportAnotherButton = document.getElementById("reportAnotherButton");
const selectedAreaBanner = document.getElementById("selectedAreaBanner");
const selectedAreaText = document.getElementById("selectedAreaText");
const characterCount = document.getElementById("characterCount");
const submitButton = document.getElementById("submitButton");
const submitButtonText = document.getElementById("submitButtonText");
const formStatus = document.getElementById("formStatus");

let selectedImageFile = null;

const cityAreas = {
  Chennai: ["Sholinganallur", "Tambaram", "Anna Nagar"],
  Trichy: ["Srirangam", "Cantonment", "Thillai Nagar"],
  Coimbatore: ["Gandhipuram", "RS Puram", "Peelamedu"],
  Madurai: ["KK Nagar", "Anna Nagar", "Mattuthavani"]
};

function getErrorElement(elementId) {
  const element = document.getElementById(elementId);
  return element || null;
}

function validateForm() {
  let isValid = true;

  clearErrors();

  if (!issueTitle || !category || !locationInput || !description) {
    return false;
  }

  if (issueTitle.value.trim() === "") {
    showError(issueTitle, "titleError", "Please enter an issue title.");
    isValid = false;
  }

  if (category.value === "") {
    showError(category, "categoryError", "Please select an issue category.");
    isValid = false;
  }

  if (locationInput.value.trim() === "") {
    showError(locationInput, "locationError", "Please select a city and area.");
    isValid = false;
  }

  if (description.value.trim().length < MIN_DESCRIPTION_LENGTH) {
    showError(description, "descriptionError", "Please provide a little more information.");
    isValid = false;
  }

  if (selectedImageFile && !validateImage(selectedImageFile)) {
    isValid = false;
  }

  return isValid;
}

function showError(field, errorId, message) {
  if (!field) return;

  field.classList.add("error");
  field.setAttribute("aria-invalid", "true");

  const errorElement = getErrorElement(errorId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearErrors() {
  const fields = [issueTitle, category, locationInput, description];

  fields.forEach(function (field) {
    if (!field) return;
    field.classList.remove("error");
    field.removeAttribute("aria-invalid");
  });

  [
    "titleError",
    "categoryError",
    "locationError",
    "cityError",
    "areaError",
    "descriptionError",
    "imageError"
  ].forEach(function (id) {
    const element = getErrorElement(id);
    if (element) {
      element.textContent = "";
    }
  });
}

function validateImage(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const imageError = getErrorElement("imageError");

  if (!file) {
    if (imageError) imageError.textContent = "Please choose an image.";
    return false;
  }

  if (!allowedTypes.includes(file.type)) {
    if (imageError) imageError.textContent = "Please choose a JPG, JPEG, PNG, or WEBP image.";
    return false;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    if (imageError) imageError.textContent = "Image must be smaller than 5 MB.";
    return false;
  }

  return true;
}

function previewImage() {
  if (!imageInput || !imagePreview || !imagePreviewContainer || !imageFileName) {
    return;
  }

  removeImagePreview();

  const file = imageInput.files && imageInput.files[0];
  if (!file) return;

  selectedImageFile = file;

  if (!validateImage(file)) {
    imageInput.value = "";
    selectedImageFile = null;
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    imagePreview.src = event.target.result;
    imageFileName.textContent = file.name;
    imagePreviewContainer.classList.remove("hidden");
  };

  reader.readAsDataURL(file);
}

function removeImage() {
  if (!imageInput) return;
  imageInput.value = "";
  removeImagePreview();
}

function removeImagePreview() {
  selectedImageFile = null;

  if (imagePreview) {
    imagePreview.src = "";
  }

  if (imageFileName) {
    imageFileName.textContent = "";
  }

  if (imagePreviewContainer) {
    imagePreviewContainer.classList.add("hidden");
  }

  const imageError = getErrorElement("imageError");
  if (imageError) {
    imageError.textContent = "";
  }
}

function generateIssueId() {
  const year = new Date().getFullYear();
  const randomNumber = Math.floor(100 + Math.random() * 900);
  return `FM-${year}-${randomNumber}`;
}

function setSubmitting(isSubmitting) {
  if (!submitButton || !submitButtonText) return;

  submitButton.disabled = isSubmitting;
  submitButtonText.textContent = isSubmitting ? "Submitting..." : "Submit Report";
}

function showFormStatus(message, type) {
  if (!formStatus) return;

  formStatus.classList.remove("hidden");

  if (type === "error") {
    formStatus.className = "mt-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-200";
  } else {
    formStatus.className = "mt-6 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-green-200";
  }

  formStatus.textContent = message;
}

function hideFormStatus() {
  if (!formStatus) return;
  formStatus.classList.add("hidden");
  formStatus.textContent = "";
}

function updateAreaOptions() {
  if (!citySelect || !areaSelect) return;

  const selectedCityValue = citySelect.value;
  areaSelect.innerHTML = '<option value="">Select Area</option>';

  if (!selectedCityValue) {
    areaSelect.disabled = true;
    locationInput.value = "";
    return;
  }

  const areas = cityAreas[selectedCityValue] || [];
  areas.forEach(function (area) {
    const option = document.createElement("option");
    option.value = area;
    option.textContent = area;
    areaSelect.appendChild(option);
  });

  areaSelect.disabled = false;

  if (areaSelect.value) {
    updateLocationSelection();
  } else {
    locationInput.value = "";
  }
}

function updateLocationSelection() {
  if (!citySelect || !areaSelect || !locationInput) return;

  const city = citySelect.value;
  const area = areaSelect.value;

  if (city && area) {
    const selectedLocation = `${area}, ${city}`;
    locationInput.value = selectedLocation;
    if (selectedAreaText && selectedAreaBanner) {
      selectedAreaText.textContent = selectedLocation;
      selectedAreaBanner.classList.remove("hidden");
    }
    return;
  }

  if (selectedAreaText && selectedAreaBanner) {
    selectedAreaBanner.classList.add("hidden");
  }

  locationInput.value = "";
}

function readLocationParameters() {
  if (!locationInput || !selectedAreaText || !selectedAreaBanner) return;

  const params = new URLSearchParams(window.location.search);
  const city = params.get("city");
  const area = params.get("area");

  if (!city && !area) {
    return;
  }

  const cleanCity = city ? city.trim() : "";
  const cleanArea = area ? area.trim() : "";

  if (cleanCity && citySelect) {
    citySelect.value = cleanCity;
    updateAreaOptions();
  }

  if (cleanArea && areaSelect) {
    areaSelect.value = cleanArea;
  }

  updateLocationSelection();
}

function getLoggedInReporter() {
  try {
    const userId = localStorage.getItem('fixmyarea_loggedin_user_id') || '';
    const userName = localStorage.getItem('fixmyarea_loggedin_user_name') || 'Anonymous reporter';
    return { userId, userName };
  } catch (error) {
    return { userId: '', userName: 'Anonymous reporter' };
  }
}

function createFormData(issueId) {
  const formData = new FormData();

  formData.append("issueId", issueId);
  formData.append("title", issueTitle ? issueTitle.value.trim() : "");
  formData.append("category", category ? category.value : "");
  formData.append("location", locationInput ? locationInput.value.trim() : "");
  formData.append("description", description ? description.value.trim() : "");

  if (selectedImageFile) {
    formData.append("image", selectedImageFile);
  }

  return formData;
}

function getStoredReports() {
  try {
    const rawReports = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (!rawReports) {
      return [];
    }

    const parsedReports = JSON.parse(rawReports);
    return Array.isArray(parsedReports) ? parsedReports : [];
  } catch (error) {
    console.warn("Unable to read local reports storage:", error);
    return [];
  }
}

async function saveReportEntry(reportEntry) {
  const storedReports = getStoredReports();
  storedReports.push(reportEntry);
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(storedReports));

  if (window.showOpenFilePicker) {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        multiple: false,
        types: [{
          description: "JSON Files",
          accept: { "application/json": [".json"] }
        }]
      });

      const file = await fileHandle.getFile();
      const fileText = await file.text();
      const parsedFileData = fileText ? JSON.parse(fileText) : [];
      const existingReports = Array.isArray(parsedFileData) ? parsedFileData : [];
      existingReports.push(reportEntry);

      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(existingReports, null, 2));
      await writable.close();
    } catch (error) {
      console.info("Using in-browser storage fallback for local report persistence.", error);
    }
  }
}

async function submitReport() {
  hideFormStatus();

  if (!validateForm()) {
    const firstError = document.querySelector(".error");
    if (firstError) {
      firstError.focus();
    }
    return;
  }

  const issueId = generateIssueId();
  const formData = createFormData(issueId);

  setSubmitting(true);

  try {
    const reporter = getLoggedInReporter();
    const reportEntry = {
      id: issueId,
      title: issueTitle ? issueTitle.value.trim() : "",
      category: category ? category.value : "",
      city: citySelect ? citySelect.value : "",
      area: areaSelect ? areaSelect.value : "",
      location: locationInput ? locationInput.value.trim() : "",
      description: description ? description.value.trim() : "",
      status: "Reported",
      date: new Date().toISOString().slice(0, 10),
      image: selectedImageFile ? URL.createObjectURL(selectedImageFile) : "",
      createdAt: new Date().toISOString(),
      reportedByUserId: reporter.userId,
      reportedByName: reporter.userName
    };

    await saveReportEntry(reportEntry);
    showSuccessMessage(issueId);
  } catch (error) {
    console.error("Report submission error:", error);
    showFormStatus("The report could not be processed in this browser demo. Please try again.", "error");
  } finally {
    setSubmitting(false);
  }
}

function showSuccessMessage(issueId) {
  if (referenceId) referenceId.textContent = issueId;
  if (submittedTitle) submittedTitle.textContent = issueTitle ? issueTitle.value.trim() : "";
  if (submittedCategory) submittedCategory.textContent = category ? category.value : "";
  if (submittedLocation) submittedLocation.textContent = locationInput ? locationInput.value.trim() : "";

  if (reportForm) {
    reportForm.classList.add("hidden");
  }

  if (successCard) {
    successCard.classList.remove("hidden");
    successCard.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function reportAnotherIssue() {
  if (reportForm) {
    reportForm.reset();
  }

  clearErrors();
  removeImagePreview();
  hideFormStatus();

  if (successCard) {
    successCard.classList.add("hidden");
  }

  if (reportForm) {
    reportForm.classList.remove("hidden");
  }

  readLocationParameters();
  updateCharacterCount();

  if (issueTitle) {
    issueTitle.focus();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateCharacterCount() {
  if (!description || !characterCount) return;

  const count = description.value.length;
  characterCount.textContent = `${count} character${count === 1 ? "" : "s"}`;
}

function setupLiveValidation() {
  if (!issueTitle) return;

  issueTitle.addEventListener("input", function () {
    if (issueTitle.value.trim() !== "") {
      issueTitle.classList.remove("error");
      const titleError = getErrorElement("titleError");
      if (titleError) titleError.textContent = "";
    }
  });

  if (category) {
    category.addEventListener("change", function () {
      if (category.value !== "") {
        category.classList.remove("error");
        const categoryError = getErrorElement("categoryError");
        if (categoryError) categoryError.textContent = "";
      }
    });
  }

  if (citySelect) {
    citySelect.addEventListener("change", function () {
      updateAreaOptions();
      if (citySelect.value !== "") {
        citySelect.classList.remove("error");
        const cityError = getErrorElement("cityError");
        if (cityError) cityError.textContent = "";
      }
    });
  }

  if (areaSelect) {
    areaSelect.addEventListener("change", function () {
      updateLocationSelection();
      if (areaSelect.value !== "") {
        areaSelect.classList.remove("error");
        const areaError = getErrorElement("areaError");
        if (areaError) areaError.textContent = "";
      }
    });
  }

  if (description) {
    description.addEventListener("input", function () {
      updateCharacterCount();

      if (description.value.trim().length >= MIN_DESCRIPTION_LENGTH) {
        description.classList.remove("error");
        const descriptionError = getErrorElement("descriptionError");
        if (descriptionError) descriptionError.textContent = "";
      }
    });
  }
}

function setupMobileMenu() {
  const button = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!button || !menu) return;

  button.addEventListener("click", function () {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("hidden", isOpen);
  });
}

if (reportForm) {
  reportForm.addEventListener("submit", function (event) {
    event.preventDefault();
    submitReport();
  });
}

if (imageInput) {
  imageInput.addEventListener("change", previewImage);
}

if (removeImageButton) {
  removeImageButton.addEventListener("click", removeImage);
}

if (reportAnotherButton) {
  reportAnotherButton.addEventListener("click", reportAnotherIssue);
}

setupLiveValidation();
setupMobileMenu();
if (citySelect) {
  citySelect.addEventListener("change", updateAreaOptions);
}
if (areaSelect) {
  areaSelect.addEventListener("change", updateLocationSelection);
}
readLocationParameters();
updateCharacterCount();