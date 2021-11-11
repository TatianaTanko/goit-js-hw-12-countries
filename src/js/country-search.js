import debounce from 'lodash.debounce';
import countryProfile from '../templates/country-profile.hbs';
import countriesList from '../templates/list-countrys.hbs';
import { error } from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

import API from './fetchCountries';
import getRefs from './get-refs';

const refs = getRefs();

let form = '';

refs.input.addEventListener('input', debounce(toSearchCounrty, 500));

function toSearchCounrty(e) {
  e.preventDefault();
  form = e.target.value;
  let newForm = form.trim();

  if (!newForm) {
    clearCountryContainer();
    return;
  }

  API.fetchCounry(form).then(renderCountryCard).catch(onFetchError);

  API.fetchCounry(newForm)
    .then(response => {
      if (response.length === 1) {
        renderCountryProfile(response);
        deleteError();
      } else if (response.length <= 10) {
        renderCountriesList(response);
        deleteError();
      } else {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
    })
    .catch(err => console.log(err));
}

function renderCountriesList(counrty) {
  const markup = countriesList(counrty);
  refs.cardContainer.innerHTML = markup;
  deleteError();
}

function renderCountryProfile(counrty) {
  const markup = countryProfile(counrty);
  refs.cardContainer.innerHTML = markup;
  deleteError();
}

function onFetchError() {
error({
text: 'Not this country!',
}); }

function clearCountryContainer() {
  refs.cardContainer.innerHTML = '';
}

function deleteError() {
  const errorMessage = document.querySelector('.pnotify');
  if (document.body.contains(errorMessage)) {
    errorMessage.style.display = 'none';
  }
}

function renderCountryCard(country) {
   console.log(country);
   console.log(country.length);
   if (country.length === 1) {
     renderCountryProfile(counrty);
     return;
   }
  if (country.length > 1 && country.length < 11) {
     renderCountriesList(counrty);
     return;
   }
   if (country.length > 10) {
     error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
 }

 function renderCountryCard(country) {
  console.log(country);
  console.log(country.length);
  if (country.length === 1) {
    const markup = countryProfile(counrty);
    refs.cardContainer.innerHTML = markup;
    deleteError();
  }
 if (country.length > 1 && country.length < 11) {
   const markup = countriesList(counrty);
   refs.cardContainer.innerHTML = markup;
   deleteError();
  }
 if (country.length > 10) {
   error({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}