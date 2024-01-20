import { t } from 'i18next';
import * as yup from 'yup';

export const createUserSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(2, t('validation.min', { min: 2 }))
      .max(255, t('validation.max', { max: 255 }))
      .required(t('validation.required')),
    email: yup
      .string()
      .min(2, t('validation.min', { min: 2 }))
      .max(255, t('validation.max', { max: 255 }))
      .email()
      .required(t('validation.required')),
    cpf: yup
      .string()
      .length(11, t('validation.length', { length: 11 }))
      .required()
      .nullable(),
    address: yup
      .string()
      .min(2, t('validation.min', { min: 2 }))
      .max(255, t('validation.max', { max: 255 }))
      .required(t('validation.required')),
    number: yup
      .string()
      .max(6, t('validation.max', { max: 6 }))
      .required(t('validation.required'))
      .nullable(),

    zipCode: yup
      .string()
      .length(8)
      .required(t('validation.required'))
      .nullable(),
    city: yup.string().required(t('validation.required')),
  })
  .required();
