import 'server-only';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where } from 'firebase/firestore';
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

// const getAllUsers = async () => await _getDocumentsByCollectionName('users');

const getUserById = cache(async (id: string) => {
  const userRef = doc(fireStore, 'users', id);
  return (await getDoc(userRef)).data();
});

const getVerifiedUser = async (id: string) => await getUserById(id);

const setUserProfile = async (profile: IUser) => {
  const userRef = doc(fireStore, 'users', profile.id);
  await setDoc(userRef, profile);
  return profile;
};

const getBandsByUserId = cache(async (id: string) => {
  const bands = await _getDocumentsByQuery('bands', where('members', 'array-contains', id));
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

const getAllVotes = async () => {
  return await _getDocumentsByCollectionName('votes');
};

const getAllBands = async () => {
  return await _getDocumentsByCollectionName('bands');
};

const getUserVotes = async (id: string) => {
  const allVotes = await getAllVotes();
  return allVotes?.filter(vote => vote.userId === id);
};

// const getVotesByTrackId = async (id: string) => {
//   const allVotes = await getAllVotes();
//   return allVotes?.filter(vote => vote.trackId === id);
// };

const getVotesByBandMembers = async (bandMembers: string[], ids: string[]) => {
  const allVotes = await getAllVotes();
  return allVotes?.filter(vote => bandMembers.includes(vote.userId) && ids.includes(vote.trackId));
};

const addVote = async (payload: Vote) => {
  await addDoc(collection(fireStore, 'votes'), payload);
};

const updateVote = async (payload: Vote) => {
  const allVotes = collection(fireStore, 'votes');
  const voteQuery = query(allVotes, where('userId', '==', payload.userId), where('trackId', '==', payload.trackId));
  const voteQuerySnapshot = await getDocs(voteQuery);
  const userVoteRef = doc(fireStore, 'votes', voteQuerySnapshot.docs[0].id);
  payload.timestamp = Date.now();
  await setDoc(userVoteRef, payload);
};

const setVote = async (payload: Vote) => {
  const userVotes = await getUserVotes(payload.userId);
  const existingVote = userVotes?.find(vote => vote.trackId === payload.trackId);
  if (existingVote) {
    await updateVote(payload);
  } else {
    await addVote(payload);
  }
};

export {
  getVerifiedUser,
  setUserProfile,
  getBandById,
  getBandsByUserId,
  getBandMembersById,
  getAllBands,
  getAllVotes,
  getVotesByBandMembers,
  setVote,
};
