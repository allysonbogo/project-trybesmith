const validName = 'Excalibur';
const validPrice = '10 peças de ouro';
const validOrderId = 1;

const validProductBody = { name: validName, price: validPrice, orderId: validOrderId };

const validResponse = { 
  id: 1,
  name: validName,
  price: validPrice,
  orderId: validOrderId,
};

export default {
  validProductBody,
  validResponse,
};