# Developer 1 Task – FixMyArea Home Page and Common Layout

You are Developer 1 in a four-member team developing **FixMyArea**, a simple frontend-only website for reporting and tracking local community problems.

Your responsibility is to create the **Home Page and the common website layout** used across the entire project.

## Project Requirements

Use only:

* HTML5
* Tailwind CSS through CDN
* Vanilla JavaScript
* No frameworks
* No backend
* No database
* No localStorage
* No sessionStorage
* No cookies
* No real authentication
* No real GPS or map integration

The project must be beginner-friendly, simple, responsive, and easy for other team members to integrate.

---

## Your Assigned Files

You may work only on:

```text
index.html
js/main.js
```

You may suggest common styles for `css/style.css`, but do not overwrite shared files without discussing them with the team.

Do not modify files owned by other developers.

---

## Design Theme: Civic Slate

Use this professional colour palette consistently:

```text
Main Background:      #0F172A
Secondary Background:  #1E293B
Card Background:      #334155
Primary Accent:       #14B8A6
Accent Hover:         #0D9488
Main Text:            #F8FAFC
Secondary Text:       #CBD5E1
Border:               #475569
Success:              #22C55E
Warning:              #F59E0B
Error:                #EF4444
```

Design style:

* Dark navy and slate background
* Teal buttons and highlights
* Clean professional cards
* Rounded corners
* Subtle shadows
* Good spacing
* Responsive layout
* Minimal and meaningful animations
* Avoid excessive glowing effects
* Maintain readable text and good contrast

---

# 1. Create `index.html`

Build a complete and responsive homepage with the following sections.

## A. Shared Navbar

Create a professional navigation bar containing:

* FixMyArea logo or text logo
* Home link
* Report Issue link
* Browse Issues link
* About link
* Login button

Navigation links:

```text
index.html
report.html
issues.html
about.html
login.html
```

Requirements:

* Responsive desktop navigation
* Mobile hamburger menu
* Mobile menu should open and close using JavaScript
* Sticky or fixed navbar is allowed if it does not cover content
* Use accessible labels and buttons
* Use the same navbar structure so other developers can reuse it

Add a small tagline near the logo:

```text
Make your area better.
```

---

## B. Hero Section

Create an attractive hero section with:

Heading:

```text
See the Problem.
Report the Issue.
Improve Your Area.
```

Supporting text:

```text
FixMyArea helps citizens report local problems,
track issue progress, and contribute to cleaner,
safer, and better communities.
```

Add two buttons:

1. `Report an Issue`

   * Redirects to `login.html`

2. `Browse Issues`

   * Redirects to `issues.html`

Include a simple visual element such as:

* A civic illustration
* A location pin
* A community-themed icon
* A report card preview
* Or a clean CSS-based visual

Do not depend on external image URLs unless necessary.

---

## C. Problem Categories Section

Add a section titled:

```text
What Can You Report?
```

Create responsive cards for these categories:

1. Garbage and Waste
2. Road Damage
3. Broken Streetlights
4. Water Leakage
5. Drainage Problems
6. Public Space Issues

Each card should contain:

* An icon or emoji
* Category name
* Short description
* Consistent card styling

Example descriptions:

```text
Garbage and Waste:
Report overflowing bins and uncollected waste.

Road Damage:
Report potholes, broken roads, and unsafe streets.

Broken Streetlights:
Report streetlights that need repair.

Water Leakage:
Report leaking pipes and water wastage.

Drainage Problems:
Report blocked drains and flooding issues.

Public Space Issues:
Report problems in parks, sidewalks, and public areas.
```

---

## D. How It Works Section

Create a three-step workflow section titled:

```text
How FixMyArea Works
```

Steps:

### 1. Identify the Problem

Find an issue in your neighbourhood.

### 2. Report the Issue

Submit the issue with its category, location, and description.

### 3. Track the Progress

