export const siteConfig = {
    title: "Next Application",
    description: "This is a Next.js application",
    navItems: [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Contacts", path: "/contacts" },
    ],
    pagesContent: {
        "/:": { content: "Welcome to the Home Page!" },
        "/about": { content: "Learn more About Us on this page." },
        "/contacts": { content: "Get in touch with us through the Contact Page." }
    }
};