/* tslint:disable:no-unused-expression */

import * as chai from 'chai'
import { HeadersBuilder } from '../../main/draft/headersBuilder'
import { Secrets } from '../../main/crypto/secrets'

const expect = chai.expect

describe('HeadersBuilder', () => {
  describe('#buildHeaders()', () => {

    context('when auth tokens are provided', () => {
      const headers = HeadersBuilder.buildHeaders('user_token', 'service_token')
      it('should set Authorization header', () => {
        expect(headers['Authorization']).to.be.equal('Bearer user_token')
      })

      it('should set ServiceAuthorization header', () => {
        expect(headers['ServiceAuthorization']).to.be.equal('Bearer service_token')
      })
    })

    context('when secret is not provided', () => {
      const headers = HeadersBuilder.buildHeaders('a', 'b')

      it('should not add secret to headers', () => {
        expect(headers['Secret']).to.be.undefined
      })
    })

    context('when only primary secret is provided', () => {
      const headers = HeadersBuilder.buildHeaders('a', 'b', new Secrets('primary'))
      it('should add valid secret header', () => {
        expect(headers['Secret']).to.be.equal('primary')
      })
    })

    context('when both primary and secondary secrets are provided', () => {
      const headers = HeadersBuilder.buildHeaders('a', 'b', new Secrets('primary', 'secondary'))
      it('should add valid secret header', () => {
        expect(headers['Secret']).to.be.equal('primary,secondary')
      })
    })
  })
})
