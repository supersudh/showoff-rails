class V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def findById
    authorizationHeader = request.headers["HTTP_AUTHORIZATION"]
    response = ShowoffApi.getUser(authorizationHeader, params[:id])
    render json: response
  end

  def me
    authorizationHeader = request.headers["HTTP_AUTHORIZATION"]
    response = ShowoffApi.currentUser(authorizationHeader)
    render json: response
  end

  def register
    createUserData = { :user => register_user_params }
    response = ShowoffApi.createUser(createUserData)
    render json: response
  end

  def login
    loginData = login_params
    response = ShowoffApi.loginUser(loginData)
    render json: response
  end

  def logout
    token = logout_params[:token]
    response = ShowoffApi.logout(token)
    render json: response
  end

  def change_password
    token = change_password_params[:token]
    data = {
      :user => {
        :current_password => change_password_params[:current_password],
        :new_password => change_password_params[:new_password],
      },
    }
    response = ShowoffApi.changePassword(token, data)
    render json: response
  end

  def reset_password
    data = {
      :user => {
        :email => reset_password_params[:email],
      },
    }
    response = ShowoffApi.reset_password(data)
    render json: response
  end

  def update
    token = update_user_params[:token]
    data = {
      :user => {
        :first_name => update_user_params[:first_name],
        :last_name => update_user_params[:last_name],
        :date_of_birth => update_user_params[:date_of_birth],
      },
    }
    response = ShowoffApi.updateUser(token, data)
    render json: response
  end

  def widgets
    userId = params[:id]
    response = ShowoffApi.getUserWidgets(userId)
    render json: response
  end

  def search_widgets
    userId = params[:id]
    term = params[:term]
    response = ShowoffApi.searchUserWidgets(userId, term)
    render json: response
  end

  private

  def register_user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :image_url)
  end

  def login_params
    params.require(:user).permit(:username, :password)
  end

  def logout_params
    params.require(:user).permit(:token)
  end

  def change_password_params
    params.require(:user).permit(:token, :current_password, :new_password)
  end

  def reset_password_params
    params.require(:user).permit(:email)
  end

  def update_user_params
    params.require(:user).permit(:first_name, :last_name, :date_of_birth, :image_url, :token)
  end
end
