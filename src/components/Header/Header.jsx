// import React from "react";
import { FaHome } from "react-icons/fa";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Header() {
	const navigate = useNavigate();
	//get user data
	const [user] = useAuthState(auth);

	console.log(user);

	//create array for categories
	const categories = ["Health", "Food", "Travel", "Technology"];

	return (
		<div className="header-container">
			<FaHome className="home-icon" onClick={() => navigate("/")} />
            {
                user?
                <Link to="/addArticle" className="auth-link">Add Article</Link>
                :
                null
            }
			<div className="categories-container">
				{categories.map((item, index) => (
					<Link to={`/category/${item}`} className="nav-link" key={index}>
						{item}
					</Link>
				))}
			</div>
			{user ? (
				<div>
					<span className="username">{user.displayName}</span>
					<button className="auth-link" onClick={() => signOut(auth)}>
						Log out
					</button>
				</div>
			) : (
				<Link className="auth-link" to="/auth">
					Sign Up
				</Link>
			)}
		</div>
	);
}

export default Header;
