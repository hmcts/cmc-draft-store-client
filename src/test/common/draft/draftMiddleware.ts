/* tslint:disable:no-unused-expression */
import * as express from 'express'
import * as chai from 'chai'
import * as spies from 'sinon-chai'
import * as sinon from 'sinon'
import { mockReq as req, mockRes } from 'sinon-express-mock'

import { DraftMiddleware } from 'common/draft/draftMiddleware'

import DraftStoreClient from 'common/draft/draftStoreClient'
import { DraftStoreClientFactory } from 'common/draft/draftStoreClientFactory'
import * as requestPromise from 'request-promise-native'
import { DraftStoreConfig } from '../../http-mocks/draftStoreConfig'
import { ServiceAuthTokenFactory } from 'common/security/serviceTokenFactory'
import ServiceAuthToken from 'idam/serviceAuthToken'

chai.use(spies)
const request = requestPromise
  .defaults({
    json: true,
    timeout: 10000
  })

describe('Draft middleware', () => {
  describe('request handler', () => {
    let factoryFn
    let findFn
    let factory: DraftStoreClientFactory
    let draftMiddleWare: DraftMiddleware

    beforeEach(() => {
      let authTokenFactory = {} as ServiceAuthTokenFactory
      authTokenFactory.get = sinon.stub().returns(new ServiceAuthToken('service-jwt-token'))

      factory = new DraftStoreClientFactory(authTokenFactory)
      draftMiddleWare = new DraftMiddleware(authTokenFactory)

      factoryFn = sinon.stub(factory, 'create').callsFake(() => {
        return new DraftStoreClient('service-jwt-token', DraftStoreConfig.draftStoreUrl, request)
      })
      findFn = sinon.stub(DraftStoreClient.prototype, 'find').callsFake((args, x, y) => {
        return Promise.resolve([])
      })
    })

    afterEach(() => {
      factoryFn.restore()
      findFn.restore()
    })

    it('should saerch for drafts if the user is logged in', async () => {
      const res: express.Response = mockRes()
      res.locals.isLoggedIn = true
      res.locals.user = {
        bearerToken: 'user-jwt-token'
      }

      await draftMiddleWare.requestHandler('default', DraftStoreConfig.draftStoreUrl, request)(req(), res, sinon.spy())
      chai.expect(findFn).to.have.been.called
    })

    it('should not search for drafts if the user is not logged in', async () => {
      const res: express.Response = mockRes()
      res.locals.isLoggedIn = false

      await draftMiddleWare.requestHandler('default', DraftStoreConfig.draftStoreUrl, request)(req(), res, sinon.spy())
      chai.expect(findFn).to.not.have.been.called
    })

    it('should not search for drafts if the isLoggedIn flag is not defined', async () => {
      const res: express.Response = mockRes()
      res.locals.isLoggedIn = undefined

      await draftMiddleWare.requestHandler('default', DraftStoreConfig.draftStoreUrl, request)(req(), res, sinon.spy())
      chai.expect(findFn).to.not.have.been.called
    })
  })
})
