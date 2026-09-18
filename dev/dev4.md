# Developer 4 Task — FixMyArea Issues, Details & About

You are working as **Developer 4** on the FixMyArea group project.

Your responsibility is to build:

1. Browse Issues page
2. Issue Details page
3. About page

You will also handle the JavaScript required for browsing and displaying issue information.

---

# 1. Project Overview

FixMyArea is a simple frontend-only community platform where users can report and explore local problems such as:

* Potholes
* Garbage
* Broken streetlights
* Water leakage
* Drainage problems
* Traffic issues
* Public-space problems

The goal is to provide a simple interface for people to discover local problems and understand their current status.

---

# 2. Technology Rules

Use ONLY:

* HTML5
* Tailwind CSS through CDN
* Vanilla JavaScript
* Optional custom CSS

Do NOT use:

* React
* Vue
* Angular
* Bootstrap
* jQuery
* Backend
* Database
* API
* localStorage
* sessionStorage
* Cookies
* Authentication libraries

Keep everything simple and beginner-friendly.

---

# 3. Your Files

You are responsible for:

```text
issues.html
details.html
about.html

js/issues.js
js/details.js
```

Do NOT modify other developers' files unless you coordinate with them.

Avoid major changes to:

```text
css/style.css
```

without informing the team.

---

# 4. Design Theme — Civic Slate

Follow the exact common design system.

### Colours

```text
Background:       #0F172A
Secondary:        #1E293B
Card:             #334155
Primary:          #14B8A6
Primary Hover:    #0D9488
Main Text:        #F8FAFC
Secondary Text:   #CBD5E1
Border:           #475569
Success:          #22C55E
Warning:          #F59E0B
Error:            #EF4444
```

Use:

* Dark navy background
* Slate cards
* Teal primary actions
* Rounded corners
* Subtle shadows
* Clean typography
* Consistent spacing
* Simple animations
* Responsive design

Reuse the same navbar and footer design created by Developer 1.

---

# 5. Shared Issue Data

Use one simple static JavaScript array.

Example:

```javascript
const issues = [
    {
        id: "FM001",
        title: "Large pothole near the main road",
        category: "Road Damage",
        location: "Srirangam, Trichy",
        city: "Trichy",
        area: "Srirangam",
        description: "A large pothole is causing difficulties for commuters.",
        image: "assets/images/pothole.jpg",
        status: "In Progress",
        date: "2026-09-18",
        upvotes: 12
    },
    {
        id: "FM002",
        title: "Garbage accumulation near bus stop",
        category: "Garbage and Waste",
        location: "Sholinganallur, Chennai",
        city: "Chennai",
        area: "Sholinganallur",
        description: "Garbage has accumulated near the public bus stop.",
        image: "assets/images/garbage.jpg",
        status: "Reported",
        date: "2026-09-16",
        upvotes: 8
    }
];
```

Create approximately **6–8 sample issues** covering different categories and locations.

Keep the data structure consistent.

Required properties:

```text
id
title
category
location
city
area
description
image
status
date
upvotes
```

Do not rename these properties.

---

# 6. Browse Issues — `issues.html`

This is the main issue-exploration page.

## Page structure

```text
┌─────────────────────────────────────────────┐
│                  NAVBAR                     │
├─────────────────────────────────────────────┤
│                                             │
│              Explore Local Issues           │
│       See problems reported by the          │
│              community                     │
│                                             │
│ [ Search issues... ] [Category] [Status]   │
│                                             │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐ │
│ │ Issue     │ │ Issue     │ │ Issue     │ │
│ │ Card      │ │ Card      │ │ Card      │ │
│ └───────────┘ └───────────┘ └───────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 7. Issue Card

Each issue card should contain:

* Issue image
* Issue title
* Category
* Location
* Short description
* Status badge
* Report date
* Upvote count
* `View Details` button

Example:

```text
┌─────────────────────────────┐
│        [Issue Image]        │
│                             │
│ Large pothole near road     │
│ Road Damage                 │
│ 📍 Srirangam, Trichy        │
│                             │
│ A large pothole is causing  │
│ difficulties for commuters. │
│                             │
│ ● In Progress    12 Support │
│                             │
│       [ View Details ]      │
└─────────────────────────────┘
```

Use responsive cards:

* 1 column on mobile
* 2 columns on tablet
* 3 columns on desktop

---

# 8. Search Functionality

Add a search input.

Users should be able to search by:

* Issue title
* Category
* Location
* Description

Example:

```javascript
const searchText = searchInput.value.toLowerCase();

