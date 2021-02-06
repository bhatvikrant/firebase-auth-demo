// TODO: configure this page as a private route
import Link from "next/link";
import { useRouter } from "next/router";

import { useRef, useState } from "react";

// BOOTSTRAP
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

// FIREBASE AUTH CONTEXT
import { useAuth } from "../context/AuthContext";

const UpdateProfile = () => {
	const router = useRouter();

	const { currentUser, updateEmail, updatePassword } = useAuth();

	if (!currentUser) {
		router.push("/login");
	}
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passowrds do not match");
		}

		const promises = [];
		setError("");
		setLoading(true);

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(email.curreny.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				router.push("/");
			})
			.catch(() => {
				setError("Failed to Update account");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Card>
					<Card.Body>
						<h2 className="text-center mb-4">Update Profile</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form>
							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									ref={emailRef}
									required
									defaultValue={currentUser.email}
								/>
							</Form.Group>
							<Form.Group id="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									ref={passwordRef}
									placeholder="Leave blank to keep the same"
								/>
							</Form.Group>
							<Form.Group id="password-confirm">
								<Form.Label>Password Confirmation</Form.Label>
								<Form.Control
									type="password"
									ref={passwordConfirmRef}
									placeholder="Leave blank to keep the same"
								/>
							</Form.Group>

							<Button
								type="submit"
								className="w-100"
								onClick={handleSubmit}
								disabled={loading}
							>
								Update
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-2">
					<Link href="/">
						<a>Cancel</a>
					</Link>
				</div>
			</div>
		</Container>
	);
};

export default UpdateProfile;
