import React, { useState } from "react";
import './AddCustomer.css'
import CustomerDataService from "../services/Library_userService";

const AddCustomer = () => {
  const initialCustomerState = {
    id: null,
    title: "",
    category: '',
    description: "",
    source: "",
    URL: "",
    author: "",
    tags: "",
    published: false
  };
  const [customer, setCustomer] = useState(initialCustomerState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const saveCustomer = () => {
    var data = {
      title: customer.title,
      description: customer.description,
      category: customer.category,
      source: customer.source,
      URL: customer.URL,
      author: customer.author,
      tags: customer.tags
    };

    CustomerDataService.create(data)
      .then(response => {
        setCustomer({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          category: response.category,
          source: response.source,
          URL: response.URL,
          author: response.author,
          tags: response.tags,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCustomer = () => {
    setCustomer(initialCustomerState);
    setSubmitted(false);
  };

  return (
    <div className="library-form">
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newCustomer}>
              Add
            </button>
          </div>
        ) : (
          <div article-form="true">
            <div className="form-group">
              <label className="labelling" htmlFor="title">Article Title:</label>
              <input
                type="text"
                className="input-field"
                id="title"
                required
                value={customer.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>

            <div className="form-group">
              <label className="labelling" htmlFor="description">Description:</label>
              <textarea
                type="text"
                className="input-field"
                id="description"
                required
                value={customer.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>

            <div className="form-group">
              <label className="labelling" htmlFor="category">Category:</label>
              <input
                type="text"
                className="input-field"
                id="category"
                required
                value={customer.category || ""}
                onChange={handleInputChange}
                name="category"
              />
            </div>

            <div className="form-group">
              <label className="labelling" htmlFor="source">Source:</label>
              <input
                type="text"
                className="input-field"
                id="source"
                required
                value={customer.source || ""}
                onChange={handleInputChange}
                name="source"
              />
            </div>

            <div className="form-group">
              <label className="labelling" htmlFor="author">Author:</label>
              <input
                type="text"
                className="input-field"
                id="author"
                required
                value={customer.author || ""}
                onChange={handleInputChange}
                name="author"
              />
            </div>

            <div className="form-group">
              <label className="labelling" htmlFor="URL">URL:</label>
              <input
                type="text"
                className="input-field"
                id="URL"
                required
                value={customer.URL || ""}
                onChange={handleInputChange}
                name="URL"
              />
            </div>

            <div className="form-group">
              <label className="labelling" htmlFor="tags">Tags:</label>
              <input
                type="text"
                className="input-field"
                id="tags"
                required
                value={customer.tags|| ""}
                onChange={handleInputChange}
                name="tags"
              />
            </div>

            <button onClick={saveCustomer} className="btn btn-success">
              Submit
            </button>
            <br/>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCustomer;
