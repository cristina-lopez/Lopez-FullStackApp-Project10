import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
//import { Context } from '../Context';
//import Data from '../Data';

export default function CreateCourse() {

    const [newCourse, setNewCourse] = useState([]);
    const [errors, setErrors] = useState([]);

    /* useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
                const json = await response.json();
                setCourses(json.courses);
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    }, []); */

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                {/* {errors && 
                    (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                )} */}
            
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div class="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                        <input id="courseTitle" name="courseTitle" type="text" value="" />
                                    {/* <p>By USER </p> {course.author} */}
                                    <p>By USER </p>
                                    <label htmlFor="courseDescription">Course Description</label>
                                        <textarea id="courseDescription" name="courseDescription"></textarea>
                                </div>

                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input id="estimatedTime" name="estimatedTime" type="text" value="" />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                                </div>
                            </div>
                        </React.Fragment>
                    )} 
                />     
                    {/* <button class="button" type="submit">Create Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button> */}

            </div>
        </main>
    );
}