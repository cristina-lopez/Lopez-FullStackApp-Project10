import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

export default function CourseDetails() {

    const [course, setCourse] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                const json = await response.json();
                //console.log(json);
                setCourse(json);
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    }, []);

    function api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = 'http://localhost:5000/api' + path;
    
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
    
        if (body !== null) {
            options.body = JSON.stringify(body);
        }
    
        //check is auth is required
        /* if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        } */
    
        return fetch(url, options);
    }

    const deleteCourse = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${id}/`, {
                method: 'DELETE', 
                mode: 'cors', 
                headers: {
                    'Content-Type': 'application/json'}});
            //const response = await api(`/courses/${id}`, 'DELETE', null);
            if (response.status === 204) {
                return [];
            }
            else if (response.status === 400) {
                return response.json().then(data => {
                return data.errors;
                });
            }
            else {
                throw new Error();
            }
        } catch (err) {
            console.log("error", err)
        }
    };

    return (
            <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                    <Link className="button" to='/courses/' onClick={deleteCourse}>Delete Course</Link>
                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            {course.user && 
                                (<p>
                                    By {course.user.firstName} {course.user.lastName}
                                </p>
                            )}
                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown className='course--detail--list'>{course.materialsNeeded}</ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}