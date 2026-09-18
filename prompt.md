# FixMyArea

> **Report local problems. Build better communities.**

FixMyArea is a simple, professional, frontend-only community platform that allows users to explore local problems and submit reports about issues such as potholes, garbage accumulation, broken streetlights, water leaks, and drainage problems.

This project is designed as a beginner-friendly group project using **HTML5, Tailwind CSS via CDN, and Vanilla JavaScript**.

---

## 1. Project Overview

Many people notice problems in their neighborhoods but do not have a simple way to record, organize, and view them.

FixMyArea provides a basic interface where users can:

- Log in through a demo login page.
- Select their area or location after login.
- View issues related to their selected location.
- Submit a report about a local problem.
- Search and filter existing issue reports.
- View detailed information about an issue.
- Learn about the project and team.

> **MVP limitation:** Login and location selection are simulated. There is no real authentication, GPS tracking, or government-authority integration. Reports are saved to a JSON file via backend API.

---

## 2. Main User Flow

```text
Home Page
    |
    v
Login Page
    |
    v
Location Selection
    |
    v
Home / Issue Explorer
    |
    +----> Report an Issue
    |
    +----> Browse Issues
                |
                v
          Issue Details
```

---

## 3. Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Project introduction, hero section, featured issues, and navigation |
| Login | `login.html` | Demo email/password login form |
| Location Selection | `location.html` | Select city, area, or neighborhood after login |
| Report Issue | `report.html` | Submit a local problem through a simple form |
| Browse Issues | `issues.html` | View, search, and filter sample issue cards |
| Issue Details | `details.html` | View an issue's description, location, image, and status |
| About | `about.html` | Project purpose, workflow, team information, and limitations |

The project contains **7 pages** in total.

---

## 4. Suggested Folder Structure

```text
FixMyArea/
│
├── components/
│   ├── index.html
│   ├── login.html
│   ├── location.html
│   ├── report.html
│   ├── issues.html
│   ├── details.html
│   └── about.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── login.js
│   ├── location.js
│   ├── report.js
│   ├── issues.js
│   └── details.js
│
└── assets/
    └── images/
        ├── pothole.jpg
        ├── garbage.jpg
        ├── streetlight.jpg
        └── water-leak.jpg
```

---

## 5. Technology Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure and semantic markup |
| Tailwind CSS CDN | Responsive styling and layout |
| Vanilla JavaScript | Form validation, filtering, navigation, and interactions |
| CSS | Optional custom animations and reusable visual effects |
| Git and GitHub | Version control and team collaboration |
| GitHub Pages | Static website deployment |

### Project restrictions

- No React, Vue, Angular, or other frontend frameworks.
- A backend API will be used to write data to a JSON file and save images.
- No real authentication.
- No real GPS or map integration.
- No external JavaScript frameworks.
- Tailwind CSS must be loaded through its CDN.

---

## 6. Professional Common Design Theme

### Theme Name: Civic Slate

The entire website should use one consistent visual identity called **Civic Slate**.

### Colour palette

| Design element | Colour | Hex code |
|---|---|---|
| Primary background | Deep navy | `#0F172A` |
| Secondary background | Slate navy | `#1E293B` |
| Main surface | Dark slate | `#334155` |
| Primary accent | Teal | `#14B8A6` |
| Accent hover | Dark teal | `#0D9488` |
| Main text | Soft white | `#F8FAFC` |
| Secondary text | Cool gray | `#CBD5E1` |
| Border | Slate gray | `#475569` |
| Warning | Amber | `#F59E0B` |
| Success | Green | `#22C55E` |
| Error | Red | `#EF4444` |

### Visual rules

- Use deep navy as the main background.
- Use slate cards with subtle borders.
- Use teal for primary buttons and important actions.
- Use white or soft-white text for headings.
- Use cool gray for descriptions and secondary labels.
- Use rounded corners consistently.
- Use subtle shadows instead of excessive glow effects.
- Keep spacing, button sizes, and typography consistent across every page.
- Use the same navbar and footer on all pages.
- Ensure the website is responsive on mobile, tablet, and desktop.

### Tailwind theme examples

```html
<body class="bg-slate-950 text-slate-50">
  <section class="bg-slate-900 border border-slate-700 rounded-2xl">
    <h2 class="text-white">Local Issues</h2>
    <p class="text-slate-300">Explore problems in your area.</p>
    <button class="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-5 py-3">
      Report an Issue
    </button>
  </section>
</body>
```

---

## 7. Page Requirements

### Home Page

The home page should include:

- Consistent navigation bar.
- FixMyArea logo or text-based brand.
- Hero section with a clear tagline.
- Call-to-action buttons:
  - `Report an Issue`
  - `Explore Issues`
- Three or four featured issue cards.
- Short “How it works” section.
- Professional footer.

### Login Page

The login page should include:

- Email input.
- Password input.
- Basic validation.
- Demo login button.
- Demo credential information.
- Error and success messages.
- Redirect to `location.html` after successful demo login.

