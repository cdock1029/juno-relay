const express = require('express')
const graphQLHTTP = require('express-graphql')
const path = require('path')
const Schema = require('./data/schema').Schema
const proxyMiddleware = require('proxy-middleware')
const url = require('url')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)
const APP_PORT = 3000
const GRAPHQL_PORT = 8080

// Expose a GraphQL endpoint
const graphQLServer = express()
graphQLServer.use('/', graphQLHTTP({
  graphiql: true,
  pretty: true,
  schema: Schema,
}))
graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log('\n\n\n👁👁👁👁👁👁👁👁👁👁👁\n\n')
  console.log(`GraphQL Server is now running on http://0.0.0.0:${GRAPHQL_PORT}`)
})

const app = express()
app.use(require('morgan')('short'))
app.use('/graphql', proxyMiddleware(url.parse(`http://0.0.0.0:${GRAPHQL_PORT}`)))

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  stats: {
    colors: true,
  },
  publicPath: webpackConfig.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))

// custom routes...
// Serve static resources
app.use('/assets', express.static('public'))
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(APP_PORT, () => {
  console.log(`App server running on http://0.0.0.0:${APP_PORT}`)
  console.log('\n\n\n👁👁👁👁👁👁👁👁👁👁👁\n\n')
})
