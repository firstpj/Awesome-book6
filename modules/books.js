class BookList {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.errorElements = {
      author: document.getElementById('authorError'),
      title: document.getElementById('titleError'),
    };
  }

  init() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        navLinks.forEach((navLink) => {
          navLink.classList.remove('active');
        });
        link.classList.add('active');
        const sectionId = link.getAttribute('href').substring(1);
        this.showSection(sectionId);
      });
    });
    const addButton = document.getElementById('add-button');
    addButton.addEventListener('click', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      if (title && author !== '') {
        const book = { title, author };
        this.addBook(book);
        this.renderBookList();
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
      } else if (title === '') {
        this.showError('title', 'Add tittle.');
      } else if (author === '') {
        this.showError('author', 'Add author.');
      }
    });
    window.addEventListener('load', () => {
      this.renderBookList();
    });
  }

  addBook(book) {
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  showError(type, message) {
    const errorElement = this.errorElements[type];
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById(type).style.marginBottom = '1rem';
    this.resetInputError();
  }

  resetInputError() {
    setTimeout(() => {
      this.errorElements.title.style.display = 'none';
      this.errorElements.author.style.display = 'none';
    }, 2000);
  }

  renderBookList() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    const h1 = document.createElement('h1');
    h1.textContent = 'All Awesome Books';
    bookList.appendChild(h1);
    this.books.forEach((book, index) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        this.removeBook(index);
        this.renderBookList();
      });
      li.appendChild(removeBtn);
      bookList.appendChild(li);
    });
  }

  showSection = (sectionId) => {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach((section) => {
      section.classList.add('hidden');
    });
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
  };
}

export default BookList;