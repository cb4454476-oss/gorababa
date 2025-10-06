// Automatically calculate next Independence Day (August 15)
    const today = new Date();
    let year = today.getFullYear();
    let endDate = new Date(`August 15 ${year} 00:00:00`);

    // If today's date is past August 15 of this year, set to next year
    if (today > endDate) {
        year++;
        endDate = new Date(`August 15 ${year} 00:00:00`);
    }

    let eventEnded = false;
    const happy = document.querySelector('.htext');
    const dayElm = document.querySelector('.cdBox .days'),
          hourElm = document.querySelector('.cdBox .hours'),
          minuteElm = document.querySelector('.cdBox .minutes'),
          secondElm = document.querySelector('.cdBox .seconds'),
          cdCont = document.querySelector('.cdCont');

    const updateTimer = () => {
        const now = new Date();
        let t = endDate.getTime() - now.getTime();

        if (t <= 0) {
            eventEnded = true;
        }

        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        if (eventEnded) {
            happy.innerText = `🎉 Happy Independence Day ${year}! 🎉`;
            happy.style.display = "block";
            hourElm.innerText = '';
            minuteElm.innerText = '';
            secondElm.innerText = '';
        } else {
            dayElm.innerText = days < 10 ? '0' + days : days;
            hourElm.innerText = hours < 10 ? '0' + hours : hours;
            minuteElm.innerText = minutes < 10 ? '0' + minutes : minutes;
            secondElm.innerText = seconds < 10 ? '0' + seconds : seconds;
            happy.style.display = "block";
            document.querySelector('.cdTmr').style.display = "block";
        }
    };

    setInterval(() => {
        eventEnded ? cdCont.classList.add('ended') : updateTimer();
    }, 1000);
