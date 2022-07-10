import { nanoid } from "nanoid";
import React, { Component } from "react";
import {ContactForm} from "./ContactForm/ContactForm";
import {ContactList} from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { Container, Box } from "./App.styled";

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  addContact = contact => {
    const { contacts } = this.state
  
    contacts.find(el => el.name.toLowerCase() === contact.name.toLowerCase())
      ? alert(`${contact.name} is already in contact!`)
      :this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value })
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };
  
  render() {
    const {  filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    console.log(this.state)

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}
        />
    
        <h2>Contacts</h2>
        <Box>
        <Filter
          value={filter}
          onChange={this.changeFilter}
        />
        
        <ContactList
          contacts={visibleContacts} 
          onDeleteContact={this.deleteContact}
          />
          </Box>
      </Container>
    );
  };
};
