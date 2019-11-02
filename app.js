var keycloak = new Keycloak();

window.onload = function () {

  keycloak.init({onLoad: 'check-sso', checkLoginIframe: true, checkLoginIframeInterval: 1})
    .success(function () {
      if (keycloak.authenticated) {
        showProfile();
      } else {
        welcome();
      }

      document.body.style.display = 'block';
    });

    keycloak.onTokenExpired = () => {
      keycloak.logout();
    console.log('Token Expired');
    };
};

function welcome() {
  show('welcome');
}

function showProfile() {

  if (keycloak.tokenParsed['preferred_username']) {
    document.getElementById('username').innerHTML = keycloak.tokenParsed['preferred_username'];
  }
  if (keycloak.tokenParsed['email']) {
    document.getElementById('email').innerHTML = keycloak.tokenParsed['email'];
  }
  if (keycloak.token) {
    document.getElementById('access_token').innerHTML = keycloak.token;
  }
  if (keycloak.refreshToken) {
    document.getElementById('refresh_token').innerHTML = keycloak.refreshToken;  
  }

  show('profile');
}

function show(id) {
  document.getElementById('welcome').style.display = 'none';
  document.getElementById(id).style.display = 'block';
}

keycloak.onAuthLogout = welcome;
