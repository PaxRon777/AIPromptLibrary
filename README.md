# 🚀 Promptly - AI Prompt Library

**Promptly** is a lightweight, sleek, and highly functional web application designed to help you organize, manage, and quickly access your collection of AI prompts. Whether you are working with ChatGPT, Midjourney, Claude, or any other LLM, Promptly keeps your "prompt engineering" workflow organized in one beautiful place. Includes a backup file to import with demo data.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)
![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-lightitize.svg)

---

## ✨ Features

-   **Prompt Management**: Easily create, edit, and delete your custom prompts.
-   **Dynamic Categorization**: Create custom categories (e.g., *Coding*, *Creative Writing*, *Research*) and content types (e.g., *Image*, *Video*, *Scripting*).
-   **Smart Filtering & Search**: Instantly find what you need with a real-time search bar and multi-select filters for category and type.
-   **One-Click Copy**: Quickly copy prompt content to your clipboard with a single click.
-   **Data Portability**: Export your entire library (including categories and types) as a `.json` file for backup or migration, and import it back at any time.
-   **Persistent Storage**: Uses `localStorage` to keep your data saved in your browser automatically.
-   **Responsive Design**: A modern "Glassmorphism" UI that works beautifully on desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

-   **HTML5**: Semantic structure.
-   **Tailwind CSS**: For rapid, modern styling and responsive layout.
-   **Vanilla JavaScript**: Clean, framework-free logic for high performance.
-   **FontAwesome**: For intuitive iconography.
-   **LocalStorage API**: For client-side data persistence.

## 🚀 Getting Started

Since this is a static web application, there are no dependencies to install or build steps required.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PaxRon777/promptly.git
    ```
2.  **Navigate to the directory:**
    ```bash
    cd promptly
    ```
3.  **Launch the app:**
    Simply open `index.html` in any modern web browser.

## 📖 Usage Guide

### Adding a Prompt
1. Click the **+ Add Prompt** button in the top right corner.
2. Enter your Title, select a Category and Content Type (or create new ones).
3. Paste your prompt into the content area.
4. Add optional tags (separated by commas) for even better searchability.

### Organizing Your Library
- Use the **Categories** button to manage high-level groupings.
- Use the **Types** button to define specific outputs (e.g., "Python Script", "3D Render").
- Use the **Sort By** dropdown to organize your view by date or alphabetically.

### Backup & Migration
1. Click **Export** to download a `.json` file of your entire library.
2. To move your data to another computer, open the app on the new machine and click **Import** to upload that JSON file.

## 🧠 Development Note

This project was developed using **vibe coding**—an iterative, high-level conceptual development approach where the developer guides the "vibe" and intent while the AI handles the heavy lifting of implementation.

> **Built with the help of:** Gemma 4 12B QAT model.

## 📄 License

Distributed under the MIT License. Read [LICENSE](LICENSE) here 
