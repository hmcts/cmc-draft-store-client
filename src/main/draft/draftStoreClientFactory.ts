import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { ServiceAuthToken } from '../security/serviceAuthToken'
import { ServiceAuthTokenFactory } from '../security/serviceAuthTokenFactory'

import { DraftStoreClient } from './draftStoreClient'

export class DraftStoreClientFactory {
  private serviceAuthTokenFactory: ServiceAuthTokenFactory

  constructor (serviceAuthTokenFactory: ServiceAuthTokenFactory) {
    this.serviceAuthTokenFactory = serviceAuthTokenFactory
  }

  async create<T> (draftStoreUrl: string,
                   request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): Promise<DraftStoreClient<T>> {

    const serviceAuthToken: ServiceAuthToken = await this.serviceAuthTokenFactory.get()
    return new DraftStoreClient(draftStoreUrl, serviceAuthToken.bearerToken, request)
  }
}
