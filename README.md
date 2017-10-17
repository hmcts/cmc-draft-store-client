# draft-store-client

[![Greenkeeper badge](https://badges.greenkeeper.io/hmcts/cmc-citizen-frontend.svg)](https://greenkeeper.io/)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is the draft store client module to access draft store. 
Below are steps to configure draft store clients

* User need to implement ServiceAuthTokenFactory interface to access all client modules.  
```
export interface ServiceAuthTokenFactory {
     get (): Promise<ServiceAuthToken>
   }
   ```
   
* Sample Implementation of interface is as follow:
```
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
* DraftService provides wrapper around creating DraftStoreClientFactory to save and delete draft elements   
* DraftStoreClientFactory is responsible for creating DraftStoreClients
* DraftStoreClient is responsible for search, save and delete od draft store data
* DraftMiddleware manages number of draft store client can be configured and is available if user is logged in

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) >= v8.4.0
* [yarn](https://yarnpkg.com/)
* [Gulp](http://gulpjs.com/)

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

## Troubleshooting

### Warnings while running ```yarn install``` on yarn version 1.0.1

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details

