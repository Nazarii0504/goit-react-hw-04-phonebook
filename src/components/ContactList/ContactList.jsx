// import { ContactsList, Button } from './ContactList.styled';
import PropTypes from 'prop-types';
import { ContactsItem } from '../ContactsItem/ContactsItem';
export const ContactList = ({ contacts, deleteId }) => {
  return (
    <>
      {contacts.map(({ name, id, number }) => (
        <ContactsItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteId={deleteId}
        />
      ))}
    </>
  );
};
PropTypes.ContactList = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ).isRequired,
  deleteId: PropTypes.func.isRequired,
};
