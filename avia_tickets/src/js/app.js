import locations from "./store/locations";
import '../css/style.css';
import './plugins';
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketUI from "./views/tickets";
import favorites from "./store/favorites";
import favTicketsUI from "./views/favTickets";
import { recalculateHeight } from './plugins/materialize'


document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;
  const favoriteElement = document.querySelector('.dropdown-content');



 //Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  })
  function addFavoritesListener() {
    const favoriteElement = document.querySelectorAll('.ticket-airline__favorites i');
    [...favoriteElement].forEach(favoriteItem => {
      favoriteItem.addEventListener('click', (e) => {
        const ticket = e.target;
        const parent = ticket.closest('.ticket-card');
        const ticketId = parent.dataset.ticketId;
        if (ticket.textContent === 'favorite_border') {
          ticket.textContent = 'favorite';
          favorites.setFavoriteTicketToLocalStorage(ticketId);
        } else {
          ticket.textContent = 'favorite_border';
          favorites.removeTicketToLocalStorage(ticketId);
        }
      });
    });
  }

  favoriteElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-favorite')) {
      const parent = e.target.closest('.favorite-item');
      const ticketId = parent.dataset.ticketId;
      favorites.removeTicketToLocalStorage(ticketId);
      recalculateHeight();
      const ticketElemenet = document.querySelector(`.ticket-card[data-ticket-id="${ticketId}"]`);
      const favoriteStatus = ticketElemenet.querySelector('.ticket-airline__favorites i');
      favoriteStatus.textContent = 'favorite_border';
    }
  })

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutoCompleteData(locations.shortCitiesList);
  }
  async function onFormSubmit() {
    //собрать данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue

    //CODE, CODE, 2019-09, 2019-10
    await locations.fetchTickets({origin, destination, depart_date, return_date, currency});
    ticketUI.renderTickets(locations.lastSearch);
    addFavoritesListener();
  }
})