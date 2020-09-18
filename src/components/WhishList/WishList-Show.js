import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const WishList = props => {
  const [wishList, setwishList] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/wishlists/${props.match.params.id}`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setwishList(res.data.wishlist))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      url: `${apiUrl}/wishlists/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }
  if (!wishList) {
    return <p> Wraping Gift...</p>
  }
  if (deleted) {
    return <Redirect to={
      { pathname: '/wishlists', state: { msg: 'That\'s a wrap' } }
    } />
  }
  return (
    <React.Fragment>
      <h4>{wishList.name}</h4>
      <p>Birthday: { wishList.dob }</p>
      <p>Item: {wishList.item}</p>
      <p>Price: {wishList.item}</p>
      <p>Location: {wishList.location}</p>
      <button onClick={destroy}>Remove Gift</button>
      <Link to={`/wishlists/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/wishlists">Back to Your Wish List</Link>
    </React.Fragment>
  )
}

export default WishList
