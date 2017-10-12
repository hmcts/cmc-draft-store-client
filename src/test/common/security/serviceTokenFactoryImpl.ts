import ServiceAuthToken from 'app/idam/serviceAuthToken'
import { ServiceAuthTokenFactory } from 'common/security/serviceTokenFactory'
import { DraftStoreConfig } from '../../http-mocks/draftStoreConfig'

export class MockServiceTokenFactory implements ServiceAuthTokenFactory {
  async get (): Promise<ServiceAuthToken> {
    return new ServiceAuthToken(DraftStoreConfig.totpSecret)
  }
}
