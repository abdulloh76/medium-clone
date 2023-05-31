# medium-clone

Medium Lite
simple backend-clone of service Medium

backend capabilities:

- authorization
- create posts
- list of posts + pagination
- list of users + pagination
- get post by id

all requests include validation of params, error handling with understandable error messages and codes
also there is service calculating time for reading the post in minutes
add rating for the posts

## routes

### without token

#### auth

POST - /api/signup { name, email, password }
POST - /api/signin { email, password }

### with token

#### user

GET - /api/user getAllUsers

#### post

POST - /api/post createPost { title, content }
GET - /api/post getAllPosts
GET - /api/post/:id getPostById
