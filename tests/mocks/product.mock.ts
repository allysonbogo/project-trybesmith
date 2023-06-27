const validName = 'Martelo de Thor';
const validPrice = '30 peças de ouro';
const validOrderId = 4;

const validProductBody = { name: validName, price: validPrice, orderId: validOrderId };

const validResponse = { 
  id: 6,
  name: validName,
  price: validPrice,
  orderId: validOrderId,
};

export default {
  validProductBody,
  validResponse,
};