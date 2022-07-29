import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CourseDetails() {

    //const id = e.target;
    //console.log(id);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('http://localhost:5000/api/courses/' + id);
                const json = await response.json();
                //const data = json[id];
                setCourse(json);
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    });

    return (
        //console.log(course),
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to='/courses/:id/update'>Update Course</Link>
                    <Link className="button" to="/courses/:id/delete">Delete Course</Link>
                    <Link className="button button-secondary" to="/courses">Return to List</Link>
                </div>
            </div>
            
            {/* <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{title}</h4>
                            <p>By {author}</p>

                            <p>{description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>{materialsNeeded}</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div> */}
        </main>
    );

}