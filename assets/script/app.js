let formSection_connexionButton = document.querySelector('.formSection_connexionButton')
let formSection_insciptionButton = document.querySelector('.formSection_insciptionButton')
let userChoicesConnexion = document.querySelector('.userChoicesConnexion')
let userChoicesConnexion_close = document.querySelector('.userChoicesConnexion_close')
let userChoicesInscription = document.querySelector('.userChoicesInscription')
let userChoicesInscription_close = document.querySelector('.userChoicesInscription_close')

let stepControl = document.querySelector('.userChoicesInscription_form .stepControl')
let userChoicesInscription_formWidth = document.querySelector('.userChoicesInscription_form').clientWidth
let nextSection = document.querySelectorAll('.userChoicesInscription_form .next')
let etape = 1


/**ouverture t fermeture des fenetres inscription de connexion */
function open(element){
    element.classList.add('open')
}

function close(element){
    element.classList.remove('open')
}

formSection_connexionButton.addEventListener('click',()=>{
    open(userChoicesConnexion)
})

userChoicesConnexion_close.addEventListener('click',(e)=>{
    e.stopPropagation()
    close(userChoicesConnexion)
})


formSection_insciptionButton.addEventListener('click',()=>{
    open(userChoicesInscription)
})

userChoicesInscription_close.addEventListener('click',(e)=>{
    e.stopPropagation()
    close(userChoicesInscription)
})

/**CONNEXION */



/**INSCRIPTION */
nextSection.forEach((nexter)=>{
    nexter.addEventListener('click',()=>{
        let steps = document.querySelectorAll('.userChoicesInscription .steps .number')
        stepControl.style = "transform:translateX("+(-(etape * userChoicesInscription_formWidth))+"px)"
        steps[etape].classList.add('selected')
        etape += 1
    })
})
