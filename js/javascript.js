var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

$(document).ready(function (){
    Actualizar();
});


function googleSignin() {
    firebase.auth()
        .signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token)
        console.log(user)
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
    });
}

function googleSignout() {
    firebase.auth().signOut()

        .then(function() {
        console.log('Signout Succesfull')
    }, function(error) {
        console.log('Signout Failed')  
    });
}

function publicar(){

    var key = firebase.database().ref().push().key;
    textorespuesta = document.getElementById('gettexto').value;

    var data = {
        key: key,
        texto: textorespuesta,
        resp: {test: "test"}
    }

    var updates = {};
    updates["/publicaciones/" + key] = data;

    firebase.database().ref().update(updates);

    window.scrollBy(0,document.body.clientHeight*5);
    document.getElementById('gettexto').value = "";
}

//Este metodo actualiza las entradas al foro

function Actualizar(){
    var refpublicacion = firebase.database().ref("publicaciones/");

    refpublicacion.on("value", snapshot => {

        $("#comments").empty();

        snapshot.forEach(snaps => {

            $('#comments').append('<div id="' + snaps.val().key + '" class="divBody">' + snaps.val().texto + '</div>');

        });

    });

}


function responder(key){
    
    console.log(key);

    contestar = document.getElementById('input_' + key).value;

    var key_novedades = firebase.database().ref().push().key;

    var data = {
        key: key_novedades,
        texto: contestar
    }

    var updates = {};
    updates["publicaciones/" + key + "/resp/" + key_novedades] = data;

    firebase.database().ref().update(updates);

}
