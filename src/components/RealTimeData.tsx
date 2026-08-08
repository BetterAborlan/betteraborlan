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

// WMO weather codes (Open-Meteo) mapped to a Bootstrap Icon, a color that
// reflects the condition (not one flat color for every icon), and a
// bilingual label.
const WEATHER_CODES: Record<number, { icon: string; color: string; en: string; fil: string }> = {
  0: { icon: 'bi-sun-fill', color: 'var(--color-kapwa-yellow-500)', en: 'Clear sky', fil: 'Maaliwalas' },
  1: {
    icon: 'bi-cloud-sun-fill',
    color: 'var(--color-kapwa-orange-500)',
    en: 'Mainly clear',
    fil: 'Halos maaliwalas',
  },
  2: {
    icon: 'bi-cloud-sun-fill',
    color: 'var(--color-kapwa-orange-500)',
    en: 'Partly cloudy',
    fil: 'Bahagyang maulap',
  },
  3: { icon: 'bi-clouds-fill', color: 'var(--color-kapwa-gray-500)', en: 'Overcast', fil: 'Maulap' },
  45: {
    icon: 'bi-cloud-fog2-fill',
    color: 'var(--color-kapwa-gray-400)',
    en: 'Fog',
    fil: 'Maulap na hamog',
  },
  48: {
    icon: 'bi-cloud-fog2-fill',
    color: 'var(--color-kapwa-gray-400)',
    en: 'Fog',
    fil: 'Maulap na hamog',
  },
  51: {
    icon: 'bi-cloud-drizzle-fill',
    color: 'var(--color-kapwa-blue-400)',
    en: 'Light drizzle',
    fil: 'Ambon',
  },
  53: {
    icon: 'bi-cloud-drizzle-fill',
    color: 'var(--color-kapwa-blue-400)',
    en: 'Drizzle',
    fil: 'Ambon',
  },
  55: {
    icon: 'bi-cloud-drizzle-fill',
    color: 'var(--color-kapwa-blue-500)',
    en: 'Dense drizzle',
    fil: 'Malakas na ambon',
  },
  61: {
    icon: 'bi-cloud-rain-fill',
    color: 'var(--color-kapwa-blue-500)',
    en: 'Light rain',
    fil: 'Magaan na ulan',
  },
  63: { icon: 'bi-cloud-rain-fill', color: 'var(--color-kapwa-blue-600)', en: 'Rain', fil: 'Ulan' },
  65: {
    icon: 'bi-cloud-rain-heavy-fill',
    color: 'var(--color-kapwa-blue-700)',
    en: 'Heavy rain',
    fil: 'Malakas na ulan',
  },
  80: {
    icon: 'bi-cloud-rain-fill',
    color: 'var(--color-kapwa-blue-500)',
    en: 'Rain showers',
    fil: 'Sinag-ulan',
  },
  81: {
    icon: 'bi-cloud-rain-fill',
    color: 'var(--color-kapwa-blue-600)',
    en: 'Rain showers',
    fil: 'Sinag-ulan',
  },
  82: {
    icon: 'bi-cloud-rain-heavy-fill',
    color: 'var(--color-kapwa-blue-700)',
    en: 'Violent showers',
    fil: 'Malakas na sinag-ulan',
  },
  95: {
    icon: 'bi-cloud-lightning-rain-fill',
    color: 'var(--color-kapwa-purple-600)',
    en: 'Thunderstorm',
    fil: 'Bagyong kulog',
  },
  96: {
    icon: 'bi-cloud-lightning-rain-fill',
    color: 'var(--color-kapwa-purple-600)',
    en: 'Thunderstorm',
    fil: 'Bagyong kulog',
  },
  99: {
    icon: 'bi-cloud-lightning-rain-fill',
    color: 'var(--color-kapwa-purple-700)',
    en: 'Thunderstorm',
    fil: 'Bagyong kulog',
  },
};
const DEFAULT_WEATHER_ICON = { icon: 'bi-cloud-fill', color: 'var(--color-kapwa-text-support)' };

function WeatherIcon({ code }: { code: number | null }) {
  const info = code != null ? WEATHER_CODES[code] : undefined;
  return (
    <i
      className={`bi ${info?.icon ?? DEFAULT_WEATHER_ICON.icon}`}
      style={{ color: info?.color ?? DEFAULT_WEATHER_ICON.color }}
      aria-hidden="true"
    ></i>
  );
}

const WEEKDAYS: Record<'en' | 'fil', string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  fil: ['Lin', 'Lun', 'Mar', 'Miy', 'Huw', 'Biy', 'Sab'],
};

interface ForecastDay {
  date: Date;
  max: number | null;
  min: number | null;
  code: number | null;
}

export default function RealTimeData() {
  const { t, language } = useLanguage();
  const [temps, setTemps] = useState<(string | null)[]>(WEATHER_LOCATIONS.map(() => null));
  const [codes, setCodes] = useState<(number | null)[]>(WEATHER_LOCATIONS.map(() => null));
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);

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
        setCodes(results.map((d) => d?.current_weather?.weathercode ?? null));
      })
      .catch(() => {});

    const aborlan = WEATHER_LOCATIONS[0];
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${aborlan.lat}&longitude=${aborlan.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
    )
      .then((r) => r.json())
      .then((data) => {
        const daily = data?.daily;
        if (!daily?.time) return;
        setForecast(
          daily.time.map((iso: string, i: number) => ({
            date: new Date(iso),
            max: daily.temperature_2m_max?.[i] ?? null,
            min: daily.temperature_2m_min?.[i] ?? null,
            code: daily.weathercode?.[i] ?? null,
          }))
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
          <WeatherIcon code={codes[0]} />
          <div>
            <div className="realtime-weather-temp">{temps[0] ?? '--°C'}</div>
            <div>{t('weather-location')}</div>
          </div>
        </div>

        <div className="realtime-forecast">
          <div className="realtime-forecast-title">{t('forecast-5day-title')}</div>
          <div className="realtime-forecast-grid">
            {(forecast ? forecast.slice(1) : Array.from({ length: 4 }, () => null)).map(
              (day, i) => (
                <div key={i} className="realtime-forecast-day">
                  <div className="realtime-forecast-day-label">
                    {day ? WEEKDAYS[language][day.date.getDay()] : '--'}
                  </div>
                  <div className="realtime-forecast-day-date">
                    {day
                      ? day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : ''}
                  </div>
                  <WeatherIcon code={day?.code ?? null} />
                  <div className="realtime-forecast-day-temps">
                    <span className="realtime-forecast-max">
                      {day?.max != null ? `${Math.round(day.max)}°` : '--'}
                    </span>
                    <span className="realtime-forecast-min">
                      {day?.min != null ? `${Math.round(day.min)}°` : '--'}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="realtime-weather-other">
          {WEATHER_LOCATIONS.slice(1).map((loc, i) => (
            <div key={loc.label} className="realtime-weather-other-card">
              <WeatherIcon code={codes[i + 1]} />
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
