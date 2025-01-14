import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import InputMask from 'react-input-mask'
import styles from './input.module.scss'
import IntlCurrencyInput from 'react-intl-currency-input'
import { currencyConfig } from '../../config/currency'

interface Props {
  name: string;
  children?: React.ReactNode
  stateName?: any
}
type InputProps = JSX.IntrinsicElements['input'] & Props;

export const Radio: React.FC<InputProps> = ({ name, ...rest }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [fieldName, registerField])

  return (
    <div id={styles.inputContent}>
      <input type="radio" {...rest} id={error ? 'error' : fieldName} />
      {error && <div id={styles.errorMessage}>{error}</div> }
    </div>
  )
}

export const Input: React.FC<InputProps> = ({ name, ...rest } : Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [fieldName, registerField])
  return (
    <div id={styles.inputContent}>
      <input
        id={error ? 'error' : fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      { error && <div id={styles.errorMessage}>{error}</div> }
    </div>
  )
}

export const TextArea: React.FC<InputProps> = ({ name, ...rest } : Props) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [fieldName, registerField])
  return (
    <div id={styles.inputContent}>
      <textarea
        id={error ? 'error' : fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      { error && <div id={styles.errorMessage}>{error}</div> }
    </div>
  )
}

export const PhoneInput = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <div id={styles.inputContent}>
      <InputMask {...rest} id={error ? 'error' : fieldName} ref={inputRef} defaultValue={defaultValue} mask="99 9 9999 9999" maskChar=" " />
      {error && <div id={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export const CpfInput = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <div id={styles.inputContent}>
      <InputMask {...rest} id={error ? 'error' : fieldName} ref={inputRef} defaultValue={defaultValue} mask="999.999.999-99" maskChar=" " />
      {error && <div id={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export const CnpjInput = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <div id={styles.inputContent}>
      <InputMask {...rest} id={error ? 'error' : fieldName} ref={inputRef} defaultValue={defaultValue} mask="99.999.999/9999-99" maskChar=" " />
      {error && <div id={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export const BirthInput = ({ name, ...rest }: Props) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <div id={styles.inputContent}>
      <InputMask {...rest} id={error ? 'error' : fieldName} ref={inputRef} defaultValue={defaultValue} mask="99/99/9999" maskChar=" " />
      {error && <div id={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export const Select = ({ name, children, ...rest }: Props) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <>
      <select {...rest} defaultValue={defaultValue} ref={inputRef} id={error ? 'error' : fieldName }>
        {children}
      </select>
      {error && <div id={styles.errorMessage}>{error}</div>}
    </>
  )
}

export const CurrencyInput: React.FC<InputProps> = ({ name, stateName, ...rest } : Props) => {
  const { error } = useField(name)

  return (
    <div id={styles.inputContent}>
      <IntlCurrencyInput currency="BRL" config={currencyConfig} {...rest} onChange={ (event: any, value: number) => {
        event.preventDefault()
        stateName(value)
      }}/>
      { error && <div id={styles.errorMessage}>{error}</div> }
    </div>
  )
}