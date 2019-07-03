import path from 'path'
import * as swagger from 'swagger2'
import { ui } from 'swagger2-koa'

const file = path.join(__dirname, 'docs.yml')
const document = swagger.loadDocumentSync(file)

export default ui(document, '/docs')
