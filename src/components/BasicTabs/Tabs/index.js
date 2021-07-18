import React from 'react';
import Container from '../Container';
import Pane from '../Pane';
import NavItem from '../NavItem';
import { map } from '../utils';

const renderTab = child => {
  const { title, eventKey, disabled, tabClassName, id } = child.props;
  if (title == null) {
    return null;
  }

  return (
    <NavItem
      eventKey={eventKey}
      disabled={disabled}
      id={id}
      className={tabClassName}
    >
      {title}
    </NavItem>
  );
};

const renderPane = child => {
  const childProps = { ...child.props };

  delete childProps.title;
  delete childProps.disabled;
  delete childProps.tabClassName;

  return <Pane {...childProps} />;
};

export const Tabs = ({
  id,
  onSelect,
  activeKey,
  transition,
  mountOnEnter,
  unmountOnExit,
  children
}) => {
  const renderTabs = map(children, renderTab);
  const renderPanes = map(children, renderPane);

  return (
    <Container>
      <div>{renderTabs}</div>
      <div>{renderPanes}</div>
    </Container>
  );
};

export default Tabs;
