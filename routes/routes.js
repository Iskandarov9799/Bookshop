const HomeRoute = require("./HomeRoute")
const Login = require("./Login")
const Register = require("./Register")
const Admin = require("./Admin") 

module.exports = (server) => {
   server.use(HomeRoute.path, HomeRoute.router)
   server.use(Login.path, Login.router) 
   server.use(Register.path, Register.router)
   server.use(Admin.path, Admin.router)

   server.use((req, res) => {
       res.render("error")
   })

}