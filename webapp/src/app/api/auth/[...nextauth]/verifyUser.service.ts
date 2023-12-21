/**
 * Verify User against firestore database
 * create band collections in firestore and add users by spotify ID
 * create users collections and add band ID
 *
 */
const isVerifiedUser = async (email: string) => {
  try {
    const data = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
      method: "POST",
      body: JSON.stringify({
        query: `{
          memberCollection {
            items {
              eMail
            }
          }
        }`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    });
    const response = await data.json();
    const verifiedEmails = response.data.memberCollection.items.filter((i: any) => i.eMail).map((i: any) => i.eMail);
    return verifiedEmails.includes(email);
  } catch (error) {
    throw new Error("verifyUSer Service failed!");
  }
};
export { isVerifiedUser };
