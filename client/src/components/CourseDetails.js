import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { Buffer } from "buffer";
import Context from '../Context';

export default function CourseDetails() {

    let history = useHistory();
    const context = useContext(Context.Context);
    const [course, setCourse] = useState([]);
    const { id } = useParams();
    
    // Fetches course information for this id.
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${id}`);
                if(response.status===200) {
                    const json = await response.json();
                    setCourse(json);
                } else {
                    history.push('/notfound');
                }
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    }, [id]);

    //** Renders the HTML **/
    return ( 
            <main>
            {/* Displays Update, Delete and Return to List buttons if user is authenticated
            and user is owner of course. Only displays Return to List button if the previous 
            conditions don't apply. */}
                <div className="actions--bar">
                    <div className="wrap">
                        {(context.authenticatedUser && course.user) ?
                            (context.authenticatedUser.id===course.user.id) ?
                                <React.Fragment>
                                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                    <Link className="button" to='/courses/' onClick={deleteACourse}>Delete Course</Link>
                                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                                </React.Fragment>
                            : 
                            <Link className="button button-secondary" to="/courses">Return to List</Link>
                        :
                        <Link className="button button-secondary" to="/courses">Return to List</Link>
                        }
                    </div>
                </div>
            {/* Displays the information about the course. */}
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

    //**  HELPER FUNCTION **// 
    // Deletes a course when the button is pressed IF 
    // the user is authenticated and the owner of the course.
    function deleteACourse() {
        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json",
                'Authorization': 'Basic ' + Buffer.from(
                    `${context.authenticatedUser.emailAddress}:${context.authenticatedUser.password}`
                  ).toString("base64") },
            body: null,  
        })
        .then( response => {
            if (response.status === 204) {
                console.log("Course was deleted!");
            } else if (response.status === 400){
                response.json().then(data => {
                    return data.errors;
                });
            } else {
                throw new Error();
            }
        })
    }
}