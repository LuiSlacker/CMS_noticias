# CMS Noticias

## Setup

Install all dependencies and run the server with
```
npm install && npm run start_dev
```

Then duplicate `.env-template.js` inside the config directory, rename it to `.env` and add necessary credentials.
Since the `.env` file is excluded from git, no passwords will be leaked to github.

To transpile ES6 to vanilla JS and create the frontend-bundle with webpack run:
```
npm run build
```

## Development
Please enable the *editorconfig* plugin within your IDE and try to obey as many es-lint rules as possible.

## Deploy
The app has been released to Heroku @ [https://agile-wave-55174.herokuapp.com](https://agile-wave-55174.herokuapp.com).

The MongoDB-instance is hosted at [mlab.com](https://mlab.com).

Ask for permission to deploy.


## REST API
## Users Methods
### login
- method: POST
- path: /api/users/login
- parameters: email, password
### signup
- method: post
- path: /api/users/signup
- parameters: password, token
### logout
- method: get
- path: /api/users/logout
- parameters: none
### forgotPassword
- method: post
- path: /api/users/forgotPassword
- parameters: email
### toggleUserState
- method: delete
- path: /api/users/${userId}
- parameters: none
### createNewUser
- method: post
- path: /api/users/create
- parameters: username, email
### getAll (users)
- method: get	
- path: /api/users/
- parameters: none
### updateAssignedPages
- method: patch
- path: /api/users/${userId}
- parameters: assignedPages
### fetchAssignedPageIds
- method: get
- path: /api/users/${userId}/assignedPages
- parameters: none
### fetchAssignedPages
- method: get
- path: /api/users/${userId}/assignedPages
- parameters: none
### getUserInfoForToken
- method: get
- path: /api/users/userfortoken/${token}
- parameters: none
 
 
## Pages Methods
### getAll(pages)
- method: get
- path: /api/paginas/
- parameters: none
### persistOne(pages)
- method: post
- path: /api/paginas/
- parameters: name
### persistNewPoll
- method: post
- path: /api/paginas/${pageId}/poll
- parameters: pageId, poll
### getPoll
- method: get
- path: /api/paginas/${pageId}/poll
- parameters: pageId
### votePoll
- method: put
- path: /api/paginas/${pageId}/poll
- parameters: pageId, optionId


## Notices Methods
### getAllForOnePage
- method: get
- path: /api/paginas/${pageId}/notices
- parameters: pageId
### getOneById
- method: get
- path: /api/paginas/${pageId}/notices/${noticesId}
- parameters: pageId, noticesId
### getAllForOneUser
- method: get
- path: /api/notices?userId=${userId}
- parameters: userId
### persistOne(notices)
- method: post
- path: /api/paginas/${pageId}/notices
- parameters: pageId, noticiaObject
### updateOne
- method: put
- path: /api/notices/${noticiaObject._id}/
- parameters: noticiaObject
### getAllComments
- method: get
- path: /api/notices/${noticeId}/comments
- parameters:noticeId
### persistComment
- method: post
- path: /api/notices/${noticeId}/comments
- parameters: noticeId, data



## Team

* MateoDaza
* LudwigGoohsen
* SebastianRacedo

[MateoDaza]: <https://github.com/mateodaza>
[LudwigGoohsen]: <https://github.com/LuiSlacker>
[SebastianRacedo]: <https://github.com/JoaoRacedo>
