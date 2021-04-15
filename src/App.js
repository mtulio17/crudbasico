import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Inicio from './components/Inicio';
import ListarProductos from './components/ListarProductos';
import AgregarProductos from './components/AgregarProductos';
import Navegacion from './components/common/Navegacion';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <Navegacion/>
      <Switch>
        <Route exact path='/'>
          <Inicio/>
        </Route>
        <Route exact path='/productos'>
          <ListarProductos/>
        </Route>
        <Route exact path='/productos/nuevo'>
          <AgregarProductos/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
