const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.newUser = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        name: user.displayName,
        newuser: true
    });
});

exports.removeUser = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
});

exports.userCheck = functions.https.onCall((data, context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'You must be logged in to add an item.'
        );
    }
    if (data.length > 30){
        throw new functions.https.HttpsError(
            'invalid-argument',
            'ToDo item must be no longer than 30 characters'
        );
    }
    return true
});

exports.logActivities = functions.firestore.document('/items/{id}')
    .onCreate((snap, context) => {

        const logs = admin.firestore().collection('logs');

        return logs.add({
            item: snap.data().name,
            log: 'New item added'
        })

    })