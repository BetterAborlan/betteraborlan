'use client';

import { useState, useEffect, useCallback } from 'react';

// Approximate Aborlan poblacion coordinates, used only for the weather widget.
const ABORLAN_LAT = 9.4167;
const ABORLAN_LON = 118.5167;

export default function InfoBar() {
  const [rate, setRate] = useState('1 USD = ₱ --');
  const [temp, setTemp] = useState('--°C');
  const [dateStr, setDateStr] = useState('--- --, ----');
  const [timeStr, setTimeStr] = useState('--:-- --');

  const updateClock = useCallback(() => {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    setDateStr(`${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`);
    let h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    setTimeStr(`${h}:${m < 10 ? '0' + m : m} ${ampm}`);
  }, []);

  useEffect(() => {
    // Deliberately runs the first tick synchronously post-mount (not in the
    // lazy initializer) so SSR output stays the placeholder and hydration
    // never mismatches on server-vs-client clock time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [updateClock]);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates?.PHP) setRate(`1 USD = ₱ ${data.rates.PHP.toFixed(2)}`);
      })
      .catch(() => {});

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${ABORLAN_LAT}&longitude=${ABORLAN_LON}&current_weather=true`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.current_weather?.temperature != null) {
          setTemp(`${Math.round(data.current_weather.temperature)}°C`);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="info-strip-v2" role="complementary" aria-label="Real-time information">
      <div className="container info-strip-v2-inner" aria-live="polite" aria-atomic="false">
        <span className="info-strip-v2-item" aria-label="Exchange rate">
          <i className="bi bi-currency-exchange" aria-hidden="true" /> {rate}
        </span>
        <span className="info-strip-v2-item" aria-label="Current weather in Aborlan">
          <i className="bi bi-thermometer-half" aria-hidden="true" /> Aborlan {temp}
        </span>
        <span className="info-strip-v2-item" aria-label="Philippine Date and Time">
          <i className="bi bi-calendar3" aria-hidden="true" /> {dateStr} • {timeStr} PHT
        </span>
      </div>
    </div>
  );
}
