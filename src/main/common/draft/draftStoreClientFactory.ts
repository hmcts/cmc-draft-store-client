import { DraftDocument } from 'app/models/draftDocument'
import ServiceAuthToken from 'app/idam/serviceAuthToken'
import DraftStoreClient from 'common/draft/draftStoreClient'
import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'
import { ServiceAuthTokenFactory } from 'common/security/serviceTokenFactory'

export class DraftStoreClientFactory {
  private serviceAuthTokenFactory: ServiceAuthTokenFactory

  constructor (serviceAuthTokenFactory: ServiceAuthTokenFactory) {
    this.serviceAuthTokenFactory = serviceAuthTokenFactory
  }

  async create<T extends DraftDocument> (draftStoreUrl: string, request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): Promise<DraftStoreClient<T>> {
    const factory: ServiceAuthTokenFactory = this.serviceAuthTokenFactory
    const serviceAuthToken: ServiceAuthToken = await factory.get()
    return new DraftStoreClient(serviceAuthToken.bearerToken, draftStoreUrl, request)
  }
}
