import { Item } from './ContactsItem.styled';

export const ContactsItem = ({ id, name, number, deleteId }) => {
  return (
    <ul>
      <Item>
        {name}: {number}
        <button type="button" onClick={() => deleteId(id)}>
          Delete
        </button>
      </Item>
    </ul>
  );
};
