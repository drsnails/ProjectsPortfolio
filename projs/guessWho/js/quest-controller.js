'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide('fast')
    renderQuest();
    $('.quest').show()
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update
    // its text by the currQuest text
    var currQuest = getCurrQuest()
    $('.quest h2').text(currQuest.txt)

}

function onUserResponse(res) {

    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            onShowVictoryMsg()
        } else {
        
            showAskForHelp()
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res
        console.log('res: ', res);
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(event) {
    event.stopPropagation()
    // TODO: Get the inputs' values
    var newGuessTxt = $('input[name="newGuess"]').val()
    var newQuestTxt = $('input[name="newQuest"]').val()

    // TODO: Call the service addGuess
    addGuess(newGuessTxt, newQuestTxt, gLastRes)
    newGuessTxt = $('input[name="newGuess"]').val('')
    newQuestTxt = $('input[name="newQuest"]').val('')
    onRestartGame();
}


function onRestartGame() {
    $('.quest').hide()
    $('.new-quest').hide();
    $('.ask-help').hide();
    $('.victory-msg').hide();
    $('.game-start').show();
    gLastRes = null;
    init()
}

function showNewQuestSec() {
    $('.ask-help').hide('fast')
    $('.new-quest').show()
}

function showAskForHelp() {
    $('.quest').hide('fast')
    $('.ask-help').show()
}

function onAskHelp(res) {
    if (res === 'yes') {
        showNewQuestSec()
    } else {

        onRestartGame()
    }
}

function onShowVictoryMsg() {
    $('.quest').hide('fast')
    $('.victory-msg').show()
}

function onClearMemory() {
    clearMemory()
    onRestartGame()
}