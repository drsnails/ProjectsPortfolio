'use strict'

var gNums;
var gNextNum;
var gBoardLen = 4;
var timeInterval;

var gTime;

function init() {
  gNums = restNums()
  gNums = shuffle(gNums)
  gNextNum = 1
  
  var elWinMsg = document.querySelector('.win-msg')
  var elRestBtn = document.querySelector('.restart-btn')
  var elLogSc = document.querySelector('.log-screen')
  var elDiffBtns = document.querySelector('.difficulty-buttons')
  elDiffBtns.style.display = 'block'
  elLogSc.innerText = 'Click number 1 to start..'
  elWinMsg.style.display = 'none'
  elRestBtn.style.display = 'none'

  renderGame()
}

function startGame() {
  gTime = Date.now()
  timeInterval = setInterval(renderTime, 10)
  
  var elLogSc = document.querySelector('.log-screen')
  var elDiffBtns = document.querySelector('.difficulty-buttons')
  elDiffBtns.style.display = 'none'
  elLogSc.style.backgroundColor = 'rgb(240, 129, 109)'
  elLogSc.style.color = 'rgb(51, 96, 218)'
  elLogSc.style.width = '250px'
  elLogSc.style.right = '580px'
  elLogSc.style.fontSize = '20px'
}

function renderWin() {
  clearInterval(timeInterval);
  var currTime = Date.now()
  var timePassed = currTime - gTime
  var timePassedSecs = (timePassed / 1000).toFixed(3)
  
  var elRestBtn = document.querySelector('.restart-btn')
  var elWinMsg = document.querySelector('.win-msg')
  elWinMsg.innerText = `You won!\nYour time is: ${timePassedSecs} seconds`
  elWinMsg.style.display = 'block'
  elRestBtn.style.display = 'block'
}


function renderGame() {
  var strHTML = ''
  for (var i = 0; i < gBoardLen; i++) {
    strHTML += '<tr>\n'
    for (var j = 0; j < gBoardLen; j++) {
      var currNumCell = gNums.pop();
      strHTML += `\t<td onclick="cellClicked(this)">${currNumCell}</td>\n`
    }
    strHTML += '</tr>\n'
  }
  var elBoard = document.querySelector('table')
  elBoard.innerHTML = strHTML
}

function renderTime() {
  var currTime = Date.now()
  var elLogScreen = document.querySelector('.log-screen')
  var timePassed = currTime - gTime
  var timePassedSecs = (timePassed / 1000).toFixed(3)
  elLogScreen.innerText = `Time: ${timePassedSecs}`
}

function cellClicked(numCell) {
  var checkNum = +numCell.innerText

  if (gNextNum === 1 && checkNum === 1) {
    startGame()
  }

  // if (gNextNum > 1 || checkNum === 1) {
    if (checkNum === gNextNum) {
      numCell.style.opacity = '75%'
      numCell.style.backgroundColor = 'rgb(219, 170, 130)'
      numCell.style.color = 'rgb(46, 70, 175)'
      gNextNum++
      if (gNextNum > gBoardLen ** 2) return renderWin()
    }
  // }
}


function restNums() {
  var nums = [];
  for (var i = 1; i <= gBoardLen ** 2; i++) {
    nums.push(i);
  }
  return nums
}

function shuffle(nums) {
  var numsLength = nums.length
  var shuffledNums = [];
  for (var i = 0; i < numsLength; i++) {
    var randIdx = getRandomInt(0, nums.length);
    var randNum = nums.splice(randIdx, 1)[0];
    shuffledNums.push(randNum)
  }
  return shuffledNums
}


function setDifficulty(elBtn) {
  toggleBtnsColor(elBtn)
  var btnClassName = elBtn.className
  if (btnClassName === 'easy-btn') {
    gBoardLen = 4;
  } else if (btnClassName === 'medium-btn') {
    gBoardLen = 5;
  } else if (btnClassName === 'hard-btn') {
    gBoardLen = 6;
  }
  init()
}

function toggleBtnsColor(elBtn) {
  var elDiffBtns = document.querySelectorAll('.difficulty-buttons button');
  for (var i = 0; i < elDiffBtns.length; i++) {
    if (elDiffBtns[i].className === elBtn.className) {
      elDiffBtns[i].style.backgroundColor = 'rgb(155, 200, 243)';

    } else {
      elDiffBtns[i].style.backgroundColor = 'rgb(253, 246, 209)';
    }
  }
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
