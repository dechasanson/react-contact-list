import React, { useState } from "react";

import { fetchAPI } from "../api";

const ContactList = (props) => {
  const allContacts = props.contactList;
  const setContactList = props.setContactList;

  // fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
  //   .then((data) => {
  //     setContactList(data.contacts);
  //   })
  //   .catch(console.error);

  return (
    <div className="contacts">
      {allContacts.map((contact, index) => {
        return (
          <div
            className="contact"
            key={index}
            style={{ border: "1px solid black" }}
          >
            <h3 id="contactName" className="contactInfo">
              {contact.name} ({contact.contactType})
            </h3>
            <p className="contactInfo">Phone: {contact.phoneNumber}</p>
            <p className="contactInfo">Address: {contact.address}</p>
            <p className="contactInfo">Email: {contact.email}</p>
            <div className="contactNotes">Notes about {contact.name}:</div>
            <button
              className="editContact"
              onClick={async () => {
                fetchAPI();
              }}
            >
              Change Contact Info
            </button>
            <button
              className="deleteContact"
              onClick={async () => {
                fetchAPI(
                  `https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}`,
                  "DELETE",
                  { name: contact.name, contactType: contact.contactType }
                );
                fetchAPI(
                  "https://univ-contact-book.herokuapp.com/api/contacts"
                ).then((data) => {
                  const { contacts } = data;
                  setContactList(contacts);
                  window.location.reload(false); //find out what's more appropriate than this
                });
              }}
            >
              Rid this Person From Your Life
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
