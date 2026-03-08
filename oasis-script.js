// ── NAV MENU TOGGLE ──
const menuBtn = document.getElementById('menuBtn');
const navDropdown = document.getElementById('navDropdown');
const closeBtn = document.getElementById('closeMenuBtn');

if (menuBtn && navDropdown) {
  menuBtn.addEventListener('click', () => navDropdown.classList.add('open'));
}
if (closeBtn && navDropdown) {
  closeBtn.addEventListener('click', () => navDropdown.classList.remove('open'));
}
navDropdown?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navDropdown.classList.remove('open'));
});

// ── DYNAMIC "TODAY'S HOURS" STATUS ──
function getTodayStatus() {
  const now   = new Date();
  const day   = now.getDay(); // 0=Sun,1=Mon...6=Sat
  const hour  = now.getHours();
  const min   = now.getMinutes();
  const time  = hour + min / 60;

  const schedule = {
    0: { open: 6.5,  close: 21,   label: 'Sunday' },
    1: { open: 6.5,  close: 21,   label: 'Monday' },
    2: { open: 6.5,  close: 21,   label: 'Tuesday' },
    3: { open: 6.5,  close: 21,   label: 'Wednesday' },
    4: { open: 6.5,  close: 21,   label: 'Thursday' },
    5: { open: 6.5,  close: 22,   label: 'Friday' },
    6: { open: 6.5,  close: 22,   label: 'Saturday' },
  };

  const today = schedule[day];
  const statusEl = document.getElementById('today-status');
  const todayHoursEl = document.getElementById('today-hours');

  const isOpen = time >= today.open && time < today.close;

  if (statusEl) {
    statusEl.textContent = isOpen ? '● Open Now' : '● Closed';
    statusEl.style.color = isOpen ? '#444444' : '#cc5050';
  }

  const fmt = (h) => {
    const hrs = Math.floor(h);
    const mins = h % 1 === 0.5 ? '30' : '00';
    const period = hrs < 12 ? 'AM' : 'PM';
    const display = hrs > 12 ? hrs - 12 : hrs;
    return `${display}:${mins} ${period}`;
  };

  if (todayHoursEl) {
    todayHoursEl.textContent = `${fmt(today.open)} – ${fmt(today.close)}`;
  }
}
getTodayStatus();
