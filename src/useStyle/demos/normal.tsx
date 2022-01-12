import React, { ButtonHTMLAttributes } from 'react'
import { useStyle } from '@coloration/use-react'

const MyButton = ({ 
  style,
  disabled,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement>) => {

  const [styl] = useStyle({ background: 'pink' }, [
    disabled ? { background: 'gray' } : {},
    style ?? {}
  ])

  return <button style={styl} disabled={disabled} {...restProps} />
}

const App = () => {
  return (
    <>
      <MyButton>Normal Button</MyButton>
      <MyButton disabled>Disabled Button</MyButton>
      <MyButton disabled style={{ background: 'purple', color: 'white' }}>Custom Disabled Button</MyButton>
    </>
  )
}


export default App