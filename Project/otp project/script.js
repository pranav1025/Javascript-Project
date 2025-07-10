function generateotp(){
     let otp =''
     for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random()*10)
        
     }
     return otp;

}

document.getElementById('btn').addEventListener('click',function(){
    let otp = generateotp();
    document.getElementById('otp').textContent = `YOur OTP is ${otp}` 
})