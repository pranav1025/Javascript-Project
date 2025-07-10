function passwardgenerate(length){
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lower = "abcdefghijklmnopqrstuvwxyz"
    const nums = "1234567890"
    const sym = "!@#$%^&*()"
    const allchars = upper + lower + nums + sym
const chararr = allchars.split("")

let passwardarr = []

for (let i = 0; i < length; i++){
    const randomchar = chararr [Math.floor(Math.random() * chararr.length)]
    passwardarr.push(randomchar)
}
return passwardarr.join("")

}
console.log(passwardgenerate(12));




