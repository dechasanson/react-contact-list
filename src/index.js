import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

import { Title, RenderContacts, ContactForm, Search } from "./components";

import { fetchAPI } from "./api";

const App = () => {
  const [contactList, setContactList] = useState([]);
  const [activeContact, setActiveContact] = useState({});
  const [filterTerm, setFilterTerm] = useState("");

  function alphaOrder(contactList) {
    contactList.sort((a, b) => {
      let fa = a.name.toLowerCase();
      let fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }

      if (fa > fb) {
        return 1;
      }

      return 0;
    });
  }

  function addNewContact(newContact) {
    newContact.comments = newContact.comments || [];
    setContactList([...contactList, newContact]);
  }

  function replaceContact(oldContact, newContact) {
    let newContacts = contactList.map((contact) => {
      if (contact === oldContact) {
        return newContact;
      }
      return contact;
    });
    setContactList(newContacts);
  }

  useEffect(() => {
    fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
      .then((data) => {
        setContactList(data.contacts);
        alphaOrder(contactList);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <Title />
      <ContactForm
        addNewContact={addNewContact}
        replaceContact={replaceContact}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
      />
      <Search filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
      <RenderContacts
        addNewContact={addNewContact}
        contactList={contactList}
        setContactList={setContactList}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        filterTerm={filterTerm}
        alphaOrder={alphaOrder}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
