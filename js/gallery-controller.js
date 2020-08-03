

function initPage() {
    console.log('init Working');
    renderProjects()
}

$(document).ready(initPage())

function renderProjects() {
    var projs = getProjects()
    var strHTMLs = projs.map(function(proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" onclick="onOpenModal('${proj.id}')" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid img-proj" src="img/portfolio/${proj.name}.png" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.title}</h4>
          <p class="text-muted">${proj.desc}</p>
        </div>
      </div>
        `
    })
    $('.projects-container').html(strHTMLs.join(''))
    // console.log($('.projects-container').html());
    
}


function onOpenModal(projId) {
    var proj = getProjById(projId) 
    // console.log(proj);
    $('#portfolioModal1 h2').text(proj.title)
    $('#portfolioModal1 .modal-desc').text(proj.desc)
    $('.date-li').text(`Time created: ${proj.publishedAt}`)
    $('.proj-link').attr("href", `${proj.url}`);
    $('.img-modal').attr("src", `img/portfolio/${proj.name}.png`);
}


function onSubmit() {
    var emailTxt = $('.email-txt').val()
    var subjectTxt = $('.subject-txt').val()
    var msgTxt = $('.msg-txt').val()
    var emailLink = makeUrlEmail(emailTxt, subjectTxt, msgTxt)
    window.open(emailLink)
    emailTxt = $('.email-txt').val('')
    subjectTxt = $('.subject-txt').val('')
    msgTxt = $('.msg-txt').val('')
    openCanvas()
}

function makeUrlEmail(emailTxt, subjectTxt, msgTxt){
    var linkStr = `https://mail.google.com/mail/?view=cm&fs=1&to=anistu@gmail.com&su=${subjectTxt}&body=${msgTxt}   ${emailTxt}`
    return linkStr
}
