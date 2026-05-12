//middleware de autenticação
//next -> chama quando a gente quer dar continuidade na autenticação
function Auth(req, res, next) {
  //verifica se existe uma função para o uusário
  if (req.session.usuario != undefined) {
    //permite o procedimento
    next();
    //se não existir a sessão, renderiza a página de login para o usuário
  } else {
    res.render("index");
  }
}

export default Auth;