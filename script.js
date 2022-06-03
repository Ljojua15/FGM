document.addEventListener('DOMContentLoaded', () => {
    let elements = {
        Game: document.querySelector('.game'),
        Desk: document.querySelector('.desk'),
        wallContainer: document.querySelector('.walls'),
        Ball: document.querySelector('.ball'),
        topWall: document.querySelector('.top-wall'),
        leftWall: document.querySelector('.left-wall'),
        rightWall: document.querySelector('.right-wall'),
        bottomWall: document.querySelector('.bottom-wall'),
    }
    let styleRoot = document.querySelector(':root')
    let gameWidth = elements.Game.getBoundingClientRect().width
    let gameHeight = elements.Game.getBoundingClientRect().height
    let wallLength = 40
    let enableUpdate = true
    let ballPhisycs = {
        x: getStyleProperty('--ballLeft'),
        y: getStyleProperty('--ballTop'),
        w: elements.Ball.getBoundingClientRect().width,
        h: elements.Ball.getBoundingClientRect().height,
        vx: 3,
        vy: 3,
        spped: 1.5

    }

    defData()
    requestAnimationFrame(update)

    function update() {
        if (!enableUpdate) { return }
        ballCatchDesk()
        requestAnimationFrame(update)
    }

    function defData() {
        console.log(ballPhisycs)
        mouseMove()
        createWall()

    }

    function ballCatchDesk() {
        if (collision(elements.Desk.getBoundingClientRect(), elements.Ball.getBoundingClientRect())) {
            let random = rendomNumber(2)
            if (random === 1) {
                ballPhisycs.vx *= 1
                ballPhisycs.vy *= -1
            } else {
                ballPhisycs.vx *= -1
                ballPhisycs.vy *= -1
            }
        } else if (collision(elements.rightWall.getBoundingClientRect(), elements.Ball.getBoundingClientRect())) {
            ballPhisycs.vx *= -1
            ballPhisycs.vy *= 1
        } else if (collision(elements.leftWall.getBoundingClientRect(), elements.Ball.getBoundingClientRect())) {
            ballPhisycs.vx *= -1
            ballPhisycs.vy *= 1
        } else if (collision(elements.topWall.getBoundingClientRect(), elements.Ball.getBoundingClientRect())) {
            ballPhisycs.vx *= 1
            ballPhisycs.vy *= -1
        } else if (collision(elements.bottomWall.getBoundingClientRect(), elements.Ball.getBoundingClientRect())) {
            console.log('yleo')
        }




        setStyleProperty('--ballLeft', `${ballPhisycs.x += ballPhisycs.vx}px`)
        setStyleProperty('--ballTop', `${ballPhisycs.y += ballPhisycs.vy}px`)
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

    function createWall() {
        for (let i = 0; i < wallLength; i++) {
            let elem = document.createElement('div')
            elem.classList.add('wall')
            elements.wallContainer.appendChild(elem)
        }
    }

    function collision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
            return true
        } else {
            return false
        }
    }

    function rendomNumber(max) {
        return Math.floor(Math.random() * max)
    }









})