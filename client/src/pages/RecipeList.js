import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";


function RecipeList({user}) {
  const [recipes, setRecipes] = useState([]);
  

  useEffect(() => {
    fetch("/recipes")
      .then((r) => r.json())
      .then(setRecipes);
  }, []);

  function handleDelete(id) {
    fetch(`/recipes/${id}`, {
      method: "DELETE",
    }).then(console.log("delete"));
  }

  function handleUpdate(id) {
    fetch(`/recipes/:${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ minutes_to_complete: 8 }),
    })
      .then((r) => r.json())
      .then(console.log("update"));

  }



  return (
    <div>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <div>
              <h2>{recipe.title}</h2>
              <p>
                <em>Rating: {recipe.minutes_to_complete} </em>
                &nbsp;·&nbsp;
                <cite>By {recipe.user.username}</cite>
              </p>
              <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>
              <button onClick={() => handleUpdate(recipe.id)}>Update</button>
            </div>
          </div>
        ))
      ) : (
        <>
          <h2>None Found</h2>
          <button as={Link} to="/new">
            Make new
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeList;
