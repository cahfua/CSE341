const router = require("express").Router();
const { getAllContacts, getSingleContact } = require("../controllers/contactsController");

router.get("/", getAllContacts);
router.get("/:id", getSingleContact);

module.exports = router;
