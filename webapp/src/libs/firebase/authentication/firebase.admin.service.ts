import 'server-only';
import { firebaseAdminClient } from '../firebaseClient.server';

async function getUsersById(userIds: Array<string>) {
  const { fireAdmin } = await firebaseAdminClient();
  const response = await fireAdmin.getUsers(userIds.map(id => ({ uid: id })));
  console.log('FIRE ADMIN AUTH', response);
  return response.users;
}

export { getUsersById };
