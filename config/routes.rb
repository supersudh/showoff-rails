Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :v1, defaults: { format: "json" } do
    get "widgets", to: "widgets#index"
    get "widgets/search", to: "widgets#search"
    post "widgets", to: "widgets#create"
    put "widgets/:id", to: "widgets#update"
    delete "widgets/:id", to: "widgets#destroy"

    post "users", to: "users#register"
    get "users/me", to: "users#me"
    get "users/:id", to: "users#findById"
    post "users/login", to: "users#login"
    post "users/logout", to: "users#logout"
    post "users/change_password", to: "users#change_password"
    post "users/reset_password", to: "users#reset_password"
    post "users/update", to: "users#update"
    # users/widgets routes
    get "users/:id/widgets", to: "users#widgets"
    get "users/:id/widgets/search/:term", to: "users#search_widgets"
  end

  get "*page",
      to: "static#index", constraints: ->(req) do
        !req.xhr? && req.format.html?
      end

  root "static#index"
end
