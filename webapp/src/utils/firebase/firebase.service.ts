import "server-only";
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where } from "firebase/firestore";
import { fireStore, firebaseApp } from "@/utils/firebase/firebaseClient";
import type { Band, User, Vote } from "@firebase/api";
import type { IUser } from "@domain/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authentication/authOptions";
import { IBand } from "@domain/band";
import { cache } from "react";
type IVote = {
  userId: string;
  trackId: string;
  vote: number;
};

const getDocumentsByCollectionName = cache(async (name: string) => {
  const documentsSnapshot = await getDocs(collection(fireStore, name));
  if (documentsSnapshot) return documentsSnapshot.docs.map(doc => doc.data());
});

const getAllUsers = async () => await getDocumentsByCollectionName("users");

const getUserById = cache(async (id: string) => {
  const userRef = doc(fireStore, "users", id);
  return (await getDoc(userRef)).data();
});

const getVerifiedUser = async (id: string) => await getUserById(id);

const setUserProfile = async (profile: IUser) => {
  const userRef = doc(fireStore, "users", profile.id);
  await setDoc(userRef, profile);
  return profile;
};

const getBandsByUserId = cache(async (id: string) => {
  const allBands = collection(fireStore, "bands");
  const bandsQuery = query(allBands, where("members", "array-contains", id));
  const bandDocs = await getDocs(bandsQuery);
  const bands = bandDocs.docs.map(band => band.data());
  return bands as unknown as IBand[];
});

const getAllVotes = async () => await getDocumentsByCollectionName("votes");

const getUserVotes = async (id: string) => {
  const allVotes = await getDocumentsByCollectionName("votes");
  return { userVotes: allVotes?.filter(vote => vote.userId === id), allVotes };
};

const getVotesByTrackId = async (id: string) => {
  const allVotes = await getDocumentsByCollectionName("votes");
  return allVotes?.filter(vote => vote.trackId === id);
};

const getVotesByBandMembers = async (bandMembers: string[], ids: string[]) => {
  const allVotes = await getDocumentsByCollectionName("votes");
  return allVotes?.filter(vote => bandMembers.includes(vote.userId) && ids.includes(vote.trackId));
};

const addVote = async (payload: IVote) => {
  return await addDoc(collection(fireStore, "votes"), payload);
};

const updateVote = async (payload: IVote) => {
  const allVotes = collection(fireStore, "votes");
  const voteQuery = query(allVotes, where("userId", "==", payload.userId), where("trackId", "==", payload.trackId));
  const voteQuerySnapshot = await getDocs(voteQuery);
  const userVoteRef = doc(fireStore, "votes", voteQuerySnapshot.docs[0].id);
  await setDoc(userVoteRef, payload);
};

const setVote = async (payload: IVote) => {
  const { userVotes, allVotes } = await this.getUserVotes(payload.userId);
  const existingVote = userVotes?.find(vote => vote.trackId === payload.trackId);
  if (existingVote) {
    return await this.updateVote(payload);
  } else {
    return await this.addVote(payload);
  }
};

export { getVerifiedUser, setUserProfile, getBandsByUserId, getAllVotes, setVote };
