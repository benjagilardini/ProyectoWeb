var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

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

    textorespuesta = document.getElementById('gettexto').value;
    var data = {
        texto: textorespuesta
    }
    var publicaciones = database.ref('publicaciones');
    database.ref('publicaciones').push(data);
    window.scrollBy(0,document.body.clientHeight*5);
    document.getElementById('gettexto').value = "";
}
function Actualizar(){
    var refpublicacion = firebase.database().ref("/publicaciones/");
    refpublicacion.on("child_added",snapshot =>{
        $('body').append('<div class="divBody">' + snapshot.val().texto + '<button class="btn waves-effect waves-light responder" onclick="responder();" type="submit" name="action">Responder <i class="material-icons right">send</i></button></p></div>');
   });
  
}
 $(document).ready(function (){
        Actualizar();
    });
