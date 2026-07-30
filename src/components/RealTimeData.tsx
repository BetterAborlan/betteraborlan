'use client';

import { useEffect, useState } from 'react';
import { Card } from '@bettergov/kapwa/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { hotlines } from '@/data/hotlines';

const ABORLAN_LAT = 9.4167;
const ABORLAN_LON = 118.5167;

const CURRENCIES = ['USD', 'JPY', 'GBP', 'SGD', 'AUD', 'EUR'] as const;

export default function RealTimeData() {
  const { t } = useLanguage();
  const [temp, setTemp] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<string, number> | null>(null);

  useEffect(() => {
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

    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates?.PHP) setRates(data.rates);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="realtime-grid">
      <Card className="realtime-card">
        <h3>
          <i className="bi bi-cloud-sun-fill" aria-hidden="true"></i> Weather
        </h3>
        <div className="realtime-weather-current">
          <i className="bi bi-cloud-sun-fill" aria-hidden="true"></i>
          <div>
            <div className="realtime-weather-temp">{temp ?? '--°C'}</div>
            <div>{t('weather-location')}</div>
          </div>
        </div>
      </Card>

      <Card className="realtime-card">
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

      <Card className="realtime-card">
        <h3>
          <i className="bi bi-telephone-fill" aria-hidden="true"></i> Emergency Hotlines
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
