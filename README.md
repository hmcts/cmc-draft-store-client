# @hmcts/draft-store-client

[![Travis badge](https://api.travis-ci.org/hmcts/draft-store-client.svg?branch=master)](https://travis-ci.org/hmcts/draft-store-client)

[![Codecov badge](https://codecov.io/gh/hmcts/draft-store-client/graphs/badge.svg)](https://codecov.io/github/hmcts/draft-store-client)

[![NPM version badge](https://img.shields.io/npm/v/@hmcts/draft-store-client.svg)](https://www.npmjs.com/@hmcts/draft-store-client)

[![Node version badge](https://img.shields.io/node/v/@hmcts/draft-store-client.svg)](https://www.npmjs.com/@hmcts/draft-store-client)

[![Greenkeeper badge](https://badges.greenkeeper.io/hmcts/draft-store-client.svg)](https://greenkeeper.io/)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is a client library for interacting with the [draft store API](https://github.com/hmcts/draft-store).

To configure the draft store client you need to:

* Implement the ServiceAuthTokenFactory interface.  

```typescript
export interface ServiceAuthTokenFactory {
  get (): Promise<ServiceAuthToken>
}
```
   
* Sample implementation:

```typescript
let token: ServiceAuthToken

export class ServiceAuthTokenFactoryImpl implements ServiceAuthTokenFactory{
  async get (): Promise<ServiceAuthToken> {
    if (token === undefined || token.hasExpired()) {
      token = await IdamClient.retrieveServiceToken()
    }
    return token
  }
}
```
   
# API available with clients

* DraftService provides wrapper around creating DraftStoreClientFactory to save and delete draft documents   
* DraftStoreClientFactory is responsible for creating DraftStoreClients
* DraftStoreClient is responsible for search, save and delete of draft store data

# To add library

```
$ yarn add @hmcts/draft-store-client
```

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

### Running the application

Install dependencies by executing the following command:

 ```bash
$ yarn install
 ```

## Developing

### Code style

We use [TSLint](https://palantir.github.io/tslint/) with [StandardJS](http://standardjs.com/index.html) rules 

Running the linting:

`yarn lint`

### Running the tests

Mocha is used for writing tests.

Run them with:

```bash
$ yarn test
```

For test coverage:

```bash
$ yarn test:coverage
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

