const getStoredBooks = () => JSON.parse(localStorage.getItem('books')) || [];

const storeBooks = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

export { getStoredBooks, storeBooks };