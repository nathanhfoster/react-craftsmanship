import React, { useMemo } from 'react'
import TabContext from '../Context'

export const Container = ({
  id,
  onSelect,
  activeKey,
  transition,
  mountOnEnter,
  unmountOnExit,
  children,
}) => {
  const tabContext = useMemo(
    () => ({
      id,
      onSelect,
      activeKey,
      transition,
      mountOnEnter,
      unmountOnExit,
    }),
    [id, onSelect, activeKey, transition, mountOnEnter, unmountOnExit],
  )

  return <TabContext.Provider value={tabContext}>{children}</TabContext.Provider>
}

export default Container
