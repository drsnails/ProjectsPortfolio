'use strict'

const KEY = 'books'
const IDKEY = 'ID'
const PAGE_SIZE = 7;
const gBooksNames = ['Dune', 'Catch-22', 'The Master and Margarita', 'Harry Potter']


var gCurrReadBook = null
var gBooks;
var gPageIdx = 0
var gSortBy = 'name'
var gIsSortFromStart = true

_createBooks()


// localStorage.clear()

function getBooks() {
    sortBooksForDisplay(gBooks)
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}


function _createBook(name, price = +getRandomPrice()) {
    return {
        id: +getBookId(),
        name,
        price,
        imgUrl: getBookImgUrl(name),
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        var names = gBooksNames;
        for (let i = 0; i < 25; i++) {
            var name = names[getRandomInt(0, names.length)]
            books.push(_createBook(name))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}


function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}


function removeBook(bookId) {

    var bookIdx = getBookIdxById(bookId);
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(bookName, bookPrice) {
    var book = _createBook(bookName, bookPrice)
    gBooks.push(book)
    _saveBooksToStorage()
}

function updateBook(bookId, bookPrice) {
    var book = getBookById(bookId);

    book.price = bookPrice;
    _saveBooksToStorage()
}


function getBookImgUrl(name) {
    console.log(name);
    return `./img/${name.toLowerCase()}.png`
}

function getRandomPrice() {
    return `${getRandomInt(10, 50)}`
}

function sortBooksForDisplay() {
    switch (gSortBy) {
        case 'name':
            sortByName(gBooks)
            break;

        case 'price':
            sortByPrice(gBooks)
            break;

        case 'rate':
            sortByRate(gBooks)
            break;

        default:
            break;
    }
}



function getBookById(bookId) {
    var book = gBooks.find(function (book) {

        return bookId === book.id
    })
    return book
}

function getBookIdxById(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {

        return bookId === book.id
    })

    return bookIdx
}

function getBookId() {
    if (!localStorage[IDKEY]) localStorage[IDKEY] = 0
    localStorage[IDKEY]++
    return localStorage[IDKEY]
}

function plusRate() {
    gCurrReadBook.rate = (gCurrReadBook.rate === 9) ? 0 : gCurrReadBook.rate + 1
    _saveBooksToStorage()

}

function minusRate() {
    gCurrReadBook.rate = (gCurrReadBook.rate === 0) ? 9 : gCurrReadBook.rate - 1
    _saveBooksToStorage()
}

function goNextPage() {
    var pageCount = Math.ceil(gBooks.length / PAGE_SIZE)
    gPageIdx = (gPageIdx === pageCount - 1) ? 0 : gPageIdx + 1
}

function goPrevPage() {
    var pageCount = Math.ceil(gBooks.length / PAGE_SIZE)
    gPageIdx = (gPageIdx === 0) ? pageCount - 1 : gPageIdx - 1
}

function goToPage(pageIdx) {
    gPageIdx = +pageIdx
}