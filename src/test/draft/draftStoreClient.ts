/* tslint:disable:no-unused-expression */
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as spies from 'sinon-chai'
import * as asPromised from 'chai-as-promised'
import * as requestPromise from 'request-promise-native'
import * as HttpStatus from 'http-status-codes'
import * as moment from 'moment'
import * as mock from 'nock'

import * as draftStoreServiceMock from '../http-mocks/draft-store'

import { ServiceAuthToken } from '../../main/security/serviceAuthToken'
import { ServiceAuthTokenFactory } from '../../main/security/serviceAuthTokenFactory'

import { DraftStoreClient } from '../../main/draft/draftStoreClient'
import { DraftStoreClientFactory } from '../../main/draft/draftStoreClientFactory'
import { Draft } from '../../main/draft/draft'

chai.use(spies)
chai.use(asPromised)
const expect = chai.expect
const request = requestPromise
  .defaults({
    json: true,
    timeout: 10000
  })

describe('DraftStoreClient', () => {
  let factory: DraftStoreClientFactory
  beforeEach(() => {
    mock.cleanAll()
    let authTokenFactory = {} as ServiceAuthTokenFactory
    authTokenFactory.get = sinon.stub().returns(new ServiceAuthToken('jwt-token'))
    factory = new DraftStoreClientFactory(authTokenFactory)
  })

  describe('find', () => {
    const deserializationFn = (value => value)

    describe('when handling error responses', () => {
      it('should reject promise with HTTP error', async () => {
        draftStoreServiceMock.rejectFind()
        const client: DraftStoreClient<any> = await factory.create(draftStoreServiceMock.serviceBaseURL, request)
        try {
          await client.find({}, 'jwt-token', deserializationFn)
        } catch (err) {
          expect(err.name).to.equal('StatusCodeError')
          expect(err.statusCode).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })

    describe('when handling successful responses', () => {
      it('should filter drafts by type if such is provided in query object', async () => {
        draftStoreServiceMock.resolveFind('sample').persist()

        const client: DraftStoreClient<any> = await factory.create(draftStoreServiceMock.serviceBaseURL, request)
        expect(await client.find({ type: 'sample' }, 'jwt-token', deserializationFn)).to.be.lengthOf(1)
        expect(await client.find({ type: 'something-else' }, 'jwt-token', deserializationFn)).to.be.empty
      })

      it('should deserialize draft document using provided deserialization function', async () => {
        draftStoreServiceMock.resolveFind('sample')

        const spy = sinon.spy(deserializationFn)
        const client: DraftStoreClient<any> = await factory.create(draftStoreServiceMock.serviceBaseURL, request)
        await client.find({}, 'jwt-token', spy)
        expect(spy).to.have.been.called
      })
    })
  })

  describe('read one', () => {
    describe('when handling successful response', () => {
      it('should map response to Draft model', async () => {
        const modelFromApi = {
          id: '123',
          type: 'some_type',
          document: {
            a: 1,
            b: 2
          },
          created: '2017-10-01T12:00:00',
          updated: '2017-10-01T12:01:00'
        }

        draftStoreServiceMock.resolveReadOne(modelFromApi)

        const client: DraftStoreClient<any> = await factory.create(draftStoreServiceMock.serviceBaseURL, request)
        const draft: Draft<any> = await client.read('123', 'token', (doc => doc))

        expect(draft.id).to.equal(modelFromApi.id)
        expect(draft.type).to.equal(modelFromApi.type)
        expect(draft.document).to.deep.equal(modelFromApi.document)
        expect(draft.created).to.deep.equal(moment(modelFromApi.created))
        expect(draft.updated).to.deep.equal(moment(modelFromApi.updated))
      })
    })
  })

  describe('save', () => {
    describe('when handling error responses', () => {
      it('should reject promise with HTTP error', async () => {
        draftStoreServiceMock.rejectSave()

        const client: DraftStoreClient<any> = await factory.create(draftStoreServiceMock.serviceBaseURL, request)
        try {
          await client.save(new Draft(100, 'sample', undefined, moment(), moment()), 'jwt-token')
        } catch (err) {
          expect(err.name).to.equal('StatusCodeError')
          expect(err.statusCode).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })

    describe('when handling successful responses', () => {
      it('should resolve promise', async () => {
        draftStoreServiceMock.resolveSave()

        const client: DraftStoreClient<any> = await factory.create(draftStoreServiceMock.serviceBaseURL, request)
        await client.save(new Draft(100, 'sample', undefined, moment(), moment()), 'jwt-token')
      })
    })
  })

  describe('delete', () => {
    describe('when handling error responses', () => {
      it('should reject promise with HTTP error', async () => {
        draftStoreServiceMock.rejectDelete()

        const client: DraftStoreClient<any> = await factory.create(draftStoreServiceMock.serviceBaseURL, request)
        try {
          await client.delete(100, 'jwt-token')
        } catch (err) {
          expect(err.name).to.equal('StatusCodeError')
          expect(err.statusCode).to.equal(HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
    })

    describe('when handling successful responses', () => {
      it('should resolve promise', async () => {
        draftStoreServiceMock.resolveDelete()

        const client: DraftStoreClient<any> = await factory.create(draftStoreServiceMock.serviceBaseURL, request)
        await client.delete(100, 'jwt-token')
      })
    })
  })
})
