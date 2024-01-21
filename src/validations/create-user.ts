import { t } from 'i18next';
import * as yup from 'yup';

export const createUserSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .trim()
      .max(255, t('validation.max', { max: 255 }))
      .required(t('validation.required')),
    email: yup
      .string()
      .min(2, t('validation.min', { min: 2 }))
      .max(255, t('validation.max', { max: 255 }))
      .email()
      .required(t('validation.required')),
    phoneNumber: yup
      .string()
      .min(10, t('validation.min', { min: 10 }))
      .max(16, t('validation.max', { max: 16 }))
      .required(t('validation.required')),
  })
  .required();
