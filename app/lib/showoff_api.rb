module ShowoffApi
  def self.makeUrlForGet(path = "")
    url = "#{ENV["showoff_api_url"]}/#{path}?client_id=#{ENV["client_id"]}&client_secret=#{ENV["client_secret"]}"
    return url
  end

  def self.getWidgets
    url = self.makeUrlForGet("widgets/visible")
    widgets = RestClient.get(url, headers = {})
    return { :widgets => widgets }
  end
end
