import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model';
import orderMock from '../../mocks/order.mock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });

  it('retorna uma lista de pedidos', async function () {
    const mockFindAllReturn = OrderModel.build(orderMock.validResponse);
    sinon.stub(OrderModel, 'findAll').resolves([mockFindAllReturn]);

    const httpResponse = await chai.request(app).get('/orders');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal([orderMock.validResponse]);
  });
});
