const { MongooseError } = require("mongoose");
const { siteConfig } = require("../../config/site");
const { AppError } = require("../../lib/helpers");
const {
    generateFileURL,
    unlinkFile,
    getFilePathFromURL,
} = require("../../lib/utils");
const { bannerSchema } = require("../../lib/validations");
const { bannerRepo } = require("../../repos");

class BannerController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    showUI = async (req, res) => {
        try {
            const banners = await bannerRepo.get();

            return res.render("admin/banners", {
                title: `Banners | Admin Panel | ${siteConfig.name}`,
                banners,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createUI = async (req, res) => {
        try {
            return res.render("admin/banner-create", {
                title: `Create Banner | Admin Panel | ${siteConfig.name}`,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateUI = async (req, res) => {
        try {
            const { id } = req.params;

            const banner = await bannerRepo.getById(id);
            if (!banner) throw new AppError("Banner not found", "NOT_FOUND");

            return res.render("admin/banner-update", {
                title: `Update Banner | Admin Panel | ${siteConfig.name}`,
                banner,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    create = async (req, res) => {
        try {
           
            const { error, value } = bannerSchema.validate(req.body);
            if (error) throw error;

            if (!req.file)
                throw new AppError("Banner image is required", "BAD_REQUEST");

            const bannerUrl = generateFileURL(req, req.file);

            await bannerRepo.create({
                ...value,
                imageUrl: bannerUrl,
            });

            return res.redirect("/admin/banners");
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file.path);
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    update = async (req, res) => {
        try {
            const { id } = req.params;

            const { error, value } = bannerSchema.validate(req.body);
            if (error) throw error;

            const banner = await bannerRepo.getById(id);
            if (!banner) throw new AppError("Banner not found", "NOT_FOUND");

            let imageUrl = banner.imageUrl;
            if (req.file) {
                imageUrl = generateFileURL(req, req.file);
                await unlinkFile(getFilePathFromURL(banner.imageUrl));
            }

            await bannerRepo.update(id, {
                ...value,
                imageUrl,
            });

            return res.redirect("/admin/banners");
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file?.path);
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    delete = async (req, res) => {
        try {
            const { id } = req.params;

            const banner = await bannerRepo.getById(id);
            if (!banner) throw new AppError("Banner not found", "NOT_FOUND");

            await unlinkFile(getFilePathFromURL(banner.imageUrl));
            await bannerRepo.delete(id);

            return res.redirect("/admin/banners");
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new BannerController();
