import currencyUI from "./currency";

class FavTicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.dropdown-content');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency)
  }

  renderTickets(tickets) {
    this.clearContainer();
    if (!tickets.length) {
      this.showEmptyMessage();
      return;
    }
    let fragment = '';
    const currency = this.getCurrencySymbol();

    tickets.forEach(ticket => {
      const template = FavTicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMessage() {
    const template = FavTicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `<div class="tickets-empty-res-msg">
        Список избранных билетов пуст.
      </div>`;
  }

  static ticketTemplate(ticket, currency) {
    return `<div class="favorite-item  d-flex align-items-start" data-ticket-id="${ticket.id}">
            <div class="favorite-item-airline-container"><img
                src="${ticket.airline_logo}"
                class="favorite-item-airline-img"
                alt="Airline logo"
            /></div>            
            <div class="favorite-item-info d-flex flex-column">
              <div
                  class="favorite-item-destination d-flex align-items-center"
              >
                <div class="d-flex align-items-center mr-auto">
                  <span class="favorite-item-city">${ticket.origin_name}</span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="favorite-item-city">${ticket.destination_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${ticket.departure_at}</span>
                <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
              </div>
              <a
                  class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
              >Delete</a
              >
            </div>
          </div>`;
  }
}

const favTicketsUI = new FavTicketsUI(currencyUI);

export default favTicketsUI;