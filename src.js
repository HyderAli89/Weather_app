const curdate = document.getElementById("date");
let weathercon = document.getElementById("weathercon");
const tempstatus = "{%tempstatus%}";

if(tempstatus=="Clear"){
  weathercon.innerHTML="<span class='material-symbols-outlined' style='color:#eccc68'>sunny</span>"
}else if(tempstatus=="Clouds"){
  weathercon.innerHTML="<span class='material-symbols-outlined' style='color:#dfe4ea'>cloud</span>"
}else if(tempstatus=="Rain"){
  weathercon.innerHTML="<span class='material-symbols-outlined style='color:'#a4b0be'>rainy</span>"
}else{
  weathercon.innerHTML=weathercon.innerHTML="<span class='material-symbols-outlined' style='color:#dfe4ea'>cloud</span>"
}

const getCurrentDay = () => {
  let currenttime = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currenttime.getDay()]
  return day
}
const getCurrentTime = () => {
  let months = ["january", "feburary", "march", "april", "may", "june", "july", "august", "september", "octomber", "november", "december"]
  let now = new Date()
  let month = months[now.getMonth()]   /* month selection */
  let day = now.getDay()
  let hours = now.getHours()
  let min = now.getMinutes()

  let period = "am"
  if (hours > 11) {
    period = "pm"
    if (hours > 12) {
      hours -= 12
    }
  }
  if (min < 10) {
    mins = '0' + mins
  }                      /*  if minutes are less than 10 so zero will added at front eg :- 10:08 */
  return `${month} ${day} | ${hours}:${min}${period}`
}
curdate.innerHTML = `${getCurrentDay()}  | ${getCurrentTime()} `
