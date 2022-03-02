import React, { useCallback } from 'react';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

type InputProps = {
  id: string;
  type: string;
  label?: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onEnter?: () => void;
};

export default function Input({
  id,
  type,
  label,
  value,
  disabled,
  onChange,
  onEnter,
}: InputProps) {
  const innerOnChange = useCallback(
    (event) => onChange(event.target.value),
    [onChange]
  );

  const onKeyDown = useCallback(
    (event) => {
      if (!onEnter) {
        return;
      }

      if (event.key === 'Enter') {
        onEnter();
      }
    },
    [onEnter]
  );

  return (
    <>
      {label && (
        <label htmlFor={id}>
          <Text>{label}</Text>
        </label>
      )}
      <input
        id={id}
        className={styles.input}
        type={type}
        value={value}
        disabled={disabled}
        onChange={innerOnChange}
        onKeyDown={onKeyDown}
      />
    </>
  );
}
