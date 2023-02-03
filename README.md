# Sprint List Server

## Links
Deployment: https://sprint-list.netlify.app/
Client: https://github.com/hadeelgamal/sprint-list-client


## Description

It is a to do list app where you can create “sprints" and start adding a list of tasks.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start creating sprints
-  **Login:** As a user I can login to the platform so that I can see my 
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Create Sprints** As a user I can add a sprint so that I can start adding tasks

## Models

User model

```
name - String // required
email - String // required & unique
password - String // required
sprints - [ObjectID<sprints>]
```

Sprint model

```
owner - ObjectID<User> 
title - String 
dueDate - Date
currentStatus - String 
```

Task model

```
Sprint - ObjectID<User> 
description: String,
dueDate: Date,
checked: Boolean,
sprint: { type: Schema.Types.ObjectId, ref: 'Sprint' }
```
## API Endpoints/Backend Routes


- POST /auth/signup
  - body:
    - name
    - email
    - password
- POST /auth/login
  - body:
    - email
    - password
- POST /auth/logout
  - body: (empty)
- POST /api/sprints
  - body:
    - title
    - dueDate
    - currentStatus
- GET /api/sprints
- GET /api/sprints/:sprintId - Return the specified sprint using the id
- PUT  /api/sprints/:sprintId - Edit specified sprint
- DELETE - /api/sprints/:sprintId  - Delete specified project
- POST /api/tasks  -  Creates a new task
  - body:
    - description
    - dueDate
    - checked
    - sprintId
- PUT /api/tasks  -  update tasks
- DELETE - /api/tasks/:taskId  - Delete specified task
  
