const express = require('express');
const router = express.Router();
const { 
  addContactController,
  getContactsController,
  getAcceptedContacts,
  getPendingContacts,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');

router.post('/add-contact', addContactController);
router.get('/all-contacts', getContactsController);
router.get('/accepted', getAcceptedContacts);
router.get('/pending', getPendingContacts);
router.put('/update-status', updateContactStatus);
router.delete('/delete/:id', deleteContact);


module.exports = router;

