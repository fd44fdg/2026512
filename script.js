const targetDate = new Date('2026-05-12T00:00:00');
const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    label: document.getElementById('status-label'),
    targetDate: document.querySelector('.target-date'),
    separators: document.querySelectorAll('.separator')
};

function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    const isPast = diff < 0;
    const absDiff = Math.abs(diff);

    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

    els.days.textContent = normalize(days, 3);
    els.hours.textContent = normalize(hours, 2);
    els.minutes.textContent = normalize(minutes, 2);
    els.seconds.textContent = normalize(seconds, 2);

    updateStatus(isPast);
}

function normalize(num, digits) {
    return num.toString().padStart(digits, '0');
}

function updateStatus(isPast) {
    if (isPast) {
        els.label.textContent = "目标日期已过 // 时间溢出";
        els.label.style.color = "#ff0055"; // Red alert
        els.targetDate.style.color = "#ff0055";
        els.targetDate.style.textShadow = "0 0 10px rgba(255, 0, 85, 0.5)";

        // Update separator colors
        els.separators.forEach(sep => sep.style.color = "#550022");
    } else {
        els.label.textContent = "距离目标日期";
        els.label.style.color = "#666";
        els.targetDate.style.color = "var(--accent-color)";
        els.targetDate.style.textShadow = "0 0 10px rgba(0, 243, 255, 0.5)";
    }
}

// Initial call
updateTimer();

// Loop
setInterval(updateTimer, 1000);
