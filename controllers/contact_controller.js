const asyncHandler = require("express-async-handler");
const contact = require("../models/contactsModel");

///@des Get All Contact
///@route Get /api/contacts
///@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contact.find({ user_id: req.user.id });
    res.status(200).json({ status: true, message: "Get All Contacts", data: contacts });
});

///@des Create New Contact
///@route POST /api/contacts
///@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw Error("All Fields are mandatory !");
    }
    const contacts = await contact.create({
        name, email, phone, user_id: req.user.id
    });
    res.status(201).json({ status: true, message: "Created Contacts", data: contacts });
});

///@des GET Single Contact
///@route Get  /api/contacts/:ID
///@access private
const getSingleContact = asyncHandler(async (req, res) => {
    const contacts = await contact.findById(
        req.params.id
    );
    if (!contacts) {
        res.status(404);
        throw Error("Contact not Found");
    }
    res.status(200).json({ status: true, message: `Get Contact ${req.params.id}`, data: contacts });
});

///@des PUT Contact
///@route PUT /api/contacts
///@access private
const updateContact = asyncHandler(async (req, res) => {

    const contacts = await contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw Error("Contact not Found");
    }
    const updateContacts = await contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: `Update Contact ${req.params.id}`, data: updateContacts });
});

///@des DELETE Contact
///@route DELETE /api/contacts
///@access public
const deleteContact = asyncHandler(async (req, res) => {
    const contacts = await contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw Error("Contact not Found");
    }
    const deleteContacts = await contact.findByIdAndRemove(req.params.id);
    res.status(200).json({ status: true, message: `Delete Contact ${req.params.id}`, data: deleteContacts });
});


module.exports = { getContacts, createContact, getSingleContact, updateContact, deleteContact };