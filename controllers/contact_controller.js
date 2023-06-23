const asyncHandler = require("express-async-handler");
const contact = require("../models/contactsModel");
///@des Get All Contact
///@route Get /api/contacts
///@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contact.find();
    res.status(200).json({ status: true, message: "Get All Contacts", data: contacts });
});

///@des Create New Contact
///@route POST /api/contacts
///@access public
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw Error("All Fields are mandatory !");
    }
    const contacts = await contact.create({
        name, email, phone
    });
    res.status(201).json({ status: true, message: "Create Contacts", data: contacts });
});

///@des GET Single Contact
///@route Get  /api/contacts/:ID
///@access public
const getSingleContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get Contact ${req.params.id}` });
});

///@des C All Contact
///@route PUT /api/contacts
///@access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Contact ${req.params.id}` });
});

///@des DELETE Contact
///@route DELETE /api/contacts
///@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Contact ${req.params.id}` });
});


module.exports = { getContacts, createContact, getSingleContact, updateContact, deleteContact };