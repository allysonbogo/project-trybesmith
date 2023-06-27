import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productMock from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('ao receber informações válidas, retorna os dados do produto', async function () {
    const httpRequestBody = productMock.validProductBody
    const mockCreateReturn = ProductModel.build(productMock.validResponse);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(productMock.validResponse);
  });
});
