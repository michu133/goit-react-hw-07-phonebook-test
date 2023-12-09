import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from '../../redux/operations';
import {
  selectContactsError,
  selectContactsisLoading,
} from '../../redux/selectors';

export const ContactList = ({ list }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsisLoading);
  const error = useSelector(selectContactsError);

  const handleDelete = async id => {
    try {
      await dispatch(deleteContact(id));

      dispatch(fetchContacts());
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  if (error) return <p>Error...</p>;
  return (
    <div>
      <h1>Contacts List</h1>
      <ul>
        {isLoading && <p>Loading...</p>}
        {list.map(({ id, name, phone }) => (
          <li key={id}>
            {name}: {phone}
            <button
              onClick={() => {
                handleDelete(id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
