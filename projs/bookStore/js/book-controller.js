'use strict'

function onInit() {
    renderPagesEdit()
    renderBooks()
}

function renderBooks() {
    var books = getBooks();
    var strHTMLHeads = `
        <tr>
            <th>ID</th>

            <th onclick="onSortBy(this)" class="title-head" data-sortby="name">
            Title
            </th>

            <th onclick="onSortBy(this)" class="price-head" data-sortby="price">
            Price
            </th>

            <th onclick="onSortBy(this)" class="rate-head" data-sortby="rate">
            Rate
            </th>

            <th class="actions-head" colspan="3">Actions</th>
        </tr>` // can be inside the html
    var strHTMLs = books.map(function (book) {
        return `
        <tr>
            <td>${book.id}</td>
            <td class="book-name">${book.name}</td>
            <td>$${book.price}</td>
            <td>${book.rate}</td>

            <td class="actions">
            <button class="read-btn" onclick="onReadBook(${book.id})">read</button>
            </td>
            <td class="actions">
            <button class="update-btn" onclick="onToggleUpdateBookForm(${book.id})">update</button>
            </td>
            <td class="actions">
            <button class="remove-btn" onclick="onRemoveBook(${book.id})">delete</button>
            </td>
            </tr>
        <section class="book${book.id}-details" hidden>
        </section>
        <section class="book${book.id}-update update hidden">
            <input type="text" class="price-txt-update${book.id}" placeholder="Enter new price"/>
            <button class="set-update-btn" onclick="onUpdateBook('${book.id}')">Set price</button>
        </section>
            `
    })
    var elbooksBody = document.querySelector('.books-body')
    elbooksBody.innerHTML = strHTMLHeads + strHTMLs.join('');
}


function renderPagesEdit() {
    var elPageValues = document.querySelector('.page-values');
    var pageCount = Math.ceil(gBooks.length / PAGE_SIZE)
    var strHTML = ``
    for (var i = 0; i < pageCount; i++) {
        strHTML += `<div onclick="onGoToPage('${i}')" class="page page${i+1} `
        if (i === gPageIdx) {
            strHTML += `current-page`
        }
        strHTML += `">`
        strHTML += `${i+1}`
        strHTML += `</div>`
    }
    elPageValues.innerHTML = strHTML
}


function onRemoveBook(bookId) {
    removeBook(bookId)
    renderPagesEdit()
    renderBooks()

}


function onToggleAddBookForm() { // onToggleAddBookForm
    var elAddBook = document.querySelector('.add-book');
    elAddBook.classList.toggle('hidden')

}

function onAddBook() {
    var elNameTxt = document.querySelector('.name-txt')
    var elPriceTxt = document.querySelector('.price-txt')
    var bookName = elNameTxt.value;
    var bookPrice = elPriceTxt.value;
    bookPrice = (bookPrice) ? bookPrice : 0
    addBook(bookName, bookPrice)
    elNameTxt.value = ''
    elPriceTxt.value = ''
    renderBooks()
    renderPagesEdit()
    onToggleAddBookForm()
}

function onToggleUpdateBookForm(bookId) {
    var elUpdateBook = document.querySelector(`.book${bookId}-update`);
    elUpdateBook.classList.toggle('hidden')
}

function onUpdateBook(bookId) {
    var bookPrice = +document.querySelector(`.price-txt-update${bookId}`).value;
    bookPrice = (bookPrice) ? bookPrice : 0
    updateBook(+bookId, bookPrice)
    onToggleUpdateBookForm(bookId)
    renderBooks()
}



function onToggleModal() {
    var elModal = document.querySelector('.modal');
    elModal.classList.toggle('hidden')
    renderBooks()
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    gCurrReadBook = book
    renderBookDetails(book)
    onToggleModal()


}

function renderBookDetails(book) {
    var elH4 = document.querySelector('.modal h4');
    var elImg = document.querySelector('.img-container');
    var elRateValue = document.querySelector('.rate-value');

    elH4.innerText = book.name
    elRateValue.innerText = book.rate
    elImg.innerHTML = `<img class="img-book" src="${getBookImgUrl(book.name)}" alt="">`
}

function onPlusRate() {
    plusRate()
    renderBookDetails(gCurrReadBook)
}

function onMinusRate() {
    minusRate()
    renderBookDetails(gCurrReadBook)
}

function onSortBy(elTH) {
    gSortBy = elTH.dataset.sortby
    gIsSortFromStart = !gIsSortFromStart
    gPageIdx = 0
    renderPagesEdit()
    renderBooks()
}

function onNextPage() {
    goNextPage()
    renderPagesEdit()
    renderBooks()
}

function onPrevPage() {
    goPrevPage()
    renderPagesEdit()
    renderBooks()
}

function onGoToPage(pageIdx) {
    goToPage(pageIdx)
    console.log(gPageIdx);
    renderPagesEdit()
    renderBooks()
}