Browse reported issues and view their current status.

Use numbered cards or a simple timeline design.

---

## E. Demo Statistics Section

Add a visually appealing statistics section with static demo values:

```text
120+ Reported Issues
68 Issues Resolved
35 Active Areas
95% Community Participation
```

Clearly treat these as demonstration values because there is no backend.

Use semantic HTML and accessible text.

---

## F. Call-to-Action Section

Create a final CTA section with:

Heading:

```text
Your Voice Can Make a Difference
```

Description:

```text
A better neighbourhood starts with one reported problem.
```

Button:

```text
Report a Local Issue
```

The button should redirect to:

```text
login.html
```

---

## G. Shared Footer

Create a professional footer containing:

* FixMyArea name
* Short description
* Quick links
* Contact placeholder
* Copyright text
* Dynamic current year

Example:

```text
FixMyArea helps communities identify and report
local problems through a simple digital platform.
```

Use JavaScript to automatically update the copyright year.

---

# 2. Create `js/main.js`

Implement only simple common functionality.

Required features:

1. Mobile navbar toggle
2. Open and close mobile menu
3. Close mobile menu after clicking a navigation link
4. Automatically display the current year in the footer
5. Highlight the current page in the navigation
6. Gracefully handle missing elements without errors

Do not implement:

* Login logic
* Issue submission
* Issue filtering
* Database functionality
* localStorage
* sessionStorage
* Cookies
* Backend requests

---

# 3. Code Quality Rules

Follow these rules strictly:

* Use semantic HTML5 elements.
* Use clear and beginner-friendly code.
* Add useful comments.
* Use meaningful IDs and class names.
* Avoid unnecessary complexity.
* Avoid duplicate JavaScript logic.
* Use accessible labels and ARIA attributes where needed.
* Ensure keyboard accessibility for the mobile menu.
* Add visible focus states.
* Make the page responsive on mobile, tablet, and desktop.
* Do not use React, Vue, Angular, Bootstrap, or other frameworks.
* Use Tailwind CSS through its CDN only.
* Do not create a new colour theme.
* Keep the Civic Slate theme consistent.

---

# 4. Integration Requirements

The other developers will create:

```text
login.html
location.html
report.html
issues.html
details.html
about.html
```

Therefore:

* Use the exact filenames mentioned above.
* Keep navbar links consistent.
* Keep footer structure reusable.
* Do not assume that backend functionality exists.
* Use normal page navigation with HTML links.
* Do not add authentication checks.
* Do not add localStorage or sessionStorage.

If a linked page does not exist yet, the link should still use the correct future filename.

---

# 5. Testing Checklist

Before completing the task, verify:

* [ ] `index.html` opens correctly.
* [ ] Navbar displays correctly on desktop.
* [ ] Mobile menu opens and closes.
* [ ] All navigation links use correct filenames.
* [ ] Hero buttons work.
* [ ] Category cards are responsive.
* [ ] How-it-works section is readable.
* [ ] Statistics section looks professional.
* [ ] CTA button works.
* [ ] Footer displays correctly.
* [ ] Current year is generated automatically.
* [ ] No console errors occur.
* [ ] No localStorage or backend code is used.
* [ ] The page works at different screen sizes.
* [ ] Keyboard navigation works for the mobile menu.

---

# 6. Git Instructions

Create and work on this branch:

```bash
git checkout main
git pull origin main
git checkout -b feature/home-page
```

Commit your work using:

```bash
git add index.html js/main.js
git commit -m "feat: create homepage and shared layout"
git push -u origin feature/home-page
```

Do not push directly to `main`.

Create a Pull Request after testing your work.

## Final Deliverables

You must provide:

1. Completed `index.html`
2. Completed `js/main.js`
3. A responsive FixMyArea homepage
4. A reusable navbar and footer structure
5. A short summary of implemented features
6. Testing confirmation
7. Any integration notes for the other developers
