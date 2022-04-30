const startBtn = document.querySelector(".start")
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timeSpan = document.querySelector("#time")
const board = document.querySelector('.board')
const colors = ["#4158D0", "#C850C0", "#FFCC70", "#00DBDE", "#FFFB7D"]

let time
let points = 0

startBtn.addEventListener("click", e => {
    e.preventDefault()
    screens[0].classList.add("up")
})

timeList.addEventListener("click", e => {
    if (e.target.classList.contains("time-btn")) {
        time = parseInt(e.target.getAttribute("data-time"))
        screens[1].classList.add("up")
        startGame(time)
    }
})

const setTimer = time => {
    let timerTime = time
    setInterval(() => {
        if (timerTime === 0) {
            finishGame()
        } else {
            timerTime--
            setTime(timerTime)
        }
    }, 1000)
}

const setTime = time => {
    if (time < 10) {
        timeSpan.innerHTML = `00:0${time}`
    } else {
        timeSpan.innerHTML = `00:${time}`
    }
}

const startGame = time => {
    setTime(time)
    setTimer(time)
    generateCircles()
}

const generateCircles = () => {
    const circle = document.createElement('div')
    circle.classList.add('circle')

    const size = getRandomValue(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandomValue(size, width - size - 5)
    const y = getRandomValue(size, height - size - 5)
    const bgColor = getColor()

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = bgColor
    circle.style.boxShadow = `0 0 5px ${bgColor}, 0 0 2px`

    board.append(circle)
}

board.addEventListener("click", e => {
    if (e.target.classList.contains("circle")) {
        points++
        e.target.remove()
        generateCircles()
    }
})

const getRandomValue = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const getColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}

const finishGame = () => {
    board.innerHTML = `<h1>Счёт: <span class="primary">${points}</span></h1>`
    timeSpan.parentNode.classList.add("hide")
}