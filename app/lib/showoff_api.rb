module ShowoffApi
  def self.makeUrlForGet(path = "", queryParamString = "")
    url = "#{ENV["showoff_api_url"]}/#{path}?client_id=#{ENV["client_id"]}&client_secret=#{ENV["client_secret"]}#{queryParamString}"
    return url
  end

  def self.getWidgets
    url = self.makeUrlForGet("widgets/visible")
    widgets = RestClient.get(url, headers = {})
    return JSON.parse(widgets)
  end

  def self.searchWidgets(term)
    url = self.makeUrlForGet("widgets/visible", "&term=#{term}")
    widgets = RestClient.get(url, headers = {})
    return JSON.parse(widgets)
  end
end
