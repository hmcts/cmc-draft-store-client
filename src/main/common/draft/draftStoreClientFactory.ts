import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'
import { ServiceAuthTokenFactory } from '../security/serviceTokenFactory'
import DraftStoreClient from './draftStoreClient'
import ServiceAuthToken from '../../app/idam/serviceAuthToken'

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
