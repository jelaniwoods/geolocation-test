Rails.application.routes.draw do
  root 'pages#home'
  get 'pages/home'
  post 'pages/location'
  get 'pages/result'
  # patch 'pages/location'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
