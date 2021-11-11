const BASE_URL = 'https://restcountries.eu/rest/v2/';

function fetchCounry(countryName) {
  return fetch(`${BASE_URL}name/${countryName}`).then(response => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  });
}

export default { fetchCounry };