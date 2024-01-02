import "server-only";
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where } from "firebase/firestore";
import { fireStore, firebaseApp } from "@/utils/firebase/firebaseClient";
import type { Band, User, Vote } from "@firebase/api";
import type { IUser } from "@domain/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IBand } from "@domain/band";
type IVote = {
  userId: string;
  trackId: string;
  vote: number;
};

const FireStoreService = {
  async getUserId() {
    const session = getServerSession(authOptions);
  },
  async getDocumentsByCollectionName(name: string) {
    const documentsSnapshot = await getDocs(collection(fireStore, name));
    if (documentsSnapshot) return documentsSnapshot.docs.map(doc => doc.data());
  },
  async getAllUsers() {
    return this.getDocumentsByCollectionName("users");
  },
  async getAllVotes() {
    return this.getDocumentsByCollectionName("votes");
  },
  async getUserVotes(id: string) {
    const allVotes = await this.getAllVotes();
    return { userVotes: allVotes?.filter(vote => vote.userId === id), allVotes };
  },
  async getVotesByTrackId(id: string) {
    const allVotes = await this.getAllVotes();
    return allVotes?.filter(vote => vote.trackId === id);
  },
  async getVotesByBandMembers(bandMembers: string[], ids: string[]) {
    const allVotes = await this.getAllVotes();
    return allVotes?.filter(vote => bandMembers.includes(vote.userId) && ids.includes(vote.trackId));
  },
  async getUsersByBandId(id: string) {
    const allUsers = await this.getAllUsers();
    return allUsers?.filter(user => user.memberships.includes(id));
  },
  async getUserById(id: string) {
    const userRef = doc(fireStore, "users", id);
    return (await getDoc(userRef)).data();
  },
  async getVerifiedUser(id: string) {
    return await this.getUserById(id);
  },
  async setUserProfile(profile: IUser) {
    const userRef = doc(fireStore, "users", profile.id);
    await setDoc(userRef, profile);
    return profile;
  },
  async getBandsByUserId(id: string) {
    const allBands = collection(fireStore, "bands");
    const bandsQuery = query(allBands, where("members", "array-contains", id));
    const bandDocs = await getDocs(bandsQuery);
    const bands = bandDocs.forEach(band => band.data());
    console.log(bands);
    return bands as unknown as IBand[];
  },
  async addVote(payload: IVote) {
    return addDoc(collection(fireStore, "votes"), payload);
  },
  async updateVote(payload: IVote) {
    const allVotes = collection(fireStore, "votes");
    const voteQuery = query(allVotes, where("userId", "==", payload.userId), where("trackId", "==", payload.trackId));
    const voteQuerySnapshot = await getDocs(voteQuery);
    const userVoteRef = doc(fireStore, "votes", voteQuerySnapshot.docs[0].id);
    await setDoc(userVoteRef, payload);
  },
  async setVote(payload: IVote) {
    const { userVotes, allVotes } = await this.getUserVotes(payload.userId);
    const existingVote = userVotes?.find(vote => vote.trackId === payload.trackId);
    if (existingVote) {
      return await this.updateVote(payload);
    } else {
      return await this.addVote(payload);
    }
    xzcs < M;
  },
};

export default FireStoreService;
