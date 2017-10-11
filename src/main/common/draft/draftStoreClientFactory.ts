import { DraftDocument } from 'app/models/draftDocument'
import ServiceAuthToken from 'app/idam/serviceAuthToken'
import { ServiceAuthTokenFactory } from 'common/security/serviceTokenFactory'
import DraftStoreClient from 'common/draft/draftStoreClient'

export class DraftStoreClientFactory {
  static async create <T extends DraftDocument> (): Promise<DraftStoreClient<T>> {
    const serviceAuthToken: ServiceAuthToken = await ServiceAuthTokenFactory.get()
    return new DraftStoreClient(serviceAuthToken.bearerToken)
  }
}
