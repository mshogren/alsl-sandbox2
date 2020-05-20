import { preloadUser, preloadAuth, preloadFirestore } from 'reactfire';

export const preloadSDKs = (firebaseApp) => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence();
      },
    }),
    preloadAuth({ firebaseApp }),
  ]);
};

export const preloadData = async (firebaseApp) => {
  const user = await preloadUser(firebaseApp);

  if (user) {
    // preloadFirestoreDoc(firestore => firestore.doc('count/counter'), firebaseApp);
  }
};
