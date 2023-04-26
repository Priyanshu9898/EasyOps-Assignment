import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : [];
  });
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate names and contact numbers
    const duplicate = contacts.find(
      (contact) =>
        (contact.firstName.toLowerCase() === firstName.toLowerCase() &&
          contact.lastName.toLowerCase() === lastName.toLowerCase()) ||
        contact.contactNumber === contactNumber
    );

    if (duplicate) {
      alert("Name or contact number already exists");
      return;
    }

    const newContact = { firstName, lastName, contactNumber };
    setContacts([...contacts, newContact]);

    // Clear input fields
    setFirstName("");
    setLastName("");
    setContactNumber("");
  };

  const handleDelete = (contactToDelete) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((contact) => contact !== contactToDelete));
    }
  };

  const handleSort = () => {
    setSortAsc(!sortAsc);
    setContacts(
      [...contacts].sort((a, b) =>
        sortAsc
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName)
      )
    );
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">

      <form onSubmit={handleSubmit} className="form-container">
      <h1 className="header">Contacts</h1>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        <button type="submit">Add Contact</button>
      </form>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th onClick={handleSort}>Name {sortAsc ? "▲" : "▼"}</th>
            <th>Contact Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{contact.firstName + " " + contact.lastName}</td>
              <td>{contact.contactNumber}</td>
              <td>
                <button onClick={() => handleDelete(contact)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
