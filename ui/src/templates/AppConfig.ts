export const AppConfig = {
    site_name: "WellyBelly",
    title: "WellyBelly Health",
    description: "A personal health and fitness tracker",
    locale: "en",
    apiUrl: process.env.API_URL || 'http://localhost:8000', //change this to point to your api,
    nav_bar_pages: [
        { label: "Food", link: "/food" },
        { label: "Fitness", link: "" },
        { label: "Measurements", link: "" },
    ],
    nav_bar_menu: [
        { label: "Profile", link: "" },
        { label: "Logout", link: "/" },
    ]

};