var books = {};
$(document).ready(function(){
    if (localStorage.getItem("books") != null) {
        books = JSON.parse(localStorage.getItem("books"));
    } else {
        setBook(new Book (
            1, 
            'Tor', 
            'Fantasy',
            'NY Times', 
            '12.02.2005', 
            'USA', 
            '055-555-555-5', 
            'Lance Henderson', 
            'https://images-na.ssl-images-amazon.com/images/I/51Dd%2BpjxfOL.jpg'
        ));
        setBook(new Book (
            2, 
            'Sleeping Beaty',
            'Fantasy',
            'Disney',
            '12.03.2010', 
            'USA', 
            '055-555-555-5', 
            'Charles Perrault', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRvhjZvXFEdpLbkZkoyyYG76ZvwkhlqxYtg7ZQI7j2TY1R-Hz'
        ));
    }

    renderBooks(books);
});

function createBook(book) {
    return new Promise((resolve) => {
        books[book.id] = book;
        localStorage.setItem("books", JSON.stringify(books));
        resolve();
    });
}

function updateBook(book) {
    return new Promise((resolve) => {
        books[book.id] = book;
        localStorage.setItem("books", JSON.stringify(books));
        resolve();
    });
}

function getBook(id) {
    return new Promise((resolve) => {
        var savedBooks = JSON.parse(localStorage.getItem("books"));
        resolve(savedBooks[id]);
    });
}

function deleteBook(id) {
    return new Promise((resolve) => {
        delete books[id];
        localStorage.setItem("books", JSON.stringify(books));
        resolve();
    });
}