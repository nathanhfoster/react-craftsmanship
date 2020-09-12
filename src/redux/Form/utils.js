import { getRandomInt } from '../../utils';
import { InputTypes } from '../../components/BasicInput/propTypes';

const getFormFieldName = index => `field-${index}`;

const NUMBER_OF_INPUT_FIELDS = 500;

const EMPTY_ARRAY_OF_INPUT_FIELDS = new Array(NUMBER_OF_INPUT_FIELDS).fill();

const SELECT_INPUT_OPTIONS = EMPTY_ARRAY_OF_INPUT_FIELDS.map((field, i) => ({
  name: i,
}));

const RANDOM_FORM_FIELD_TYPES_MAP = EMPTY_ARRAY_OF_INPUT_FIELDS.reduce(
  (typeMap, field, index) => {
    const randomTypeIndex = getRandomInt(0, InputTypes.length - 1);
    const name = getFormFieldName(index);
    const randomType = InputTypes[randomTypeIndex];

    typeMap[name] = randomType;

    return typeMap;
  },
  {},
);

const getRandomFields = () =>
  EMPTY_ARRAY_OF_INPUT_FIELDS.reduce((defaultState, field, index) => {
    const name = getFormFieldName(index);
    defaultState[name] = '';
    return defaultState;
  }, {});

export {
  getFormFieldName,
  getRandomFields,
  NUMBER_OF_INPUT_FIELDS,
  EMPTY_ARRAY_OF_INPUT_FIELDS,
  SELECT_INPUT_OPTIONS,
  RANDOM_FORM_FIELD_TYPES_MAP,
};
