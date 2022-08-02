import React, { useState, useContext } from 'react';
import Form from './Form';
import { useHistory } from 'react-router-dom';
import Context from '../Context';
import { Buffer } from 'buffer';
//import Data from '../Data';

export default function CreateCourse() {

    let history = useHistory();
    let context = useContext(Context.Context);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    const cancel = () => {
        history.push('/courses');
    }

    function submit() {
        // Create course
        const course = {
          title,
          desc,
          estimatedTime,
          materialsNeeded,
        };

        const body = JSON.stringify(course);

        console.log(body.title);
        //console.log(JSON.stringify(course));
        fetch("http://localhost:5000/api/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" ,
                    'Authorization': 'Basic ' + Buffer.from(`${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`).toString("base64") 
            },
            body: body,
            
        })
            .then( response => {
                if (response.status === 201) {
                    console.log("New Course was added!");
                } else if (response.status === 400){
                    response.json().then(data => {
                        return data.errors;
                    });
                } else {
                    throw new Error();
                }
            })
    }

    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'title') {
            setTitle(value);
        }
        else if (name === 'desc') {
            setDesc(value);
        }
        else if (name === 'estimatedTime') {
            setEstimatedTime(value);
        } else if (name === 'materialsNeeded') {
            setMaterialsNeeded(value);
        }
        else {
            return;
        }
    }

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
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Create Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="title">Course Title</label>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            value={title} 
                                            onChange={change}
                                        />
                                    {/* <p>By USER </p> {course.author} */}
                                    <p>By USER </p>
                                    <label htmlFor="desc">Course Description</label>
                                        <textarea id="desc" name="desc" value={desc} onChange={change}></textarea>
                                </div>

                                <div>
                                    <label htmlFor="estimatedTime">Estimated Time</label>
                                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={change} />

                                    <label htmlFor="materialsNeeded">Materials Needed</label>
                                        <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={change}></textarea>
                                </div>
                            </div>
                        </React.Fragment>
                    )} 
                />
            </div>
        </main>
    );
}