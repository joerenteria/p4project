Rails.application.routes.draw do

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  delete "/recipes/:id", to: "recipes#destroy"
  get "/recipes", to: "recipes#index"
  get "/recipes", to: "recipes#show"
  post "/recipes", to: "recipes#create"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