const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchText) ||
    issue.category.toLowerCase().includes(searchText) ||
    issue.location.toLowerCase().includes(searchText) ||
    issue.description.toLowerCase().includes(searchText)
);
```

Update the cards dynamically.

---

# 9. Category Filter

Create a dropdown:

```text
All Categories
Garbage and Waste
Road Damage
Broken Streetlight
Water Leakage
Drainage Problem
Traffic Issue
Public Space
Other
```

Filtering should update the issue cards immediately.

---

# 10. Status Filter

Create:

```text
All Status
Reported
Under Review
In Progress
Resolved
```

Users should be able to filter issues by status.

---

# 11. Location Filter

If simple enough, add a location filter.

It should use:

```text
All Locations
Chennai
Trichy
Coimbatore
Madurai
```

Do not build maps.

---

# 12. Selected Location From URL

Developer 2 may redirect users using:

```text
issues.html?city=Trichy&area=Srirangam
```

Read these parameters:

```javascript
const params = new URLSearchParams(window.location.search);

const city = params.get("city");
const area = params.get("area");
```

If both exist, display:

```text
Issues in Srirangam, Trichy
```

You can optionally filter the sample issues to that area.

If no location is supplied, display:

```text
Explore Community Issues
```

---

# 13. Empty Results

If no issues match the search/filter:

Display a clean empty-state card:

```text
No issues found

Try changing your search or filters.
```

Include:

```text
[ Clear Filters ]
```

The button should reset all filters.

---

# 14. Issue Details — `details.html`

When the user clicks:

```text
View Details
```

redirect to:

```text
details.html?id=FM001
```

Use the URL parameter:

```javascript
const params = new URLSearchParams(window.location.search);
const issueId = params.get("id");
```

Find the matching issue from the static array.

---

# 15. Issue Details Layout

Create a professional detail page:

```text
┌─────────────────────────────────────────────┐
│                  NAVBAR                     │
├─────────────────────────────────────────────┤
│                                             │
│  ← Back to Issues                           │
│                                             │
│  ┌──────────────────┐  ┌─────────────────┐ │
│  │                  │  │ Road Damage     │ │
│  │   ISSUE IMAGE    │  │ Large pothole   │ │
│  │                  │  │                 │ │
│  └──────────────────┘  │ 📍 Location     │ │
│                        │ Date             │ │
│                        │ Status           │ │
│                        └─────────────────┘ │
│                                             │
│  Description                                │
│  -----------------------------------------  │
│  Complete issue description...              │
│                                             │
│  Issue Progress                             │
│                                             │
│  ● Reported                                 │
│  │                                          │
│  ● Under Review                             │
│  │                                          │
│  ● In Progress                              │
│  │                                          │
│  ○ Resolved                                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 16. Issue Information

Display:

* Issue ID
* Title
* Category
* Location
* City
* Area
* Description
* Image
* Report date
* Current status
* Upvote/support count

---

# 17. Status Timeline

Create:

```text
Reported
   ↓
Under Review
   ↓
In Progress
   ↓
Resolved
```

Highlight the current status.

For example, if the current status is:

```text
In Progress
```

then the timeline should visually show:

```text
✓ Reported
✓ Under Review
● In Progress
○ Resolved
```

Do not implement real status updates.

The status comes from the static demo data.

---

# 18. Back Button

Add:

```text
← Back to Issues
```

which links to:

```text
issues.html
```

---

# 19. Invalid Issue ID

If someone opens:

```text
details.html?id=UNKNOWN
```

show:

```text
Issue Not Found

The issue you are looking for does not exist.

[ Browse Issues ]
```

Do not display a broken page.

---

# 20. About Page — `about.html`

Create a simple professional About page.

Sections:

### Hero

```text
About FixMyArea

Making local problems easier to report,
discover, and understand.
```

### Problem

Explain the everyday problem:

People often notice potholes, garbage, broken streetlights, and similar issues but may not have a simple place to organize and view them.

### Our Solution

Explain how FixMyArea provides:

```text
Report → Explore → Track
```

### How It Works

Three steps:

1. Report an issue.
2. Explore community reports.
3. Track the issue status.

### Categories

Show the main issue categories.

### Technology

Display:

```text
HTML5
Tailwind CSS
Vanilla JavaScript
GitHub
GitHub Pages
```

### Team

Create four simple team cards:

