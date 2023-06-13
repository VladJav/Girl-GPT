# Girl-GPT

GirlGPT is a web application for chatting with an AI girl. I made it for fun and to gain knowledge.

## Installation

Clone the project and open root directory
```sh
cd client
npm install
```
```sh
cd server
npm install
```
Then you need to create .env file in root directory and fill it in like this:
```dosini
PORT=8000
MONGO_URI=mongodb+srv://example:<password>@nodeexpressprojects.2xinpdk.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=secretJWTC
JWT_REFRESH_SECRET=refreshJWT
SENDGRID_API_KEY= # https://app.sendgrid.com/settings/api_keys
NODEMAILER_SENDER_EMAIL= # your sender email
OPENAI_API_KEY= # get your api key https://platform.openai.com/account/api-keys
CLIENT_URL=http://localhost:3000
```
Now you can run client and server
```sh
cd server
npm start
cd ../client
npm start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
