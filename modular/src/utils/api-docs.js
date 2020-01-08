import path from 'path'
import * as swagger from 'swagger2'
import { ui } from 'swagger2-koa'

const file = path.join(__dirname, 'docs.yml')
const load = swagger.loadDocumentSync(file)
const document = swagger.validateDocument(load)

if (!document) {
  /* istanbul ignore next */
  throw Error(`./swagger.yml does not conform to the Swagger 2.0 schema`)
}

export default ui(document, '/docs')
