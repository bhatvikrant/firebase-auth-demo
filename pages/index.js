// TODO: configure this page as a private route

import Link from "next/link";
import { useRouter } from "next/router";

import { useState } from "react";
// BOOTSTRAP
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

// FIREBASE AUTH CONTEXT
import { useAuth } from "../context/AuthContext";

// HOCs
// import withPrivateRoute from "../hooks/withPrivateRoute";

const Home = () => {
	const router = useRouter();

	const [error, setError] = useState("");

	const { currentUser, logout } = useAuth();

	if (!currentUser) {
		router.push("/login");
	}

	const handleLogout = async () => {
		setError("");
		try {
			await logout();
			router.push("/login");
		} catch {
			setError("Failed to Logout");
		}
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Profile</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					Email: <strong>{currentUser?.email}</strong>
					<Link href="/update-profile">
						<a className="btn btn-primary w-100 mt-3">Update profile</a>
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</>
	);
};
export default Home;
// export default withPrivateRoute(Home);
