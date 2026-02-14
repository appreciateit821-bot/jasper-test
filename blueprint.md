# Blueprint: Jasper - The Artist Portfolio

## 1. Project Overview

This project is a portfolio website for Jasper, an artist with a rich background as a tech startup CEO. The site aims to showcase his diverse artistic endeavors—painting, acting, and writing—while reflecting his unique identity that blends technological sophistication with artistic sensibility.

The core concept is **"The Orbit of Creation"**: an immersive, interactive experience where users explore Jasper's artistic universe. The main page acts as a dynamic hub, allowing a spectacular at-a-glance preview of each artistic category before diving deeper.

## 2. Design System & Tone of Manner

*   **Primary Theme:** Sophisticated Dark Mode, evoking a cosmic or deep-sea feel.
*   **Color Palette:**
    *   Background: Deep, dark gray (`#121218`)
    *   Primary Text: Off-white (`#e0e0e0`)
    *   Accent Colors: Terracotta (`#E2725B`) and Deep Green (`#004D40`), used for highlights, glows, and interactive elements.
*   **Typography:**
    *   Headlines: `Playfair Display` (Serif)
    *   Body/UI: `Inter` (Sans-serif)
*   **Overall Vibe:** Cinematic, fluid, and elegant. A fusion of a high-tech interface and a premium art gallery.

## 3. Application Architecture & UX Design

### **Phase 1: The Core - "The Orbit of Creation" (Current)**

*   **`index.html` (Main Screen):**
    *   **UI:** A central, glowing "JASPER" core. Three satellite elements (`Painting`, `Acting`, `Writing`) orbit the core. Subtle particle effects and trails enhance the cosmic feel.
    *   **UX:**
        1.  Satellites slowly orbit the core.
        2.  On hover, a satellite glows brighter and its orbital path becomes more prominent.
        3.  On click, a dramatic animation sequence triggers: other satellites fade back, the clicked satellite moves to a focal point, and a preview gallery (e.g., a horizontal carousel of thumbnails) unfolds around it.
        4.  Users can explore previews directly on the main page or click a "View All" button to navigate to the full category page.

### **Phase 2: The Galleries (Future Implementation)**

*   **`painting.html` (The Interactive Canvas):**
    *   **Entry:** User clicks a painting from the main page preview.
    *   **Layout:** A full-screen, high-resolution view of the selected painting.
    *   **UX 1 (Room View):** A toggle button seamlessly transitions the artwork into a pre-rendered, realistic room setting. Users can cycle through different environments (gallery, living room, office) to gauge the painting's scale and feel.
    *   **UX 2 (Detail Loupe):** On hover, a magnifying glass icon appears. On click, a circular loupe follows the cursor, revealing a magnified, high-detail view of the canvas texture and brushstrokes.
    *   **UX 3 (Artist's Note):** An elegant button slides in a semi-transparent panel containing Jasper's thoughts and process for the piece, with text appearing in a typing animation.

*   **`acting.html` (The Director's Cut):**
    *   **Layout:** A cinematic two-panel layout. A large video player on the right, and an interactive "Script & Analysis" timeline on the left.
    *   **UX:** The timeline on the left displays key scenes as markers. As the video plays, the corresponding marker on the timeline is highlighted. Clicking a marker jumps the video to that moment and displays the relevant script lines and Jasper's analytical notes below.

*   **`writing.html` (The Living Manuscript):**
    *   **Layout:** A clean, full-screen, single-column text layout focused on readability.
    *   **UX 1 (Atmosphere Control):** A minimalist icon-based "Sound Console" allows the user to select and play ambient sounds (e.g., rain, fireplace, forest) that match the mood of the text. The background color subtly shifts with the chosen theme.
    *   **UX 2 (Focus Mode):** A button fades out all UI, leaving only the text for a distraction-free reading experience. Paragraphs gently fade in as the user scrolls.

*   **`about.html` (The Journey):**
    *   **UI:** An engaging, scroll-based narrative using a combination of parallax effects, infographics, and typography to tell the story of Jasper's transition from tech to art.

## Current Step: Revamping the Main Page

*   **Objective:** Implement the "Orbit of Creation" concept on the main page.
*   **Actions:**
    1.  Restructure `index.html` to support the core-satellite layout and the preview galleries.
    2.  Overhaul `style.css` to create the orbiting animations, particle effects, and cinematic styling.
    3.  Develop `main.js` to manage the complex interactions: orbital calculations, click-to-expand animations, and dynamic loading of preview content.
