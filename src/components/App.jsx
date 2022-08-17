import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
export const App = () => {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(savedContacts ? savedContacts : []);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const lsContacts = localStorage.getItem('contacts');

    if (lsContacts) {
      setContacts(JSON.parse(lsContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts) {
      const names = contacts.map(contact => contact.name);

      if (!names.includes(name)) {
        const newContact = {
          name: name,
          id: nanoid(),
          number: number,
        };
        setContacts(prevState => [newContact, ...prevState]);
      } else alert(`${name} is already in contacts`);
    }
  };

  const handleInput = e => {
    setFilter(e.target.value);
  };
  const deleteId = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const contactList = () => {
    const lowercaseFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(lowercaseFilter);
    });
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter onChange={handleInput} />
        <ContactList contacts={contactList()} deleteId={deleteId} />
      </Section>
    </>
  );
};
