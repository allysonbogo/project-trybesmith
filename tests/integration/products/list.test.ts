import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productMock from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('retorna uma lista de produtos', async function () {
    const mockFindAllReturn = ProductModel.build(productMock.validResponse);
    sinon.stub(ProductModel, 'findAll').resolves([mockFindAllReturn]);

    const httpResponse = await chai.request(app).get('/products');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal([productMock.validResponse]);
  });
});
