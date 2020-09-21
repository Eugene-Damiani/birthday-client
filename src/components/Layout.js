import React from 'react'

const Layout = props => (
  <div>
    <h1>Birthday Reminder</h1>
    <h5>Never Be that Friend Again</h5>

    {props.children}

  </div>
)

export default Layout
