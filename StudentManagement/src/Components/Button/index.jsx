import React from 'react'
import { ButtonStyle } from './style'
import { LoadingOutlined } from "@ant-design/icons"

export const Button = ({ children, loading, ...props }) => {
  return (
    <ButtonStyle
      disabled={loading}
      className="btn btn-primary btn-block flex align-items-center gap-3"
      {...props}
    >
      {loading && <LoadingOutlined style={{ fontSize: 20 }} className="mr-2" />}
      {children}
    </ButtonStyle>
  );
}
