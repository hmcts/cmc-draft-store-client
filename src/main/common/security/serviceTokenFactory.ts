import ServiceAuthToken from 'app/idam/serviceAuthToken'

export interface ServiceAuthTokenFactory {
  get (): Promise<ServiceAuthToken>
}
