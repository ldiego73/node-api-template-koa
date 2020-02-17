import Joi from '@hapi/joi'

export default {
  iso: Joi.string()
    .regex(/^[A-Z]+$/)
    .min(2)
    .required(),
}
