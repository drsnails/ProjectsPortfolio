var gCurrLang = 'en';

var gTrans = {
    title: {
        en: 'Welcome to my book shop!',
        he: 'ברוכים הבאים אל חנות הספרים שלי!'
    },
    'create-book': {
        en: 'Create new book',
        he: 'צור ספר חדש'
    },

    'table-title': {
        en: 'Title',
        he: 'שם הספר'
    },
    'table-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'table-rate': {
        en: 'Rate',
        he: 'דירוג'
    },
    'table-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    add: {
        en: 'Add',
        he: 'הוסף'
    },

    'add-name-placeholder': {
        en: 'Enter name',
        he: 'הכנס שם'
    },
    'add-price-placeholder': {
        en: 'Enter price',
        he: 'הכנס מחיר'
    },
    'remove-btn': {
        en: 'Delete',
        he: 'מחיקה'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'read-btn': {
        en: 'Read',
        he: 'עיין'
    },

    'set-price-btn': {
        en: 'Set price',
        he: 'אישור'
    },

    'close': {
        en: 'Close',
        he: 'סגור'
    }
}


function getTrans(transKey) {
    var translation = gTrans[transKey][gCurrLang]
    if (!translation) return gTrans[transKey].en
    return translation
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var transKey = el.dataset.trans
        var trans = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = trans
        } else {
            el.innerText = trans
        }
    })

}
function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    var currencyCode = (gCurrLang==='en')?'USD':'ILS'
    var currency = (gCurrLang==='en')?'en':'he-IL'
    return new Intl.NumberFormat(`${currency}`, { style: 'currency', currency: currencyCode }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}
