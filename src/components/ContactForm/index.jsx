import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';

export const ContactForm = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const handleChange = ({ target }) => {
    if (target.name === 'name') {
      setName(target.value);
    }
    if (target.name === 'number') {
      setNumber(target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contactExists = contacts.some(contact => contact.phone === number);

    if (contactExists) {
      alert('Contact with the number already exists.');
      setName('');
      setNumber('');
      return;
    }

    const newContact = {
      name: name,
      phone: number,
    };

    dispatch(addContact(newContact));
    setName('');
    setNumber('');
  };

  return (
    <div>
      <h1>Add contact</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor={nanoid()}>
          Name
          <input
            id={nanoid()}
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
            //pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor={nanoid()}>
          Number
          <input
            id={nanoid()}
            value={number}
            onChange={handleChange}
            //pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};
