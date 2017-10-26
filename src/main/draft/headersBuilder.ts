import { Secrets } from '../crypto/secrets'

export class HeadersBuilder {

  static buildHeaders (userAuthToken: String, serviceAuthToken: String, secrets?: Secrets): object {
    let headers = {
      'Authorization': `Bearer ${userAuthToken}`,
      'ServiceAuthorization': `Bearer ${serviceAuthToken}`
    }

    if (secrets) {
      headers['Secret'] = secrets.asHeader()
    }

    return headers
  }
}
