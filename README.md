# Paste-to-Download Image Tool

A lightweight, client-side tool that enables users to quickly paste, preview, and download images in various formats. This tool is privacy-friendly and works completely offline, with no data being sent to any server.

👉 **Try it live:** [https://paste-to-download.com](https://paste-to-download.com)

![Paste-to-Download Tool Screenshot](https://raw.githubusercontent.com/kindtree/paste-to-download/refs/heads/main/Screenshot.png)

## Features

* ✅ **Paste images** directly from clipboard (`Ctrl+V` / `Cmd+V`)
* ✅ **Drag & drop** image files
* ✅ **Select files** via file browser
* ✅ **Multiple image support** with batch operations
* ✅ **Format conversion** (PNG, JPEG, WebP)
* ✅ **ZIP download** for multiple images
* ✅ **Fully client-side** – works offline, no server upload
* ✅ **Responsive design** – works on mobile and desktop

## How to Use

1. **Paste an image** from your clipboard with `Ctrl+V` / `Cmd+V`
2. **Or drag & drop** image files onto the drop area
3. **Or click** on the drop area to open the file browser
4. **Preview** your images in the gallery
5. **Select format** (PNG, JPEG, or WebP)
6. **Download** individual images or all as ZIP

## Technology Stack

This project is intentionally built with simple web technologies for maximum compatibility:

* Plain HTML, CSS, and JavaScript
* [TailwindCSS](https://tailwindcss.com/) (via CDN) for styling
* [AlpineJS](https://alpinejs.dev/) (via CDN) for interactivity
* [JSZip](https://stuk.github.io/jszip/) (via CDN) for ZIP file creation

No build steps, no bundlers, no frameworks – just open the HTML file and it works!

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/paste-to-download.git
   ```

2. Open `index.html` in your browser.

That's it! No npm, no build process, no server setup.

## Use Cases

* Quickly save screenshots from clipboard
* Convert images between formats
* Batch download multiple images as ZIP
* Save images without uploading to third-party servers
* Simple image workflow tool for documentation

## Privacy

This tool respects your privacy:

* All processing happens in your browser
* No analytics or tracking
* No server communication
* No data storage

## License

MIT License – feel free to use, modify and distribute as needed.

## Contributing

Contributions are welcome! Feel free to submit pull requests or create issues for bugs and feature requests.

## Roadmap

Potential future enhancements:

* Image cropping/resizing
* Basic adjustments (brightness, contrast)
* Rotation/flipping
* File renaming
* Metadata viewing

---

Made with ❤️ for the open-source community – visit [paste-to-download.com](https://paste-to-download.com) to use the tool online.

## Development Guide

This document provides information about the project structure and development process for the Paste-to-Download Image Tool.

### Project Structure

```
paste-to-download/
├── index.html            # Main HTML file (references unminified resources)
├── index.production.html # Production-ready HTML file (uses minified resources)
├── app.js                # Main JavaScript file (unminified)
├── app.min.js            # Minified JavaScript file for production
├── styles.css            # Main CSS file (unminified)
├── styles.min.css        # Minified CSS file for production
├── README.md             # Project documentation
└── DEVELOPMENT.md        # Development guide
```

### Development Workflow

#### Development Mode

Use `index.html` during development:

* `styles.css` contains readable, commented CSS
* `app.js` contains readable, commented JavaScript

#### Production Mode

For production deployment, use:

* `index.production.html` (rename to `index.html` when deploying)
* `styles.min.css` and `app.min.js` for optimized performance

### Script Loading Order

The following load order is critical:

1. TailwindCSS
2. JSZip
3. `app.js` or `app.min.js`
4. Alpine.js

Incorrect order may cause errors like:

```
Alpine Expression Error: imageApp is not defined
```

### Creating Minified Resources

You can use online tools:

* [CSS Minifier](https://cssminifier.com/)
* [JavaScript Minifier](https://javascript-minifier.com/)

Or via CLI:

```bash
npm install -g minify
minify styles.css > styles.min.css
minify app.js > app.min.js
```

### External Dependencies (via CDN)

* **TailwindCSS**: Styling
* **JSZip**: ZIP creation
* **Alpine.js**: UI logic

### TailwindCSS CDN Warning

The warning about using Tailwind CDN in production is expected. For performance-critical scenarios:

* Install Tailwind via npm
* Generate custom CSS using CLI
* Apply PurgeCSS for cleanup

For MVPs or personal tools, CDN usage is fine.

### Browser Compatibility

Supports modern browsers with:

* ES6+
* Canvas API
* Blob/File API

Tested on:

* Chrome
* Firefox
* Safari
* Edge
