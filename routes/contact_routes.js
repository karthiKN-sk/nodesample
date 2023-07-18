const express = require("express");
const router = express.Router();
const { getContacts, createContact, getSingleContact, updateContact, deleteContact } = require("../controllers/contact_controller");
const validateToken = require("../middleware/validationTokenHandler");


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getSingleContact).put(updateContact).delete(deleteContact);

module.exports = router;