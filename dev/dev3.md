# Developer 3 Task — FixMyArea Report Issue

You are working as **Developer 3** on the FixMyArea group project.

Your responsibility is to build the **Report Issue page and its JavaScript functionality**.

---

# 1. Project Overview

FixMyArea is a simple frontend-only community platform where users can report local problems such as:

* Potholes
* Garbage
* Broken streetlights
* Water leakage
* Drainage problems
* Traffic issues
* Other community problems

The project is a beginner-friendly group project.

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

Keep the implementation simple.

---

# 3. Your Files

You are responsible for:

```text
report.html
js/report.js
```

You may make small additions to:

```text
css/style.css
```

only when necessary.

Do NOT modify:

```text
index.html
login.html
location.html
issues.html
details.html
about.html
js/main.js
js/login.js
js/location.js
js/issues.js
js/details.js
```

unless you coordinate with the relevant developer.

---

# 4. Design Theme — Civic Slate

Follow the project's common design system.

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

The page must look consistent with the Home, Login, and Location pages.

Use:

* Rounded cards
* Clean spacing
* Subtle shadows
* Professional typography
* Simple hover effects
* Responsive layout
* Clear form states

---

# 5. Report Page Layout

Create:

```text
┌─────────────────────────────────────────────┐
│                  NAVBAR                     │
├─────────────────────────────────────────────┤
│                                             │
│            Report a Local Issue             │
│     Help improve your community             │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │ Issue Title                           │  │
│  │ [_______________________________]     │  │
│  │                                       │  │
│  │ Category             Location         │  │
│  │ [Select category]    [Location]       │  │
│  │                                       │  │
│  │ Description                           │  │
│  │ [_______________________________]     │  │
│  │ [_______________________________]     │  │
│  │                                       │  │
│  │ Upload Image                          │  │
│  │ [ Choose Image ]                      │  │
│  │                                       │  │
│  │        [ Submit Report ]              │  │
│  └───────────────────────────────────────┘  │
│                                             │
├─────────────────────────────────────────────┤
│                  FOOTER                     │
└─────────────────────────────────────────────┘
```

---

# 6. Form Fields

Create the following fields.

## Issue Title

```html
<input>
```

Placeholder:

```text
Example: Large pothole near the main road
```

Required.

---

## Category

Use a dropdown:

```text
Select Category
Garbage and Waste
Road Damage
Broken Streetlight
Water Leakage
Drainage Problem
Traffic Issue
Public Space
Other
```

Required.

---

## Location

Provide a simple text input.

Placeholder:

```text
Example: Srirangam, Trichy
```

Required.

Do NOT implement GPS or maps.

---

## Description

Use a textarea.

Placeholder:

```text
Describe the problem clearly...
```

Required.

Suggested minimum length:

```text
10 characters
```

---

# 7. Image Upload

Add an optional image upload.

Accepted formats:

```text
JPG
JPEG
PNG
WEBP
```

Use:

```html
<input type="file" accept="image/*">
```

When the user selects an image:

* Display an image preview.
* Show the filename.
* Provide a remove image option.
* Keep the preview inside the form card.

Do not upload the image to a server.

The image only needs to be previewed in the browser.

---

# 8. Form Validation

Validate every required field.

### Empty title

Show:

```text
Please enter an issue title.
```

### No category

Show:

```text
Please select an issue category.
```

### Empty location

Show:

```text
Please enter the issue location.
```

### Short description

Show:

```text
Please provide a little more information.
```

Use inline validation where possible.

Do not use browser-only `alert()` messages for every validation error.

---

# 9. Submit Behaviour

When the form is valid:

1. Prevent normal form submission.
2. Generate a demo issue ID.
3. Display a professional success message.
4. Show the submitted information in a confirmation card.
5. Clear the form if appropriate.

Example issue ID:

```text
FM-2026-001
```

The ID can be generated using JavaScript.

Example:

```javascript
const issueId = `FM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
```

This is only a demo reference number.

Do NOT save the report using:

```text
localStorage
sessionStorage
```

Do NOT send it to a backend.

---

# 10. Success Message

After submission, display something similar to:

```text
✓ Report Submitted Successfully

Your issue has been recorded for this demo.

Reference ID:
FM-2026-347

Thank you for helping improve your community.
```

Include a button:

```text
Browse Issues
```

Link it to:

```text
issues.html
```

And another:

```text
Report Another Issue
```

which resets the form.

---

# 11. Location From Previous Page

Developer 2's location page may redirect users to:

```text
report.html?city=Trichy&area=Srirangam
```

Your JavaScript should be able to read these URL parameters.

If available, automatically display:

```text
Selected Area

