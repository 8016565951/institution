const siteConfig = {
    name: "Institution",
    description: "Best Institution in the world",
    owner: "Institution",
    emails: {
        support: "support@institution.com",
    },
    phone: "+1234567890",
    address: {
        street: "123 Street",
        city: "City",
        state: "State",
        country: "Country",
        zip: "12345",
    },
};

const menu = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "Gallery",
        url: "/gallery",
    },
    {
        name: "Contact",
        url: "/contact",
    },
    {
        name: "Blogs",
        url: "/blogs",
    },
];

module.exports = {
    siteConfig,
    menu,
};
