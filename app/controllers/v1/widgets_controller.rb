class V1::WidgetsController < ApplicationController
  def index
    render json: { :widgets => [
      {
        :name => "some-thing",
        :guid => "01d23rf2r2r-2f23f-23df-2-3-df23d23d",
      },
    ] }
  end
end
