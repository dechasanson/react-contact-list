import React, { useState, useEffect } from "react";

import ReactDOM from "react-dom";

import { Title, ContactForm, ContactList } from "./components";

import { fetchAPI } from "./api";

const App = () => {
  const [contactList, setContactList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function addNewContact(newContact) {
    setContactList([...contactList], newContact);
  }

  useEffect(() => {
    fetchAPI("https://univ-contact-book.herokuapp.com/api/contacts")
      .then((data) => {
        setContactList(data.contacts);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app">
      <Title />
      <ContactForm
        addNewContact={addNewContact}
        contactList={contactList}
        setContactList={setContactList}
        searchTerm={searchTerm}
      />
      <ContactList
        addNewContact={addNewContact}
        contactList={contactList}
        setContactList={setContactList}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
