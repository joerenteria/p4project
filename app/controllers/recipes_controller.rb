class RecipesController < ApplicationController
    before_action :authorize

    def index
        render json: Recipe.all
    end
    def show
        recipe = Recipe.find_by(id: params[:id])
        render json: recipe
    end
    def create
        recipe = @current_user.recipes.create!(recipe_params)
        render json: recipe, status: :created
    end
    def destroy
        recipe = @current_user.recipes.find_by(id: params[:id])
        if recipe         
        recipe.destroy
        render json: recipe
        #head :no_content
        else
        render json: {error: "Not Authorized"}
        end
    end

    def update
        recipe = @current_user.recipes.update(recipe_params)
        if recipe
            recipe.save
        else
            render json: {error: "Ouch"}
        end
    end



    # def update
    #     recipe = @current_user.recipes.find_by(id: params[:id])
    #     if recipe
    #         recipe.update(recipe_params)
    #     else
    #         render json: {error: "Ouch"}
    #     end
    # end

    # def update
    #     recipe = @current_user.recipes.find_by(id: params[:id])
    #    recipe.minutes_to_complete=(recipe.minutes_to_complete + 3)
    # end

    private
    def recipe_params
        params.permit(:title,:instructions,:minutes_to_complete)
    end
end
