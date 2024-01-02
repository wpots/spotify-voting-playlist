import { collection, doc, getDoc, getDocs, setDoc, addDoc } from "firebase/firestore";
import { fireStore, firebaseApp } from "@/utils/firebase/firebaseClient";
import type { Band, User, Vote } from "@firebase/api";
import type { IUser } from "@domain/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
type IVote = {
  userId: string;
  trackId: string;
  vote: number;
};

const FireStoreService = {
  async getUserId() {
    const session = getServerSession(authOptions);
    console.log(session);
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
  async getUsersById(ids: string[]) {},
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
  async getBandById(id: string) {
    const bandRef = doc(fireStore, "bands", id);
    return (await getDoc(bandRef)).data();
  },
  async addVote(payload: IVote) {
    return addDoc(collection(fireStore, "votes"), payload);
  },
  async updateVote(payload: IVote) {},
  async setVote(payload: IVote) {
    const { userVotes, allVotes } = await this.getUserVotes(payload.userId);
    const existingVote = userVotes?.find(vote => vote.trackId === payload.trackId);
    if (existingVote) {
      await this.updateVote(payload);
    } else {
      await this.addVote(payload);
    }
  },
};

export default FireStoreService;
