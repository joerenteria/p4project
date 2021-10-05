class RecipesController < ApplicationController
    before_action :authorize

    def index
        render json: Recipe.all
    end
    def show
        recipe = current_user.recipes.find_by(id: params[:id])
        render json: recipe
    end
    def create
        recipe = @current_user.recipes.create!(recipe_params)
        render json: recipe, status: :created
    end
    def destroy
        recipe = @current_user.recipes.find_by(id: params[:id])
        #byebug
        if recipe         
        #byebug
        recipe.destroy
        render json: recipe
        #head :no_content
        else
        render json: {error: "Not Authorized"}
        end
    end
    private
    def recipe_params
        params.permit(:title,:instructions,:minutes_to_complete)
    end
end
