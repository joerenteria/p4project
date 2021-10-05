import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

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



  return (
    <Wrapper>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <Recipe key={recipe.id}>
            <Box>
              <h2>{recipe.title}</h2>
              <p>
                <em>Rating: {recipe.minutesToComplete} minutes</em>
                &nbsp;·&nbsp;
                <cite>By {recipe.user.username}</cite>
              </p>
              <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
              <Button onClick={() => handleDelete(recipe.id)}>Delete</Button>
            </Box>
          </Recipe>
        ))
      ) : (
        <>
          <h2>None Found</h2>
          <Button as={Link} to="/new">
            Make new
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Recipe = styled.article`
  margin-bottom: 24px;
`;

export default RecipeList;
