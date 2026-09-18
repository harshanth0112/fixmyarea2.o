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
        description: "A large pothole is causing problems for commuters and two-wheelers.",
        image: "https://images.unsplash.com/photo-1545156521-77bd85671d30?auto=format&fit=crop&w=1000&q=80"
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
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80"
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
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80"
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
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1000&q=80"
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
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80"
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
        image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1000&q=80"
    }
];

const params =
    new URLSearchParams(window.location.search);

const id =
    params.get("id");

const issue =
    issues.find(item =>
        item.id.toLowerCase() ===
        (id || "").toLowerCase()
    );

const container =
    document.getElementById("detailsContainer");

const notFound =
    document.getElementById("notFound");

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

function createTimeline(status) {

    const statuses = [
        "Reported",
        "Under Review",
        "In Progress",
        "Resolved"
    ];

    const current =
        statuses.indexOf(status);

    return statuses.map((item, index) => {

        let icon = "○";
        let color = "text-slate-500";

        if (index < current) {
            icon = "✓";
            color = "text-green-400";
        }

        if (index === current) {
            icon = "●";
            color = "text-teal-400";
        }

        return `
            <div class="flex items-start">

                <div class="mr-4">

                    <div class="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center ${color}">
                        ${icon}
                    </div>

                </div>

                <div>
                    <p class="font-bold ${color}">
                        ${item}
                    </p>

                    ${
                        index === current
                        ? `<p class="text-sm text-slate-400">Current status</p>`
                        : ""
                    }
                </div>

            </div>

            ${
                index < statuses.length - 1
                ? `<div class="ml-4 h-8 border-l border-slate-600"></div>`
                : ""
            }
        `;

    }).join("");
}

function showDetails() {

    container.innerHTML = `

        <div class="mb-8">

            <div class="flex gap-3 mb-4">

                <span class="text-teal-400">
                    ${issue.category}
                </span>

                <span class="px-3 py-1 rounded-full text-sm ${statusStyle(issue.status)}">
                    ${issue.status}
                </span>

            </div>

            <h1 class="text-4xl font-bold">
                ${issue.title}
            </h1>

        </div>


        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <img
                src="${issue.image}"
                alt="${issue.title}"
                class="w-full h-96 object-cover rounded-xl"
            >

            <div class="bg-slate-800 rounded-xl p-7">

                <h2 class="text-2xl font-bold mb-6">
                    Issue Information
                </h2>

                <div class="space-y-5">

                    <div>
                        <p class="text-slate-400 text-sm">
                            Issue ID
                        </p>

                        <p class="font-bold">
                            ${issue.id}
                        </p>
                    </div>

                    <div>
                        <p class="text-slate-400 text-sm">
                            Category
                        </p>

                        <p class="font-bold">
                            ${issue.category}
                        </p>
                    </div>

                    <div>
                        <p class="text-slate-400 text-sm">
                            Location
                        </p>

                        <p class="font-bold">
                            ${issue.location}
                        </p>
                    </div>

                    <div>
                        <p class="text-slate-400 text-sm">
                            Date Reported
                        </p>

                        <p class="font-bold">
                            ${issue.date}
                        </p>
                    </div>

                    <div>
                        <p class="text-slate-400 text-sm">
                            Status
                        </p>

                        <p class="font-bold">
                            ${issue.status}
                        </p>
                    </div>

                </div>

            </div>

        </div>


        <section class="bg-slate-800 rounded-xl p-7 mt-8">

            <h2 class="text-2xl font-bold mb-4">
                Description
            </h2>

            <p class="text-slate-300 leading-7">
                ${issue.description}
            </p>

        </section>


        <section class="bg-slate-800 rounded-xl p-7 mt-8">

            <h2 class="text-2xl font-bold mb-8">
                Status History
            </h2>

            <div>
                ${createTimeline(issue.status)}
            </div>

        </section>
    `;
}

if (issue) {
    showDetails();
} else {
    notFound.classList.remove("hidden");
}


