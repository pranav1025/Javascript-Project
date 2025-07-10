const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const Today = new Date ()
const dayname = days[Today.getDay()]
document.getElementById("day").textContent=dayname