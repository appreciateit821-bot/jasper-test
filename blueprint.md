# Blueprint: The Artist's Portfolio

## Overview

This project is a personal portfolio website for an artist who is also a developer. The site showcases their work across three disciplines: painting, acting, and writing. It aims to provide an immersive and aesthetically pleasing experience that reflects the artist's multifaceted creativity. The site is built with modern, framework-less web technologies and features a clean, responsive design.

## Design and Style

*   **Aesthetics:** Modern, clean, and minimalist, with a focus on visual balance and typography.
*   **Color Palette:** A sophisticated dark theme, using shades of black and gray, with accent colors that change depending on the section being viewed.
*   **Typography:** Expressive and legible fonts are used to create a clear hierarchy and enhance readability.
*   **Interactivity:** Subtle animations and transitions are used to create a dynamic and engaging user experience. This includes hover effects, page transitions, and color-shifting backgrounds.
*   **Layout:** A responsive grid-based layout ensures the site looks great on all devices, from mobile phones to desktop monitors.

## Core Features

*   **Navigation:** A persistent, modern navigation bar allows users to easily move between the Home, About, Painting, Acting, and Writing sections.
*   **Web Components:** The site utilizes custom Web Components for reusable UI elements like the navigation bar and footer, ensuring code modularity and encapsulation.
*   **Dynamic Content Sections:** Each section (Painting, Acting, Writing) is loaded dynamically, providing a seamless single-page application (SPA) feel.
*   **Newsletter Subscription:** A newsletter form allows users to subscribe for updates. Form submissions are handled by a custom serverless function.

## Current Plan: Implement Serverless Newsletter Form

This plan replaces the third-party Formspree service with a custom serverless backend using Cloudflare Workers to handle newsletter subscriptions.

### Steps:

1.  **Create Serverless Function:**
    *   Create a new file at `functions/subscribe.js`.
    *   This function will be a Cloudflare Worker that listens for POST requests at the `/api/subscribe` endpoint.
    *   It will receive an email address from the request body.
    *   It will then securely forward the subscription information to the site owner's email address (`appreciateit821@gmail.com`).

2.  **Configure Cloudflare Worker:**
    *   Update `wrangler.jsonc` to define the new worker, its route, and necessary compatibility flags.

3.  **Update Frontend HTML:**
    *   Modify `index.html` to remove the `action` and `method` attributes from the newsletter form.
    *   Assign an ID (`newsletter-form`) to the form for easy targeting with JavaScript.

4.  **Update Frontend JavaScript:**
    *   Modify `main.js` to add an AJAX submission handler for the newsletter form.
    *   When the form is submitted, the script will:
        *   Prevent the default page reload.
        *   Send the email data to the `/api/subscribe` endpoint using the `fetch` API.
        *   On a successful response, dynamically replace the form with a "Thank you" message.
        *   On a failure, display an appropriate error message to the user.
