import CRM from '../CRM';

beforeEach(() => {
  const HTML = document.createElement('div');
  HTML.innerHTML = `<section class="crm">
    <div class="crm_add">+</div>
    <table class="crm_table"></table>
  </section>`;
  document.body.innerHTML = '';
  document.body.appendChild(HTML);
});

test('init', () => {
  const crm = new CRM(document.querySelector('.crm'));
  crm.init();
  const result = document.querySelectorAll('.crm_table tr th');
  expect(result.length).toBe(3);
});

test('add item', () => {
  const crm = new CRM(document.querySelector('.crm'));
  crm.init();
  document.querySelector('.crm_add').click();
  document.querySelector('input.item_name').value = 'Тест';
  document.querySelector('input.item_cost').value = '1000';
  document.querySelector('.crm_modal .crm_form').submit();
  const result = document.querySelectorAll('.crm_table tr');
  expect(result[1].querySelector('td').innerText).toBe('Тест');
  expect(result[1].querySelector('td:nth-child(2)').innerText).toBe(1000);
});

test('delete item', () => {
  const crm = new CRM(document.querySelector('.crm'));
  crm.init();
  document.querySelector('.crm_add').click();
  document.querySelector('input.item_name').value = 'Тест';
  document.querySelector('input.item_cost').value = '1000';
  document.querySelector('.crm_modal .crm_form').submit();
  let result = document.querySelectorAll('.crm_table tr');
  expect(result.length).toBe(2);
  document.querySelector('.crm_delete').click();
  result = document.querySelectorAll('.crm_table tr');
  expect(result.length).toBe(1);
});

test('edit item', () => {
  const crm = new CRM(document.querySelector('.crm'));
  crm.init();
  document.querySelector('.crm_add').click();
  document.querySelector('input.item_name').value = 'Тест';
  document.querySelector('input.item_cost').value = '1000';
  document.querySelector('.crm_modal .crm_form').submit();
  document.querySelector('.crm_edit').click();
  document.querySelector('input.item_name').value = 'Тест 2';
  document.querySelector('input.item_cost').value = '3000';
  document.querySelector('.crm_modal .crm_form').submit();
  const result = document.querySelectorAll('.crm_table tr');
  expect(result[1].querySelector('td').innerText).toBe('Тест 2');
  expect(result[1].querySelector('td:nth-child(2)').innerText).toBe(3000);
});
