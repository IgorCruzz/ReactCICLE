import React, { useRef, useState } from 'react'
import { Form } from '@unform/web'
import { Container } from './styles'
import { RouteComponentProps } from '@reach/router'
import { FormHandles } from '@unform/core'
import { Input } from '../../components/input'
import { useSelector, useDispatch } from 'react-redux'
import { signInRequest } from '../../store/ducks/repositories/signIn/actions'
import { SignIn } from '../../store/ducks/repositories/signIn/types'
import * as Yup from 'yup'

interface Errors {
  [key: string]: string
}

interface RootState {
  signIn: {
    signed: boolean
    profile: any
  }
}

interface Props extends RouteComponentProps {
  open?: boolean
  close?: () => void
}

const Login: React.FC<Props> = ({ open, close }: Props) => {
  const dispatch = useDispatch()
  const formRef = useRef<FormHandles>(null)
  const signed = useSelector((state: RootState) => state.signIn.signed)

  const handeSubmit = async (data: SignIn[]) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email('Insira um e-mail válido').required('Campo obrigatório'),
        password: Yup.string().required('Campo obrigatório')
      })

      await schema.validate(data, { abortEarly: false })
    } catch (err) {
      const validationErrors: Errors = {}

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[err.path] = error.message
        })
        formRef.current?.setErrors(validationErrors)
      }
    }

    dispatch(signInRequest(data))
  }

  return (
    <Container open={open}>
      <Form onSubmit={handeSubmit} ref={formRef}>
        <label htmlFor="email">E-mail: </label>
        <Input name="email" id="email" type="email" />

        <label htmlFor="pass">Senha: </label>
        <Input name="password" id="pass" type="password" />

        <button type="submit" id="button">Entrar</button>
      </Form>
      <button type="button" id="cancel" onClick={close}>Cancelar</button>
    </Container>
  )
}

export default Login
