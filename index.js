import BookList from './modules/books.js';
import updateDateTime from './modules/currenttime.js';
const bookList = new BookList();
bookList.init();
setInterval(updateDateTime, 1000);