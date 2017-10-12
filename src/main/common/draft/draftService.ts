import DraftStoreClient from 'common/draft/draftStoreClient'

import { Draft } from 'app/models/draft'
import { DraftDocument } from 'app/models/draftDocument'
import { DraftStoreClientFactory } from 'common/draft/draftStoreClientFactory'
import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'

export class DraftService {

  static async save<T extends DraftDocument> (draft: Draft<T>, userToken: string, draftStoreUri: string, request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): Promise<void> {

    const client: DraftStoreClient<T> = await DraftStoreClientFactory.create<T>(draftStoreUri, request)
    return client.save(draft, userToken)
  }

  static async delete<T extends DraftDocument> (draft: Draft<T>, userToken: string, draftStoreUri: string, request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>): Promise<void> {
    const client: DraftStoreClient<T> = await DraftStoreClientFactory.create<T>(draftStoreUri, request)
    return client.delete(draft, userToken)
  }
}
