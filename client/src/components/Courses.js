import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { Context } from '../Context';
//import Data from '../Data';

export default function Courses() {

    /* const [courses, setCourses] = useState(
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(res => console.log(res.type))
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            })
    ); */

    const [courses, setCourses] = useState([]);

/*     useEffect(() => {
        console.log('useEffect called!');
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(data => {
                setCourses(data.courses)
            })
          .catch(err => console.log('Oh noes!', err))
        console.log(courses);
      }, []); */

    useEffect(() => {
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
    }, []);

    return (
        <main>
            <div className="wrap main--grid">
                {courses.map((course, index) => {
                    return (
                        <Link key={index} className="course--module course--link" to={`/courses/${course.id}`} >
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    );
                })} 
                
                <Link className="course--module course--add--module" to="/createCourse">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
            </div>
        </main>
    );
}