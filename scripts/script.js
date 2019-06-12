class Book {
    constructor(id, name, category, production, productionDate,productionAddres,productionPhone, writer, photos ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.production = production;
        this.productionAddres = productionAddres;
        this.productionPhone = productionPhone
        this.productionDate = productionDate;
        this.writer = writer;
        this.photos = photos;
    }
}

if (localStorage.getItem("books") != null) {
    var books = JSON.parse(localStorage.getItem("books"));

} else {
    var books = {};
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

var bookTemplate = '<div class="col-3 text-center mb-2" data-id="{id}"><div class="card"><img src={photos} class="card-img-top pt-3 book-photos" alt="img-book"><div class="card-body"><h5 class="card-title text-truncate book-name">{name}</h5><table class="table table-borderless text-muted table-hover text-left"><tbody><tr><th scope="row">Автор книги</th><td class="book-writer">{writer}</td></tr><tr><th scope="row">Дата издательства</th><td class="book-productionDate">{productionDate}</td></tr><tr><th scope="row">Названия издательства</th><td class="book-production">{production}</td></tr><tr><th scope="row">Адрес издательства</th><td class="book-productionAddres">{productionAddres}</td></tr><tr><th scope="row">Телефон издательства</th><td class="book-productionPhone">{productionPhone}</td></tr><tr><th scope="row">Рубрика книги</th><td class="book-category">{category}</td></tr></tbody></table><button type="button" class="btn btn-danger delete" >Удалить</button> <button type="button" class="btn btn-light edit-book" data-toggle="modal" data-target="#edit-book">Редактировать</button></div></div></div>'

function setBook(book) {
    books[book.id] = book;
    localStorage.setItem("books", JSON.stringify(books));
}

function getBook(id) {
    var savedBooks = JSON.parse(localStorage.getItem("books"));
    return savedBooks[id];
}

function deleteBook(id) {
    delete books[id];
    localStorage.setItem("books", JSON.stringify(books));
}

function renderBook(book) {
    $(".books-block").append(
        bookTemplate
            .replace('{id}', book.id)
            .replace('{name}', book.name)
            .replace('{category}', book.category)
            .replace('{production}', book.production)
            .replace('{productionAddres}', book.productionAddres)
            .replace('{productionPhone}', book.productionPhone)
            .replace('{productionDate}', book.productionDate)
            .replace('{writer}', book.writer)
            .replace('{photos}', book.photos)
    );
}

$(document).ready(function(){
    $.each(books, function (index, book) {
        renderBook(book);
    });

    $('.search').click(function(){
        $(".books-block").html('');
        var query = $('.search-query').val();

        var countMatches = 0;

        $.each(books, function (index, book) {
            if(book.name.indexOf(query) >= 0) {
                renderBook(book);
                countMatches++;
            }            
        });

        if (countMatches == 0) {
            $(".books-block").html('<div class="col-12 text-center"><div class="alert alert-danger" role="alert">Ничего не найдено!</div></div>');
        }
    })

    $(document).on('click', '.delete', function(){
        var bookBlock = $(this).closest(".col-3");
        deleteBook(bookBlock.data('id'));
        bookBlock.remove();
    });

    $("#save").click(function(){
        var name = $(".newName").val();
        var category = $(".newCategory").val();
        var production = $(".newProduction").val();
        var productionAddres = $(".newProductionAddres").val();
        var productionPhone = $(".newProductionPhone").val();
        var productionDate = $(".newProductionDate").val();
        var writer = $(".newWriter").val();
        var photos = $(".newPhotos").val();

        var book = new Book(Object.keys(books).length + 1, name, category, production, productionDate, productionAddres, productionPhone, writer, photos) ;
        setBook(book);
        renderBook(book);
        
        $(".newName").val("");
        $(".newCategory").val("");
        $(".newProduction").val("");
        $(".newProductionAddres").val("");
        $(".newProductionPhone").val("");
        $(".newProductionDate").val("");
        $(".newWriter").val("");
        $(".newPhotos").val("");
        
        $('#add-book').modal('hide');
    });
    
    $(document).on('click', '.edit-book', function(){
        var bookBlock = $(this).closest(".col-3");
        var book = getBook(bookBlock.data('id'));

        $('#edit-book .editBookId').val(book.id);
        $('#edit-book .editPhotos').val(book.photos);
        $('#edit-book .editName').val(book.name);
        $('#edit-book .editCategory').val(book.category);
        $('#edit-book .editProduction').val(book.production);
        $('#edit-book .editProductionPhone').val(book.productionPhone);
        $('#edit-book .editProductionAddres').val(book.productionAddres);
        $('#edit-book .editProductionDate').val(book.productionDate);
        $('#edit-book .editWriter').val(book.writer);

    });

    $(document).on('click', '#edit-save', function(){
        var bookId = $('#edit-book .editBookId').val();
        var book = getBook(bookId);
        
        book.name = $('#edit-book .editName').val();
        book.photos = $('#edit-book .editPhotos').val()
        book.category = $('#edit-book .editCategory').val()
        book.production = $('#edit-book .editProduction').val()
        book.productionAddres = $('#edit-book .editProductionAddres').val()
        book.productionPhone = $('#edit-book .editProductionPhone').val()
        book.productionDate = $('#edit-book .editProductionDate').val()
        book.writer = $('#edit-book .editWriter').val()

        setBook(book); 

        var bookBlock = $('*[data-id="' + bookId + '"]');
        bookBlock.find('.book-name').html(book.name);
        bookBlock.find('.book-photos').attr('src', book.photos);
        bookBlock.find('.book-category').html(book.category);
        bookBlock.find('.book-production').html(book.production);
        bookBlock.find('.book-productionPhone').html(book.productionPhone);
        bookBlock.find('.book-productionAddres').html(book.productionAddres);
        bookBlock.find('.book-productionDate').html(book.productionDate);
        bookBlock.find('.book-writer').html(book.writer);
       
        $('#edit-book').modal('hide');
    });

    // buttons sort
    $('#sort-alpha-up').on('click', function(){
        $('.col-3').sort(function(a, b) {
            if (a.textContent < b.textContent) {
            return -1;
            } else {
            return 1;
            }
        }).appendTo(".books-block");
    });

    $('#sort-alpha-down').on('click', function(){
        $('.col-3').sort(function(a, b) {
            if (a.textContent < b.textContent) {
            return 1;
            } else {
            return -1;
            }
        }).appendTo(".books-block");
    });
});
