import ServiceAuthToken from 'app/idam/serviceAuthToken'
import DraftStoreClient from 'common/draft/draftStoreClient'
import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'
import { ServiceAuthTokenFactory } from 'common/security/serviceTokenFactory'

export class DraftStoreClientFactory {
  constructor (public serviceAuthTokenFactory: ServiceAuthTokenFactory) {
    this.serviceAuthTokenFactory = serviceAuthTokenFactory
  }

  async create<T> (draftStoreUrl: string, request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): Promise<DraftStoreClient<T>> {
    const serviceAuthToken: ServiceAuthToken = await this.serviceAuthTokenFactory.get()
    return new DraftStoreClient(draftStoreUrl, serviceAuthToken.bearerToken, request)
  }
}
