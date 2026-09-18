# Developer 2 Task — FixMyArea Login & Location

You are working as **Developer 2** on the FixMyArea group project.

## Your Assigned Responsibility

You are responsible for:

1. `login.html`
2. `location.html`
3. `js/login.js`
4. `js/location.js`

Your work covers the user flow:

```text
Home
  ↓
Login
  ↓
Location Selection
  ↓
Browse Issues
```

Do not modify pages or JavaScript files assigned to other developers.

---

# 1. Project Rules

The project must use:

* HTML5
* Tailwind CSS through CDN
* Vanilla JavaScript
* Optional custom CSS
* No React
* No Vue
* No Angular
* No Bootstrap
* No backend
* No database
* No localStorage
* No real authentication
* No real GPS
* No unnecessary libraries

The website must remain simple and beginner-friendly.

---

# 2. Design Theme

Follow the project's **Civic Slate** theme created by Developer 1.

### Main colours

```text
Background:       #0F172A
Secondary:        #1E293B
Cards:            #334155
Primary Accent:   #14B8A6
Accent Hover:     #0D9488
Main Text:        #F8FAFC
Secondary Text:   #CBD5E1
Border:           #475569
Success:          #22C55E
Warning:          #F59E0B
Error:            #EF4444
```

Do not introduce a different colour scheme.

Use:

* Rounded cards
* Clean spacing
* Subtle shadows
* Professional typography
* Simple animations
* Responsive layouts
* Consistent buttons and inputs

Reuse the navbar and footer design from Developer 1.

---

# 3. Login Page — `login.html`

Create a clean, professional login page.

## Layout

Desktop:

```text
┌─────────────────────────────────────────────┐
│                 NAVBAR                      │
├──────────────────────┬──────────────────────┤
│                      │                      │
│  Welcome to          │     Login Card       │
│  FixMyArea            │                      │
│                      │  Email               │
│  Report problems     │  Password            │
│  in your community   │                      │
│                      │  [ Login ]            │
│                      │                      │
└──────────────────────┴──────────────────────┘
│                 FOOTER                      │
└─────────────────────────────────────────────┘
```

On mobile, stack the sections vertically.

## Login form

Include:

* Email input
* Password input
* Show/hide password button
* Login button
* Error message area
* Demo credentials information

Demo credentials:

```text
Email: demo@fixmyarea.com
Password: demo123
```

Clearly label them as **Demo Login**.

Do not store real passwords.

---

# 4. Login Validation — `js/login.js`

Implement simple frontend validation.

Required checks:

### Email

* Cannot be empty.
* Must have a reasonable email format.

### Password

* Cannot be empty.

### Demo authentication

Allow login only when the entered credentials match:

```text
demo@fixmyarea.com
demo123
```

If incorrect:

```text
Invalid email or password.
```

If correct:

```text
Login successful!
```

Then redirect to:

```text
location.html
```

Use:

```javascript
window.location.href = "location.html";
```

Do not implement real authentication.

Do not use:

```text
localStorage
sessionStorage
cookies
```

---

# 5. Location Page — `location.html`

This page appears immediately after successful login.

Purpose:

> Allow the user to select the area they want to explore.

## Page content

Display:

```text
Welcome to FixMyArea

Select your location to explore local issues.
```

Create:

### City dropdown

Options:

```text
Select City
Chennai
Trichy
Coimbatore
Madurai
```

### Area dropdown

Initially:

```text
Select Area
```

After selecting a city, populate suitable demo areas.

Example:

```text
Chennai
- Sholinganallur
- Tambaram
- Anna Nagar

Trichy
- Srirangam
- Cantonment
- Thillai Nagar

Coimbatore
- Gandhipuram
- RS Puram
- Peelamedu

Madurai
- KK Nagar
- Anna Nagar
- Mattuthavani
```

### Continue button

Button:

```text
Continue to Issues
```

---

# 6. Location Validation

The user must select:

1. City
2. Area

If either is missing, display:

```text
Please select your city and area.
```

After successful selection, redirect to:

```text
issues.html?city=Trichy&area=Srirangam
```

