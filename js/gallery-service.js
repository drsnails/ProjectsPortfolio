'use strict'

var gProjs = creatProjects();


function getProjects() {
    return gProjs
}

function createProj(projName, projTitle, projDesc, timeStamp) {
    var proj = {
        id: projName,
        name: projName,
        title: projTitle,
        desc: projDesc, 
        url: `projs/${projName}/index.html`,
        publishedAt: getDateFromUnix(timeStamp),
        labels: [],
    }
    return proj
}


function creatProjects() {
    var projects =[]
    var mineProj = createProj('mineSweeper', 'Mine Sweeper', 'The good old mine sweeper, with some twists', 1595451600000)
    var bookStoreProj = createProj('bookStore', 'Book Store', 'A book store owner manager', 1596056400000)
    var touchNums = createProj('touchNums', 'Touch The Nums', 'Touch all the numbers as fast as you can!', 1595030400000)
    var guessWho = createProj('guessWho', 'Guess Who', 'Think of someone and let the jinny do the work, or help him get better at doing the work', 1596354980000)
    projects.push(mineProj)
    projects.push(bookStoreProj)
    projects.push(touchNums)
    projects.push(guessWho)
    return projects
}


function getDateFromUnix(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-GB')
}


function getProjById(projId) {
    var proj = gProjs.find(function (proj) {
        return projId === proj.id
    })
    return proj
}

