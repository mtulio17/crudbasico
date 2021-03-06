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
import {useState, useEffect} from 'react';
import EditarProducto from './components/EditarProducto';
import Error404 from './components/Error404';


function App() {
  const [productos, setProductos] = useState([]);
  const URL = process.env.REACT_APP_API_URL
  useEffect(()=>{
    //llamar a la API
consultarAPI();
  }, []);
  const  consultarAPI = async () =>{
    try{
      const respuesta = await fetch(URL);
      const informacion = await respuesta.json();
      console.log(informacion);
      if (respuesta.status === 200){
        setProductos(informacion)
      }
    }catch(error){
      console.log(error);
      //mostrar un cartel

    }

  }


  return (
    <Router>
      <Navegacion/>
      <Switch>
        <Route exact path='/'>
          <Inicio/>
        </Route>
        <Route exact path='/productos'>
          <ListarProductos productos={productos} consultarAPI={consultarAPI}/>
        </Route>
        <Route exact path='/productos/nuevo'>
          <AgregarProductos consultarAPI={consultarAPI}/>
        </Route>
        <Route exact path='/productos/editar/:id'>
          <EditarProducto consultarAPI={consultarAPI}/>
        </Route>
        <Route path='*'>
          <Error404/>
        </Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
// Agregar produco editar maquetado igual al de agregar producto.
// pegar el footer abajo y poner en paginas
// cortas