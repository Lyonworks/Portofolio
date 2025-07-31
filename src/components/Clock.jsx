import { useEffect, useState } from 'react';

export default function Clock({
  showDate = false,
  hour12 = false,
  timeZone = 'Asia/Jakarta',
  className = '',
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat('id-ID', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12,
  }).format(now);

  const date = showDate
    ? new Intl.DateTimeFormat('id-ID', {
        timeZone,
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(now)
    : null;

  return (
    <div
      className={`fixed top-6 right-6 z-50 rounded-md 0 backdrop-blur px-3 py-1 text-[#F5F5F5] text-xs md:text-sm font-mono shadow transition-colors ${className}`}
    >
      <span>{time}</span>
      {showDate && <span className="ml-2 opacity-70">{date}</span>}
    </div>
  );
}
