export default class Modal {
  constructor() {
    this.closeModal = this.closeModal.bind(this);
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('crm_modal');
    this.modal.innerHTML = `<form class="crm_form" novalidate>
    <div class="label">Название<input type="text" name="item-name" class="item_name" required></div>
    <div class="label">Стоимость<input type="text" name="item-cost" class="item_cost" pattern="[1-9][0-9]*" required></div>
    <div class="controls">
      <button>Сохранить</button>
      <button type="button" class="close">Отмена</button>
    </div>
  </form>`;

    this.form = this.modal.querySelector('.crm_modal .crm_form');
    this.inputName = this.form.querySelector('.item_name');
    this.inputCost = this.form.querySelector('.item_cost');
    this.close = this.modal.querySelector('.crm_modal .close');
  }

  showModal(callback, item) {
    document.body.appendChild(this.modal);
    this.close.addEventListener('click', this.closeModal);
    const allInputs = this.form.querySelectorAll('input');
    [...allInputs].forEach((input) => input.addEventListener('focus', Modal.removeError));

    if (item) {
      this.inputName.value = item.name;
      this.inputCost.value = item.cost;
    }
    this.form.addEventListener('submit', this.checkValidity.bind(this, callback));
  }

  closeModal() {
    this.modal.remove();
  }

  checkValidity(callback, event) {
    event.preventDefault();

    const isValid = event.currentTarget.checkValidity();
    if (!isValid) {
      if (!this.inputName.validity.valid) {
        Modal.showError(this.inputName, 'введите название товара');
      }
      if (!this.inputCost.validity.valid) {
        Modal.showError(this.inputCost, 'стоимость должна быть числом больше 0');
      }
      return;
    }

    callback();
  }

  static showError(targetNode, message) {
    const error = document.createElement('div');
    error.classList.add('error');
    error.innerText = message;
    targetNode.closest('div').append(error);
    error.style.left = `${targetNode.offsetLeft + targetNode.offsetWidth / 2 - error.offsetWidth / 2}px`;
    error.style.top = `${targetNode.offsetTop + targetNode.offsetHeight}px`;
  }

  static removeError(event) {
    const error = event.currentTarget.closest('div').querySelector('.error');
    if (error) {
      error.remove();
    }
  }
}
