import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as logging from '@hmcts/nodejs-logging'
import { ErrorLogger } from 'logging/errorLogger'

export const app: express.Express = express()

logging.config({
  microservice: 'draft-store-client',
  team: 'cmc',
  environment: process.env.NODE_ENV
})

const env = process.env.NODE_ENV || 'development'
app.locals.ENV = env

const developmentMode = env === 'development'

app.enable('trust proxy')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

if (!developmentMode) {
  app.use(logging.express.accessLogger())
}

// error handlers
const errorLogger = new ErrorLogger()
app.use((err, req, res, next) => {
  errorLogger.log(err)
  res.status(err.statusCode || 500)
  if (err.statusCode === 302 && err.associatedView) {
    res.redirect(err.associatedView)
  } else if (err.associatedView) {
    res.render(err.associatedView)
  } else {
    const view = (env === 'mocha' || env === 'development' || env === 'dev' || env === 'dockertests' || env === 'demo') ? 'error_dev' : 'error'
    res.render(view, {
      error: err,
      title: 'error'
    })
  }
  next()
})
