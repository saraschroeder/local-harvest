import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from '../utils/mutations';
import { GET_POSTS } from '../utils/queries';

function CreatePost() {
    // Set initial form state
    const [formState, setFormState] = useState({
        title: "",
        image: "",
        description: "",
        price: ""
      });

    // Using mutation to create new user
    const [createPost, {error}] = useMutation(CREATE_POST, {
      // Using update to manually modify GET_POSTS query with new post
      update: (cache, { data: { createPost } }) => {
        try {
          // Reading the query from the cache to verify if there is any data
          const { allPosts } = cache.readQuery({ query: GET_POSTS }) || { allPosts: [] };
          // Inserting new post in all posts
          cache.writeQuery({
            query: GET_POSTS, 
            data: { allPosts: [...allPosts, createPost] }
          });
        } catch (err) {
          console.error(err);
        }
      }
    })
    //   Saving values from form into formState
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createPost({
                variables: { postInput: formState },
            });
            console.log(data)
          
        }catch (e) {
            console.error(e);
        }
        setFormState({
            title: "",
            image: "",
            description: "",
            price: ""
        })
    };

  return (
    <div className="container mt-5 signup-page">
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card signup-card">
          <div className="card-body">
            <h2 className="text-center mb-4">Add New Post</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="text"
                  name="image"
                  value={formState.image}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={formState.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-custom mt-4 w-100">
                Publish
              </button>
            </form>
            {error && <div className="text-danger mt-3">{error.message}</div>}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CreatePost
