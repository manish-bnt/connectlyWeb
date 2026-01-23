import React from 'react'
import './Button.css'
export default function Button({
  children,
  variant,
  onClick,
  type,
  disabled,
}) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
