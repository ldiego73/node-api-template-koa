export default {
  directives: {
    defaultSrc: [`'self'`],
    styleSrc: [
      `'self'`,
      `'unsafe-inline'`,
      `https://fonts.googleapis.com/`,
      `http://cdn.jsdelivr.net/npm/@apollographql/`,
      `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/`,
    ],
    fontSrc: [
      `'self'`,
      `https://fonts.gstatic.com/s/opensans/`,
      `https://fonts.gstatic.com/s/sourcecodepro/`,
      `https://fonts.gstatic.com/s/titilliumweb/`,
    ],
    scriptSrc: [
      `'self'`,
      `'unsafe-inline'`,
      `'unsafe-eval'`,
      `http://cdn.jsdelivr.net/npm/@apollographql/`,
      `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/`,
    ],
    imgSrc: [
      `'self'`,
      `data:`,
      `http://cdn.jsdelivr.net/npm/@apollographql/`,
      `https://online.swagger.io/`,
    ],
    objectSrc: [`'none'`],
  },
}
