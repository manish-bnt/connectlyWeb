const express = require('express')
const { addContact, deleteContact, updateContact } = require('../controllers/contactsController')
const middlewareAuth = require('../middleware/auth.js')
const router = express.Router()

router.post('/add-contact', middlewareAuth, addContact)

router.delete('/delete-contact/:index', middlewareAuth, deleteContact)

router.put('/update-contact', middlewareAuth, updateContact)
module.exports = router