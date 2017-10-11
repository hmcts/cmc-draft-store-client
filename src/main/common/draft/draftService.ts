import DraftStoreClient from 'common/draft/draftStoreClient'
import { DraftStoreClientFactory } from 'common/draft/draftStoreClientFactory'

import { Draft } from 'app/models/draft'
import { DraftDocument } from 'app/models/draftDocument'

export class DraftService {

  static async save<T extends DraftDocument> (draft: Draft<T>, userToken: string): Promise<void> {
    const client: DraftStoreClient<T> = await DraftStoreClientFactory.create<T>()
    return client.save(draft, userToken)
  }

  static async delete<T extends DraftDocument> (draft: Draft<T>, userToken: string): Promise<void> {
    const client: DraftStoreClient<T> = await DraftStoreClientFactory.create<T>()
    return client.delete(draft, userToken)
  }
}
