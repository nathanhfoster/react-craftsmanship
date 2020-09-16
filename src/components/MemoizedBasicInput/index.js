import React, { memo } from 'react';
import BasicInput from '../BasicInput';

const MemoizedBasicInput = props => <BasicInput {...props} />;

export default memo(MemoizedBasicInput);
