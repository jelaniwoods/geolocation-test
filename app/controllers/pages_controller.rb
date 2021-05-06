class PagesController < ApplicationController
  skip_forgery_protection
  def home
  end
  
  def location
    session[:location] = location_params
    render json: { redirect_to: pages_result_path, notice: "Success" }
  end
  
  def result
  end

  def location_params
    params.require(:location).permit(:latitude, :longitude)
  end
end
