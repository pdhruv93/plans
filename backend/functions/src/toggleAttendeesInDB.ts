import * as admin from 'firebase-admin';

export async function toggleAttendeesInDB(userId: string | undefined, planId: string) {
  const currentPlan = await admin
    .firestore()
    .collection('plans')
    .doc(planId)
    .get()
    .then((snapshot) => snapshot.data());

  if (userId && currentPlan) {
    const currentAttendees: string[] = currentPlan.attendees;
    let newAttendees: string[] = [];

    if (currentAttendees?.includes(userId)) {
      // user is now not going, remove from attendees list
      newAttendees = currentAttendees.filter((attendee: string) => attendee != userId);
    } else {
      // user is now going, add to attendees list
      newAttendees = [...currentAttendees, userId];
    }

    await admin.firestore().collection('plans').doc(planId).update({ attendees: newAttendees });
  }
}
