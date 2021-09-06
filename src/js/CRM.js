import Item from './Item';
import Modal from './Modal';

export default class CRM {
  constructor(element) {
    this.table = element.querySelector('.crm_table');
    this.add = element.querySelector('.crm_add');
    this.items = [];

    this.modal = new Modal();

    this.addItem = this.addItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  init() {
    this.add.addEventListener('click', () => {
      this.modal.createModal();
      this.modal.showModal(this.addItem);
    });

    this.showTable();
  }

  showTable() {
    this.table.innerHTML = '';
    const headTable = document.createElement('tr');
    headTable.innerHTML = '<th>Название</th><th>Стоимость</th><th>Действия</th>';
    this.table.append(headTable);

    for (const item of this.items) {
      this.table.append(item.node);
    }

    this.table.addEventListener('click', this.changeItem);
  }

  addItem() {
    const item = new Item(this.modal.inputName.value, +this.modal.inputCost.value);
    this.items.push(item);
    this.modal.closeModal();
    this.showTable();
  }

  changeItem(event) {
    if (event.target.classList.contains('crm_edit')) {
      const targetNode = event.target.closest('tr');
      const item = this.items.find((itemFind) => itemFind.node === targetNode);
      this.modal.createModal();
      this.modal.showModal(this.editItem.bind(this, item), item);
    }
    if (event.target.classList.contains('crm_delete')) {
      this.deleteItem(event);
    }
  }

  editItem(target) {
    const item = target;
    item.name = this.modal.inputName.value;
    item.cost = +this.modal.inputCost.value;
    this.modal.closeModal();
    this.showTable();
  }

  deleteItem(event) {
    const targetNode = event.target.closest('tr');
    const itemIndex = this.items.findIndex((itemFind) => itemFind.node === targetNode);
    this.items.splice(itemIndex, 1);
    targetNode.remove();
  }
}
