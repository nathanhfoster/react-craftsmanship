import deepEquals from './deepEquals'
import shallowEquals from './shallowEquals'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export { getRandomInt, deepEquals, shallowEquals }
