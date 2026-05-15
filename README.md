# Vishal S — Software Engineer Portfolio

Welcome to the source code for my personal developer portfolio! This project showcases my experience, education, projects, and certifications through a uniquely designed, dark-themed, interactive web experience.

## 👨‍💻 About Me

I am **Vishal S**, a Software Engineer based in Coimbatore, India. I specialize in building robust, scalable backend systems and intelligent web applications. 

**My Core Stack:**
- **Languages:** Python, C, Java, JavaScript, R
- **Backend & Frameworks:** Django, FastAPI, Flask, Postgres, MySQL
- **Frontend:** React, HTML/CSS, Tailwind, Streamlit
- **AI & Data:** LangChain, Pinecone, Hugging Face

Feel free to connect with me:
- **Email:** vishalsubramaniam0@gmail.com
- **GitHub:** [vishals25](https://github.com/vishals25)
- **LinkedIn:** [vishals25](https://www.linkedin.com/in/vishals25)

---

## 🛠 Technical Overview of this Project

This portfolio is built as a highly interactive **React + Vite** single-page application. It focuses on a premium, minimalist design with custom scrolling behaviors, completely bypassing heavy UI libraries in favor of raw React and Vanilla CSS.

### Key Features & Architecture:

- **Fully Data-Driven:** All content (Experience, Projects, Skills, Certifications) is decoupled from the UI components and strictly served via lightweight `.json` files in `public/data/`. Updating the portfolio simply requires editing a JSON file.
- **Scroll-Hijacking & Native Handoff:** The Hero section features a complex 2-pane layout where the left profile side is fixed, while the right side (Experience/Education) scrolls via custom `wheel` event hijacking. Once the right pane reaches the bottom, control is seamlessly handed back to the browser's native scroll engine to continue down the page.
- **Dynamic Intersection Observers:** The Projects section uses the `IntersectionObserver` API to track which project is currently active on screen, dynamically highlighting the specific technologies used for that project in a sticky "Skills Cloud" on the right.
- **Custom Interactive Canvas:** Features a performant `requestAnimationFrame` Particle Background written in native Canvas 2D. The particles react to mouse movement with subtle physics (push/dampen).
- **SVG Math Generation:** The Certifications section programmatically calculates an SVG meander-path timeline using React's `useMemo`, rendering a zig-zagging glowing path that dynamically adapts to the number of certifications available.
- **Zero-Dependency Styling:** Entirely styled using Vanilla CSS (`index.css`), utilizing CSS variables for the design system, modern flexbox/grid layouts, and native CSS transitions/animations without the overhead of Tailwind or CSS-in-JS libraries.

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

## 📝 Updating Content
To update the text or add new experiences/projects, simply modify the corresponding JSON files located in the `public/data/` directory. The React components will map and render the new data automatically.
