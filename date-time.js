function updateClock() {
  const now = new Date();

  // Time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0"+hours : hours;
  minutes = minutes < 10 ? "0"+minutes : minutes;
  seconds = seconds < 10 ? "0"+seconds : seconds;

  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

  // Date
  const options = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  document.getElementById('calendar').textContent = now.toLocaleDateString(undefined, options);
}

// Initial call and update every second
updateClock();
setInterval(updateClock, 1000);
