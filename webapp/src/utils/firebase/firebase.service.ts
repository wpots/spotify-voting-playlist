import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { fireStore, firebaseApp } from "@/utils/firebase/firebaseClient";
import type { Band, User, Vote } from "@firebase/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
  async getUsersById(ids: string[]) {},
  async getUserById(id: string) {
    return doc(fireStore, "users", id);
  },
  async isVerifiedUser(id: string) {
    return await this.getUserById(id);
  },
  async getBandById(id: string) {
    return doc(fireStore, "bands", id);
  },
  async setVote(payload: Partial<Vote>) {
    this.getUserId();
    // const voteRef = doc(fireStore, "votes", userId);
    // setDoc(voteRef, payload);
  },
};

export default FireStoreService;
