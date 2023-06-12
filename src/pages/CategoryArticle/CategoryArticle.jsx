import React from 'react'
import "./CategoryArticle.css"
import {useParams} from "react-router-dom"
import { db } from "../../config/firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import ArticleCard from '../../components/ArticleCard/ArticleCard';


function CategoryArticle() {

  

  //show articles from a certain category
  //what category? in the url

  const {categoryName} = useParams();

  //create state to hold articles
  const [articles, setArticles]  = React.useState([]);

  //get documents for this category when the pages loads
  React.useEffect(()=>{
    const articleRef = collection(db, "articles")

    const q = query(articleRef, where("category", "==", categoryName))

    getDocs(q, articleRef).then(res=>{
      const articles = res.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      console.log(articles)
      setArticles(articles)
    }).catch(err=>console.log(err))


  },[categoryName])

  return (
    <div className='category-articles'>
      {
        articles.map(item=>{
          return <ArticleCard article={item} key={item.id} />
      } )
    }
    {/* CategoryArticle {categoryName}  */}
    </div>
  )
}

export default CategoryArticle