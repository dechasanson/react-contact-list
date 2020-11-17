import React, { useState } from "react";

import ReactDOM from "react-dom";

import { Title, ContactForm, ContactList } from "./components";

const App = () => {
  const [contactList, setContactList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function addNewContact(newContact) {
    setContactList([...contactList], newContact);
  }

  return (
    <div className="app">
      <Title />
      <ContactForm addNewContact={addNewContact} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
