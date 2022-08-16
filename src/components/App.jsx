import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const locContacts = localStorage.getItem('contacts');
    if (locContacts) {
      this.setState({ contacts: JSON.parse(locContacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (name, number) => {
    const names = this.state.contacts.map(contact => contact.name);

    if (!names.includes(name)) {
      const newContact = {
        name: name,
        id: nanoid(),
        number: number,
      };
      this.setState({
        contacts: [...this.state.contacts, newContact],
      });
    } else alert(`${name} is already in contacts`);
  };

  handleInput = e => {
    this.setState({
      filter: e.target.value,
    });
  };
  deleteId = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  contactList = () => {
    const { contacts, filter } = this.state;
    const lowercaseFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(lowercaseFilter);
    });
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter onChange={this.handleInput} />
          <ContactList contacts={this.contactList()} deleteId={this.deleteId} />
        </Section>
      </>
    );
  }
}
