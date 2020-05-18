import React, { useState, useEffect } from "react";
import './Form.css'
import CustomerDataService from "../services/Library_userService";

const Customer = props => {
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
  const [currentCustomer, setCurrentCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState("");

  const getCustomer = id => {
    CustomerDataService.get(id)
      .then(response => {
        setCurrentCustomer(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCustomer(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCustomer({ ...currentCustomer, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentCustomer.id,
      title: currentCustomer.title,
      category: currentCustomer.category,
      description: currentCustomer.description,
      source: currentCustomer.source,
      URL: currentCustomer.URL,
      author: currentCustomer.author,
      tags: currentCustomer.tags,
      published: status
    };

    CustomerDataService.update(currentCustomer.id, data)
      .then(response => {
        setCurrentCustomer({ ...currentCustomer, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCustomer = () => {
    CustomerDataService.update(currentCustomer.id, currentCustomer)
      .then(response => {
        console.log(response.data);
        setMessage("The customer was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCustomer = () => {
    CustomerDataService.remove(currentCustomer.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/customers");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="customer-form">
      {currentCustomer ? (
        <div className="edit-form">
          <h4><strong>Update Article</strong></h4>
          <form>
          <div article-form>
            <p>{message}</p>
            <div className="form-group">
              <label className="labelling" htmlFor="title">Article Title:</label>
              <input
                type="text"
                className="input-field"
                id="title"
                value={currentCustomer.title}
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
                value={currentCustomer.description}
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
                value={currentCustomer.category}
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
                value={currentCustomer.source}
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
                value={currentCustomer.author}
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
                value={currentCustomer.URL}
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
                value={currentCustomer.tags}
                onChange={handleInputChange}
                name="tags"
              />
            </div>

            <div className="form-group">
            <label className="labelling">
                <strong>Status:</strong>
              </label>
              {currentCustomer.published ? "Published" : "Pending"}
            </div>
          </div>
          </form>

          {currentCustomer.published ? (
            <button className="btn btn-success"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button className="btn btn-success"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

           {/*<button className="btn btn-success" onClick={deleteCustomer}>
            Delete
          </button>*/}

          <button className="btn btn-success"
            type="submit"
            onClick={updateCustomer}
          >
            Update
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Customer...</p>
        </div>
      )}
    </div>
  );
};

export default Customer;
