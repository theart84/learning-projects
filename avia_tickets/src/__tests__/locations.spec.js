import locations, { Locations } from "../js/store/locations";
import { formatDate } from "../js/helpers/date";
import api, { API } from "../js/services/apiService";
import favorites from "../js/store/favorites";

const countries = [{ code: 'RU', name: 'Россия' }];
const cities = [{ country_code: 'RU', name: 'Челябинск', code: 'CEK' }, { country_code: 'RU', name: 'Москва', code: 'MOW' }];
const airlines = [{ country_code: 'RU', name: 'Pobeda', code: 'PBD' }, { country_code: 'RU', name: 'S7 Airline', code: 'S7' }];

jest.mock('../js/services/apiService', () => {
   const mockApi = {
     countries: jest.fn(() => Promise.resolve([{ code: 'RU', name: 'Россия' }])),
     cities: jest.fn(() => Promise.resolve([{ country_code: 'RU', name: 'Челябинск', code: 'CEK' }, { country_code: 'RU', name: 'Москва', code: 'MOW' }])),
     airlines: jest.fn(() => Promise.resolve([{ country_code: 'RU', name: 'Pobeda', code: 'PBD' }, { country_code: 'RU', name: 'S7 Airline', code: 'S7' }])),
   };
   return {
     API: jest.fn(() => mockApi),
   }
});
jest.mock('../js/views/favTickets');

const apiService = new API();

describe('Locations store tests', () => {
  beforeEach(() => {
    locations.countries = locations.serializeCountries(countries);
    locations.cities = locations.serializeCity(cities);

  })
  it('Check that location is instance of Locations class', () => {
    expect(locations).toBeInstanceOf(Locations);
  });
  it('Success Locations instance create', () => {
    const instance = new Locations(api,{ formatDate });
    expect(instance.countries).toBe(null);
    expect(instance.shortCitiesList).toEqual({});
    expect(instance.formatDate).toEqual(formatDate);
  });
  it('Check correct countries serialize', () => {
    const res = locations.serializeCountries(countries);
    const expectedData = {
      RU: {
        code: 'RU',
        name: 'Россия' ,
      }
    };
    expect(res).toEqual(expectedData);
  });
  it('Check countriesSerialize with incorrect data', () => {
    const res = locations.serializeCountries(null);
    const expectedData = {};
    expect(res).toEqual(expectedData);
  });
  it('Check correct cities serialize', () => {
    const res = locations.serializeCity(cities);
    const expectedData = {
      CEK: { country_code: 'RU', name: 'Челябинск', code: 'CEK', country_name: 'Россия', full_name: 'Челябинск,Россия' },
      MOW: { country_code: 'RU', name: 'Москва', code: 'MOW', country_name: 'Россия', full_name: 'Москва,Россия' },
    };
    expect(res).toEqual(expectedData);
  });
  it('Check correct get city by code', () => {
    const res = locations.getCityNameByCode('CEK');
    expect(res).toBe('Челябинск');
  });
  it('Check correct init method call', () => {
    const instance = new Locations(apiService, { formatDate });
    expect(instance.init()).resolves.toEqual([countries, cities, airlines]);
  });
  it('Check correct return data getCityCodeByKey method', () => {
    locations.cities = [{code: 'CEK', full_name: 'Челябинск,Россия' }];
    const res = locations.getCityCodeByKey('Челябинск,Россия');
    expect(res).toBe('CEK')
  });
  it('Check correct return data getAirlineNameByCode method', () => {
    locations.airlines = { 'S7': {code: 'S7', name: 'S7 Airline' }};
    const res1 = locations.getAirlineNameByCode('S7');
    expect(res1).toBe('S7 Airline');
    const res2 = locations.getAirlineNameByCode();
    expect(res2).toBe('');
  });
  it('Check correct return data getAirlineLogo method', () => {
    locations.airlines = { 'S7': {code: 'S7', name: 'S7 Airlines', logo: 'http://test.url' }};
    const res1 = locations.getAirlineLogo('S7');
    expect(res1).toBe('http://test.url');
    const res2 = locations.getAirlineLogo();
    expect(res2).toBe('');
  });
  it('Check correct return data getTicketID method', () => {
    const ticket = {
      airline: "SU",
      departure_at: "2020-12-15T19:25:00Z",
      destination: "MOW",
      flight_number: 1423,
      origin: "CEK",
    };
    const res = locations.getTicketID(ticket);
    expect(res).toBe('SUMOWCEK1423162520201225');
  });
  it('Check correct return data serializeTickets method', () => {
    locations.airlines = { 'S7': {code: 'S7', name: 'S7 Airlines', logo: 'http://test.url' }};
    const tickets = [{
      airline: "S7",
      departure_at: "2020-12-15T19:55:00Z",
      destination: "MOW",
      expires_at: "2020-12-15T14:55:00Z",
      flight_number: 1146,
      origin: "CEK",
      price: 72,
      return_at: "2020-12-18T18:05:00Z",
      transfers: 0,
    }];
    favorites.getFavoritesTicketToLocalStorage = jest.fn(() => [{test: 'test'}])
    expect(locations.serializeTickets(tickets)).toEqual([{
      airline: "S7",
      airline_logo: "http://test.url",
      airline_name: "S7 Airlines",
      departure_at: "16 Dec 2020 12:55",
      destination: "MOW",
      destination_name: "Москва",
      expires_at: "2020-12-15T14:55:00Z",
      flight_number: 1146,
      id: "S7MOWCEK1146165520201255",
      isFavorites: false,
      origin: "CEK",
      origin_name: "Челябинск",
      price: 72,
      return_at: "18 Dec 2020 11:05",
      transfers: 0,
    }])
  });
});
