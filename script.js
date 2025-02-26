document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector(".bird")
    const gameDisplay = document.querySelector(".game-container")
    const ground = document.querySelector(".ground-moving")
  
    const birdLeft = 220
    let birdBottom = 100
    const gravity = 3
    let isGameOver = false
    const gap = 430
    let score = 0
  
    function startGame() {
      birdBottom -= gravity
      bird.style.bottom = birdBottom + "px"
      bird.style.left = birdLeft + "px"
    }
    const gameTimerId = setInterval(startGame, 20)
  
    function control(e) {
      if (e.type === "keyup" && (e.keyCode === 32 || e.keyCode === 38)) {
        jump()
      } else if (e.type === "touchstart") {
        jump()
        e.preventDefault()
      }
    }
  
    function jump() {
      if (birdBottom < 500) birdBottom += 50
      bird.style.bottom = birdBottom + "px"
    }
  
    document.addEventListener("keyup", control)
    document.addEventListener("touchstart", control)
  
    function generateObstacle() {
      let obstacleLeft = 500
      const randomHeight = Math.random() * 60
      const obstacleBottom = randomHeight
      const obstacle = document.createElement("div")
      const topObstacle = document.createElement("div")
      if (!isGameOver) {
        obstacle.classList.add("obstacle")
        topObstacle.classList.add("topObstacle")
      }
      gameDisplay.appendChild(obstacle)
      gameDisplay.appendChild(topObstacle)
      obstacle.style.left = obstacleLeft + "px"
      topObstacle.style.left = obstacleLeft + "px"
      obstacle.style.bottom = obstacleBottom + "px"
      topObstacle.style.bottom = obstacleBottom + gap + "px"
  
      function moveObstacle() {
        obstacleLeft -= 2
        obstacle.style.left = obstacleLeft + "px"
        topObstacle.style.left = obstacleLeft + "px"
  
        if (obstacleLeft === -60) {
          clearInterval(timerId)
          gameDisplay.removeChild(obstacle)
          gameDisplay.removeChild(topObstacle)
        }
        if (
          (obstacleLeft > 200 &&
            obstacleLeft < 280 &&
            birdLeft === 220 &&
            (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200)) ||
          birdBottom === 0
        ) {
          gameOver()
          clearInterval(timerId)
        }
        if (obstacleLeft === 220) {
          score++
          updateScore()
        }
      }
      const timerId = setInterval(moveObstacle, 20)
      if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    generateObstacle()
  
    function gameOver() {
      clearInterval(gameTimerId)
      isGameOver = true
      document.removeEventListener("keyup", control)
      document.removeEventListener("touchstart", control)
      ground.classList.add("ground")
      ground.classList.remove("ground-moving")
      displayGameOver()
    }
  
    function updateScore() {
      const scoreDisplay = document.querySelector(".score")
      scoreDisplay.textContent = `Score: ${score}`
    }
  
    function displayGameOver() {
      const gameOverDisplay = document.createElement("div")
      gameOverDisplay.classList.add("game-over")
      gameOverDisplay.innerHTML = `
              <h1>Game Over!</h1>
              <p>Your score: ${score}</p>
              <button class="restart-btn">Restart</button>
          `
      gameDisplay.appendChild(gameOverDisplay)
  
      const restartBtn = document.querySelector(".restart-btn")
      restartBtn.addEventListener("click", restartGame)
    }
  
    function restartGame() {
      window.location.reload()
    }
  })
  
  
