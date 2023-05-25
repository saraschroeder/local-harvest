import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { CREATE_POST } from "../utils/mutations";
import { GET_POSTS } from "../utils/queries";

function CreatePost() {
  // Set initial form state
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
  });
  
  const [productCategory, setProductCategory] = useState("");

  // Getting farmer info by user logged in
  const { loading: meLoading, data: meData } = useQuery(GET_ME);
  const userData = meData?.me || [];

  // Using mutation to create new user
  const [createPost, { error }] = useMutation(CREATE_POST, {
    // Using update to manually modify GET_POSTS query with new post
    update: (cache, { data: { createPost } }) => {
      try {
        // Reading the query from the cache to verify if there is any data
        const { allPosts } = cache.readQuery({ query: GET_POSTS }) || {
          allPosts: [],
        };
        // Inserting new post in all posts
        cache.writeQuery({
          query: GET_POSTS,
          data: { allPosts: [...allPosts, createPost] },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  if (meLoading) {
    return <p>Loading...</p>;
  }

  // If user is not logged in or not a Farmer
  if (userData.length === 0 || userData.role !== "Farmer") {
    return <h3>You need to be a farmer and logged in to see this page</h3>;
  }
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
        variables: { postInput: { ...formState, image: productCategory} },
      });
      // Redirect to the created post page
      navigate(`/profile/${userData._id}`);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      title: "",
      image: "",
      description: "",
      price: "",
    });
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
                  <label>Category</label>
                  <select
                    name="productCategory"
                    value={productCategory}
                    onChange={(e) => {
                      setProductCategory(e.target.value)
                    }}
                    className="form-control"
                    required
                  >
                    <option value="">Select Product Category</option>
                    <option value="cheese">Cheese</option>
                    <option value="eggs">Eggs</option>
                    <option value="fruits">Fruits</option>
                    <option value="honey">Honey</option>
                    <option value="meat">Meat</option>
                    <option value="milk">Milk</option>
                    <option value="plants">Plants/Flowers</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="other">Other</option>
                  </select>
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
  );
}

export default CreatePost;