Use JavaScript URL parameters.

Example:

```javascript
const url =
    `issues.html?city=${encodeURIComponent(city)}&area=${encodeURIComponent(area)}`;

window.location.href = url;
```

Do not use localStorage.

---

# 7. Location Preview

Before clicking Continue, display a small preview card:

```text
Your Selected Area

📍 Srirangam
Trichy

[ Change Location ]
```

The preview should update dynamically when the user selects a city and area.

---

# 8. User Experience

Add simple animations:

* Form card fade-in.
* Button hover animation.
* Input focus effect.
* Location preview transition.
* Error message animation.

Keep animations subtle.

Do not create excessive flashy effects.

---

# 9. Accessibility

Make sure:

* Every input has a `<label>`.
* Buttons are keyboard accessible.
* Focus states are visible.
* Error messages are easy to understand.
* Colour is not the only way to communicate errors.
* Text has sufficient contrast.

---

# 10. Navigation

The navbar should remain consistent with Developer 1's implementation.

Use links such as:

```text
Home
Browse Issues
Report Issue
About
Login
```

Do not redesign the navbar independently.

If Developer 1 has already created the shared navbar, copy its structure and styling exactly.

---

# 11. JavaScript Code Quality

Keep JavaScript simple.

Use meaningful names:

```javascript
const citySelect = document.getElementById("city");
const areaSelect = document.getElementById("area");
const continueButton = document.getElementById("continueButton");
```

Use small functions:

```javascript
function updateAreas() {}
function validateLocation() {}
function continueToIssues() {}
```

Add short comments where useful.

Avoid unnecessary complexity.

---

# 12. Files You Can Modify

You are allowed to create or modify:

```text
login.html
location.html
js/login.js
js/location.js
```

Avoid modifying:

```text
index.html
report.html
issues.html
details.html
about.html
js/main.js
js/report.js
js/issues.js
js/details.js
```

Do not make major changes to:

```text
css/style.css
```

without informing the team.

---

# 13. Git Branch

Use:

```text
feature/login-location
```

Start with the latest main branch:

```powershell
git checkout main
git pull origin main
git checkout -b feature/login-location
```

---

# 14. Suggested Commits

Use small meaningful commits:

```text
feat: create login page
feat: add demo login validation
feat: create location selection page
feat: add city and area selection
feat: connect location to issues page
style: apply Civic Slate design
```

Do not use commits such as:

```text
update
final
changes
new
done
```

---

# 15. Testing Checklist

Before creating your Pull Request:

* [ ] Login page opens correctly.
* [ ] Email validation works.
* [ ] Password validation works.
* [ ] Incorrect credentials show an error.
* [ ] Demo credentials work.
* [ ] Successful login redirects to `location.html`.
* [ ] City dropdown works.
* [ ] Area list changes according to city.
* [ ] Location validation works.
* [ ] Selected location preview works.
* [ ] Continue button redirects correctly.
* [ ] URL contains city and area.
* [ ] Navbar works.
* [ ] Footer works.
* [ ] Mobile layout works.
* [ ] Tablet layout works.
* [ ] Desktop layout works.
* [ ] No console errors exist.

---

# 16. Important Team Rule

Do **not** implement features belonging to other developers.

Your responsibility ends at:

```text
Login
   ↓
Location Selection
   ↓
issues.html?city=...&area=...
```

Developer 4 will handle reading the URL parameters on the Issues page.

For example, Developer 4 should be able to receive:

```text
issues.html?city=Trichy&area=Srirangam
```

and display:

```text
Issues in Srirangam, Trichy
```

---

# 17. Final Deliverable

When finished, report:

### Completed

* Login page
* Demo authentication
* Login validation
* Location selection
* Dynamic area selection
* Selected-location preview
* URL-based location passing
* Responsive design

### Files changed

```text
login.html
location.html
js/login.js
js/location.js
```

### Notes for Developer 4

Explain exactly how the location is passed through the URL so the Issues page can use it.

Example:

```text
issues.html?city=Trichy&area=Srirangam
```

The implementation should be **simple, clean, professional, and easy for another beginner developer to understand and integrate.**
