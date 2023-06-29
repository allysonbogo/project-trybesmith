import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import orderMock from '../../mocks/order.mock';
import orderService from '../../../src/services/order.service';
import ProductModel from '../../../src/database/models/product.model';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('GET /orders', function () {
    it('retorna uma lista de pedidos', async function () {
      const mockFindAllReturn = OrderModel.build(orderMock.validResponse);
      sinon.stub(OrderModel, 'findAll').resolves([mockFindAllReturn]);
    
      const serviceResponse = await orderService.findAll();
    
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
    });
  })

  describe('POST /orders', function () { 
    it('ao receber informações válidas, retorna os dados do pedido', async function () {
      const { userId, productIds } = orderMock.validOrderBody;
      const mockCreateReturn = OrderModel.build(orderMock.validCreateOrderBuild);
      sinon.stub(OrderModel, 'create').resolves(mockCreateReturn);
      const serviceResponse = await orderService.create(userId, productIds);
    
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(orderMock.validCreateOrderResponse);
    });
  });
});
