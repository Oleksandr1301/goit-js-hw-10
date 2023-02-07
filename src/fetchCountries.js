
export function fetchCountries(name) {
    return fetch('https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages')
        .then(response => response.json());
}

// const listPromisCountries = fetch('https://restcountries.com/v3.1/name/peru');
// listPromisCountries.then(data => data.json()).then(counries => counries);
// console.log(listPromisCountries);