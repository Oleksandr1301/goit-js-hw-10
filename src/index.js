import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchbox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchbox.addEventListener(
  'input',
  debounce(e => {
    e.preventDefault();
    let inputValue = searchbox.value.trim();
    console.log('search: ', inputValue);
    if (inputValue !== '') {
      fetchCountries(inputValue)
        .then(countryName => {
          if (countryName.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            return;
          } else if (countryName.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            return;
          } else if (countryName.length >= 2 && countryName.length <= 10) {
            const markup = countryName
              .map(countries => renderCounrtiesList(countries))
              .join('');
            countryInfo.innerHTML = '';
            countryList.innerHTML = markup;
          } else if (countryName.length === 1) {
            const markup = countryName
              .map(countries => renderCountriesOneLetter(countries))
              .join('');
            countryList.innerHTML = '';
            countryInfo.innerHTML = markup;
          }
        })
        .catch(error => {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
          return error;
        });
    }
  }),
  DEBOUNCE_DELAY
);

function renderCounrtiesList({ flags, name }) {
  return ` 
    <li style='list-style: none;'>
    <img src="${flags.svg}" alt="${name.official}" width="50" hight="30"/>
         <span>${name.official}</span>
    </li>`;
}

function renderCountriesOneLetter({
  name,
  capital,
  population,
  flags,
  languages,
}) {
  return `<img src="${flags.svg}" alt="${name.official}" width = '100'/>
      <h2>Country: ${name.official}</h2>
      <p><b>Capital:</b> ${capital}</p>
      <p><b>Population:</b> ${population}</p>
      <p><b>Languages:</b> ${Object.values(languages)}</p>`;
}
