import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/NavbarComponent'
import { Home, Sukses, Admin, ListPesanan, Tambah_menu, Edit_Menu, LoginPage } from './pages'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = /* Cek apakah pengguna telah melakukan autentikasi */ false;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/sukses" component={Sukses} exact />
            <Route path="/admin" component={Admin}exact />
            <Route path="/list-pesanan" component={ListPesanan}exact />
            <Route path="/tambah-menu" component={Tambah_menu}exact />
            <Route path="/edit-menu" component={Edit_Menu}exact />
            <Route path="/login" component={LoginPage}exact />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
};
