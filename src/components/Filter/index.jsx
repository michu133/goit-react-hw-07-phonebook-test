import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectContactsisLoading } from '../../redux/selectors';
import { setFilter } from '../../redux/filterSlice';
import { fetchContacts } from '../../redux/operations';
import { ContactList } from 'components/ContactList';

export const Filter = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [searchContact, setsearchContact] = useState('');
  const isLoading = useSelector(selectContactsisLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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

      {isLoading ? (
        <p>Loading...</p>
      ) : findContact().length ? (
        <ContactList list={findContact()}></ContactList>
      ) : (
        <p>No contacts to show.</p>
      )}
    </div>
  );
};
