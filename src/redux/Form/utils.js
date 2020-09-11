import { getRandomInt } from '../../utils';
import { inputTypes } from '../../components/BasicInput/propTypes';

const getFormFieldName = index => `field-${index}`;

const NUMBER_OF_INPUT_FIELDS = 50;

const EMPTY_ARRAY_OF_INPUT_FIELDS = new Array(NUMBER_OF_INPUT_FIELDS).fill();

const SELECT_INPUT_OPTIONS = EMPTY_ARRAY_OF_INPUT_FIELDS.map((field, i) => ({
  name: i,
}));

const RANDOM_FORM_FIELD_TYPES_MAP = EMPTY_ARRAY_OF_INPUT_FIELDS.reduce(
  (typeMap, field, index) => {
    const randomTypeIndex = getRandomInt(0, inputTypes.length);
    const name = getFormFieldName(index);
    const randomType = inputTypes[randomTypeIndex];

    typeMap[name] = randomType;

    return typeMap;
  },
  {},
);

export {
  getFormFieldName,
  NUMBER_OF_INPUT_FIELDS,
  EMPTY_ARRAY_OF_INPUT_FIELDS,
  SELECT_INPUT_OPTIONS,
  RANDOM_FORM_FIELD_TYPES_MAP,
};
