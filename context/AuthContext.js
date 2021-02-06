import { useContext, createContext, useState, useEffect } from "react";

import { auth } from "../utils/firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	const signup = (email, password) =>
		auth.createUserWithEmailAndPassword(email, password);

	const login = (email, password) =>
		auth.signInWithEmailAndPassword(email, password);

	const logout = () => auth.signOut();

	const resetPassword = email => auth.sendPasswordResetEmail(email);
	const updateEmail = email => currentUser.updateEmail(email);
	const updatePassword = password => currentUser.updatePassword(password);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
