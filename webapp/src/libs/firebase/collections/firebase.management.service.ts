import { fireAuth } from '@/libs/firebase/firebaseClient.client';
import 'server-only';
import { collection, doc, getDocs, setDoc, addDoc, query, where } from 'firebase/firestore';
import { fireStore } from '../firebaseClient.client';
import { getStorage, ref as storageRef, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseAuthClient } from '../firebaseClient.server';
import type { Vote } from '@firebase/api';

import { cache } from 'react';
import { IUser } from '@domain/content';
import { updateProfile } from 'firebase/auth';

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

const _getUserVotes = async (id: string) => {
  return _getDocumentsByQuery('votes', where('userId', '==', id));
};

const _addVote = async (payload: Vote, token: string) => {
  const { fireSuperStore } = await firebaseAuthClient(token);
  await addDoc(collection(fireSuperStore, 'votes'), payload);
};

const _updateVote = async (payload: Vote, token: string) => {
  const { fireSuperStore } = await firebaseAuthClient(token);
  const allVotes = collection(fireSuperStore, 'votes');
  const voteQuery = query(allVotes, where('userId', '==', payload.userId), where('trackId', '==', payload.trackId));
  const voteQuerySnapshot = await getDocs(voteQuery);
  const userVoteRef = doc(fireStore, 'votes', voteQuerySnapshot.docs[0].id);
  payload.timestamp = Date.now();
  await setDoc(userVoteRef, payload);
};

const setVote = async (payload: Vote, token: string) => {
  const userVotes = await _getUserVotes(payload.userId);
  const existingVote = (userVotes as Array<Vote>)?.find(vote => vote.trackId === payload.trackId);
  if (existingVote) {
    await _updateVote(payload, token);
  } else {
    await _addVote(payload, token);
  }
};

const setUserProfile = async (profile: IUser) => {
  const userRef = doc(fireStore, 'users', profile.id);
  await setDoc(userRef, profile);
  return profile;
};

const setUserDisplayName = async (name: string, token?: string) => {
  if (!token) return;
  const { currentUser } = await firebaseAuthClient(token);
  if (currentUser) {
    updateProfile(currentUser, { displayName: name });
  }
};

const uploadFile = async (name: string, file: File, token: string) => {
  const { currentUser } = await firebaseAuthClient(token);
  if (currentUser) {
    const fileName = `images/${currentUser.uid}-${name}.jpg`;
    try {
      const storage = getStorage();
      const fileRef = storageRef(storage, fileName);
      await uploadBytes(fileRef, file);
      return await getDownloadURL(fileRef);
    } catch (error) {
      throw new Error('UPLOAD ERROR', { cause: error });
    }
  }
};
export { setVote, setUserProfile, uploadFile, setUserDisplayName };
