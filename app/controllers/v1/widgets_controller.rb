class V1::WidgetsController < ApplicationController
  def index
    render json: ShowoffApi.getWidgets["data"]
  end

  def search
    term = params[:term]
    render json: ShowoffApi.searchWidgets(term)["data"]
  end
end
