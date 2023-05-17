import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Init dropdown
const dropdowns = document.querySelectorAll('.dropdown-trigger');
const instance = M.Dropdown.init(dropdowns, {
  closeOnClick: false,
  alignment: 'right',
});

//Dropdown recalculate height
export function recalculateHeight() {
  instance[0].recalculateDimensions();
}

//Init select
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

//Init autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

//Datepicker
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: 'yyyy-mm'
});

export function getDatepickersInstance(elem) {
  return M.Datepicker.getInstance(elem)
}