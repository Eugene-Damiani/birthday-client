import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

const WishLists = props => {
  const [wishLists, setWishList] = useState([])

  useEffect(() => {
    const { msgAlert } = props
    axios(`${apiUrl}/wishlists/`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setWishList(res.data.wishlists))
      .then(() => msgAlert({
        heading: 'Gift List',
        message: messages.indexSuccess,
        variant: 'Look at your Wish List You Generous Beast!'
      }))
      .catch(console.error)
      .catch(() => msgAlert({
        heading: 'Gift List',
        message: messages.indexFailure,
        variant: 'Your list didn\'t load try again'
      }))
  }, [])
  const wishList = wishLists.map(wishList => (
    <li key={wishList._id}>
      <Link to={`/wishlists/${wishList._id}`}>{wishList.name}</Link>
    </li>
  ))
  return (
    <React.Fragment>
      <h4>Wish List</h4>
      <ul>
        {wishList}
      </ul>
    </React.Fragment>
  )
}

export default WishLists
