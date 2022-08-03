import React, { useState, useContext, useEffect } from 'react';
import Form from './Form';
import { useHistory, useParams } from 'react-router-dom';
import Context from '../Context';
import { Buffer } from 'buffer';

export default function UpdateCourse() {

    let history = useHistory();
    let context = useContext(Context.Context);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    const [course] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                const json = await response.json();
                setTitle(json.title);
                setDescription(json.description);
                setEstimatedTime(json.estimatedTime);
                setMaterialsNeeded(json.materialsNeeded);
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
       
        const updatedCourse = {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          userId: context.authenticatedUser.id,
        };

        const body = JSON.stringify(updatedCourse);

        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" ,
                    'Authorization': 'Basic ' + Buffer.from(`${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`).toString("base64") 
            },
            body: body,
        })
            .then( response => {
                if (response.status === 204) {
                    console.log("Course was updated!");
                    history.push(`/courses/${id}`);
                } else if (response.status === 400){
                    return response.json().then(data => {
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
            setDescription(value);
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
                                        <textarea id="courseDescription" name="courseDescription" value={description} onChange={change}></textarea>
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