const express = require ('express') ;
const app = express() ;
const port = 8080;


app.get('/', (red, res) => {
    song= ["A Baby Just Like You", "A Cottage For Sale", "A Day In The Life Of A Fool", "A Fella With An Umbrella", "A Fellow Needs A Girl", "A Fine Romance", "A Foggy Day", "A Friend Of Yours", "A Garden In The Rain", "A Ghost Of A Chance", "A Good Man Is Hard To Find", "A Hundred Years From Today", "A Little Learning Is A Dangerous Thing",  "A Long Night", "A Lovely Way To Spend An Evening", "A Man Alone", "A Man Alone (Reprise)", "A Million Dreams Ago", "A Nightingale Sang In Berkeley Square", "A Sinner Kissed An Angel"]
    graouuh = Math.floor(Math.random() * 21);
    res.send(song[graouuh])
});

app.get('/birth_date', (req, res) => {
    res.send("December 12, 1915"); 
});

app.get('/birth_city', (req, res) => {
    res.send("Hoboken, New Jersey, U.S");
});

app.get('/wives', (req, res) => {
    res.send("Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx");

});

app.get('/picture', (req, res) => {
    res.send("(https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg)");
});

app.get('/public', (req, res) => {
    res.send("Everybody can see this page");
});

// Middleware pour protéger la route "/protected" avec une authentification Basic
app.use("/protected", (req, res, next) => {
    // Identifiants requis
        const auth = {
          login: 'admin',
          password: 'admin'
        };
    
        const [, b64auth = ''] = (req.headers.authorization || '').split(' ');
    
        // Décodage de l'identifiant et du mot de passe
        const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':', 2);
    
        // Vérification des identifiants
        if (login && password && login === auth.login && password === auth.password) {
        // Authentification réussie
            res.send("Welcome, authenticated client");
            return next();  // Passe au middleware suivant
        }
    
        // Échec de l'authentification : demande d'identifiants
        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('401 Not authorized');
    });
    
    // Lancement du serveur sur le port défini
    app.listen(port, '0.0.0.0', () => {
        console.log("Serveur lancé :  " + port);
    });