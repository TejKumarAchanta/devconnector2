const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const profileController = require("../controllers/profile");

router.get("/me", [auth], profileController.getCurrentUser);

router.post("/updateProfile", [auth], profileController.updateProfile);

router.get("/getAllProfiles", profileController.getAllProfiles);

router.get("/getProfileById/:id", [auth], profileController.getProfileById);

router.delete(
  "/deleteUserAndProfile",
  [auth],
  profileController.deleteUserAndProfile
);

router.put("/addExperience", [auth], profileController.addExperience);

router.delete("/deleteExperience/:id", [auth], profileController.deleteExperience);


router.put("/addEducation", [auth], profileController.addEducation);

router.delete("/deleteEducation/:id", [auth], profileController.deleteEducation);

module.exports = router;
