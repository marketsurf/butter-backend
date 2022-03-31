import Joi from 'joi';

export const coveringLetterSchema = Joi.object({
  title: Joi.string().required(),
  remarks: Joi.string().required(),
});

export const billOfLadingSchema = Joi.object({
  blNumber: Joi.string().required(),
  companyName: Joi.string(),
}).pattern(/^/, Joi.alternatives().try(Joi.string(), Joi.number()));

export const ownConfigurationSchema = Joi.object().pattern(
  /^/,
  Joi.alternatives().try(Joi.string(), Joi.number()),
);
