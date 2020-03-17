module ShowoffApi
  def self.makeUrlForGet(path = "", queryParamString = "")
    url = "#{ENV["showoff_api_url"]}/#{path}?client_id=#{ENV["client_id"]}&client_secret=#{ENV["client_secret"]}#{queryParamString}"
    return url
  end

  def self.makeDataForPost(path = "")
    url = "#{ENV["showoff_api_url"]}/#{path}"
    spreadBody = { :client_id => ENV["client_id"], :client_secret => ENV["client_secret"] }
    headers = { "Content-Type": "application/json" }
    return { :url => url, :spreadBody => spreadBody, :headers => headers }
  end

  def self.getWidgets
    url = self.makeUrlForGet("api/v1/widgets/visible")
    widgets = RestClient.get(url, headers = {})
    return JSON.parse(widgets)
  end

  def self.searchWidgets(term = "")
    url = self.makeUrlForGet("api/v1/widgets/visible", "&term=#{term}")
    widgets = RestClient.get(url, headers = {})
    return JSON.parse(widgets)
  end

  # User Authentication API methods
  def self.createUser(createUserData = {})
    configData = self.makeDataForPost("api/v1/users")
    body = { **configData[:spreadBody], **createUserData }
    RestClient.post(configData[:url], body.to_json, configData[:headers]) { |response, request, result| return response }
  end

  def self.loginUser(loginData = {})
    configData = self.makeDataForPost("oauth/token")
    body = { **configData[:spreadBody], **loginData, :grant_type => "password" }
    RestClient.post(configData[:url], body.to_json, configData[:headers]) { |response, request, result| return response }
  end

  def self.logout(token = "")
    configData = self.makeDataForPost("oauth/revoke")
    body = { :token => token }
    headers = { **configData[:headers], "Authorization": "Bearer #{token}" }
    RestClient.post(configData[:url], body.to_json, headers) { |response, request, result| return response }
  end

  def self.changePassword(token = "", data = {})
    configData = self.makeDataForPost("api/v1/users/me/password")
    body = data
    headers = { **configData[:headers], "Authorization": "Bearer #{token}" }
    RestClient.post(configData[:url], body.to_json, headers) { |response, request, result| return response }
  end

  def self.reset_password(data = {})
    configData = self.makeDataForPost("api/v1/users/reset_password")
    body = { **configData[:spreadBody], **data }
    RestClient.post(configData[:url], body.to_json, configData[:headers]) { |response, request, result| return response }
  end

  def self.updateUser(token = "", updateData = {})
    configData = self.makeDataForPost("api/v1/users/me")
    body = updateData
    headers = { **configData[:headers], "Authorization": "Bearer #{token}" }
    RestClient.put(configData[:url], body.to_json, headers) { |response, request, result| return response }
  end

  def self.currentUser(authorizationHeader = "")
    url = self.makeUrlForGet("api/v1/users/me")
    headers = { "Authorization": authorizationHeader }
    RestClient.get(url, headers) { |response, request, result| return response }
  end

  def self.getUser(authorizationHeader = "", id = "")
    url = self.makeUrlForGet("api/v1/users/#{id}")
    headers = { "Authorization": authorizationHeader }
    RestClient.get(url, headers) { |response, request, result| return response }
  end

  # Users Widget API methods
  def self.getUserWidgets(userId = "")
    url = self.makeUrlForGet("api/v1/users/#{userId}/widgets")
    userWidgets = RestClient.get(url, headers = {}) { |response, request, result| return response }
  end

  def self.searchUserWidgets(userId = "", term = "")
    url = self.makeUrlForGet("api/v1/users/#{userId}/widgets", "&term=#{term}")
    puts url
    userWidgets = RestClient.get(url, headers = {}) { |response, request, result| return response }
  end

  # Widget CRUD API methods
  def self.createWidget(authorizationHeader = "", data = {})
    configData = self.makeDataForPost("api/v1/widgets")
    headers = { **configData[:headers], "Authorization": authorizationHeader }
    body = data
    RestClient.post(configData[:url], body.to_json, headers) { |response, request, result| return response }
  end

  def self.updateWidget(authorizationHeader = "", id = "", data = {})
    configData = self.makeDataForPost("api/v1/widgets/#{id}")
    headers = { **configData[:headers], "Authorization": authorizationHeader }
    body = data
    RestClient.put(configData[:url], body.to_json, headers) { |response, request, result| return response }
  end

  def self.deleteWidget(authorizationHeader = "", id = "")
    url = "#{ENV["showoff_api_url"]}/api/v1/widgets/#{id}"
    headers = { "Content-Type": "application/json", "Authorization": authorizationHeader }
    RestClient.delete(url, headers) { |response, request, result| return response }
  end
end