```text
Developer 1
Home & Shared Layout

Developer 2
Login & Location

Developer 3
Report Issue

Developer 4
Issues & Details
```

Use placeholder names unless the team provides real names.

### Limitations

Clearly state:

* Frontend-only MVP.
* No real authentication.
* No backend.
* No database.
* No GPS.
* No real government integration.
* Issue data is demo data.

---

# 21. JavaScript Structure

Keep the code beginner-friendly.

For `js/issues.js`, use functions such as:

```javascript
function renderIssues(issueList) {}

function filterIssues() {}

function searchIssues() {}

function clearFilters() {}

function getIssueFromURL() {}
```

For `js/details.js`:

```javascript
function getIssueId() {}

function findIssue(id) {}

function renderIssueDetails(issue) {}

function renderStatusTimeline(status) {}

function showIssueNotFound() {}
```

Do not create unnecessarily complicated architecture.

---

# 22. Responsive Design

The pages must work on:

### Mobile

```text
320px – 480px
```

### Tablet

```text
768px+
```

### Desktop

```text
1024px+
```

Use Tailwind responsive classes.

Example:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

# 23. Accessibility

Make sure:

* Images have `alt` text.
* Buttons have clear labels.
* Inputs have labels.
* Focus states are visible.
* Text has sufficient contrast.
* Cards do not rely only on colour.
* Keyboard navigation works.
* Links are understandable.

---

# 24. Shared Navbar and Footer

Use the same navbar and footer created by Developer 1.

Do not create an independent design.

Expected navigation:

```text
Home
Browse Issues
Report Issue
About
Login
```

The current page should have an active navigation state.

---

# 25. No Backend Rule

Do NOT create:

```text
API calls
Database connections
Fetch requests to backend
Authentication
Admin system
Maps
Real notifications
```

Everything should work using static JavaScript data.

---

# 26. Git Branch

Use:

```text
feature/issues-details
```

Start from the latest main branch:

```powershell
git checkout main
git pull origin main
git checkout -b feature/issues-details
```

---

# 27. Commit Messages

Use clear commits:

```text
feat: create browse issues page
feat: add issue search and filters
feat: add issue details page
feat: add issue status timeline
feat: create about page
style: apply Civic Slate design
fix: handle invalid issue ID
```

Avoid:

```text
update
final
changes
done
new
```

---

# 28. Testing Checklist

Before creating the Pull Request:

### Browse Issues

* [ ] Issue cards display correctly.
* [ ] Search works.
* [ ] Category filter works.
* [ ] Status filter works.
* [ ] Location filter works if implemented.
* [ ] Clear filters works.
* [ ] Empty state works.
* [ ] View Details works.
* [ ] URL issue ID is correct.

### Issue Details

* [ ] Correct issue loads from URL.
* [ ] Image displays.
* [ ] Description displays.
* [ ] Location displays.
* [ ] Status displays.
* [ ] Timeline works.
* [ ] Back button works.
* [ ] Invalid issue ID shows an error page.

### About

* [ ] All sections display correctly.
* [ ] Team cards display correctly.
* [ ] Technology section works.
* [ ] Limitations are clearly shown.

### General

* [ ] Navbar works.
* [ ] Footer works.
* [ ] Mobile layout works.
* [ ] Tablet layout works.
* [ ] Desktop layout works.
* [ ] No console errors.
* [ ] No broken images.
* [ ] No broken links.

---

# 29. Important Team Boundary

Your work is limited to:

```text
Browse Issues
     ↓
Issue Details
     ↓
About
```

Do NOT implement:

* Login
* Location selection
* Report submission
* Authentication
* Backend
* Database

Developer 2 owns login and location.

Developer 3 owns report submission.

Developer 1 owns the home page and shared layout.

---

# 30. Final Deliverable

When finished, provide:

### Completed

* Browse Issues page.
* Static issue cards.
* Search functionality.
* Category filtering.
* Status filtering.
* Location filtering.
* Empty-state handling.
* Issue Details page.
* URL-based issue selection.
* Status timeline.
* Invalid issue handling.
* About page.
* Responsive Civic Slate design.

### Files changed

```text
issues.html
details.html
about.html
js/issues.js
js/details.js
```

### Integration Notes

Tell the team:

1. How `issues.html` reads:

```text
?city=Trichy&area=Srirangam
```

2. How `details.html` reads:

```text
?id=FM001
```

3. Which static issue-data structure is being used.

Keep the implementation **simple, professional, consistent with the other developers, and easy for beginners to understand**.
