'use strict'
console.log('Starting up');

renderProjectModal()
renderPortfolio()

function renderProjectModal(){
    var projs = gProjs
    const strHtmls = projs.map(proj => {
        return `<div class="portfolio-modal modal fade" id="${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close-modal" data-dismiss="modal">
                        <div class="lr">
                            <div class="rl"></div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 mx-auto">
                                <div class="modal-body">
                                    <!-- Project Details Go Here -->
                                    <h2 class="text-responsive">${proj.name}</h2>
                                    <p class="item-intro text-muted">${proj.title}</p>
                                    <img class="img-fluid d-block mx-auto" src= ${proj.img} alt="">
                                    <ul class="list-inline">
                                        <li>Date: ${proj.publishedAt}</li>
                                        <li>Client: <a href= ${proj.url} target="_blank">go to project </a></li>
                                        <li>Category: ${proj.labels[0]}</li>
                                    </ul>
                                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                                        <i class="fa fa-times"></i>
                                        Close Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }).join('')
    document.getElementById('portfolioModal').innerHTML = strHtmls
}

function renderPortfolio(){
    var projs = gProjs
    document.getElementById('portfolio').innerHTML = 
    `<div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Portfolio</h2>
                    <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
            </div>`
    const strHtmls = projs.map(proj => {
        return `
            <div class="col-md-4 col-sm-6 portfolio-item" >
                <a class="portfolio-link" data-toggle="modal" href="#${proj.id}">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <i class="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img class="img-fluid" src="${proj.img}" alt="">
                </a>
                <div class="portfolio-caption">
                    <h4>${proj.name}</h4>
                    <p class="text-muted">${proj.title}</p>
                </div>
            </div>`
    }).join('')
    document.getElementById('portfolio').innerHTML += '<div class="row"> ' + strHtmls + '</div> </div>'
}

function onContactMe(){
    contactMe(email, subject, mBody)
    openCanvas()
}