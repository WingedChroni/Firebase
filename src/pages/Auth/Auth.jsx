import { useState } from "react";
import "./Auth.css";
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from './../../config/firebaseConfig';
import { useNavigate } from "react-router-dom";


function Auth() {
    //active navigate
    const navigate = useNavigate();

	//create state to determine which form

	const [existingUser, setExistingUser] = useState(false);

    //create state for user inputs
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    //create function for signup
    const handleSignup = (e)=> {
        e.preventDefault();
        console.log("signup")
        //create user with firebase
        createUserWithEmailAndPassword (auth,email,password)
        .then(res=>{
            console.log(res)
            //add name as displyName
            updateProfile(auth.currentUser, {displayName: name})
            //redirect to homepage
            navigate("/");

        })
        .catch(err=>alert(err))
    }

    const handleLogin=(e)=>{
        e.preventDefault
        console.log("logged in");

        //sigm in with firebase
        signInWithEmailAndPassword(auth, email, password).then(res=>{
            console.log(res)
            //navigate to homepage
            navigate("/");
        }).catch(err=>alert(err))
    }

	return (
		<div className="auth-container" onSubmit = {handleSignup}>
			Auth
			{existingUser ? (
				<form className="auth-form">
					<h1>Login with your email</h1>
					<div className="form-group">
						<input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" required />
						<input type="password"  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required />
					</div>
					<button type="submit">Login</button>
					<p>
						Don't have an account? <span className="form-link" onClick={()=>setExistingUser(false)}>Signup</span>
					</p>
				</form>
			) : (
				<form className="auth-form" onSubmit={handleLogin}>
					<h1>Sign up with your email</h1>
					<div className="form-group">
						<input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" required />
						<input type="email" onChange={(e)=>setEmail(e.target.value)}placeholder="Enter your email" required />
						<input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required />
					</div>
					<button type="submit">Register</button>
					<p>
						Already have an account? <span className="form-link" onClick={()=>setExistingUser(true)}>Login</span>
					</p>
				</form>
			)}
		</div>
	);
}

export default Auth;
