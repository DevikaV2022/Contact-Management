const Contact = require('../models/contactModel');



exports.addContactController = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      status: "New"
    });

    await newContact.save();

    res.status(200).json({
      message: "Contact added successfully", contact: newContact
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Save user contact
exports.saveContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get all contacts for admin
exports.getContactsController = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
}


// Get accepted contacts
exports.getAcceptedContacts = async (req, res) => {
  const contacts = await Contact.find({ status: "Accepted" });
  res.status(200).json(contacts);
}

// pending contacts
exports.getPendingContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

// contact status : accept
exports.updateContactStatus = async (req, res) => {
  const { id, status } = req.body;

  await Contact.findByIdAndUpdate(id, { status });

  res.status(200).json("Status updated");
};


exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    res.status(200).json({ message: "Contact deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
};