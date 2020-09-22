import React from 'react'

const Layout = props => (
  <div>
    <h1>Birthday Reminder</h1>
    <h5>Never Be That Person Again</h5>

    {props.children}

  </div>
)

export default Layout
