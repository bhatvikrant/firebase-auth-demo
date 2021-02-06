// BOOTSTRAP CSS
import "bootstrap/dist/css/bootstrap.min.css";

// FIREBASE AUTH PROVIDER
import AuthProvider from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
