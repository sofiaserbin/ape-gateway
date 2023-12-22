import express from "express";
const router = express.Router({mergeParams:true})
import { mqttReq } from "../../index.js"

/**
 * Get /v1/clinics
 * @summary Returns all clinics
 * @tags clinics
 * @return {object} 200 - Success response
 */
router.get("/", async (req, res, next) => {
  console.log("bob")
  mqttReq.request("v1/clinics/read",
  (payload) => {
    req.mqttResponse = payload
    return next()
  },
  JSON.stringify('')
  )
  
});

export default router
