import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const WishListEdit = props => {
  const [wishList, setWishList] = useState({ name: '', dob: '', item: '', price: '', location: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/wishlists/${props.match.params.id}`, {
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setWishList(res.data.wishlist))
      .catch(console.error)
  })

  const handleChange = event => {
    event.persist()
    setWishList(prevWishList => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedWishList = Object.assign({}, prevWishList.wishList, updatedField)
      return editedWishList
    })
  }
  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/wishlists${props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      method: 'PATCH',
      data: { wishList }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }
  if (updated) {
    return <Redirect to={`/wishlists/${props.match.params.id}`} />
  }

  const { name, dob, item, price, location } = wishList

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3> Edit Wish List</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Gift Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                placeholder="Enter Person's Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="dob">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                required
                type="text"
                name="dob"
                value={dob}
                placeholder="Date of Birth"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="item">
              <Form.Label>Gift Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="item"
                value={item}
                placeholder="What do you want to get them?"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="text"
                name="price"
                value={price}
                placeholder="How Much?"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                required
                type="text"
                name="location"
                value={location}
                placeholder="Where is it? Website or Store?"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            > Submit
            </Button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WishListEdit
