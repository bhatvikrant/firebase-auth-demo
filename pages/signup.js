import Link from "next/link";
import { useRouter } from "next/router";

import { useRef, useState } from "react";

// BOOTSTRAP
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

// FIREBASE AUTH CONTEXT
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
	const router = useRouter();

	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);

	const { signup } = useAuth();

	const handleSubmit = async e => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passowrds do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			router.push("/");
		} catch {
			setError("Failed to create an account");
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
						<h2 className="text-center mb-4">Sign Up</h2>
						{error && <Alert variant="danger">{error}</Alert>}
						<Form>
							<Form.Group id="email">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" ref={emailRef} required />
							</Form.Group>
							<Form.Group id="password">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" ref={passwordRef} required />
							</Form.Group>
							<Form.Group id="password-confirm">
								<Form.Label>Password Confirmation</Form.Label>
								<Form.Control
									type="password"
									ref={passwordConfirmRef}
									required
								/>
							</Form.Group>

							<Button
								type="submit"
								className="w-100"
								onClick={handleSubmit}
								disabled={loading}
							>
								Sign Up
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-2">
					Already have an account?{" "}
					<Link href="/login">
						<a>Log In</a>
					</Link>
				</div>
			</div>
		</Container>
	);
};

export default SignUp;
