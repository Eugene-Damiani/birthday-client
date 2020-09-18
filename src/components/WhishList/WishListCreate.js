import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'

const WishListCreate = props => {
  const [createdWishListId, setCreatedWishListId] = useState(null)
  const [wishList, setWishList] = useState({ name: '', dob: '', item: '', price: '', location: '' })

  const handleChange = event => {
    event.persist()
    setWishList(prevWishList => {
      const updateFiled = { [event.target.name]: event.target.value }
      const editWishList = Object.assign({}, prevWishList, updateFiled)
      return editWishList
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/wishlists`,
      method: 'POST',
      data: { wishlist: wishList },
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => setCreatedWishListId(res.data.wishlist._id))
      .catch(console.error)
  }
  if (createdWishListId) {
    return <Redirect to={`/wishlists/${createdWishListId}`} />
  }

  const { name, dob, item, price, location } = wishList

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3> Create Wish List</h3>
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

export default WishListCreate
