export const selectContacts = state => state.contacts.contacts;
export const selectContactsError = state => state.contacts.error;
export const selectContactsisLoading = state => state.contacts.isLoading;

export const selectFilter = (state) => state.filter;