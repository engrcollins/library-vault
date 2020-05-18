import React, { useState } from "react";
import './Form.css'
import Library_topicDataService from "../services/Library_topicService";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    root: {
      width: '100%',
      minWidth: 410,
    },
    table: {
      minWidth: 360,
    },
    active: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  });

const AddThread= () => {
  const initialLibrary_topicState = {
    id: null,
    title: "",
    category: '',
    content: "",
    tags: "",
    author: ""
  };
  const [library_topic, setLibrary_topic] = useState(initialLibrary_topicState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setLibrary_topic({ ...library_topic, [name]: value });
  };

  const saveLibrary_topic = () => {
    var data = {
      title: library_topic.title,
      content: library_topic.content,
      category: library_topic.category,
      tags: library_topic.tags
    };

    Library_topicDataService.create(data)
      .then(response => {
        setLibrary_topic({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          category: response.category,
          tags: response.tags,
          author: response.data.author
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newLibrary_topic = () => {
    setLibrary_topic(initialLibrary_topicState);
    setSubmitted(false);
  };

  const classes = useStyles();
  return (
    <div className="library_topic-form">
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>Topic created successfully!</h4>
            <button className="btn btn-success" onClick={newLibrary_topic}>
              Create Another
            </button>
          </div>
        ) : (
          <div article-form="true">
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align="center"><strong>New Thread</strong>
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="title">Title: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="title"
                        required
                        placeholder="Your title goes here"
                        value={library_topic.title || ""}
                        onChange={handleInputChange}
                        name="title"
                    />
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="category">Category: </label></TableCell>
                    <TableCell align="left"><select id="category" required value={library_topic.category || ""}
                        onChange={handleInputChange} name="category">
                        <option value="Life">Life</option>
                        <option value="Career & Business">Career & Business</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Religion">Religion</option>
                        <option value="Sex & Sexualities">Sex & Sexualities</option>
                        <option value="Travelling & Lifestyle">Travelling & Lifestyle</option>
                        <option value="Science & Universe">Science & Universe</option>
                        <option value="Quotes">Quotes</option>
                        <option value="Books & Biography">Books & Biography</option>             
                      </select>
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="content">Content: </label></TableCell>
                    <TableCell align="left"><textarea
                        type="text"
                        className="input-field"
                        id="content"
                        rows="10" cols="45"
                        required
                        value={library_topic.content|| ""}
                        onChange={handleInputChange}
                        name="content"
                    />
                    </TableCell>
                    </TableRow>

                    <TableRow>
                    <TableCell align="left"><label className="labelling" htmlFor="tags">Tags: </label></TableCell>
                    <TableCell align="left"><input
                        type="text"
                        className="input-field"
                        id="tags"
                        required
                        value={library_topic.tags|| ""}
                        onChange={handleInputChange}
                        name="tags"
                    />
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>

                <button onClick={saveLibrary_topic} className="btn btn-success">
                Submit
                </button>
                <br/>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddThread;
