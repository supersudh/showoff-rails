class V1::WidgetsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: ShowoffApi.getWidgets["data"]
  end

  def search
    term = params[:term]
    render json: ShowoffApi.searchWidgets(term)["data"]
  end

  def create
    authorizationHeader = request.headers["HTTP_AUTHORIZATION"]
    data = { :widget => create_params }
    render json: ShowoffApi.createWidget(authorizationHeader, data)
  end

  def update
    authorizationHeader = request.headers["HTTP_AUTHORIZATION"]
    data = { :widget => update_params }
    render json: ShowoffApi.updateWidget(authorizationHeader, params[:id], data)
  end

  def destroy
    authorizationHeader = request.headers["HTTP_AUTHORIZATION"]
    render json: ShowoffApi.deleteWidget(authorizationHeader, params[:id])
  end

  private

  def create_params
    params.require(:widget).permit(:name, :description, :kind)
  end

  def update_params
    params.require(:widget).permit(:name, :description)
  end
end
