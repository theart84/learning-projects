import api from "../js/services/apiService";
import config from "../js/config/apiConfig";
import axios from 'axios';

jest.mock('axios');

const cities = [{ country_code: 'RU', name: 'Челябинск', code: 'CEK' }, { country_code: 'RU', name: 'Москва', code: 'MOW' }];
const countries = [{ code: 'RU', name: 'Россия' }];
const airlines = [{ country_code: 'RU', name: 'Pobeda', code: 'PBD' }, { country_code: 'RU', name: 'S7 Airline', code: 'S7' }];
const prices = [{ country_code: 'RU', name: 'Pobeda', code: 'PBD' }]


describe('Test API Service', () => {
  it('Success fetch cities', async() => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: cities}));
    await expect(api.cities()).resolves.toEqual(cities);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/cities`)
  });
  it('Fetch cities failure', async() => {
    const errMsg = 'Api error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
    await expect(api.cities()).rejects.toThrow(errMsg);
  });
  it('Success fetch countries', async() => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: countries}));
    await expect(api.countries()).resolves.toEqual(countries);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/countries`)
  });
  it('Fetch countries failure', async() => {
    const errMsg = 'Api error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
    await expect(api.countries()).rejects.toThrow(errMsg);
  });
  it('Success fetch airlines', async() => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: airlines}));
    await expect(api.airlines()).resolves.toEqual(airlines);
    expect(axios.get).toHaveBeenCalledWith(`${config.url}/airlines`)
  });
  it('Fetch airlines failure', async() => {
    const errMsg = 'Api error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
    await expect(api.airlines()).rejects.toThrow(errMsg);
  });
  it('Success fetch prices', async() => {
    axios.get.mockImplementationOnce(() => Promise.resolve({data: prices}));
    await expect(api.prices()).resolves.toEqual(prices);
  });
  it('Fetch airlines failure', async() => {
    const errMsg = 'Api error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errMsg)));
    await expect(api.prices()).rejects.toThrow(errMsg);
  });
});