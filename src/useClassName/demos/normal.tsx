import React, { ButtonHTMLAttributes } from 'react'
import { useClassName } from '@coloration/use-react'

const MyButton = ({ 
  className = '',
  disabled,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => {

  const [clss] = useClassName('my-btn', [
    disabled ? 'my-btn-disabled' : '',
    className
  ])

  return <button className={clss} disabled={disabled} {...restProps} />
}

const App = () => {
  return (
    <>
      <MyButton>Normal Button</MyButton>
      <MyButton disabled className="bg-blue-500">Disabled Button</MyButton>
    </>
  )
}


export default App