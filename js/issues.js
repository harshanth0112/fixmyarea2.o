const issues = [
    {
        id: "FM001",
        title: "Large Pothole Near Main Road",
        category: "Road Damage",
        location: "Srirangam, Trichy",
        city: "Trichy",
        area: "Srirangam",
        status: "In Progress",
        date: "2026-09-15",
        description: "A large pothole is causing problems for commuters.",
        image: "https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "FM002",
        title: "Garbage Overflow Near Bus Stop",
        category: "Garbage and Waste",
        location: "Anna Nagar, Chennai",
        city: "Chennai",
        area: "Anna Nagar",
        status: "Reported",
        date: "2026-09-14",
        description: "Garbage has been overflowing near the bus stop.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "FM003",
        title: "Broken Streetlight",
        category: "Broken Streetlight",
        location: "RS Puram, Coimbatore",
        city: "Coimbatore",
        area: "RS Puram",
        status: "Under Review",
        date: "2026-09-13",
        description: "The streetlight is not working at night.",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "FM004",
        title: "Water Leakage on Street",
        category: "Water Leakage",
        location: "KK Nagar, Madurai",
        city: "Madurai",
        area: "KK Nagar",
        status: "In Progress",
        date: "2026-09-12",
        description: "A water pipe is continuously leaking onto the road.",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "FM005",
        title: "Blocked Drainage",
        category: "Drainage Problem",
        location: "Velachery, Chennai",
        city: "Chennai",
        area: "Velachery",
        status: "Resolved",
        date: "2026-09-10",
        description: "The drainage channel is blocked.",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "FM006",
        title: "Traffic Signal Problem",
        category: "Traffic Issue",
        location: "Central Area, Trichy",
        city: "Trichy",
        area: "Central Area",
        status: "Reported",
        date: "2026-09-09",
        description: "The traffic signal is not functioning correctly.",
        image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=800&q=80"
    }
];

const container = document.getElementById("issuesContainer");
const emptyState = document.getElementById("emptyState");
const issueCount = document.getElementById("issueCount");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const locationFilter = document.getElementById("locationFilter");
const clearButton = document.getElementById("clearButton");
const pageTitle = document.getElementById("pageTitle");

function statusStyle(status) {

    if (status === "Resolved") {
        return "bg-green-500/20 text-green-400";
    }

    if (status === "In Progress") {
        return "bg-yellow-500/20 text-yellow-400";
    }

    if (status === "Under Review") {
        return "bg-blue-500/20 text-blue-400";
    }

    return "bg-red-500/20 text-red-400";
}

function displayIssues(data) {

    container.innerHTML = "";

    issueCount.textContent =
        `${data.length} issue${data.length !== 1 ? "s" : ""} found`;

    if (data.length === 0) {

        emptyState.classList.remove("hidden");

        return;
    }

    emptyState.classList.add("hidden");

    data.forEach(issue => {

        const card = document.createElement("div");

        card.className =
            "bg-slate-800 border border-slate-700 rounded-xl overflow-hidden";

        card.innerHTML = `
            <img
                src="${issue.image}"
                alt="${issue.title}"
                class="w-full h-52 object-cover"
            >

            <div class="p-5">

                <div class="flex justify-between gap-2 mb-3">

                    <span class="text-teal-400 text-sm">
                        ${issue.category}
                    </span>

                    <span
                        class="px-3 py-1 rounded-full text-xs ${statusStyle(issue.status)}">
                        ${issue.status}
                    </span>

                </div>

                <h2 class="text-xl font-bold mb-3">
                    ${issue.title}
                </h2>

                <p class="text-slate-400 mb-2">
                    📍 ${issue.location}
                </p>

                <p class="text-slate-400 text-sm mb-5">
                    ${issue.description}
                </p>

                <p class="text-slate-500 text-sm mb-5">
                    ${issue.date}
                </p>

                <a
                    href="details.html?id=${issue.id}"
                    class="block text-center bg-teal-500 hover:bg-teal-600 py-3 rounded-lg"
                >
                    View Details
                </a>

            </div>
        `;

        container.appendChild(card);
    });
}

function filterIssues() {

    const search =
        searchInput.value.toLowerCase().trim();

    const category =
        categoryFilter.value;

    const status =
        statusFilter.value;

    const location =
        locationFilter.value;

    const result = issues.filter(issue => {

        const searchMatch =
            issue.title.toLowerCase().includes(search) ||
            issue.description.toLowerCase().includes(search) ||
            issue.category.toLowerCase().includes(search) ||
            issue.location.toLowerCase().includes(search);

        const categoryMatch =
            category === "" ||
            issue.category === category;

        const statusMatch =
            status === "" ||
            issue.status === status;

        const locationMatch =
            location === "" ||
            issue.city === location;

        return (
            searchMatch &&
            categoryMatch &&
            statusMatch &&
            locationMatch
        );
    });

    displayIssues(result);
}

function loadLocationFilter() {

    const params =
        new URLSearchParams(window.location.search);

    const city = params.get("city");
    const area = params.get("area");

    if (city && area) {

        pageTitle.textContent =
            `Issues in ${area}, ${city}`;

        const result = issues.filter(issue =>
            issue.city.toLowerCase() === city.toLowerCase() &&
            issue.area.toLowerCase() === area.toLowerCase()
        );

        displayIssues(result);

    } else {

        displayIssues(issues);

    }
}

function clearFilters() {

    searchInput.value = "";
    categoryFilter.value = "";
    statusFilter.value = "";
    locationFilter.value = "";

    pageTitle.textContent = "Community Issues";

    displayIssues(issues);
}

searchInput.addEventListener("input", filterIssues);
categoryFilter.addEventListener("change", filterIssues);
statusFilter.addEventListener("change", filterIssues);
locationFilter.addEventListener("change", filterIssues);
clearButton.addEventListener("click", clearFilters);

loadLocationFilter();
