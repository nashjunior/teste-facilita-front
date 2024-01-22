import { t } from 'i18next';
import * as yup from 'yup';

export const createCoordinateSchema = yup.object().shape({
  coordinates: yup
    .array()
    .of(yup.number().required())
    .required(t('validation.coordinate'))
    .length(2, t('validation.coordinate')),
});
