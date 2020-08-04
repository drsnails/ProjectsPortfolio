var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const KEY = 'quests'

function createQuestsTree() {
    var questsTree = loadFromStorage(KEY)
    if (!questsTree) {
        questsTree = createQuest('Male?');
        questsTree.yes = createQuest('Gandhi');
        questsTree.no = createQuest('Rita');
    }

    gQuestsTree = questsTree;
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    _saveQuestsToStorage();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
    _saveQuestsToStorage()

}

function addGuess(newGuessTxt, newQuestTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree

    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
    gPrevQuest[lastRes] = newQuest
    _saveQuestsToStorage()

}

function getCurrQuest() {
    return gCurrQuest
}


function _saveQuestsToStorage() {
    saveToStorage(KEY, gQuestsTree)
}


function clearMemory() {
    if (!confirm('Are you sure? This will reset everything, for good and bad')) return
    alert('All done! no memory at all')
    localStorage.clear()
    

}
