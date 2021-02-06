import Link from "next/link";
import { useRouter } from "next/router";

import { useRef, useState } from "react";

// BOOTSTRAP
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

// FIREBASE AUTH CONTEXT
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const router = useRouter();

	const emailRef = useRef();
	const passwordRef = useRef();

	const [error, setError] = useState("");

	const [loading, setLoading] = useState(false);

	const { login } = useAuth();

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			router.push("/");
		} catch {
			setError("Failed to Sign In");
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
						<h2 className="text-center mb-4">Log In</h2>
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

							<Button
								type="submit"
								className="w-100"
								onClick={handleSubmit}
								disabled={loading}
							>
								Log In
							</Button>
						</Form>
						<div className="w-100 text-center mt-3">
							<Link href="/forgot-password">
								<a>Forgot Password?</a>
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

export default Login;
