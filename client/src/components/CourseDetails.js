import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import Context from '../Context';

export default function CourseDetails() {

    let history = useHistory();
    let context = useContext(Context.Context);

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

    function deleteCourse(id) {
        context.data.deleteCourse(id)
            .then(() => {
                setCourse([]);
                history.push('/courses');    
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
              });
    }

    return (
            <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                    <Link className="button" to='/courses/' onClick={(id) => deleteCourse(id)}>Delete Course</Link>
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