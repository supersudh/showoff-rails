class V1::WidgetsController < ApplicationController
  def index
    render json: ShowoffApi.getWidgets
  end
end
