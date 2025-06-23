document.addEventListener("change",req)

function req(){
  let city = document.getElementById("CitySelect").value

  axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${city}`)
  .then(function (response) {
    // handle success
    getCurrentTime()
    DataSet(response)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}
req()

function DataSet(response){
  document.getElementById("Date").innerText = `${response.data.data.date.hijri.weekday.ar} - ${response.data.data.date.hijri.date} هـ`
  let Fajr = response.data.data.timings.Fajr
  let Sunrise = response.data.data.timings.Sunrise
  let Dhuhr = response.data.data.timings.Dhuhr
  let Asr = response.data.data.timings.Asr
  let Maghrib = response.data.data.timings.Maghrib
  let Isha = response.data.data.timings.Isha

  document.getElementById("Fajr").innerHTML = `الفجر ${convertTo12Hour(Fajr)}` 
  document.getElementById("Sunrise").innerHTML = `الشروق ${convertTo12Hour(Sunrise)}`
  document.getElementById("Dhuhr").innerHTML = `الظهر ${convertTo12Hour(Dhuhr)}`
  document.getElementById("Maghrib").innerHTML = `العصر ${convertTo12Hour(Asr)}`
  document.getElementById("Asr").innerHTML = `المغرب ${convertTo12Hour(Maghrib)}`
  document.getElementById("Isha").innerHTML = `العشاء ${convertTo12Hour(Isha)}`
}

function getCurrentTime() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let period = hours >= 12 ? 'مساء' : 'صباحاً';

    hours = hours % 12;
    hours = hours ? hours : 12; 
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    document.getElementById("Time").innerText = `${hours}:${minutes}:${seconds} ${period}`;
}


function convertTo12Hour(time24) {
    let [hour, minute] = time24.split(':').map(Number);
    let period = hour >= 12 ? 'مساء' : 'صباحاً';

    hour = hour % 12;
    hour = hour ? hour : 12; // لو الساعة 0 تصير 12

    return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
}
setInterval(getCurrentTime, 1000);