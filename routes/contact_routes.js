const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact_controller");
const validateToken = require("../middleware/validationTokenHandler");


router.use(validateToken);
router.route("/").get(contactController.getContacts).post(contactController.createContact);

router.route("/:id").get(contactController.getSingleContact).put(contactController.updateContact).delete(contactController.deleteContact);

module.exports = router;