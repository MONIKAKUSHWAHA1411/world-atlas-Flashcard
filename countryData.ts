// This file would typically fetch data from an API or local database
// For this example, we're using a static dataset

export type Country = {
  name: string;
  capital: string;
  flag: string;
  population: string;
  continent: string;
  languages: string[];
  currency: string;
  area: string;
};

// Sample data for a few countries
export const countries: Country[] = [
  {
    name: 'United States',
    capital: 'Washington, D.C.',
    flag: 'https://flagcdn.com/w320/us.png',
    population: '331 million',
    continent: 'North America',
    languages: ['English'],
    currency: 'United States Dollar (USD)',
    area: '9.8 million km²',
  },
  {
    name: 'Japan',
    capital: 'Tokyo',
    flag: 'https://flagcdn.com/w320/jp.png',
    population: '126 million',
    continent: 'Asia',
    languages: ['Japanese'],
    currency: 'Japanese Yen (JPY)',
    area: '377,975 km²',
  },
  {
    name: 'Germany',
    capital: 'Berlin',
    flag: 'https://flagcdn.com/w320/de.png',
    population: '83 million',
    continent: 'Europe',
    languages: ['German'],
    currency: 'Euro (EUR)',
    area: '357,022 km²',
  },
  {
    name: 'Brazil',
    capital: 'Brasília',
    flag: 'https://flagcdn.com/w320/br.png',
    population: '212 million',
    continent: 'South America',
    languages: ['Portuguese'],
    currency: 'Brazilian Real (BRL)',
    area: '8.5 million km²',
  },
  {
    name: 'South Africa',
    capital: 'Pretoria',
    flag: 'https://flagcdn.com/w320/za.png',
    population: '59 million',
    continent: 'Africa',
    languages: ['Zulu', 'Xhosa', 'Afrikaans', 'English', 'Others'],
    currency: 'South African Rand (ZAR)',
    area: '1.2 million km²',
  },
  {
    name: 'Australia',
    capital: 'Canberra',
    flag: 'https://flagcdn.com/w320/au.png',
    population: '25 million',
    continent: 'Oceania',
    languages: ['English'],
    currency: 'Australian Dollar (AUD)',
    area: '7.7 million km²',
  },
  {
    name: 'India',
    capital: 'New Delhi',
    flag: 'https://flagcdn.com/w320/in.png',
    population: '1.38 billion',
    continent: 'Asia',
    languages: ['Hindi', 'English', 'Others'],
    currency: 'Indian Rupee (INR)',
    area: '3.3 million km²',
  },
  {
    name: 'Egypt',
    capital: 'Cairo',
    flag: 'https://flagcdn.com/w320/eg.png',
    population: '100 million',
    continent: 'Africa',
    languages: ['Arabic'],
    currency: 'Egyptian Pound (EGP)',
    area: '1 million km²',
  },
  {
    name: 'United Kingdom',
    capital: 'London',
    flag: 'https://flagcdn.com/w320/gb.png',
    population: '67 million',
    continent: 'Europe',
    languages: ['English'],
    currency: 'Pound Sterling (GBP)',
    area: '242,495 km²',
  },
  {
    name: 'Mexico',
    capital: 'Mexico City',
    flag: 'https://flagcdn.com/w320/mx.png',
    population: '128 million',
    continent: 'North America',
    languages: ['Spanish'],
    currency: 'Mexican Peso (MXN)',
    area: '1.9 million km²',
  },
];

// Function to get countries by continent
export function getCountriesByContinent(continent: string): Country[] {
  return countries.filter(country => country.continent === continent);
}

// Function to search countries
export function searchCountries(query: string): Country[] {
  const searchTerm = query.toLowerCase();
  return countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm) ||
    country.capital.toLowerCase().includes(searchTerm) ||
    country.continent.toLowerCase().includes(searchTerm)
  );
}

// Function to get a random set of countries (for quizzes)
export function getRandomCountries(count: number): Country[] {
  const shuffled = [...countries].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get continents with country counts
export function getContinents() {
  const continents = [
    {
      name: 'Africa',
      code: 'AF',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=600&auto=format&fit=crop',
      countryCount: countries.filter(c => c.continent === 'Africa').length
    },
    {
      name: 'Asia',
      code: 'AS',
      image: 'https://images.unsplash.com/photo-1535139262971-c51845709a48?q=80&w=600&auto=format&fit=crop',
      countryCount: countries.filter(c => c.continent === 'Asia').length
    },
    {
      name: 'Europe',
      code: 'EU',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=600&auto=format&fit=crop',
      countryCount: countries.filter(c => c.continent === 'Europe').length
    },
    {
      name: 'North America',
      code: 'NA',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&auto=format&fit=crop',
      countryCount: countries.filter(c => c.continent === 'North America').length
    },
    {
      name: 'South America',
      code: 'SA',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=600&auto=format&fit=crop',
      countryCount: countries.filter(c => c.continent === 'South America').length
    },
    {
      name: 'Oceania',
      code: 'OC',
      image: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?q=80&w=600&auto=format&fit=crop',
      countryCount: countries.filter(c => c.continent === 'Oceania').length
    },
    {
      name: 'Antarctica',
      code: 'AN',
      image: 'https://images.unsplash.com/photo-1516557070061-c3d1653fa646?q=80&w=600&auto=format&fit=crop',
      countryCount: 0
    },
  ];
  
  return continents;
}