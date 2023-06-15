import React, { useReducer } from "react";
import "./AddArticle.css";
import { storage, db, auth } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 } from "uuid";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";


function AddArticle() {

  const [user] = useAuthState(auth);

  const navigate = useNavigate();

	//create array for categories
	const categories = ["Health", "Food", "Travel", "Technology"];

	//Create state for the user data, One state as an object
	const [formData, setFormData] = React.useState({
		title: "",
		summary: "",
		paragraph1: "",
		paragraph2: "",
		paragraph3: "",
		category: "",
		image: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("add", formData);
		//upload image to bucket storage
		//create reference for image
		const imageRef = ref(storage, `images/${formData.image.name + v4()}`);

		uploadBytes(imageRef, formData.image)
			.then((res) => {
				console.log(res.ref);
				//get the url from this ref
				getDownloadURL(res.ref)
					.then((url) => {
						console.log("url is", url);
						//have user data and url for image
						//add document to collection
						//create reference to collection
						const articleRef = collection(db, "articles");
						//use addDoc to add documents
						addDoc(articleRef, {
							title: formData.title,
							summary: formData.summary,
							paragraph1: formData.paragraph1,
							paragraph2: formData.paragraph2,
							paragraph3: formData.paragraph3,
							category: formData.category,
							image: formData.image,
              imageUrl: url,
              createBy: user.displayName,
              userId: user.uid,
              createdAt: Timestamp.now().toDate(),
						});
					})
					.catch((err) => console.log(err));
			})
      .then(res=>{
        // alert('article saved!')
		toast ("article saved", {
			type: "success", 
			autoClose: 1000
		})
		//pause before going to home page
		setTimeout(()=>{
			navigate("/")
		}, 1600)
      })
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<form className="add-article-form" onSubmit={handleSubmit}>
			<h2>Create Article</h2>
			<div className="input-group">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					placeholder="Maximum 100 characters"
					maxLength="100"
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="summary">Summary</label>
				<textarea
					id="summary"
					placeholder="Maximum 120 characters"
					maxLength="120"
					onChange={(e) =>
						setFormData({ ...formData, summary: e.target.value })
					}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="paragraphOne">Paragraph One</label>
				<textarea
					id="paragraphOne"
					placeholder="Maximum 650 characters"
					maxLength="650"
					onChange={(e) =>
						setFormData({ ...formData, paragraph1: e.target.value })
					}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="paragraphTwo">Paragraph Two</label>
				<textarea
					id="paragraphTwo"
					placeholder="Maximum 650 characters"
					maxLength="650"
					onChange={(e) =>
						setFormData({ ...formData, paragraph2: e.target.value })
					}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="paragraphThree">Paragraph Three</label>
				<textarea
					id="paragraphThree"
					placeholder="Maximum 650 characters"
					maxLength="650"
					onChange={(e) =>
						setFormData({ ...formData, paragraph3: e.target.value })
					}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="category">Category</label>
				<select
					id="category"
					onChange={(e) =>
						setFormData({ ...formData, category: e.target.value })
					}
				>
					<option value="">Select</option>
					{categories.map((item, index) => (
						<option key={index} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className="input-group">
				<label>Upload Image</label>
				<input
					type="file"
					name="image"
					accept="image/*"
					onChange={(e) =>
						setFormData({ ...formData, image: e.target.files[0] })
					}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

export default AddArticle;
