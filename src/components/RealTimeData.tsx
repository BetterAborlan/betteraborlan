'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@bettergov/kapwa/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { hotlines } from '@/data/hotlines';

// Leaflet touches `window` at import time, so it can only ever run client-side.
const AborlanMap = dynamic(() => import('@/components/AborlanMap'), {
  ssr: false,
  loading: () => <div className="realtime-map-loading">Loading map…</div>,
});

const WEATHER_LOCATIONS = [
  { label: 'Aborlan', lat: 9.4167, lon: 118.5167 },
  { label: 'Narra', lat: 9.3333, lon: 118.4333 },
  { label: 'Puerto Princesa', lat: 9.7392, lon: 118.7353 },
] as const;

const CURRENCIES = ['USD', 'JPY', 'GBP', 'SGD', 'AUD', 'EUR'] as const;

export default function RealTimeData() {
  const { t } = useLanguage();
  const [temps, setTemps] = useState<(string | null)[]>(WEATHER_LOCATIONS.map(() => null));
  const [rates, setRates] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const lats = WEATHER_LOCATIONS.map((l) => l.lat).join(',');
    const lons = WEATHER_LOCATIONS.map((l) => l.lon).join(',');
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current_weather=true`
    )
      .then((r) => r.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : [data];
        setTemps(
          results.map((d) =>
            d?.current_weather?.temperature != null
              ? `${Math.round(d.current_weather.temperature)}°C`
              : null
          )
        );
      })
      .catch(() => {});

    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates?.PHP) setRates(data.rates);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="realtime-grid">
      <Card className="realtime-card realtime-card--weather">
        <h3>
          <i className="bi bi-cloud-sun-fill" aria-hidden="true"></i> Weather
        </h3>
        <div className="realtime-weather-current">
          <i className="bi bi-cloud-sun-fill" aria-hidden="true"></i>
          <div>
            <div className="realtime-weather-temp">{temps[0] ?? '--°C'}</div>
            <div>{t('weather-location')}</div>
          </div>
        </div>
        <div className="realtime-weather-other">
          {WEATHER_LOCATIONS.slice(1).map((loc, i) => (
            <div key={loc.label} className="realtime-weather-other-card">
              <i className="bi bi-cloud-sun-fill" aria-hidden="true"></i>
              <div>
                <div className="realtime-weather-other-temp">{temps[i + 1] ?? '--°C'}</div>
                <div>{loc.label}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="realtime-card realtime-card--currency">
        <h3>
          <i className="bi bi-currency-exchange" aria-hidden="true"></i> Currency
        </h3>
        <table className="realtime-currency-table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {CURRENCIES.map((cur) => {
              const value = rates && rates.PHP && rates[cur] ? rates.PHP / rates[cur] : null;
              return (
                <tr key={cur}>
                  <td>{cur}</td>
                  <td>{value ? `₱${value.toFixed(2)}` : '--'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <Card className="realtime-card realtime-card--map">
        <h3>
          <i className="bi bi-geo-alt-fill" aria-hidden="true"></i> Map
        </h3>
        <AborlanMap />
      </Card>

      <Card className="realtime-card realtime-card--hotlines">
        <h3>
          <i className="bi bi-telephone-fill" aria-hidden="true"></i> Emergency Hotlines{' '}
          <span className="data-as-of">as of April 2023</span>
        </h3>
        <ul className="realtime-hotlines">
          {hotlines.map((h) => (
            <li key={h.label}>
              <span>{h.label}</span>
              {h.numbers ? (
                <span className="realtime-hotline-numbers">
                  {h.numbers.map((n, i) => (
                    <span key={n}>
                      {i > 0 && ' / '}
                      <a href={`tel:${n.replace(/-/g, '')}`}>{n}</a>
                    </span>
                  ))}
                </span>
              ) : (
                <span className="pending">TBD</span>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
