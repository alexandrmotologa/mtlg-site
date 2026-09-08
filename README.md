# mtlg.site

Personal website and portfolio of Alexandr Motologa (MTLG).

## Overview

This repository powers [mtlg.site](https://mtlg.site), a single-page portfolio highlighting production web apps, developer tools, open-source projects, and work history.

- Live site: https://mtlg.site
- Experiments and studio: https://mtlglabs.space

## Architecture

The project is built with vanilla web technologies to keep loading fast and dependencies minimal:

- Semantic HTML5 with embedded Open Graph and JSON-LD schema
- Vanilla CSS with custom properties, responsive grid and flex layouts, and a dark theme
- Vanilla JavaScript for project carousels, clipboard copy helpers, and deep-link routing

## Repository Structure

- `index.html`: Main portfolio page containing all page sections and project cards
- `styles.css`: CSS styling and responsive layout rules
- `script.js`: Client-side interactivity (carousels, share buttons, toast notifications)
- `projects.json`: Canonical list of projects and metadata
- `sync.js`: Node script to synchronize project cards between data and markup
- `images/`: Screenshots and previews referenced by project cards

## Local Development

Run the site locally with any static file server:

```bash
# Using Node
npx serve .

# Or using Python
python -m http.server 8080
```

Open `http://localhost:8080` (or the port reported in your terminal) in your browser.
