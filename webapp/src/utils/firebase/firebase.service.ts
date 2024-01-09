import 'server-only';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where } from 'firebase/firestore';
import { fireStore, firebaseApp } from '@/utils/firebase/firebaseClient';
import type { Band, User, Vote } from '@firebase/api';
import type { IUser, IBand, IVoteItem } from '@domain/content';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authentication/authOptions';

import { cache } from 'react';
import { notFound } from 'next/navigation';

type IUserVote = {
  userId: string;
  trackId: string;
  vote: number;
};

const getDocumentsByCollectionName = cache(async (name: string) => {
  const documentsSnapshot = await getDocs(collection(fireStore, name));
  if (documentsSnapshot) return documentsSnapshot.docs.map(doc => doc.data());
});

const getDocumentsByQuery = cache(async (c: string, q: any) => {
  const getColl = collection(fireStore, c);
  const collQuery = query(getColl, q);
  const result = await getDocs(collQuery);
  const docs = result.docs.map(doc => doc.data());
  return docs as unknown;
});

const getAllUsers = async () => await getDocumentsByCollectionName('users');

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
  const bands = await getDocumentsByQuery('bands', where('members', 'array-contains', id));
  return bands as IBand[];
});

const getBandMembersById = cache(async (ids: string[]) => {
  const members = await getDocumentsByQuery('users', where('id', 'in', ids));
  return members as IUser[];
});

const getAllVotes = async () => await getDocumentsByCollectionName('votes');

const getUserVotes = async (id: string) => {
  const allVotes = await getDocumentsByCollectionName('votes');
  return { userVotes: allVotes?.filter(vote => vote.userId === id), allVotes };
};

const getVotesByTrackId = async (id: string) => {
  const allVotes = await getDocumentsByCollectionName('votes');
  return allVotes?.filter(vote => vote.trackId === id);
};

const getVotesByBandMembers = async (bandMembers: string[], ids: string[]) => {
  const allVotes = await getDocumentsByCollectionName('votes');
  return allVotes?.filter(vote => bandMembers.includes(vote.userId) && ids.includes(vote.trackId));
};

const addVote = async (payload: IUserVote) => {
  return await addDoc(collection(fireStore, 'votes'), payload);
};

const updateVote = async (payload: IUserVote) => {
  const allVotes = collection(fireStore, 'votes');
  const voteQuery = query(allVotes, where('userId', '==', payload.userId), where('trackId', '==', payload.trackId));
  const voteQuerySnapshot = await getDocs(voteQuery);
  const userVoteRef = doc(fireStore, 'votes', voteQuerySnapshot.docs[0].id);
  return await setDoc(userVoteRef, payload);
};

const setVote = async (payload: IUserVote) => {
  const { userVotes, allVotes } = await getUserVotes(payload.userId);
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
  getBandsByUserId,
  getBandMembersById,
  getAllVotes,
  getVotesByBandMembers,
  setVote,
};
