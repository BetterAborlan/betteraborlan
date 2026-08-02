'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@bettergov/kapwa/input';

interface Props {
  placeholder?: string;
}

const suggestions = [
  'Birth Registration',
  'Marriage Registration',
  'Death Registration',
  'Business Permit',
  'Real Property Tax',
  'Cedula',
  'Senior Citizen ID',
  'PWD ID',
  'Building Permit',
  'Financial Assistance',
  'Health Services',
  'Agriculture',
];

export default function SearchAutocomplete({ placeholder }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const filtered =
    query.length < 2
      ? []
      : suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <form
      ref={ref}
      className="search-autocomplete-wrapper"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = query.trim();
        setOpen(false);
        router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
      }}
    >
      <Input
        type="text"
        className="search-box"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(e.target.value.length >= 2);
        }}
        placeholder={placeholder || 'Search services...'}
        aria-label="Search services"
        autoComplete="off"
      />
      <button type="submit" className="search-submit-btn" aria-label="Search">
        <i className="bi bi-search" aria-hidden="true"></i>
      </button>
      {open && filtered.length > 0 && (
        <ul className="search-autocomplete-list" role="listbox" aria-label="Search suggestions">
          {filtered.map((item) => (
            <li
              key={item}
              role="option"
              aria-selected={false}
              className="search-autocomplete-item"
              onClick={() => {
                setQuery(item);
                setOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