Srirangam, Trichy
```

and pre-fill the location field.

Use:

```javascript
const params = new URLSearchParams(window.location.search);

const city = params.get("city");
const area = params.get("area");
```

If there is no location in the URL, allow the user to manually enter it.

---

# 12. Form UX

Add subtle interactions:

* Input focus border effect.
* Button hover effect.
* Image preview animation.
* Success message fade-in.
* Remove-image interaction.
* Loading-like button state for a very short simulated submission if desired.

Keep animations professional and minimal.

Do not use excessive glowing or complicated animations.

---

# 13. Responsive Design

The page must work correctly on:

### Mobile

```text
Width: approximately 320–480px
```

### Tablet

```text
Width: approximately 768px
```

### Desktop

```text
Width: 1024px+
```

On mobile:

* Form fields should stack vertically.
* Buttons should be easy to tap.
* Image preview should fit the screen.
* Navbar should use the shared mobile menu.

---

# 14. Accessibility

Follow basic accessibility practices:

* Every input must have a `<label>`.
* Use meaningful placeholder text.
* Required fields should be clearly identified.
* Error messages should be readable.
* Buttons must be keyboard accessible.
* Provide visible focus states.
* Images must have appropriate `alt` text.
* Do not rely only on colour to communicate errors.

---

# 15. Shared Navbar and Footer

Use the same navbar and footer created by Developer 1.

Do NOT create a completely different navbar.

Expected navigation:

```text
Home
Browse Issues
Report Issue
About
Login
```

The current page should have an appropriate active state.

---

# 16. JavaScript Structure

Keep `js/report.js` beginner-friendly.

Prefer functions such as:

```javascript
function validateForm() {}

function previewImage() {}

function removeImage() {}

function generateIssueId() {}

function submitReport() {}

function showSuccessMessage() {}
```

Avoid putting all functionality into one large event handler.

Use meaningful variable names.

Add short comments for logic that may be difficult for beginners.

---

# 17. Security and Privacy

This is only a frontend demo.

Do not request:

* Passwords
* Government ID numbers
* Phone numbers unless absolutely necessary
* Sensitive personal information

Do not claim that reports are actually submitted to government authorities.

Clearly treat the submission as a **demo report**.

---

# 18. Git Branch

Create and work on:

```text
feature/report-form
```

Start from the latest main branch:

```powershell
git checkout main
git pull origin main
git checkout -b feature/report-form
```

---

# 19. Commit Messages

Use meaningful commits:

```text
feat: create report issue form
feat: add report form validation
feat: add image preview
feat: add issue submission confirmation
feat: support location query parameters
style: apply Civic Slate report page design
```

Avoid:

```text
update
changes
final
done
new
```

---

# 20. Testing Checklist

Before creating the Pull Request:

* [ ] Report page opens correctly.
* [ ] All required fields are validated.
* [ ] Category dropdown works.
* [ ] Location field works.
* [ ] Description validation works.
* [ ] Image upload works.
* [ ] Image preview works.
* [ ] Remove image works.
* [ ] Submit button works.
* [ ] Demo issue ID is generated.
* [ ] Success message appears.
* [ ] Browse Issues button works.
* [ ] Report Another Issue button works.
* [ ] URL location parameters are recognized.
* [ ] Navbar works.
* [ ] Footer works.
* [ ] Mobile layout works.
* [ ] Tablet layout works.
* [ ] Desktop layout works.
* [ ] No console errors exist.

---

# 21. Important Team Boundary

Your work ends at the **successful report submission UI**.

You do NOT need to:

* Build the Issues page.
* Build issue filtering.
* Build issue details.
* Build authentication.
* Build a database.
* Build an admin dashboard.
* Build maps.
* Build real notifications.

Developer 4 will handle the Browse Issues and Issue Details functionality.

---

# 22. Final Deliverable

After completing the task, provide:

### Completed

* Report Issue page.
* Form validation.
* Category selection.
* Location input.
* Description input.
* Image preview.
* Demo issue ID generation.
* Success confirmation.
* Location URL parameter support.
* Responsive Civic Slate design.

### Files changed

```text
report.html
js/report.js
```

### Integration note

Explain how Developer 4 can navigate from the successful submission screen to:

```text
issues.html
```

Keep the implementation **simple, professional, beginner-friendly, and strictly within the assigned Developer 3 scope**.
