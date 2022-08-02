import React, { useState, useContext, useEffect } from 'react';
import Form from './Form';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../Context';
import { Buffer } from 'buffer';
//import Data from '../Data';

export default function UpdateCourse() {

    let history = useHistory();
    let context = useContext(Context.Context);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    const [course, setCourse] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                const json = await response.json();
                setCourse(json);
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    }, []);


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
        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: "PUT",
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
        if (name === 'courseTitle') {
            setTitle(value);
        }
        else if (name === 'courseDescription') {
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
                <h2>Update Course</h2>
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Update Course"
                    elements={() => (
                        <React.Fragment>
                            <div className="main--flex">
                                <div>
                                    <label htmlFor="courseTitle">Course Title</label>
                                        <input 
                                            id="courseTitle" name="courseTitle" type="text" value={title} 
                                            onChange={change}
                                        />
                                    {course.user && 
                                        (<p>
                                            By {course.user.firstName} {course.user.lastName}
                                        </p>
                                    )}
                                    <label htmlFor="courseDescription">Course Description</label>
                                        <textarea id="courseDescription" name="courseDescription" value={desc} onChange={change}></textarea>
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