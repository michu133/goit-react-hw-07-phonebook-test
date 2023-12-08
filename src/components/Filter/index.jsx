import { nanoid } from '@reduxjs/toolkit';
import { ContactList } from 'components/ContactsList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/actions';
import { fetchContacts } from 'fetch/fetch';


export const Filter = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const [searchContact, setsearchContact] = useState('');


  useEffect(() => {
    dispatch(fetchContacts());
    
  })

  useEffect(() => {
    dispatch(setFilter(searchContact));
  }, [searchContact, dispatch]);

  const filterChange = ({ target }) => {
    const normalizedValue = target.value.toLowerCase();
    setsearchContact(normalizedValue);
  };

  const findContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchContact)
    );
  };

  return (
    <div>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        id={nanoid()}
        name="filter"
        onChange={filterChange}
        value={searchContact}
      ></input>

      {findContact().length ? (
        <ContactList list={findContact()}></ContactList>
      ) : (
        <p>No contacts to show.</p>
      )}
    </div>
  );
};
