# book-catalog
### Build your book collection

#### An application where you can create your own catalog of books.

Сreated using JS, jQuery and Bootstrap.

##### Functional

Book list with the ability to:
- add new book,
- remove book,
- edit boo,
- filter by title,
- sort book list,

##### Receiving data

I get data by two ways: using local storage and API.
- If you want to use the local storage you need to connect *local-storage.js*.
- So if you want to use the API you need to connect *api.js*. 

To work with API use **json-server**
- Install JSON Server: **npm install -g json-server**
- *db.json* file with some data is already created
- Start json server : **json-server --watch db.json**

