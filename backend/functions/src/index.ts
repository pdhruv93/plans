import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';

admin.initializeApp();

// create user in the users collection whenever a new user signs in
export const createUserOnLogin = functions.auth.user().onCreate((user: UserRecord) =>
  admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      roles: ['user'],
      deviceId: '',
    }),
);

export const scheduledFunction = functions.pubsub
  .schedule('0 8 * * *')
  .timeZone('UTC')
  .onRun(() => {
    const today = new Date();
    const nextDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    admin
      .firestore()
      .collection('plans')
      .where('startTime', '>=', today)
      .where('startTime', '<', nextDay)
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach(async (doc) => {
          const plan = doc.data();
          const deviceIds: string[] = [];

          if (plan.attendees?.length > 0) {
            await admin
              .firestore()
              .collection('users')
              .where('userId', 'in', plan.attendees)
              .get()
              .then((snapshot) =>
                snapshot.docs.forEach((doc) => {
                  const user = doc.data();
                  user.deviceId && deviceIds.push(user.deviceId);
                }),
              );
          }

          console.log(`:::::Sending push notifications for plan ${plan.title} to ${deviceIds}`);
          const message: MulticastMessage = {
            notification: {
              title: 'You have an upcoming plan',
              body: plan.title,
            },
            webpush: {
              fcmOptions: {
                link: doc.id,
              },
            },
            tokens: deviceIds,
          };
          admin.messaging().sendMulticast(message);
        }),
      );

    return null;
  });
