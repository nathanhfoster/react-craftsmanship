import augmentDispatch from './augmentDispatch'

/**
 * This augments actions to dispatch other actions and passes (dispatch, getState)
 * @param {Object} mapDispatchToProps - actions to be passed as props
 * @param {Function} dispatch - reducer dispatch API
 * @param {Object} state - reducer state
 * @returns {Object} object of augmented actions
 * */

const BindActionCreators = (mapDispatchToProps, dispatch, state) => {
  if (typeof mapDispatchToProps !== 'object' || mapDispatchToProps === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        mapDispatchToProps === null ? 'null' : typeof mapDispatchToProps
      }.`,
    )
  }

  const boundActionCreators = Object.entries(mapDispatchToProps).reduce((acc, [key, action]) => {
    acc[key] = augmentDispatch(dispatch, state)(action)
    return acc
  }, {})

  return boundActionCreators
}

export default BindActionCreators
