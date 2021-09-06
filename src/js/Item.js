export default class Item {
  constructor(name, cost) {
    this.node = document.createElement('tr');
    const itemName = document.createElement('td');
    itemName.classList.add('item_name');
    const itemCost = document.createElement('td');
    itemCost.classList.add('item_cost');
    const itemControls = document.createElement('td');
    itemControls.innerHTML = '<span class="crm_edit">✎</span><span class="crm_delete">✕</span>';
    this.node.append(itemName, itemCost, itemControls);

    this.name = name;
    this.cost = cost;
  }

  get name() {
    return this.privateName;
  }

  set name(value) {
    this.privateName = value;
    this.node.querySelector('.item_name').innerText = value;
  }

  get cost() {
    return this.privateCost;
  }

  set cost(value) {
    this.privateCost = value;
    this.node.querySelector('.item_cost').innerText = value;
  }
}
