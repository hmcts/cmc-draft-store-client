import * as config from 'config'
import * as otp from 'otp'

import request from 'client/request'
import ServiceAuthToken from 'idam/serviceAuthToken'

const s2sUrl = config.get<string>('idam.service-2-service-auth.url')
const totpSecret = config.get<string>('idam.service-2-service-auth.totpSecret')
const microserviceName = config.get<string>('idam.service-2-service-auth.microservice')

class ServiceAuthRequest {
  constructor (public microservice: string, public oneTimePassword: string) {
    this.microservice = microservice
    this.oneTimePassword = oneTimePassword
  }
}

export default class IdamClient {

  static retrieveServiceToken (): Promise<ServiceAuthToken> {
    const oneTimePassword = otp({ secret: totpSecret }).totp()

    return request.post({
      uri: `${s2sUrl}/lease`,
      form: new ServiceAuthRequest(microserviceName, oneTimePassword),
      json: false
    }).then(token => {
      return new ServiceAuthToken(token)
    })
  }
}
