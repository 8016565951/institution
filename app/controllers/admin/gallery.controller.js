const { siteConfig } = require("../../config/site");
const { AppError } = require("../../lib/helpers");
const {
    generateFileURL,
    unlinkFile,
    getFilePathFromURL,
} = require("../../lib/utils");
const { gallerySchema } = require("../../lib/validations");
const { galleryRepo } = require("../../repos");

class GalleryController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getGalleryUI = async (req, res) => {
        try {
            const user = req.ctx?.user;
            const galleries = await galleryRepo.get();

            return res.render("admin/gallery", {
                title: `Gallery | Admin Panel | ${siteConfig.name}`,
                galleries,
                user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createGalleryUI = async (req, res) => {
        try {
            const user = req.ctx?.user;

            return res.render("admin/gallery-create", {
                title: `Create Gallery | Admin Panel | ${siteConfig.name}`,
                user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateGalleryUI = async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.ctx?.user;

            const gallery = await galleryRepo.getById(id);
            if (!gallery) throw new AppError("Gallery not found", "NOT_FOUND");

            return res.render("admin/gallery-update", {
                title: `Update Gallery | Admin Panel | ${siteConfig.name}`,
                gallery,
                user,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createGallery = async (req, res) => {
        try {
            const { error, value } = gallerySchema.validate(req.body);
            if (error) throw error;

            if (!req.file)
                throw new AppError("Image is required", "BAD_REQUEST");
            const imageUrl = generateFileURL(req, req.file);

            await galleryRepo.create({
                ...value,
                imageUrl,
            });

            return res.redirect("/admin/galleries");
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateGallery = async (req, res) => {
        try {
            const { id } = req.params;

            const { error, value } = gallerySchema.validate(req.body);
            if (error) throw error;

            const gallery = await galleryRepo.getById(id);
            if (!gallery) throw new AppError("Gallery not found", "NOT_FOUND");

            let imageUrl = gallery.imageUrl;
            if (req.file) {
                imageUrl = generateFileURL(req, req.file);
                unlinkFile(getFilePathFromURL(gallery.imageUrl));
            }

            await galleryRepo.update(id, {
                ...value,
                imageUrl,
            });

            return res.redirect("/admin/galleries");
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    deleteGallery = async (req, res) => {
        try {
            const { id } = req.params;

            const gallery = await galleryRepo.getById(id);
            if (!gallery) throw new AppError("Gallery not found", "NOT_FOUND");

            unlinkFile(getFilePathFromURL(gallery.imageUrl));
            await galleryRepo.delete(id);

            return res.redirect("/admin/galleries");
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new GalleryController();
