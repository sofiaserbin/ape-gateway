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
  mqttReq.request("v1/clinics/read",
  (payload) => {
    req.mqttResponse = payload
    return next()
  },
  JSON.stringify('')
  )
  
});

/**
 * Post /v1/clinics
 * @summary Created a new clinic
 * @tags clinics
 * @return {object} 200 - Success response
 */
router.post("/", async (req, res, next) => {
  mqttReq.request("v1/clinics/create",
  (payload) => {
    req.mqttResponse = payload
    return next()
  },
  JSON.stringify({ name: req.body.name, latitude: req.body.latitude, longitude: req.body.longitude})
  )
  
});

/**
 * Patch /v1/clinics/{clinicId}
 * @summary Edits a clinic by id
 * @tags clinics
 * @return {object} 200 - Success response
 * @return {object} 404 - Clinic with this id does not exist
 * @return {object} 400 - Bad request
 */
router.patch("/:clinicId", async (req, res, next) => {
  const payload = {
    clinicId: req.params.clinicId,
    requestBody: req.body
};

  mqttReq.request("v1/clinics/update",
  (payload) => {
    req.mqttResponse = payload
    return next()
  },
  JSON.stringify(payload)
  )
  
});

/**
 * Delete /v1/clinics/{clinicId}
 * @summary Deletes a clinic by id
 * @tags clinics
 * @return {object} 200 - Success response
 * @return {object} 404 - Clinic with this id does not exist
 */
router.delete("/:clinicId", async (req, res, next) => {
  mqttReq.request("v1/clinics/delete",
  (payload) => {
    req.mqttResponse = payload
    return next()
  },
  JSON.stringify({ clinicId : req.params.clinicId})
  )
  
});

export default router
