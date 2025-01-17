import React from "react";
import Router from "next/router";

const login = "/login?redirected=true"; // Define your login route address.

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */
const checkUserAuthentication = () => {
	return { auth: null }; // change null to { isAdmin: true } for testing it.
};

const withPrivateRoute = WrappedComponent => {
	const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

	hocComponent.getInitialProps = async context => {
		const userAuth = await checkUserAuthentication();

		// Are you an authorized user or not?
		if (!userAuth?.auth) {
			// Handle server-side and client-side rendering.
			if (context.res) {
				console.log("mmm");
				context.res?.writeHead(302, {
					Location: login,
				});
				context.res?.end();
			} else {
				console.log("ppp");
				Router.replace(login);
			}
		} else if (WrappedComponent.getInitialProps) {
			const wrappedProps = await WrappedComponent.getInitialProps({
				...context,
				auth: userAuth,
			});
			return { ...wrappedProps, userAuth };
		}

		return { userAuth };
	};

	return hocComponent;
};

export default withPrivateRoute;