Demo credentials:

```text
Email: demo@fixmyarea.com
Password: demo123
```

Do not use real passwords.

### Location Selection Page

The location page should appear after login.

It should include:

- Welcome message.
- City dropdown.
- Area or neighborhood dropdown.
- Optional manual location input.
- `Continue` button.
- Selected location preview.
- Validation before continuing.
- Redirect to `issues.html` or `index.html` after selection.

Suggested demo locations:

```text
City:
- Chennai
- Trichy
- Coimbatore
- Madurai

Areas:
- Sholinganallur
- Tambaram
- Anna Nagar
- Srirangam
- Gandhipuram
- KK Nagar
```

The selected location should be passed through the URL query string or a simple temporary frontend state approach.

Example:

```text
issues.html?city=Trichy&area=Srirangam
```

Do not use real GPS tracking in the MVP.

### Report Issue Page

The report form should include:

- Issue title.
- Category dropdown.
- City and area.
- Description.
- Optional image upload with preview.
- Date field.
- Submit button.
- Basic validation.
- Simulated success message.
- Generated demo issue reference number.

Suggested categories:

- Garbage and waste.
- Road damage.
- Broken streetlight.
- Water leakage.
- Drainage problem.
- Traffic issue.
- Public-space damage.
- Other.

### Browse Issues Page

The page should include:

- Search input.
- Category filter.
- Status filter.
- Location display.
- Responsive issue cards.
- Issue image.
- Issue title.
- Category.
- Area.
- Status badge.
- `View Details` button.

Use static JavaScript sample data for the MVP.

### Issue Details Page

The page should include:

- Issue title.
- Issue image.
- Category.
- Description.
- Location.
- Report date.
- Issue reference number.
- Current status.
- Simple progress timeline.

Suggested statuses:

```text
Reported → Under Review → In Progress → Resolved
```

### About Page

The page should include:

- Project introduction.
- Problem statement.
- How FixMyArea works.
- Technology stack.
- Team member cards.
- Project limitations.
- Footer and navigation.

---

## 8. Four-Developer Work Division

| Developer | Pages and files | Responsibilities |
|---|---|---|
| Developer 1 | `index.html`, `js/main.js` | Home page, shared navbar, footer, navigation links, and common layout |
| Developer 2 | `login.html`, `location.html`, `js/login.js`, `js/location.js` | Demo login, validation, location selection, and redirect flow |
| Developer 3 | `report.html`, `js/report.js` | Report form, validation, image preview, category selection, and success message |
| Developer 4 | `issues.html`, `details.html`, `about.html`, `js/issues.js`, `js/details.js` | Issue cards, search, filters, issue details, status timeline, and About page |

### Shared responsibility

All developers must:

- Follow the Civic Slate colour palette.
- Use the same navbar and footer structure.
- Use consistent button, card, and input styles.
- Test their pages on mobile and desktop.
- Keep JavaScript code modular and readable.
- Communicate before changing shared files.

---

## 9. Git Workflow

Each developer should work on a separate branch.

```bash
git clone <repository-url>
cd FixMyArea

git checkout -b feature/home-page
```

Suggested branch names:

```text
feature/home-page
feature/login-location
feature/report-form
feature/issues-details
```

Before merging:

1. Test the assigned page.
2. Check responsive design.
3. Confirm that navigation links work.
4. Pull the latest changes from the main branch.
5. Create a pull request.
6. Ask another team member to review the changes.

---

## 10. MVP Functional Requirements

The first version should support:

- Responsive navigation.
- Demo login validation.
- Location selection after login.
- Navigation between all pages.
- Report form validation.
- Image preview before submission.
- Static issue cards.
- Search and category filtering.
- Issue details view.
- Status timeline.
- Consistent visual design.
- Professional responsive layout.

---

## 11. Future Enhancements

The following features can be added later:

- Real user authentication.
- FastAPI or Node.js backend.
- PostgreSQL database.
- Real GPS and map integration.
- Admin dashboard.
- Real-time status updates.
- Email or WhatsApp notifications.
- Duplicate issue detection.
- AI-based pothole or garbage image classification.
- Municipal authority integration.
- User profiles and report history.

---

## 12. Important Limitations

This MVP is a demonstration project:

- Login is not real authentication.
- The selected location is not verified.
- Reports are not sent to government departments.
- Issue statuses are sample or simulated values.
- Static sample data may be used.
- Uploaded images are only previewed in the browser.
- Data is not synchronized between different users.
- No personal or sensitive information should be entered.

---

## 13. Project Tagline

> **See the problem. Report the issue. Improve your area.**

---

## 14. Success Criteria

The project is considered complete when:

- All seven pages are connected.
- The user can log in using demo credentials.
- The user can select a location after login.
- The user can open the issue-reporting form.
- The user can browse and filter sample issues.
- The user can open an issue details page.
- Every page follows the Civic Slate theme.
- The website works on mobile and desktop.
- The code is organized and easy for beginners to understand.
