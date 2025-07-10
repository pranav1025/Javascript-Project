function flipCoin(){
    const coin = document.getElementById("coin")
    const resultText = 
    document.getElementById("result")
    const flipSound = 
    document.getElementById("flip-sound")
    flipSound.play()
    coin.classList.add("flip")
    setTimeout(() => {
        const result =Math.random() < 0.5 ? 
        "Heads" : "Tails"
        const coinSymbol = result ===
        "Heads" ? "🙂" : "🙃"
        coin.textContent=coinSymbol
        resultText.textContent="Result:  " + result
        coin.classList.remove("flip")
    } ,1000 )
}