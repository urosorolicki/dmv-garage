# DMV Garage

This repository contains the source code for the DMV Garage website, a showcase for a specialized car workshop in Belgrade that focuses on ECU chiptuning, LED lighting installation, auto electronics, and interior customization. The site is built as a single-page application using Next.js and styled with Tailwind CSS, featuring a modern, dark, performance-oriented design.

## Features

*   **Dynamic Hero Section**: An immersive video background with animated text and lighting effects to capture the user's attention.
*   **Interactive Service Configurator**: A "before-and-after" image comparison slider for interior and electronics work.
*   **Chiptuning Performance Calculator**: A detailed form where users can select their vehicle's make, model, and engine to see estimated performance gains (horsepower and torque) from a Stage 1 ECU remap.
*   **Performance Gains Visualization**: A dynamic line chart, built with Recharts, that visualizes the power curve difference between stock and remapped ECU configurations.
*   **Instagram Gallery**: The gallery (home page preview and `/galerija`) shows the workshop's Instagram posts with their captions, filtered by service category and viewed in a lightbox. Falls back to the Cloudinary photos when Instagram isn't configured.
*   **WhatsApp Integrated Contact Form**: A streamlined contact form that, upon submission, generates a pre-filled WhatsApp message to facilitate easy appointment scheduling.
*   **Fully Responsive Design**: The layout is optimized for a seamless experience across all devices, from mobile phones to desktops.
*   **Component-Based Architecture**: Built with a rich set of reusable UI components based on shadcn/ui and custom-built components for specific features.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Charting**: [Recharts](https://recharts.org/)
*   **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Project Structure

The repository is organized into the following main directories:

```
.
├── app/              # Next.js App Router pages, layout, and global styles
├── components/       # All React components
│   ├── ui/           # Reusable UI components from shadcn/ui
│   └── ...           # Main section components (hero, gallery, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── public/           # Static assets (images, videos, fonts)
```

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/urosorolicki/dmv-garage.git
    cd dmv-garage
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Instagram galerija

The gallery reads the posts from the **@dmv__garage** Instagram account, so every photo comes with the description the owner wrote. New posts show up on the site within an hour (`revalidate = 3600`).

One-time setup:

1.  The Instagram account must be a **Professional** account (Business or Creator). In the Instagram app: Settings → Account type and tools → Switch to professional account. It's free.
2.  At [developers.facebook.com](https://developers.facebook.com/apps) create an app (type *Business*) and add the **Instagram** product → *API setup with Instagram login*.
3.  Under *Generate access tokens*, add the @dmv__garage account (the owner logs in and approves it), then click **Generate token**. This gives a long-lived token (valid 60 days).
4.  In Vercel → Project → Settings → Environment Variables, add `INSTAGRAM_ACCESS_TOKEN` with that token, and redeploy.

The site renews the token itself once a day (`lib/instagram.ts` → `keepTokenAlive`), so it doesn't expire as long as the site gets visits. If the token is missing, wrong or expired, the site doesn't break. It shows the Cloudinary photos from `lib/gallery-data.ts` instead and logs `[instagram] falling back…` in the Vercel logs.

Categories (LED, Chiptuning, Enterijer, Elektronika) are guessed from keywords in the caption (`RULES` in `lib/instagram.ts`). A post that matches no keyword appears only under "Sve".

## Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the project files using ESLint.
