const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel')

const { 
  addContactController,
  getContactsController,
  getAcceptedContacts,
  getPendingContacts,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');




// // Delete contact
// router.delete('/:id', async (req, res) => {
//   try {
//     await Contact.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

router.get('/all-contacts', async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
});


// pending contacts
router.get('/pending', async (req, res) => {
  const data = await Contact.find({ status: "New" });
  res.json(data);
});

// accepted contacts
router.get('/accepted', async (req, res) => {
  const data = await Contact.find({ status: "Accepted" });
  res.json(data);
});


router.post('/add-contact', addContactController);
router.get('/all-contacts', getContactsController);
router.get('/accepted', getAcceptedContacts);
router.get('/pending', getPendingContacts);
router.put('/update-status', updateContactStatus);
router.delete('/delete/:id', deleteContact);


module.exports = router;

