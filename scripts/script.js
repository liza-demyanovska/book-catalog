$(document).ready(function(){
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
        
        var deleteBookPromise = deleteBook(bookBlock.data('id'));
        deleteBookPromise.then(function() {
            bookBlock.remove();
        });
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
        var createBookPromise = createBook(book);
        createBookPromise.then(function() {
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
    });
    
    $(document).on('click', '.edit-book', function(){
        var bookBlock = $(this).closest(".col-3");
        var promise = getBook(bookBlock.data('id'));
        promise.then(function (book) {
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
    });

    $(document).on('click', '#edit-save', function(){
        var bookId = $('#edit-book .editBookId').val();
        var getBookPromise = getBook(bookId);
        getBookPromise.then(function (book) {
            book.name = $('#edit-book .editName').val();
            book.photos = $('#edit-book .editPhotos').val()
            book.category = $('#edit-book .editCategory').val()
            book.production = $('#edit-book .editProduction').val()
            book.productionAddres = $('#edit-book .editProductionAddres').val()
            book.productionPhone = $('#edit-book .editProductionPhone').val()
            book.productionDate = $('#edit-book .editProductionDate').val()
            book.writer = $('#edit-book .editWriter').val()
    
            var updateBookPromise = updateBook(book); 
            updateBookPromise.then(function() {
                var bookBlock = $('*[data-id="' + bookId + '"]');
                bookBlock.find('.book-name').html(book.name);
                bookBlock.find('.book-photos').attr('src', book.photos);
                bookBlock.find('.book-category').html(book.category);
                bookBlock.find('.book-production').html(book.production);
                bookBlock.find('.book-productionPhone').html(book.productionPhone);
                bookBlock.find('.book-productionAddres').html(book.productionAddres);
                bookBlock.find('.book-productionDate').html(book.productionDate);
                bookBlock.find('.book-writer').html(book.writer);
            });
           
            $('#edit-book').modal('hide');
        });
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
