import api from '../services/apiService';
import { formatDate } from "../helpers/date";
import favorites from "./favorites";

export class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = {};
    this.airlines = {};
    this.lastSearch = {};
    this.formatDate = helpers.formatDate;
  }
  async init() {
    const response = await Promise.all([
        this.api.countries(),
        this.api.cities(),
        this.api.airlines(),
    ]);
    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCity(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    return response;
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(item => item.full_name === key);
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogo(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  serializeCountries(countries) {
    // { 'Country code': { ... } }
    if (!Array.isArray(countries) || !countries.length) {
      return {};
    }
    return countries.reduce((acc, country) => {
      acc[country.code] = country
      return acc;
    }, {});
  }

  serializeCity(cities) {
    // { 'City name, Country name': { ... } }
    return cities.reduce((acc, city) => {
      const country_name = this.getCountryNameByCode(city.country_code);
      const city_name = city.name || city.name_translations.en
      const full_name = `${city_name},${country_name}`;
      acc[city.code] = {
        ...city,
        country_name,
        full_name,
      };
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, airline) => {
      const airlineCopy = {...airline};
      airlineCopy.logo = `http://pics.avs.io/200/200/${airlineCopy.code}.png`;
      airlineCopy.name = airlineCopy.name || airlineCopy.name_translations.en;
      acc[airlineCopy.code] = airlineCopy;
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    return this.countries[code].name
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
  }

  getTicketID(ticket) {
    return `${ticket.airline}${ticket.destination}${ticket.origin}${ticket.flight_number}${this.formatDate(ticket.departure_at, 'ddmmyyyyhhmm')}`;
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map(ticket => {
      return {
        ...ticket,
        id: this.getTicketID(ticket),
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogo(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
        return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
        isFavorites: this.checkFavoriteStatus(ticket),
      }
    })
  }
  checkFavoriteStatus(ticket) {
    const id = this.getTicketID(ticket);
    const favoritesArray = favorites.getFavoritesTicketToLocalStorage();
    return favoritesArray.some((ticket) => ticket.id === id);
  }

}

const locations = new Locations(api, { formatDate });

export default locations;