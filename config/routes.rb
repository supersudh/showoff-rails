Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :v1, defaults: { format: "json" } do
    get "widgets", to: "widgets#index"
    get "widgets/search", to: "widgets#search"
  end

  get "*page",
      to: "static#index", constraints: ->(req) do
        !req.xhr? && req.format.html?
      end

  root "static#index"
end
