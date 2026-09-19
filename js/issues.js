const FALLBACK_ISSUES = [
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
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80"
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
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80"
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
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80"
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
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80"
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
        image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=900&q=80"
    }
];

const STORAGE_KEY = "fixmyarea_reports";
let issues = [];

const container = document.getElementById("issuesContainer");
const emptyState = document.getElementById("emptyState");
const issueCount = document.getElementById("issueCount");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const locationFilter = document.getElementById("locationFilter");
const clearButton = document.getElementById("clearButton");
const pageTitle = document.getElementById("pageTitle");

function normaliseIssue(issue) {
    if (!issue || typeof issue !== "object") {
        return null;
    }

    return {
        id: issue.id || `FM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: issue.title || "Untitled Issue",
        category: issue.category || "Other",
        location: issue.location || `${issue.area || "Unknown Area"}, ${issue.city || "Unknown City"}`,
        city: issue.city || "Unknown City",
        area: issue.area || "Unknown Area",
        status: issue.status || "Reported",
        date: issue.date || new Date().toISOString().slice(0, 10),
        description: issue.description || "No description provided.",
        image: issue.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
    };
}

function getSavedIssues() {
    try {
        const storedValue = localStorage.getItem(STORAGE_KEY);
        if (!storedValue) {
            return [];
        }

        const parsed = JSON.parse(storedValue);
        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.map(normaliseIssue).filter(Boolean);
    } catch (error) {
        console.warn("Unable to read saved reports from localStorage:", error);
        return [];
    }
}

async function loadIssues() {
    const savedIssues = getSavedIssues();
    if (savedIssues.length > 0) {
        issues = savedIssues;
        return;
    }

    try {
        const response = await fetch("../data/reports.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Reports file not found");
        }

        const json = await response.json();
        const reportList = Array.isArray(json) ? json : [];
        issues = reportList.map(normaliseIssue).filter(Boolean);

        if (issues.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
        }
    } catch (error) {
        console.warn("Falling back to demo issues:", error);
        issues = FALLBACK_ISSUES.map(normaliseIssue).filter(Boolean);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
    }
}

function statusStyle(status) {
    if (status === "Resolved") {
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
    }

    if (status === "In Progress") {
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
    }

    if (status === "Under Review") {
        return "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300";
    }

    return "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300";
}

function displayIssues(data) {
    container.innerHTML = "";

    issueCount.textContent = `${data.length} issue${data.length !== 1 ? "s" : ""} found`;

    if (data.length === 0) {
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");

    data.forEach((issue) => {
        const card = document.createElement("article");
        card.className = "issue-card group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800";

        const imageUrl = issue.image || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80";

        card.innerHTML = `
            <div class="issue-image-wrap overflow-hidden border-b border-slate-200 dark:border-slate-700">
                <img
                    src="${imageUrl}"
                    alt="${issue.title}"
                    class="issue-image h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80';"
                >
            </div>

            <div class="flex flex-1 flex-col p-5">
                <div class="mb-3 flex items-center justify-between gap-2">
                    <span class="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
                        ${issue.category}
                    </span>

                    <span class="rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle(issue.status)}">
                        ${issue.status}
                    </span>
                </div>

                <h2 class="mb-3 text-xl font-bold leading-snug text-slate-900 dark:text-white">
                    ${issue.title}
                </h2>

                <p class="mb-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <i class="fa-solid fa-location-dot text-teal-500"></i>
                    <span>${issue.location}</span>
                </p>

                <p class="mb-5 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    ${issue.description}
                </p>

                <div class="mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    <span>${issue.date}</span>
                    <span class="inline-flex items-center gap-1">
                        <i class="fa-solid fa-thumbs-up"></i>
                        12
                    </span>
                </div>

                <a
                    href="details.html?id=${issue.id}"
                    class="mt-5 inline-flex items-center justify-center rounded-xl bg-teal-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                    View Details
                </a>
            </div>
        `;

        container.appendChild(card);
    });
}

function filterIssues() {
    if (!searchInput || !categoryFilter || !statusFilter || !locationFilter) {
        return;
    }

    const search = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const status = statusFilter.value;
    const location = locationFilter.value;

    const result = issues.filter(issue => {
        const searchMatch =
            issue.title.toLowerCase().includes(search) ||
            issue.description.toLowerCase().includes(search) ||
            issue.category.toLowerCase().includes(search) ||
            issue.location.toLowerCase().includes(search);

        const categoryMatch = category === "" || issue.category === category;
        const statusMatch = status === "" || issue.status === status;
        const locationMatch = location === "" || issue.city === location;

        return searchMatch && categoryMatch && statusMatch && locationMatch;
    });

    displayIssues(result);
}

function loadLocationFilter() {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");
    const area = params.get("area");

    if (pageTitle && city && area) {
        pageTitle.textContent = `Issues in ${area}, ${city}`;
    }

    const result = city && area
        ? issues.filter(issue =>
            issue.city.toLowerCase() === city.toLowerCase() &&
            issue.area.toLowerCase() === area.toLowerCase())
        : issues;

    displayIssues(result);
}

function clearFilters() {
    if (!searchInput || !categoryFilter || !statusFilter || !locationFilter) {
        return;
    }

    searchInput.value = "";
    categoryFilter.value = "";
    statusFilter.value = "";
    locationFilter.value = "";

    if (pageTitle) {
        pageTitle.textContent = "Browse Community Issues";
    }

    displayIssues(issues);
}

async function initIssuesPage() {
    await loadIssues();

    if (searchInput) {
        searchInput.addEventListener("input", filterIssues);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener("change", filterIssues);
    }
    if (statusFilter) {
        statusFilter.addEventListener("change", filterIssues);
    }
    if (locationFilter) {
        locationFilter.addEventListener("change", filterIssues);
    }
    if (clearButton) {
        clearButton.addEventListener("click", clearFilters);
    }

    if (pageTitle && window.location.search.includes("city=")) {
        loadLocationFilter();
    } else {
        displayIssues(issues);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIssuesPage);
} else {
    initIssuesPage();
}
