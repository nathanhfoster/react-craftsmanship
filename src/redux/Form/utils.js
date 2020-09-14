import { getRandomInt } from '../../utils';
import { InputTypes } from '../../components/BasicInput/propTypes';

const NUMBER_OF_INPUT_OPTIONS = [
  25,
  50,
  75,
  100,
  150,
  200,
  250,
  350,
  500,
  1000,
  2000,
  3000,
  4000,
  5000,
];

const DEFAULT_NUMBER_OF_INPUT_FIELDS = NUMBER_OF_INPUT_OPTIONS[0];

const DEFAULT_NUMBER_OF_INPUT_OPTIONS = 100;

const getFormFieldName = index => `field-${index}`;

const getEmptyArrayOfInputs = (size = DEFAULT_NUMBER_OF_INPUT_FIELDS) =>
  new Array(size).fill();

const SELECT_INPUT_OPTIONS = getEmptyArrayOfInputs(
  DEFAULT_NUMBER_OF_INPUT_OPTIONS,
).map((field, i) => ({
  name: i,
}));

const getRandomFields = (size = DEFAULT_NUMBER_OF_INPUT_FIELDS) =>
  getEmptyArrayOfInputs(size).reduce((defaultState, field, index) => {
    const name = getFormFieldName(index);
    defaultState[name] = '';
    return defaultState;
  }, {});

const getRandFormFieldTypesMap = formFields =>
  Object.keys(formFields).reduce((typeMap, key, index) => {
    const randomTypeIndex = getRandomInt(0, InputTypes.length - 1);
    const randomType = InputTypes[randomTypeIndex];

    typeMap[key] = randomType;

    return typeMap;
  }, {});

export {
  getFormFieldName,
  NUMBER_OF_INPUT_OPTIONS,
  getRandomFields,
  getRandFormFieldTypesMap,
  DEFAULT_NUMBER_OF_INPUT_FIELDS,
  getEmptyArrayOfInputs,
  SELECT_INPUT_OPTIONS,
};
