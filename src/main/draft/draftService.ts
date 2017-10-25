import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

import { ServiceAuthTokenFactory } from '../security/serviceAuthTokenFactory'

import { Draft } from './draft'
import { DraftStoreClient } from './draftStoreClient'
import { DraftStoreClientFactory } from './draftStoreClientFactory'

export class DraftService {
  private draftStoreUri: string
  private request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>
  private serviceAuthTokenFactory: ServiceAuthTokenFactory

  constructor (draftStoreUri: string,
               request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>,
               serviceAuthTokenFactory: ServiceAuthTokenFactory) {
    this.draftStoreUri = draftStoreUri
    this.request = request
    this.serviceAuthTokenFactory = serviceAuthTokenFactory
  }

  async find<T> (draftType: string, limit: string = '100', userToken: string,
                 deserializationFn: (value: any) => T): Promise<Draft<T>[]> {

    const client: DraftStoreClient<T>
      = await new DraftStoreClientFactory(this.serviceAuthTokenFactory).create<T>(this.draftStoreUri, this.request)

    return client.find({ type: draftType, limit: limit }, userToken, deserializationFn)
  }

  async save<T> (draft: Draft<T>, userToken: string): Promise<void> {

    const client: DraftStoreClient<T>
      = await new DraftStoreClientFactory(this.serviceAuthTokenFactory).create<T>(this.draftStoreUri, this.request)

    return client.save(draft, userToken)
  }

  async delete<T> (draftId: number, userToken: string): Promise<void> {
    const client: DraftStoreClient<T>
      = await new DraftStoreClientFactory(this.serviceAuthTokenFactory).create<T>(this.draftStoreUri, this.request)

    return client.delete(draftId, userToken)
  }
}
