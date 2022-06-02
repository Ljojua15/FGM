document.addEventListener('DOMContentLoaded', () => {
    let elements = {
        Game: document.querySelector('.game'),
        Desk: document.querySelector('.desk')
    }
    let styleRoot = document.querySelector(':root')
    let gameWidth = elements.Game.getBoundingClientRect().width
    let gameHeight = elements.Game.getBoundingClientRect().height

    defData()

    function defData() {
        console.log(getStyleProperty('--deskTop'))
        mouseMove()

    }

    function mouseMove() {
        elements.Game.addEventListener('mousemove', (e) => {
            setStyleProperty('--deskLeft', `${e.offsetX}px`)
        })
    }

    function setStyleProperty(variable, value) {
        styleRoot.style.setProperty(variable, value)
    }

    function getStyleProperty(variable) {
        return parseFloat(getComputedStyle(styleRoot).getPropertyValue(variable))
    }









})