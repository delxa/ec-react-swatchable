import React from 'react'
import styled, { keyframes } from 'styled-components'

const LinkEl = styled.a`
  cursor: pointer;
  text-decoration: underline;
  font-size: 90%;
`
const pulse = keyframes`
  0%  {background-color: teal;}
  50% {background-color: #2dbad8;}
  100%  {background-color: teal;}
`;

const LoadingIndicator = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 4px;
  animation: ${pulse} 1s ease infinite;
`

export const RefreshLink = ({ onClick, isLoading }) => {
  return (
    <LinkEl onClick={onClick}>
      Refresh colours
      { isLoading && <LoadingIndicator /> }
    </LinkEl>
  )
}

export default RefreshLink
