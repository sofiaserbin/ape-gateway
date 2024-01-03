import express from "express";
const router = express.Router()
import { mqttReq } from "../../index.js"

/**
 * Get /v1/logs
 * @summary Returns all logs
 * @tags logs
 * @param {number} query.offset - Pagination offset 
 * @param {number} query.limit - Pagination limit
 * @return {object} 200 - Success response
 * @return {object} 400 - Invalid offset or limit
 */
router.get("/", (req, res, next) => {
    const queryParams = {
        offset: req.query.offset,
        limit: req.query.limit
    };

    mqttReq.request(
        "v1/logging/read",
        (payload) => {
            req.mqttResponse = payload;
            return next();
        },
        JSON.stringify({ ...queryParams, token: req.token })
    );
});

export default router