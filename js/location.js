const locationForm = document.getElementById("locationForm");

const citySelect = document.getElementById("city");
const areaSelect = document.getElementById("area");

const locationError = document.getElementById("locationError");

const locationPreview = document.getElementById("locationPreview");
const selectedArea = document.getElementById("selectedArea");
const selectedCity = document.getElementById("selectedCity");


// Demo areas for each city
const cityAreas = {

    Chennai: [
        "Sholinganallur",
        "Tambaram",
        "Anna Nagar"
    ],

    Trichy: [
        "Srirangam",
        "Cantonment",
        "Thillai Nagar"
    ],

    Coimbatore: [
        "Gandhipuram",
        "RS Puram",
        "Peelamedu"
    ],

    Madurai: [
        "KK Nagar",
        "Anna Nagar",
        "Mattuthavani"
    ]

};


// --------------------------------------------------
// Update areas when city changes
// --------------------------------------------------

function updateAreas() {

    const selectedCityValue = citySelect.value;

    // Clear previous areas
    areaSelect.innerHTML =
        '<option value="">Select Area</option>';

    // Hide preview
    locationPreview.classList.add("hidden");

    // Hide error
    locationError.classList.add("hidden");


    if (selectedCityValue === "") {

        areaSelect.disabled = true;

        return;
    }


    const areas = cityAreas[selectedCityValue];


    areas.forEach((area) => {

        const option = document.createElement("option");

        option.value = area;
        option.textContent = area;

        areaSelect.appendChild(option);

    });


    areaSelect.disabled = false;
}


// --------------------------------------------------
// Update location preview
// --------------------------------------------------

function updateLocationPreview() {

    const city = citySelect.value;
    const area = areaSelect.value;


    if (city && area) {

        selectedArea.textContent = area;
        selectedCity.textContent = city;

        locationPreview.classList.remove("hidden");

        locationError.classList.add("hidden");

    } else {

        locationPreview.classList.add("hidden");

    }
}


// --------------------------------------------------
// Validate location
// --------------------------------------------------

function validateLocation() {

    const city = citySelect.value;
    const area = areaSelect.value;


    if (city === "" || area === "") {

        locationError.classList.remove("hidden");

        return false;
    }


    locationError.classList.add("hidden");

    return true;
}


// --------------------------------------------------
// Continue to Issues page
// --------------------------------------------------

function continueToIssues(event) {

    event.preventDefault();


    if (!validateLocation()) {
        return;
    }


    const city = citySelect.value;
    const area = areaSelect.value;


    // Encode values so spaces and special characters work correctly
    const url =
        `issues.html?city=${encodeURIComponent(city)}&area=${encodeURIComponent(area)}`;


    window.location.href = url;
}


// --------------------------------------------------
// Event listeners
// --------------------------------------------------

citySelect.addEventListener("change", updateAreas);

areaSelect.addEventListener("change", updateLocationPreview);

locationForm.addEventListener("submit", continueToIssues);


// Mobile menu
const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


mobileMenuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("hidden");

});