import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const serviceFunction = jest.fn()
  const callBack = jest.fn()
  const component = render(
    <BlogForm serviceFunction={serviceFunction} callBack={callBack} />
  )

  const title = component.container.querySelector(`input[name='title']`);
  const author = component.container.querySelector(`input[name='author']`)
  const url = component.container.querySelector(`input[name='url']`)
  const form = component.container.querySelector('form')

  fireEvent.change(title, {  target: { value: 'testing of forms could be easier' } })
  fireEvent.change(author, { target: { value: 'author' } })
  fireEvent.change(url, { target: { value: 'www.fi' } })
  
  await fireEvent.submit(form)
  expect(serviceFunction.mock.calls).toHaveLength(1)
  expect(callBack.mock.calls).toHaveLength(1)
})