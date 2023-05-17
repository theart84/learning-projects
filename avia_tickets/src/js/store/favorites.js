import locations from "./locations";
import favTicketsUI from "../views/favTickets";

export class Favorites {
  constructor(locations) {
    this.locations = locations;
    Favorites.initLocalStorage();
  }

  static initLocalStorage() {
    let data = JSON.parse(localStorage.getItem('data'));
    if (!data) {
      data = []
      localStorage.setItem('data', JSON.stringify(data));
    }
    favTicketsUI.renderTickets(data);
  }

  setFavoriteTicketToLocalStorage(ticketId) {
    const data = JSON.parse(localStorage.getItem('data'));
    const findItem = data.find(ticket => ticket.id === ticketId);
    if (findItem) return;
    data.push(this.findTicketInLastSearch(ticketId))
    localStorage.setItem('data', JSON.stringify(data));
    favTicketsUI.renderTickets(data);
  }
  removeTicketToLocalStorage(ticketId) {
    const data = this.getFavoritesTicketToLocalStorage();
    localStorage.clear();
    const newData = data.filter(ticket => ticket.id !== ticketId);
    localStorage.setItem('data', JSON.stringify(newData));
    favTicketsUI.renderTickets(newData);
  }

  getFavoritesTicketToLocalStorage() {
    let data = JSON.parse(localStorage.getItem('data'));
    if (!data) {
      data = []
      localStorage.setItem('data', JSON.stringify(data));
    }
    return JSON.parse(localStorage.getItem('data'));
  }

  findTicketInLastSearch(ticketId) {
    return locations.lastSearch.find(ticket => ticket.id === ticketId);
  }


}

const favorites = new Favorites(locations);

export default favorites;