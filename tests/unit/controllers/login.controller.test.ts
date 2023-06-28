import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { User } from '../../../src/types/User';
import loginService from '../../../src/services/login.service';
import Login from '../../../src/types/Login';
import Token from '../../../src/types/Token';
import loginController from '../../../src/controllers/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('ao receber informações válidas, retorna um token de login', async function () {
    req.body = loginMock.validLoginBody;
    const serviceResponse: ServiceResponse<Token> = {
      status: 'SUCCESSFUL',
      data: { token: loginMock.token },
    }
    sinon.stub(loginService, 'verifyLogin').resolves(serviceResponse);

    await loginController.verifyLogin(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({token: loginMock.token});
  });
});
