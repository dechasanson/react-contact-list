import React, { useEffect, useState } from "react";

import { fetchAPI } from "../api";

const ContactForm = (props) => {
  const {
    addNewContact,
    activeContact,
    setActiveContact,
    replaceContact,
  } = props;

  const [address, setAddress] = useState(activeContact.address);
  const [name, setName] = useState(activeContact.name);
  const [phoneNumber, setPhoneNumber] = useState(activeContact.phoneNumber);
  const [email, setEmail] = useState(activeContact.email);
  const [type, setType] = useState(activeContact.contactType);

  function clearForm() {
    setName("");
    setAddress("");
    setEmail("");
    setPhoneNumber("");
    setType("personal");
  }

  useEffect(() => {
    setAddress(activeContact.address || "");
    setName(activeContact.name || "");
    setPhoneNumber(activeContact.phoneNumber || "");
    setEmail(activeContact.email || "");
    setType(activeContact.contactType || "personal");
  }, [activeContact]);

  return (
    <form
      className="contactForm"
      onSubmit={async (event) => {
        event.preventDefault();

        const contactData = {
          name: name,
          address: address,
          phoneNumber: phoneNumber,
          email: email,
          contactType: type,
        };

        if (activeContact.id) {
          const result = await fetchAPI(
            `https://univ-contact-book.herokuapp.com/api/contacts/${activeContact.id}`,
            "PATCH",
            contactData
          );
          console.log(result);
          replaceContact(activeContact, result.contact);
          clearForm();
          setActiveContact({});
        } else
          try {
            const newContact = await fetchAPI(
              "https://univ-contact-book.herokuapp.com/api/contacts",
              "POST",
              contactData
            );
            addNewContact(newContact.contact);
            clearForm();
          } catch (error) {
            console.error(error);
          }
      }}
    >
      {activeContact.id ? (
        <h3>Edit Contact Info </h3>
      ) : (
        <h3>Create New Contact</h3>
      )}
      <input
        type="text"
        placeholder="Enter Contact Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Contact Address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Contact Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Contact Phone Number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <select
        name="contactType"
        id="contactType"
        value={type}
        onChange={(event) => setType(event.target.value)}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>
      {activeContact.id ? (
        <>
          <button>Submit Edits</button>
          <button
            onClick={(event) => {
              event.preventDefault();
              setActiveContact({});
              clearForm();
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <button>ADD CONTACT</button>
      )}
    </form>
  );
};

export default ContactForm;
