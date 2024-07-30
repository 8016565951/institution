const { MongooseError } = require("mongoose");
const {
    CResponse,
    handleError,
    unlinkFile,
    generateFileURL,
    getFilePathFromURL,
} = require("../../lib/utils");
const { AppError } = require("../../lib/helpers");
const { bannerRepo } = require("../../repos");
const { bannerSchema } = require("../../lib/validations");

class BannerController {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    getBanners = async (req, res) => {
        try {
            const banners = await bannerRepo.get();

            return CResponse({
                res,
                message: "OK",
                data: banners,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    getBannerById = async (req, res) => {
        try {
            const { id } = req.params;

            const banner = await bannerRepo.getById(id);
            if (!banner) throw new AppError("Banner not found", "NOT_FOUND");

            return CResponse({
                res,
                message: "OK",
                data: banner,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    createBanner = async (req, res) => {
        try {
            const { error, value } = bannerSchema.validate(req.body);
            if (error) throw error;

            if (!req.file)
                throw new AppError("Image is required", "BAD_REQUEST");

            const bannerUrl = generateFileURL(req, req.file);

            const banner = await bannerRepo.create({
                ...value,
                imageUrl: bannerUrl,
            });

            return CResponse({
                res,
                message: "CREATED",
                data: banner,
            });
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file?.path);
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    updateBanner = async (req, res) => {
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

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            if (!(err instanceof MongooseError))
                await unlinkFile(req.file?.path);
            return handleError(err, res);
        }
    };

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    deleteBanner = async (req, res) => {
        try {
            const { id } = req.params;

            const banner = await bannerRepo.getById(id);
            if (!banner) throw new AppError("Banner not found", "NOT_FOUND");

            await unlinkFile(getFilePathFromURL(banner.imageUrl));
            await bannerRepo.delete(id);

            return CResponse({
                res,
                message: "OK",
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

module.exports = new BannerController();
