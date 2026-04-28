# DMV Garage

This repository contains the source code for the DMV Garage website, a showcase for a specialized car workshop in Belgrade that focuses on ECU chiptuning, LED lighting installation, auto electronics, and interior customization. The site is built as a single-page application using Next.js and styled with Tailwind CSS, featuring a modern, dark, performance-oriented design.

## Features

*   **Dynamic Hero Section**: An immersive video background with animated text and lighting effects to capture the user's attention.
*   **Interactive Service Configurator**: A "before-and-after" image comparison slider that allows users to visualize the impact of services like LED upgrades, interior changes, and more.
*   **Chiptuning Performance Calculator**: A detailed form where users can select their vehicle's make, model, and engine to see estimated performance gains (horsepower and torque) from a Stage 1 ECU remap.
*   **Performance Gains Visualization**: A dynamic line chart, built with Recharts, that visualizes the power curve difference between stock and remapped ECU configurations.
*   **Filterable Portfolio Gallery**: An extensive gallery of completed projects that can be filtered by service category (LED, Chiptuning, etc.), with a built-in lightbox for viewing images.
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

## Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the project files using ESLint.
