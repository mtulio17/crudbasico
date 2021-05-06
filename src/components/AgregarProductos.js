import React, { useState } from 'react';
import { Container, Form, Button, Alert} from 'react-bootstrap';
import Swal from 'sweetalert2';


const AgregarProductos = (props) => {
    const URL = process.env.REACT_APP_API_URL;
    const [nombreProducto, setNombreProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState(false);

    const cambioCategoria = (e) => {
        setCategoria(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        //validacion
        if (nombreProducto.trim() === "" || precioProducto <= 0 || categoria === "") {
            //validacion falla, entonces mostrar un cartel de error
            setError(true)
        } else {
            //si esta bien, agregar a la api
          setError(false)

          //crear el objeto para enviar a la API
          //ambas formas es lo mismo.podemos hacerlo ya que el nombre de la clave es igual al nombre del valor
        //   const producto = {
        //     nombreProducto: nombreProducto,
        //     precioProducto: precioProducto,
        //     categoria: categoria
        //   }
        const producto = {
            nombreProducto,
            precioProducto,
            categoria
          }
          console.log(producto);
          //enviar el request o POST
          try{
              //codigo Normal
              const configuracion = {
                  method: "POST", 
                  headers: {
                    "Content-Type":"application/json"
                  }, 
                  body: JSON.stringify(producto)
              }

              const respuesta = await fetch(URL, configuracion)
              console.log(respuesta);
              if (respuesta.status === 201){
                  //mostrar cartel
                  Swal.fire(
                    'Producto creado',
                    'Producto ingresado correctamente',
                    'success'
                  )
                  props.consultarAPI();

              }

          }catch(error){
              console.log(error);
          }

        }

    };


    return (

        <Container>
            <Form className='my-5' onSubmit={handleSubmit}>
                <h1 className='text-center my-5'>Agregar producto</h1>
                <Form.Group>
                    <Form.Label>Nombre del Producto*</Form.Label>
                    <Form.Control type='text' placeholder='Té' onChange={(e) => setNombreProducto(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control type='Number' placeholder='0' onChange={(e) => setPrecioProducto(parseInt(e.target.value))}></Form.Control>
                </Form.Group>

                <h3 className='text-center my-4'>Categoria</h3>
                <div className='text-center'>
                    <Form.Check type='radio' name='categoria' inline label='Bebidas calientes' value='bebidaCaliente' onChange={cambioCategoria}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Bebidas frias' value='bebidaFria' onChange={cambioCategoria}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Dulce' value='dulce' onChange={cambioCategoria}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Salado' value='salado' onChange={cambioCategoria}></Form.Check>
                </div>
                <Button variant='danger' type='submit' className='w-100 my-5'>Guardar</Button>
                {
                    (error === true)?(<Alert variant="warning">Todos los campos son obligatorios</Alert>):(null)
                }
                
            </Form>
        </Container>
    );
};

export default AgregarProductos;