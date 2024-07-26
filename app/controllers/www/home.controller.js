class HomeController {
    index = (req, res) => {
        res.render("www/index");
    };

    about = (req, res) => {
        res.render("www/about");
    };

    contact = (req, res) => {
        res.render("www/contact");
    };

    services = (req, res) => {
        res.render("www/services");
    };

    portfolio = (req, res) => {
        res.render("www/portfolio");
    };
    portfolioDetails = (req, res) => {
        res.render("www/portfolio-details");
    };

    pricing = (req, res) => {
        res.render("www/pricing");
    };

    blog = (req, res) => {
        res.render("www/blog");
    };

    blogSingle = (req, res) => {
        res.render("www/blog-single");
    };

    team = (req, res) => {
        res.render("www/team");
    };

    testimonials = (req, res) => {
        res.render("www/testimonials");
    };
}

module.exports = new HomeController();
