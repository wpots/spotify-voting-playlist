import 'server-only';
import { firebaseAdminClient } from '../firebaseClient.server';
import userAdapter from './users.adapter';

async function getUsersById(userIds: Array<string>) {
  const { fireAdmin } = await firebaseAdminClient();
  const response = await fireAdmin.getUsers(userIds.map(id => ({ uid: id })));
  return response.users.map(u => userAdapter(u));
}

// displayName, disabled, password, photoURL
async function updateUser(uid: string, payload: { [key: string]: string | boolean }) {
  const { fireAdmin } = await firebaseAdminClient();
  const response = await fireAdmin.updateUser(uid, payload);
  return userAdapter(response);
}

// admin, spotifyId
async function setUserClaims(uid: string, payload: { [key: string]: string | boolean }) {
  const { fireAdmin } = await firebaseAdminClient();
  return await fireAdmin.setCustomUserClaims(uid, payload);
}

export { getUsersById, updateUser, setUserClaims };
