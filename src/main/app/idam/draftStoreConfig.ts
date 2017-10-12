export class DraftStoreConfig {
  constructor (public readonly draftStoreUrl: string,
               public readonly s2sUrl: string,
               public readonly totpSecret: string,
               public readonly microservice: string) {
    this.draftStoreUrl = draftStoreUrl
    this.s2sUrl = s2sUrl
    this.totpSecret = totpSecret
    this.microservice = microservice
  }
}
