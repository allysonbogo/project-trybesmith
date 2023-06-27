import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMock from '../../mocks/product.mock';
import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('POST /products', function () {
    it('ao receber informações válidas, retorna os dados do produto', async function () {
      req.body = productMock.validProductBody;
      const serviceResponse: ServiceResponse<Product> = {
        status: 'SUCCESSFUL',
        data: productMock.validResponse,
      }
      sinon.stub(productService, 'create').resolves(serviceResponse);

      await productController.create(req, res);
      
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productMock.validResponse);
    });
  });

  describe('GET /products', function () {
    it('retorna uma lista de produtos', async function () {
      const serviceResponse: ServiceResponse<Product[]> = {
        status: 'SUCCESSFUL',
        data: [productMock.validResponse],
      }
      sinon.stub(productService, 'findAll').resolves(serviceResponse);

      await productController.findAll(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([productMock.validResponse]);
    });
  })
});
