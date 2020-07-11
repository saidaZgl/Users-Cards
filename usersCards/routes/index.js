var express = require("express");
var router = express.Router();

var request = require("request");

//Bonus
//Tableau des images que l'on exploite dans la route "/".
var Profil = [
  "images/boy.svg",
  "images/girl.svg",
  "images/man-2.svg",
  "images/girl-3.svg",
  "images/man.svg",
  "images/girl-2.svg",
  "images/boss.svg",
  "images/man-2.svg",
  "images/girl-3.svg",
  "images/man.svg",
];

router.get("/", function (req, res, next) {
  //Requête qui utilise le module request que l'on a installé a qui on précise l'adresse de l'API de jsonplaceholder
  //auquel on ajoute "/users" qui nous renvoient par défaut les informations de 10 user
  request("https://jsonplaceholder.typicode.com/users", function (
    error,
    response,
    body
  ) {
    //Passage obligatoire le "JSON.parse()" qui va nous servire à transformer les informations reçues sous
    //forme de chaine de caractère en format JSON pour que nous puissions exploiter ces donnés sur notre page.
    //on va "parser" body et non pas response car response n'est pas la valeur retourné par l'API mais simplement le status de la requête.
    var users = JSON.parse(body);

    //Bonus
    //On boucle sur tous les users reçus de la requête pour chaque objet on ajoute une nouvelle valeur
    //avec la clef "images" et pour valeur "Profil[i]" donc chaque image une à une du tableau Profil.
    for (var i = 0; i < users.length; i++) {
      users[i].images = Profil[i];
    }

    //Envoyer les informations reçus de jsonplaceholder à votre page après les avoir convertis en JSON.
    res.render("index", { users });
  });
});

router.get("/posts", function (req, res, next) {
  //Idem que pour les "users" sauf que la documentation de jsonplaceholder nous précise que la requête des "posts" par user
  //nécessite un id, id que nous envoyons depuis notre page à cette route par le biais du lien "/posts?id=<%=i+1%>".
  //Donc nous allons récupérer la valeur du front par la commande "req.query.id" que nous intégrons directement à notre requête.
  //En respectant la documentation qui nous précise que l'id doit être dans "userId"

  //"posts?userId="+req.query.id"
  //ce qui donne "posts?userId=1"
  request(
    "https://jsonplaceholder.typicode.com/posts?userId=" + req.query.id,
    function (error, response, body) {
      //On parse la valeur retournée par la requête qui est toujours "body" et nous deverssons le résultat dans la
      //variable "posts" que nous envoyons à notre page
      var posts = JSON.parse(body);
      res.render("posts", { posts });
    }
  );
});

router.get("/comments", function (req, res, next) {
  //Même logique que pour la route posts, nous envoyons depuis la page posts l'id du posts que nous récuperons
  //et que nous envoyons dans la requête pour chercher les commentaires de ce "posts" en respectant la documentation
  //qui nécéssite "postId".
  request(
    "https://jsonplaceholder.typicode.com/comments?postId=" + req.query.id,
    function (error, response, body) {
      //On parse le résultat et on renvoi les informations a la page.
      var comments = JSON.parse(body);
      res.render("comments", { comments });
    }
  );
});

module.exports = router;
