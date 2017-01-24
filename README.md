# Uploader Client

## Running the Sample

Install the dependencies.

```bash
npm install
```

Rename `config.js.example` to `config.js` and replace the values for `DOMAIN`, `CLIENT_ID` with your Auth0 credentials. 
If you don't yet have an Auth0 account, [sign up](https://auth0.com/signuo) for free.

```bash
# copy configuration and replace with your own
cp config.js.example config.js
```

Run the app.

```bash
npm start
```

The app will be served at `localhost:8000`.

## Fichiers

-   src/utils : Contient tous les appels aux api
-   src/components/App.js : Vue principale, instancie Auth0Lock afin d’effectuer l'authentification.
-   src/components : Contient toutes les vues.
-   src/components/Header : Contient les boutons login/logout.

## Documentations

Pour plus d'information veulliez lire le readme du web service.

Cette application utilise reactjs + flux :

[flux-architecture](https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
