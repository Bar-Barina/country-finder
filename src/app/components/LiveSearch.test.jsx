import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import LiveSearch from './LiveSearch'

describe('LiveSearch Component Tests', () => {
  // Test 1: Component renders correctly
  test('renders LiveSearch component', () => {
    render(<LiveSearch />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  // Test 2: Input triggers state change
  test('input triggers state change', () => {
    render(<LiveSearch />)
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'test' } })
    expect(inputElement.value).toBe('test')
  })
})
