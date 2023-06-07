function getStoredBooks() {
  return
  SON.parse(localStorage.getItem('books')) || [];
  }

  function storeBooks(books) {
    localStorage.setItem('books',
   JSON.stringify(books));
  }

  export { getStoredBooks, storeBooks };
  