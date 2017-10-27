import { CoreOptions, RequestAPI } from 'request'
import { RequestPromise } from 'request-promise-native'
import * as moment from 'moment'

import { Draft } from './draft'
import { Secrets } from '../crypto/secrets'
import { HeadersBuilder } from './headersBuilder'

export class DraftStoreClient<T> {
  private endpointURL: string
  private serviceAuthToken: string
  private request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>

  constructor (endpointURL: string,
               serviceAuthToken: string,
               request: RequestAPI<RequestPromise, CoreOptions, CoreOptions>) {
    this.endpointURL = endpointURL
    this.serviceAuthToken = serviceAuthToken
    this.request = request
  }

  find (
    query: { [key: string]: string },
    userAuthToken: string,
    deserializationFn: (value: any) => T,
    secrets?: Secrets
  ): Promise<Draft<T>[]> {

    const { type, ...qs } = query
    const endpointURL: string = `${this.endpointURL}/drafts`

    return this.request
      .get(endpointURL, {
        qs: qs,
        headers: HeadersBuilder.buildHeaders(userAuthToken, this.serviceAuthToken, secrets)
      })
      .then((response: any) => {
        return response
          .data
          .filter(draft => type ? draft.type === type : true)
          .map(draft => this.mapToModel(draft, deserializationFn))
      })
  }

  readOne (
    id: string,
    userAuthToken: string,
    docDeserializationFn: (value: any) => T,
    secrets?: Secrets
  ): Promise<Draft<T>> {
    return this.request
      .get(`${this.endpointURL}/drafts/${id}`, {
        headers: HeadersBuilder.buildHeaders(userAuthToken, this.serviceAuthToken, secrets)
      })
      .then((response: any) => {
        return this.mapToModel(response, docDeserializationFn)
      })
  }

  save (draft: Draft<T>, userAuthToken: string, secrets?: Secrets): Promise<void> {
    const options = {
      headers: HeadersBuilder.buildHeaders(userAuthToken, this.serviceAuthToken, secrets),
      body: {
        type: draft.type,
        document: draft.document
      }
    }

    const endpointURL: string = `${this.endpointURL}/drafts`

    if (!draft.id) {
      return this.request.post(endpointURL, options)
    } else {
      return this.request.put(`${endpointURL}/${draft.id}`, options)
    }
  }

  delete (draftId: number, userAuthToken: string): Promise<void> {
    if (!draftId) {
      throw new Error('Draft does not have an ID - it cannot be deleted')
    }
    const endpointURL: string = `${this.endpointURL}/drafts`

    return this.request.delete(`${endpointURL}/${draftId}`, {
      headers: HeadersBuilder.buildHeaders(userAuthToken, this.serviceAuthToken)
    })
  }

  private mapToModel (draft: any, docDeserializationFn: (value: any) => T): Draft<T> {
    return new Draft(
       draft.id,
       draft.type,
       docDeserializationFn(draft.document),
       moment(draft.created),
       moment(draft.updated)
    )
  }
}
