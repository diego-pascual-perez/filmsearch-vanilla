function UserPresenter(_user, _model) {
  let login;
  let user;
  let model;
  function init() {
    user = _user;
    model = _model;
  }

  const public = {
    presentView: () => {
      let userlogged = model.getUser();
      user.presentView(userlogged);
      user.addLoginHandler((user) => {
        model.saveUser(user);
        public.presentView();
     });
     user.addLogoutHandler(() => {
         model.saveUser(null);
         public.presentView();
      });
      user.addLoginWithEnterHandler((user) => {
        model.saveUser(user);
        public.presentView();
     });
    }
  };

  init();
  return public;
}
