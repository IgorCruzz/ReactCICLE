import React, { useRef } from 'react'
import { Form } from '@unform/web' 
import { RouteComponentProps } from '@reach/router'
import { FormHandles } from '@unform/core'
import { Input } from '../../components/input'
import { useDispatch } from 'react-redux'
import { signInRequest } from '../../store/ducks/repositories/signIn/actions'
import { SignIn } from '../../store/ducks/repositories/signIn/types'
import * as Yup from 'yup'
import styles from './styles.module.scss'

interface Errors {
  [key: string]: string
}

interface Props extends RouteComponentProps {
  open?: boolean
  close?: () => void
}

const Login: React.FC<Props> = ({ open, close }: Props) => {
  const dispatch = useDispatch()
  const formRef = useRef<FormHandles>(null)

  const handeSubmit = async (data: SignIn) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Insira um e-mail válido').required('Campo obrigatório'),
        password: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, { abortEarly: false })

      dispatch(signInRequest(data))
    } catch (err) {
      const validationErrors: Errors = {}

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message
        })
        formRef.current?.setErrors(validationErrors)
      }
    }
  }

  return (    
    <div id={open ? styles.loginContainer : styles.close} data-testid="login-modal">
      <Form onSubmit={handeSubmit} ref={formRef} data-testid="form">
        <label htmlFor="email">E-mail:</label>
        <Input name="email" id="email" type="email" />

        <label htmlFor="password">Senha:</label>
        <Input name="password" id="password" type="password" />

        <button type="submit" id={styles.button}>Entrar</button>
      </Form>
      <button type="button" id={styles.cancel} data-testid="close-modal" onClick={close}>Cancelar</button>
    </div>
  )
}

export default Login