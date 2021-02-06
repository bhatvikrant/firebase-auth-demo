import Link from "next/link";

import { useRef, useState } from "react";

// BOOTSTRAP
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

// FIREBASE AUTH CONTEXT
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
	const emailRef = useRef();

	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const [loading, setLoading] = useState(false);

	const { resetPassword } = useAuth();

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instructions");
		} catch {
			setError("Failed to Reset Password");
		}
		setLoading(false);
	};

	return (
		<Container
			className="d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh" }}
		>
			<div className="w-100" style={{ maxWidth: "400px" }}>
				<Card>
					<Card.Body>
						<h2 className="text-center mb-4">Reset Password</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						{message && <Alert variant="success">{message}</Alert>}
						<Form>
							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>

							<Button
								type="submit"
								className="w-100"
								onClick={handleSubmit}
								disabled={loading}
							>
								Reset Password
							</Button>
						</Form>
						<div className="w-100 text-center mt-3">
							<Link href="/login">
								<a>Login</a>
							</Link>
						</div>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-2">
					Need an account?{" "}
					<Link href="/signup">
						<a>Sign Up</a>
					</Link>
				</div>
			</div>
		</Container>
	);
};

export default ForgotPassword;
