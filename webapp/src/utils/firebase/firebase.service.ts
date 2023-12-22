import { collection, getDocs } from "firebase/firestore";
import { fireStore, firebaseApp } from "@/utils/firebase/firebaseClient";
type FireStoreUser = {
  id?: string;
  memberships?: string[];
};
const FireStoreService = {
  async getDocumentsByCollectionName(name: string) {
    const documentsSnapshot = await getDocs(collection(fireStore, name));
    if (documentsSnapshot) return documentsSnapshot.docs.map(doc => doc.data());
  },
  async getAllUsers() {
    return this.getDocumentsByCollectionName("users");
  },
  async getUsersById(ids: string[]) {},
  async getUserById(id: string) {
    const allUsers = await this.getAllUsers();
    return allUsers?.find(u => u.id === id);
  },
  async isVerifiedUser(id: string): Promise<FireStoreUser | undefined> {
    return await this.getUserById(id);
  },
  async getBandById(id: string) {
    const allBands = await this.getDocumentsByCollectionName("bands");
    return allBands?.find(b => b.id === id);
  },
};

export default FireStoreService;
