HEROKU
 
```
Commands:

$ heroku

$ heroku open - open in browser
$ heroku restart - restart the server
```



To deploy your app to Heroku:
// git push [remote server] [branch]

git status
git add .
git commit -m 'Message'
git push heroku master // heroku - alias name of remoute server



NPM Concurrently that's going to help us run two separate servers with a single command.
```
    "client": "npm run start --prefix client"
     // preffix says us watch in the client directory
```


// localtunnel server always down, use ngrok
$ ngrok http 5000

You will see data in terminal where ngrok will generate random subdomain.
When you visit that url, you will be forwarded to your localhost
Forwarding https://47c2263f.ngrok.io -> localhost:5000
Each time you start ngrok, you will get url with random subdomain.
So I suggest that you just start it once 
and let it run while you are working with your server API locally.