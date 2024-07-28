const { AppError } = require("../../lib/helpers");
const { CResponse, handleError, generateFileURL } = require("../../lib/utils");
const { gallerySchema } = require("../../lib/validations");
const { galleryRepo } = require("../../repos");

class GalleryController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getGallery = async (req, res) => {
        try {
            const galleries = await galleryRepo.get();

            return CResponse({
                res,
                message: "OK",
                data: galleries,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getGalleryById = async (req, res) => {
        try {
            const { id } = req.params;
            const gallery = await galleryRepo.getById(id);

            return CResponse({
                res,
                message: "OK",
                data: gallery,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createGallery = async (req, res) => {
        const { error, value } = gallerySchema.validate(req.body);
        if (error) throw error;

        if (!req.file) throw new AppError("Image is required", "BAD_REQUEST");
        const imageUrl = generateFileURL(req, req.file);

        const gallery = await galleryRepo.create({
            ...value,
            imageUrl,
        });

        try {
            return CResponse({
                res,
                message: "CREATED",
                data: gallery,
            });
        } catch (err) {
            return handleError(err, res);
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
            }

            await galleryRepo.update(id, {
                ...value,
                imageUrl,
            });

            return CResponse({
                res,
                message: "UPDATED",
            });
        } catch (err) {
            return handleError(err, res);
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

            await galleryRepo.delete(id);

            return CResponse({
                res,
                message: "DELETED",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new GalleryController();