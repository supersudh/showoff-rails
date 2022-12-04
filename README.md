#  Tech Test: Ruby on Rails
[VIEW DEMO](https://showoff-supersudh.herokuapp.com/)

### This Project was developed using:
**ruby 2.7.0p0 (2019-12-25 revision 647ee6f091)**\
**Rails 5.2.4.1**\
**Bundler version 1.17.2**\
**Node version 12.14.1**\
**yarn version 1.22.0**

Also uses react.js, redux, redux-thunk, react-router-dom and other react libraries...

[VIEW DEMO](https://showoff-supersudh.herokuapp.com/)


## Installation
```bash
cd showoff-rails
bundle
rails webpacker:install:react
rails generate react:install
yarn
```

## Environment Secrets Configuration
```bash
touch config secret.yml
```
## Sample secret.yml file
```
client_id: "abcdclientid..."
client_secret: "abcdclientsec"
showoff_api_url: "https://secretproductionappinheroku.com"
```

## Development
```
rails server -p 3000
```

In a separate terminal tab, run the below command to boot up the webpack development server and automatic reload for changes in react code located at `app/javascript`
```
./bin/webpack-dev-server
```

Now visit http://localhost:3000 and view the app

## Details
This project makes use of the showoff heroku API.\
`app/showoff_api.rb` acts as the inferface between this rails API and showoff API

# Quick Demo 😊
### Registering a new user and creating a Widget
![Imgur Image](https://i.imgur.com/zRmVnFZ.gif)

### Searching for Widgets and editing current user's Widget
![Imgur Image](https://imgur.com/Po2b2FF.gif)

### Login and updating user profile
![Imgur Image](https://imgur.com/c1V9SWr.gif)

### My Linkedin
https://www.linkedin.com/in/sravik

## License
[MIT](https://choosealicense.com/licenses/mit/)
