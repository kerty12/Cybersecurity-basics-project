# Cybersecurity Basics

A course website for IT 3203 (Web Development) covering fundamentals of
cybersecurity: passwords & authentication, phishing & social engineering,
and malware & threats — plus a self-assessment quiz.

## Live site
`https://<your-username>.github.io/<your-repo-name>/`
(update this line once GitHub Pages is enabled)

## Structure
```
.
├── index.html              Home page (overview, table of contents)
├── about.html               About the author and the project
├── key-concepts.html        Glossary of 6 core security concepts
├── references.html          Sources and further reading
├── quiz.html                Milestone 2 self-assessment quiz
├── topics/
│   ├── passwords.html
│   ├── phishing.html
│   └── malware.html
├── css/
│   └── style.css            Single shared stylesheet
├── js/
│   └── quiz.js               Quiz grading logic
└── images/                  Custom SVG icons
```

## Milestones
- **Milestone 1** — static HTML/CSS site: 6 pages, consistent nav, CSS
  grid/flex layout, three selector types, hover states, and required
  style attributes.
- **Milestone 2** — added the JavaScript self-assessment quiz (fill-blank,
  3 single-choice, 1 multi-select question), scoring, pass/fail feedback,
  and a reset button. Continued content and style polish.

## Local development
No build step required — plain HTML/CSS/JS. Open `index.html` directly,
or serve locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment
Deployed via GitHub Pages from the `main` branch, `/ (root)` folder.
