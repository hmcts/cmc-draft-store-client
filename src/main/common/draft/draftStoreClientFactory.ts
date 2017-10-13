import { DraftDocument } from 'app/models/draftDocument'
import ServiceAuthToken from 'app/idam/serviceAuthToken'
import DraftStoreClient from 'common/draft/draftStoreClient'
import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

export class DraftStoreClientFactory {

  static async create<T extends DraftDocument> (draftStoreUrl: string, request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): Promise<DraftStoreClient<T>> {
    const { ServiceAuthTokenFactory } = await import('' + 'common/security/serviceTokenFactory')
    const serviceAuthToken: ServiceAuthToken = await (new ServiceAuthTokenFactory()).get()
    return new DraftStoreClient(serviceAuthToken.bearerToken, draftStoreUrl, request)
  }
}
