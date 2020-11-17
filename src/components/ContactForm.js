import React, { useState } from "react";

import { fetchAPI } from "../api";

const ContactForm = (props) => {
  const { addNewContact } = props;

  const [contactName, setContactName] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactType, setContactType] = useState("");

  function clearForm() {
    setContactName("");
    setContactAddress("");
    setContactEmail("");
    setContactPhone("");
    setContactType("");
  }

  return (
    <form
      className="contactForm"
      onSubmit={async (event) => {
        event.preventDefault();

        const contactData = {
          name: contactName,
          address: contactAddress,
          phoneNumber: contactPhone,
          email: contactEmail,
          contactType: contactType,
        };

        try {
          console.log(contactData);
          const newContact = await fetchAPI(
            `https://univ-contact-book.herokuapp.com/api/contacts`,
            "POST",
            contactData
          );
          addNewContact(newContact);
          clearForm();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {/* eventually, add a ternary here to change title to "edit contact" if editing a contact that already exists */}
      <h3>Create New Contact</h3>
      <label>Contact Name</label>
      <input
        type="text"
        placeholder="Enter Contact Name"
        value={contactName}
        onChange={(event) => setContactName(event.target.value)}
      />
      <label>Contact Address</label>
      <input
        type="text"
        placeholder="Enter Contact Address"
        value={contactAddress}
        onChange={(event) => setContactAddress(event.target.value)}
      />
      <label>Contact Email</label>
      <input
        type="text"
        placeholder="Enter Contact Email"
        value={contactEmail}
        onChange={(event) => setContactEmail(event.target.value)}
      />
      <label>Contact Phone Number</label>
      <input
        type="text"
        placeholder="Enter Contact Phone Number"
        value={contactPhone}
        onChange={(event) => setContactPhone(event.target.value)}
      />
      <label for="contactType">Contact Type</label>
      <select
        name="contactType"
        id="contactType"
        onChange={(event) => setContactType(event.target.value)}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>

      <button>SUBMIT</button>
    </form>
  );
};

export default ContactForm;
