import { expect } from 'chai';
import sinon from 'sinon';
import productMock from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';
import productService from '../../../src/services/product.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  describe('POST /products', function () { 
    it('ao receber informações válidas, retorna os dados do produto', async function () {
      const parameters = productMock.validProductBody;
      const mockCreateReturn = ProductModel.build(productMock.validResponse);
      sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
    
      const serviceResponse = await productService.create(parameters);
    
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal(productMock.validResponse);
    });
  });

  describe('GET /products', function () {
    it('retorna uma lista de produtos', async function () {
      const mockFindAllReturn = ProductModel.build(productMock.validResponse);
      sinon.stub(ProductModel, 'findAll').resolves([mockFindAllReturn]);
    
      const serviceResponse = await productService.findAll();
    
      expect(serviceResponse.status).to.eq('SUCCESSFUL');
      expect(serviceResponse.data).to.be.deep.equal([productMock.validResponse]);
    });
  })
});
