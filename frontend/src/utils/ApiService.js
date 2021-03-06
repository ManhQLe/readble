export default class ApiService {

    constructor(url, token) {
        this.url = url;
        this.token = token;
    }

    getCategories() {
        const url = `${this.url}/categories`;
        return fetch(url, this.getOptions()).then(r => {
                return r.json()
            })
            .then(json => json.categories)
    }

    /*************POSTS**************/

    getPosts(cat) {
        cat = cat && cat.length ? ('/' + cat) : '';
        const url = `${this.url}${cat}/posts`;
        let ajaxOptions = this.getOptions();
        return fetch(url, ajaxOptions).then(r => r.json())
    }

    getPost(id) {
        const url = `${this.url}/posts/${id}`;
        let ajaxOptions = this.getOptions();
        return fetch(url, ajaxOptions).then(r => r.json())
    }

    votePost(id, isUp) {
        const url = `${this.url}/posts/${id}`;
        const option = isUp ? "upVote" : "downVote"

        let ajaxOptions = this.getOptions();
        ajaxOptions.body = JSON.stringify({
            option
        });
        ajaxOptions.method = 'POST'
        ajaxOptions.headers["Content-Type"] = "application/json"

        return fetch(url, ajaxOptions).then(r => r.json())
    }

    createPost(data) {
        const url = `${this.url}/posts`;

        let ajaxOptions = this.getOptions();
        ajaxOptions.body = JSON.stringify(data);
        ajaxOptions.method = 'POST'
        ajaxOptions.headers["Content-Type"] = "application/json"

        return fetch(url, ajaxOptions).then(r => r.json())
    }

    editPost(id, title, body) {
        const url = `${this.url}/posts/${id}`;

        let ajaxOptions = this.getOptions();
        ajaxOptions.body = JSON.stringify({
            title,
            body
        });
        ajaxOptions.method = 'PUT'
        ajaxOptions.headers["Content-Type"] = "application/json"

        return fetch(url, ajaxOptions).then(r => r.json())
    }

    delPost(id) {
        const url = `${this.url}/posts/${id}`;
        let ajaxOptions = this.getOptions();
        ajaxOptions.method = "DELETE"
        return fetch(url, ajaxOptions).then(r => r.json())
    }


    /****************COMMENTS****************/

    getPostComments(postid) {
        const url = `${this.url}/posts/${postid}/comments`;
        let ajaxOptions = this.getOptions();
        return fetch(url, ajaxOptions).then(r => r.json())
    }

    getCommentById(id) {
        const url = `${this.url}/comments/${id}`;
        let ajaxOptions = this.getOptions();
        return fetch(url, ajaxOptions).then(r => r.json())
    }

    addComment(data) {
        const url = `${this.url}/comments`;
        let ajaxOptions = this.getOptions();
        ajaxOptions.method = "POST"
        ajaxOptions.headers["Content-Type"] = "application/json"
        ajaxOptions.body = JSON.stringify(data)

        return fetch(url, ajaxOptions).then(r => r.json())
    }

    voteComment(id, isUp) {
        const url = `${this.url}/comments/${id}`;
        const option = isUp ? "upVote" : "downVote"

        let ajaxOptions = this.getOptions();
        ajaxOptions.method = "POST"
        ajaxOptions.headers["Content-Type"] = "application/json"
        ajaxOptions.body = JSON.stringify({
            option
        });

        return fetch(url, ajaxOptions).then(r => r.json())
    }

    editComment(id, body) {
        const url = `${this.url}/comments/${id}`;

        let ajaxOptions = this.getOptions();
        ajaxOptions.method = "PUT"
        ajaxOptions.headers["Content-Type"] = "application/json"
        ajaxOptions.body = JSON.stringify({
            body
        });

        return fetch(url, ajaxOptions).then(r => r.json())
    }

    delComment(id) {
        const url = `${this.url}/comments/${id}`;
        let ajaxOptions = this.getOptions();
        ajaxOptions.method = "DELETE"
        return fetch(url, ajaxOptions).then(r => r.json())
    }

    getOptions() {
        return {
            headers: this.getHeaders(),
            credentials: 'include'
        }
    }

    getHeaders() {
        return {
            Authorization: this.token
        }
    }

    login(un, isGit) {
        let ajaxOptions = this.getOptions();
        ajaxOptions.method = "POST"
        ajaxOptions.headers["Content-Type"] = "application/json"
        ajaxOptions.body = JSON.stringify({
            un,
            isGit
        });
        const url = `${this.url}/login`;
        return fetch(url, ajaxOptions).then(r => {
            if (r.ok) return r.json()            
            throw r.text();
        })        
    }
}