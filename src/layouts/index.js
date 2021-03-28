import React from 'react'

const Index = (props) => {
  return (
    <div>
      <h1>your nav here</h1>
          {props.children}
      <h1>your footer here</h1>
    </div>
  )
}  

export default Index;