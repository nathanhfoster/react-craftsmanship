import { getRandomInt } from '../../utils';
import { InputTypes } from '../../components/BasicInput/propTypes';

const getFormFieldName = index => `field-${index}`;

const DEFAULT_NUMBER_OF_INPUT_FIELDS = 5;

const DEFAULT_NUMBER_OF_INPUT_OPTIONS = 100;

const getEmptyArrayOfInputs = (size = DEFAULT_NUMBER_OF_INPUT_FIELDS) =>
  new Array(size).fill();

const SELECT_INPUT_OPTIONS = getEmptyArrayOfInputs(
  DEFAULT_NUMBER_OF_INPUT_OPTIONS,
).map((field, i) => ({
  name: i,
}));

const RANDOM_FORM_FIELD_TYPES_MAP = getEmptyArrayOfInputs().reduce(
  (typeMap, field, index) => {
    const randomTypeIndex = getRandomInt(0, InputTypes.length - 1);
    const name = getFormFieldName(index);
    const randomType = InputTypes[randomTypeIndex];

    typeMap[name] = randomType;

    return typeMap;
  },
  {},
);

const getRandomFields = (size = DEFAULT_NUMBER_OF_INPUT_FIELDS) =>
  getEmptyArrayOfInputs(size).reduce((defaultState, field, index) => {
    const name = getFormFieldName(index);
    defaultState[name] = '';
    return defaultState;
  }, {});

export {
  getFormFieldName,
  getRandomFields,
  DEFAULT_NUMBER_OF_INPUT_FIELDS,
  getEmptyArrayOfInputs,
  SELECT_INPUT_OPTIONS,
  RANDOM_FORM_FIELD_TYPES_MAP,
};
