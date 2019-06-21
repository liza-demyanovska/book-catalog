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

var bookTemplate = '<div class="col-3 text-center mb-2" data-id="{id}"><div class="card"><img src={photos} class="card-img-top pt-3 book-photos" alt="img-book"><div class="card-body"><h5 class="card-title text-truncate book-name">{name}</h5><table class="table table-borderless text-muted table-hover text-left"><tbody><tr><th scope="row">Автор книги</th><td class="book-writer">{writer}</td></tr><tr><th scope="row">Дата издательства</th><td class="book-productionDate">{productionDate}</td></tr><tr><th scope="row">Названия издательства</th><td class="book-production">{production}</td></tr><tr><th scope="row">Адрес издательства</th><td class="book-productionAddres">{productionAddres}</td></tr><tr><th scope="row">Телефон издательства</th><td class="book-productionPhone">{productionPhone}</td></tr><tr><th scope="row">Рубрика книги</th><td class="book-category">{category}</td></tr></tbody></table><button type="button" class="btn btn-danger delete" >Удалить</button> <button type="button" class="btn btn-light edit-book" data-toggle="modal" data-target="#edit-book">Редактировать</button></div></div></div>'

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

function renderBooks(books) {
    $.each(books, function (index, book) {
        renderBook(book);
    });
}