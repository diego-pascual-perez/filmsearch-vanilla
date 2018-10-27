function UserView() {
  const public = {
    presentView: function(user) {
      let content = '';
      if (!user) {
        content = `<div id="loginform">
          <input class="logininput" type="text" placeholder="Username" />
          <div class="loginbutton" id="loginbutton">Login</div>
        </div>`;
      } else {
        content = `<div id="loginform">
          <div class="loginhello">Hello, ${user}</div>
          <div class="loginbutton" id="logoutbutton">Logout</div>
        </div>`;
      }
      document.querySelector('#loginform').innerHTML = content;
    },
    addLoginHandler: function(handler) {
      $delegate(document.querySelector('#loginform'), '#loginbutton', 'click', function() {
        handler(document.querySelector('.logininput').value);
      });
    },
    addLoginWithEnterHandler: function(handler) {
      $delegate(document.querySelector('#loginform'), '.logininput', 'change', function() {
        handler(document.querySelector('.logininput').value);
      });
    },
    addLogoutHandler: function(handler) {
      $delegate(document.querySelector('#loginform'), '#logoutbutton', 'click', function() {
        handler();
      });
    }
  };
  return public;
}
