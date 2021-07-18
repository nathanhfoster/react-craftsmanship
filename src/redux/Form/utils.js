import { getRandomInt } from '../../utils'
import { InputTypes } from '../../components/BasicInput/propTypes'

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
]

const DEFAULT_NUMBER_OF_INPUT_FIELDS = NUMBER_OF_INPUT_OPTIONS[0]

const DEFAULT_NUMBER_OF_INPUT_OPTIONS = 100

const getFormFieldName = index => `field-${index}`

const getEmptyArrayOfInputs = (size = DEFAULT_NUMBER_OF_INPUT_FIELDS) => new Array(size).fill()

const SELECT_INPUT_OPTIONS = getEmptyArrayOfInputs(DEFAULT_NUMBER_OF_INPUT_OPTIONS).map(
  (field, i) => ({
    name: i,
  }),
)

const getRandomFields = (size = DEFAULT_NUMBER_OF_INPUT_FIELDS) => {
  const initialObject = getEmptyArrayOfInputs(size).reduce((defaultState, field, index) => {
    const name = getFormFieldName(index)
    const value = ''
    const randomTypeIndex = getRandomInt(0, InputTypes.length - 1)

    const type = InputTypes[randomTypeIndex]
    const options = type === 'select' ? SELECT_INPUT_OPTIONS : undefined
    const label = name.toUpperCase()
    const placeholder = `...${name}`

    const isInvalid = value => {
      if (value && value.length < 3) {
        return 'Required. 3 or more characters.'
      } else {
        return false
      }
    }

    defaultState[name] = { value, type, options, label, placeholder, isInvalid }
    return defaultState
  }, {})

  const initialObjectWithRandomDependencies = Object.entries(initialObject).reduce(
    (newObject, [key, objValue]) => {
      let fieldDependencies = []
      for (let i = 0; i < 4; i++) {
        const randomObjIndex = getRandomInt(0, Object.keys(initialObject).length - 1)
        const randomObjKey = getFormFieldName(randomObjIndex)

        fieldDependencies.push(randomObjKey)
      }

      newObject[key] = { ...objValue, fieldDependencies }

      return newObject
    },
    {},
  )

  return initialObjectWithRandomDependencies
}

export {
  getFormFieldName,
  NUMBER_OF_INPUT_OPTIONS,
  getRandomFields,
  DEFAULT_NUMBER_OF_INPUT_FIELDS,
  getEmptyArrayOfInputs,
  SELECT_INPUT_OPTIONS,
}
