var books = {};

$(document).ready(function(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/books',
        success: function(data){
            $(data).each(function(key, book){
                books[book.id] = book;
            });

            renderBooks(books);
        }
    });
});


function createBook(book) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(JSON.parse(this.responseText));
        };
        xhr.onerror = reject;
        xhr.open('POST', 'http://localhost:3000/books/');
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.send(JSON.stringify(book));
    });
}

function updateBook(book) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(JSON.parse(this.responseText));
        };
        xhr.onerror = reject;
        xhr.open('PATCH', 'http://localhost:3000/books/' + book.id);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.send(JSON.stringify(book));
    });
}

function getBook(id) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(JSON.parse(this.responseText));
        };
        xhr.onerror = reject;
        xhr.open('GET', 'http://localhost:3000/books/' + id);
        xhr.send();
    });
}

function deleteBook(id) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(JSON.parse(this.responseText));
        };
        xhr.onerror = reject;
        xhr.open('DELETE', 'http://localhost:3000/books/' + id);
        xhr.send();
    });
}