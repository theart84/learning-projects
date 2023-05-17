import { getAutocompleteInstance, getDatepickersInstance } from '../plugins/materialize';


class FormUI {
  constructor(autocompleteInstance, datepickersInstance) {
    this._form = document.forms['locationsControls'];
    this.origin = document.getElementById('autocomplete-origin');
    this.destination = document.getElementById('autocomplete-destination');
    this.depart = document.getElementById('datepicker-depart');
    this.return = document.getElementById('datepicker-return');
    this.originAutoComplete = autocompleteInstance(this.origin);
    this.destinationAutoComplete = autocompleteInstance(this.destination);
    this.departDatePicker = datepickersInstance(this.depart);
    this.returnDatePicker = datepickersInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatePicker.toString();
  }
  get returnDateValue() {
    return this.returnDatePicker.toString();
  }

  setAutoCompleteData(data) {
    this.originAutoComplete.updateData(data);
    this.destinationAutoComplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickersInstance);

export default formUI;