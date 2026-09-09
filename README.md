# CARTEL MULTI-ENGINEERING LTD — Corporate Website

Professional multi-page website for **CARTEL MULTI-ENGINEERING LTD**, an electrical installation and engineering company based in Rwanda.

## Website Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, services overview, why choose us, featured projects, CTAs |
| About | `about.html` | Company overview, mission, vision, values, approach |
| Services | `services.html` | Full list of electrical installation & engineering services |
| Projects | `projects.html` | Portfolio with category filters (sample/placeholder projects) |
| Safety & Quality | `safety.html` | Safety standards, quality control, PPE, testing |
| Why Choose Us | `why-us.html` | Reasons to work with the company |
| FAQ | `faq.html` | Accordion FAQ covering common client questions |
| Contact | `contact.html` | Contact details, quote form, social links, map placeholder |

## Tech Stack

- HTML5 (semantic, accessible)
- CSS3 (custom properties, Flexbox, Grid, responsive)
- Vanilla JavaScript (mobile menu, FAQ accordion, project filter, form validation, scroll effects)
- Google Fonts (Inter)
- Font Awesome 6 (icons)
- Unsplash images (placeholders — replace with your own)

No backend, no build step, no Node.js required. Ready for **GitHub Pages**.

## Folder Structure

```
cartel-multi-engineering/
├── index.html
├── about.html
├── services.html
├── projects.html
├── safety.html
├── why-us.html
├── faq.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── logo.jpg          ← Official company logo
└── README.md
```

## How to Deploy on GitHub Pages

### 1. Create a new GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name suggestion: `cartel-multi-engineering`
3. Keep it **Public**
4. Do **not** initialize with README (we already have one)
5. Click **Create repository**

### 2. Upload the files
**Option A — GitHub web interface**
1. On the new repository page click **uploading an existing file**
2. Drag the entire contents of the `cartel-multi-engineering` folder (all HTML files, `css/`, `js/`, `images/`, `README.md`)
3. Commit the files

**Option B — Git command line**
```bash
cd cartel-multi-engineering
git init
git add .
git commit -m "Initial commit — CARTEL MULTI-ENGINEERING LTD website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cartel-multi-engineering.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to the repository **Settings** → **Pages**
2. Under **Source** select **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Click **Save**
5. After a minute or two your site will be live at:
   `https://YOUR-USERNAME.github.io/cartel-multi-engineering/`

### 4. Add / replace images
- Official logo is already at `logo.jpg`
- Replace Unsplash placeholder images with your own photographs of real work
- Keep the same file names or update the `src` attributes in the HTML files
- Recommended sizes: 1200–1600 px wide for hero/project images, compressed for web

### 5. Connect the contact form (optional)
The contact form currently validates on the client only. To receive messages:

- **Formspree**: create a form at formspree.io, then set the form `action` to your Formspree endpoint and method `POST`
- **Netlify Forms**: add `netlify` attribute to the form and deploy on Netlify
- Or wire it to your own backend / email service

### 6. Updating the website later
1. Edit the HTML/CSS/JS files locally
2. Commit and push to the `main` branch
3. GitHub Pages will automatically rebuild

## Company Information (already filled in)

- **Company**: CARTEL MULTI-ENGINEERING LTD
- **Phone**: +250 788 725 620
- **Email**: roi.nipatrick@gmail.com
- **Location**: Rwanda
- **LinkedIn**: https://www.linkedin.com/in/carterpatrique
- **Linktree**: https://linktr.ee/Cartel_patrique
- **Facebook**: https://www.facebook.com/cartel.patrique
- **X**: https://x.com/Cartel_Patrique

## Notes

- All project cards on the Projects page are clearly marked as **sample / placeholder** content so you can replace them with real completed projects.
- No fake awards, certifications, statistics or client reviews are claimed.
- The design uses a professional navy / accent-blue engineering theme that complements the official logo.
- Fully responsive (desktop, tablet, mobile) with accessible keyboard navigation and reduced-motion support.

---

© 2026 CARTEL MULTI-ENGINEERING LTD. All Rights Reserved.
