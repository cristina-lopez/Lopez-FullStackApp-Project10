//import config from './config';

// This js file has methods that will interact with the user and course data.
export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
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
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
    
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
    
        return fetch(url, options);
    }
    
    async getUser(username, password) {
        const response = await this.api(`/users`, 'GET', null, true, {username, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }
        
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
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
    }

    async getCourses() {
        const response = await this.api(`/courses`, 'GET', null, true);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET', null, true);
        if (response.status === 200) {
            return response.json().then(data => data);
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    async createCourse(course) {
        const response = await this.api('/courses', 'POST', course);
        if (response.status === 201) {
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
    }

    async updateCourse(id, course) {
        const response = await this.api(`/courses/${id}`, 'PUT', course);
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
    }

    async deleteCourse(id) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null);
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
    }
}
    