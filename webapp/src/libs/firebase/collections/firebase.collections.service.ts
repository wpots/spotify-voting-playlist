import { collection, doc, getDoc, getDocs, setDoc, query, where } from 'firebase/firestore';
import { fireStore } from '../firebaseClient.client';
import type { Band, Vote } from '@firebase/api';
import type { IUser, IBand } from '@domain/content';

import { cache } from 'react';

const _getDocumentsByCollectionName = cache(async (name: string) => {
  const documentsSnapshot = await getDocs(collection(fireStore, name));
  if (documentsSnapshot) return documentsSnapshot.docs.map(doc => doc.data());
});

const _getDocumentsByQuery = cache(async (c: string, q: any) => {
  const getColl = collection(fireStore, c);
  const collQuery = query(getColl, q);
  try {
    const result = await getDocs(collQuery);
    const docs = result.docs.map(doc => doc.data());
    return docs as unknown;
  } catch (error) {
    console.log('{FIREBASE SERVICE ERROR}==========================', error);
  }
});

const getUserById = cache(async (id: string) => {
  const userRef = doc(fireStore, 'users', id);
  return (await getDoc(userRef)).data();
});

const getVerifiedUser = async (id: string) => await getUserById(id);

const getVotesByBandMembers = async (bandMembers: string[], ids: string[]) => {
  const memberVotes = await _getDocumentsByQuery('votes', where('userId', 'in', bandMembers));
  return (memberVotes as Array<Vote>)?.filter(vote => ids.includes(vote.trackId));
};

const getBandsByUserId = cache(async (id: string) => {
  const bands = await _getDocumentsByQuery('bands', where('memberIds', 'array-contains', id));
  return bands as IBand[];
});
const getBandById = cache(async (id: string) => {
  const bands = (await _getDocumentsByQuery('bands', where('id', '==', id))) as Band[];
  return bands?.[0] as unknown as Band;
});

const getBandMembersById = cache(async (ids: string[]) => {
  const members = await _getDocumentsByQuery('users', where('id', 'in', ids));

  return members as IUser[];
});

const getAllBands = async () => {
  return await _getDocumentsByCollectionName('bands');
};

export { getVerifiedUser, getBandById, getBandsByUserId, getBandMembersById, getAllBands, getVotesByBandMembers };
