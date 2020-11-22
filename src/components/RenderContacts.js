import React, { useState } from "react";

import { fetchAPI } from "../api";

const ContactNoteForm = (props) => {
  const [content, setContent] = useState("");
  const { contact, setContactList } = props;

  return (
    <form className="notes-container">
      <input
        type="text"
        className="notesInput"
        placeholder=" enter note here then click 'Add Note'"
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
      ></input>
      <button
        className="notesButton"
        onClick={async (event) => {
          event.preventDefault();
          fetchAPI(
            `https://univ-contact-book.herokuapp.com/api/contacts/${contact.id}/comments`,
            "POST",
            {
              content: `${content}`,
            }
          )
            .then(() => {
              return fetchAPI(
                "https://univ-contact-book.herokuapp.com/api/contacts"
              );
            })
            .then((data) => {
              const { contacts } = data;
              setContactList(contacts);
              setContent("");
            });
        }}
      >
        Add Note
      </button>{" "}
    </form>
  );
};

const RenderContacts = (props) => {
  const {
    contactList,
    setContactList,
    setActiveContact,
    alphaOrder,
    filterTerm,
  } = props;

  return (
    <div className="contacts">
      {alphaOrder(contactList)}
      {contactList
        .filter(function (contact) {
          return contact.name.toLowerCase().includes(filterTerm.toLowerCase());
        })
        .map((contact, index) => {
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
              <div className="contactNotes">
                <ContactNoteForm
                  contact={contact}
                  setContactList={setContactList}
                  contactList={contactList}
                />

                <h4>Notes about {contact.name}:</h4>
                {contact.comments.map((comment, index) => {
                  return (
                    <>
                      <p className="notes">{comment.content}</p>
                      <span>
                        <button
                          className="deleteNote"
                          key={index}
                          onClick={async () => {
                            await fetchAPI(
                              `https://univ-contact-book.herokuapp.com/api/comments/${comment.id}`,
                              "DELETE"
                            );
                            const data = await fetchAPI(
                              "https://univ-contact-book.herokuapp.com/api/contacts"
                            );
                            const { contacts } = data;
                            setContactList(contacts);
                            alphaOrder(contactList);
                          }}
                        >
                          Delete Note
                        </button>{" "}
                      </span>
                    </>
                  );
                })}
              </div>
              <button
                className="editContact"
                onClick={() => {
                  setActiveContact(contact);
                  console.log(contactList);
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
                  )
                    .then(() => {
                      return fetchAPI(
                        "https://univ-contact-book.herokuapp.com/api/contacts"
                      );
                    })
                    .then((data) => {
                      const { contacts } = data;
                      setContactList(contacts);
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

export default RenderContacts;
