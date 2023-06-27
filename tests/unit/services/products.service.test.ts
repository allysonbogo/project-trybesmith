import { expect } from 'chai';
import sinon from 'sinon';
import productMock from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';
import productService from '../../../src/services/product.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('ao receber informações válidas, retorne os dados do produto', async function () {
    const parameters = productMock.validProductBody;
    const mockCreateReturn = ProductModel.build(productMock.validResponse);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
  
    const serviceResponse = await productService.create(parameters);
  
    expect(serviceResponse.status).to.eq('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(productMock.validResponse);
  });
});
