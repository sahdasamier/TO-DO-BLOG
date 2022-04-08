import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const {id} =useParams ();
    const { data: blog, error, isPandig } = useFetch('http://localhost:8000/blogs/'+ id);
   const history =useHistory();

    const handlClick=()=>{
        fetch('http://localhost:8000/blogs/'+ blog.id ,{
            method:'DELETE'
        }).then(() =>{
          history.push('/')

        })
    }
    return(
        <div className="blog-details">
           {isPandig && <div>loading...</div>}
           {error && <div>{ error }</div>}
           {blog &&(
           <article>
               <h2>{ blog.title }</h2>
               <p>written by { blog.author }</p>
               <div>{ blog.body }</div>
               <button onClick={handlClick}>delete</button>
           </article>
          )}
        </div>
    );
    }
    export default BlogDetails;