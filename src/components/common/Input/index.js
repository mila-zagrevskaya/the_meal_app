import React from 'react';

import './style.scss';

export const Input = ({
  id, label, type = 'text', ...rest
}) => (
  <label htmlFor={id} className='input-box'>
    {label}
    <input className='input-box__input' id={id} type={type} {...rest} />
  </label>
);
