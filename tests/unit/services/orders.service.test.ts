import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import orderMock from '../../mocks/order.mock';
import orderService from '../../../src/services/order.service';

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
});
