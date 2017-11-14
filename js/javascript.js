var provider = new firebase.auth.GoogleAuthProvider();
var datbase = firebase.datbase();

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
}