import firebase from 'firebase'
import uuidv4 from 'uuid/v4';
import _ from 'lodash';

const config = {
  apiKey: "AIzaSyBN3_d8mJp8lz1DVArEHow_UrLvId9aI64",
  authDomain: "uninorteweb-63590.firebaseapp.com",
  databaseURL: "https://uninorteweb-63590.firebaseio.com",
  projectId: "uninorteweb-63590",
  storageBucket: "uninorteweb-63590.appspot.com",
  messagingSenderId: "212267480750",
};
firebase.initializeApp(config);

const ref = firebase.database().ref();
const storageRef = firebase.storage().ref();
const firebaseAuth = firebase.auth;

export function createUser(name, email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(user => saveUser(user, name))
}

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function checkToken() {
  return firebase.auth().currentUser.getIdToken(true).then((idToken) => {
    console.log(idToken);
    // Send token to your backend via HTTPS
    // ...
  }).catch(console.log);
}

export function getCurrentUser(cb) {
    const messagesRef = ref.child(`users/${firebase.auth().currentUser.uid}`);
    messagesRef.on('value', snapshot => {
      cb(snapshot.val(), firebase.auth().currentUser);
    });
}

export function getPost(uid, cb) {
  const messagesRef = ref.child(`posts/${uid}`);
  messagesRef.on('value', snapshot => {
    const post = snapshot.val();
    const messagesRef = ref.child(`users/${post.user_uid}`);
    messagesRef.on('value', snapshotUser => {
      const user = snapshotUser.val();
      post.username = user.name;
      post.user_avatar = user.avatar;
      cb(post);
    });
  });
}

export function getLatestComments(cb) {
  const comments = [];
  ref.child('comments')
    .orderByChild('createdAt')
    .limitToLast(10)
    .on('value', snapshot => {
      snapshot.forEach(data => {
        comments.unshift(data.val())
      });
      cb(comments);
    });
}

export function getMostCommentedPosts(cb) {
  const posts = [];
  ref.child('/posts')
    .orderByChild('comment_counter')
    .limitToLast(10)
    .on('value', (snapshot) => {
      snapshot.forEach(data => {
        posts.unshift(data.val())
      });
      cb(posts);
    });
}

export function saveComment(post_uid, comment) {
  const messagesRef = ref.child(`users/${firebase.auth().currentUser.uid}`);
  messagesRef.once('value', snapshotUser => {
    const user = snapshotUser.val();
    // push to comments nested within posts
    ref.child(`posts/${post_uid}/comments`)
      .push({
        comment,
        user_uid: firebase.auth().currentUser.uid,
        user_name: user.name,
        createdAt: Date.now(),
      });

    // push to plain comments collection
    ref.child(`comments`)
    .push({
      comment,
      user_uid: firebase.auth().currentUser.uid,
      user_name: user.name,
      createdAt: Date.now(),
      post_uid,
    });

    // update post comment_counter
    const postref = ref.child(`posts/${post_uid}`);
    postref.once('value', snapshot => {
      postref.update({
        comment_counter: parseInt(snapshot.val().comment_counter + 1, 10),
      });
    });
    
    // update user comment_counter
    const userRef = ref.child(`users/${firebase.auth().currentUser.uid}`);
    userRef.once('value', snapshot => {
      userRef.update({
        comment_counter: parseInt(snapshot.val().comment_counter + 1, 10),
      });
    });
  });
}

export function deletePost(post_uid) {
  return ref.child(`posts/${post_uid}`).remove()
    .then(() => {
      const userRef = ref.child(`users/${firebase.auth().currentUser.uid}`);
      userRef.once('value', snapshot => {
        userRef.update({
          post_counter: parseInt(snapshot.val().post_counter - 1, 10),
        });
      });
    });
}

export function isUserPostOwner(user_uid) {
  return firebase.auth().currentUser.uid === user_uid;
}

export function isLoggedIn() {
  return !_.isEmpty(firebase.auth().currentUser);
}

export function saveUser(user, name) {
  return ref.child(`users/${user.uid}`)
    .set({
      name,
      email: user.email,
      uid: user.uid,
      createdAt: Date.now(),
      comment_counter: 0,
      post_counter: 0,
      avatar: 'https://firebasestorage.googleapis.com/v0/b/uninorteweb-63590.appspot.com/o/images%2Fnobody_profile_image.jpg?alt=media&token=1f5a1ae3-dd93-407e-9219-2c7341afb309',
    })
    .then(() => user);
}

export function saveImageLink(link) {
  return ref.child(`users/${firebase.auth().currentUser.uid}`)
    .update({
      avatar: link,
    })
    .then(() => link);
}

export function getAllUsers(cb) {
  const messagesRef = ref.child('users');
  messagesRef.on('value', snapshot => {
    let users = snapshot.val();
    let newState = [];
    for (let user in users) {
      newState.push({
        id: users[user].uid,
        email: users[user].email,
      });
    }
   cb(newState);
  });
}

export function getAllPosts(cb) {
  const posts = [];
  ref.child('posts')
    .orderByChild('createdAt')
    .on('value', (snapshot) => {
      snapshot.forEach(data => {
        posts.push(data.val())
      });
      cb(posts);
    });
}

export function uploadImage(file) {
  const thisRef = storageRef.child("/images/" + file.name);
  thisRef.put(file).then(snapshot => {
    saveImageLink(snapshot.downloadURL);
    console.log('Uploaded a blob or file!');
  });
}

export function getAllImages(cb) {
  const imageRef = storageRef.child("/images");
  imageRef.on('value', snapshot => {
    let users = snapshot.val();
    let newState = [];
    for (let user in users) {
      newState.push({
        id: users[user].uid,
        email: users[user].email,
      });
    }
   cb(newState);
  });
}

export function saveNewPost(title, description) {
  const uid = uuidv4();
  return ref.child(`posts/${uid}`)
  .set({
    title,
    description,
    user_uid: firebase.auth().currentUser.uid,
    createdAt: Date.now(),
    uid,
    comment_counter: 0,
  }).then(() => {
    // update user post_counter
    const userRef = ref.child(`users/${firebase.auth().currentUser.uid}`);
    userRef.once('value', snapshot => {
      userRef.update({
        post_counter: parseInt(snapshot.val().post_counter + 1, 10),
      });
    });
  })
}