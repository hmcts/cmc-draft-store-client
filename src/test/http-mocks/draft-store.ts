import * as mock from 'nock'
import * as HttpStatus from 'http-status-codes'

export const serviceBaseURL = 'http://localhost:8800'

export function resolveFind (draftType: string, draftOverride?: object): mock.Scope {
  let documentDocument: object

  switch (draftType) {
    default:
      documentDocument = { ...draftOverride }
  }

  return mock(serviceBaseURL)
    .get(new RegExp('/drafts.*'))
    .reply(HttpStatus.OK, {
      data: [{
        id: 100,
        type: draftType,
        document: documentDocument,
        created: '2017-10-01T12:00:00.000',
        updated: '2017-10-01T12:01:00.000'
      }]
    })
}

export function resolveFindNoDraftFound (): mock.Scope {
  return mock(serviceBaseURL)
    .get(new RegExp('/drafts.*'))
    .reply(HttpStatus.OK, {
      data: []
    })
}

export function resolveReadOne (body: any): Scope {
  return mock(serviceBaseURL)
    .get(new RegExp('/drafts/.*'))
    .reply(HttpStatus.OK, body)
}

export function rejectFind (reason: string = 'HTTP error'): mock.Scope {
  return mock(serviceBaseURL)
    .get(new RegExp('/drafts.*'))
    .reply(HttpStatus.INTERNAL_SERVER_ERROR, reason)
}

export function resolveSave (id: number = 100): mock.Scope {
  return mock(serviceBaseURL)
    .put(`/drafts/${id}`)
    .reply(HttpStatus.OK)
}

export function rejectSave (id: number = 100, reason: string = 'HTTP error'): mock.Scope {
  return mock(serviceBaseURL)
    .put(`/drafts/${id}`)
    .reply(HttpStatus.INTERNAL_SERVER_ERROR, reason)
}

export function resolveDelete (id: number = 100): mock.Scope {
  return mock(serviceBaseURL)
    .delete(`/drafts/${id}`)
    .reply(HttpStatus.OK)
}

export function rejectDelete (id: number = 100, reason: string = 'HTTP error'): mock.Scope {
  return mock(serviceBaseURL)
    .delete(`/drafts/${id}`)
    .reply(HttpStatus.INTERNAL_SERVER_ERROR, reason)
}
