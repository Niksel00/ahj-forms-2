import Modal from '../Modal';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('name error handler', () => {
  const modal = new Modal();
  modal.createModal();
  modal.showModal(() => {});
  const form = document.querySelector('.crm_modal .crm_form');
  document.querySelector('input.item_name').value = 'Тест';
  form.submit();
  const result = form.querySelector('.error');
  expect(result.innerText).toBe('стоимость должна быть числом больше 0');
});

test('cost error handler', () => {
  const modal = new Modal();
  modal.createModal();
  modal.showModal(() => {});
  const form = document.querySelector('.crm_modal .crm_form');
  document.querySelector('input.item_cost').value = '1000';
  form.submit();
  const result = form.querySelector('.error');
  expect(result.innerText).toBe('введите название товара');
});

test('close error', () => {
  const modal = new Modal();
  modal.createModal();
  modal.showModal(() => {});
  const form = document.querySelector('.crm_modal .crm_form');
  document.querySelector('input.item_name').value = 'Тест';
  form.submit();
  let result = form.querySelectorAll('.error');
  expect(result.length).toBe(1);
  document.querySelector('input.item_cost').focus();
  result = form.querySelectorAll('.error');
  expect(result.length).toBe(0);
});
