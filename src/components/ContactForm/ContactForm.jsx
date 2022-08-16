import React, { Component } from 'react';
import { Form, Input } from './ContactForm.styled';
import PropTypes from 'prop-types';
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit(name, number);
    this.resetInput();
  };
  resetInput = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <Input
            onChange={this.handleInputChange}
            type="text"
            name="name"
            id="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor="number">Number</label>
          <Input
            onChange={this.handleInputChange}
            type="tel"
            name="number"
            id="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="Submit">Add contacts</button>
        </Form>
      </>
    );
  }
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
