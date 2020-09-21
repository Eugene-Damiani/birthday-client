import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const WishLists = props => {
  const [wishLists, setWishList] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/wishlists/`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setWishList(res.data.wishlists))
      .catch(console.error)
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
