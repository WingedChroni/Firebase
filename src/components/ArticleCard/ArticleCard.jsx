// import React from 'react'
import "./ArticleCard.css"
import { Link } from 'react-router-dom'


function ArticleCard({article}) {
    console.log("this is ")
    console.log(article)
  return (
    <div className ="article-card">

        <img src={article?.imageUrl} alt="" />
        <div className="article-card-info">
            <p>{article?.title}</p>
            <Link>Read</Link>
        </div>

        
    </div>
  )
}

export default ArticleCard