import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import {campoRequerido, rangoPrecio} from './common/helpers'

const EditarProducto = (props) => {
    //const id= useParams().id
    const { id } = useParams();
    //variables useRef
    const nombreProductoRef = useRef('');
    const precioProductoRef = useRef(0);
    //creo los state
    const [producto, setProducto] = useState({});
    const [categoria, setCategoria] = useState('');
    const [error, setError] = useState(false);
    const URL = process.env.REACT_APP_API_URL + '/' + id;

    useEffect(() => {
        consultarProducto();
    }, []);

    const consultarProducto = async() => {
        try {
            const respuesta = await fetch(URL)
            console.log(respuesta);
            if(respuesta.status === 200){
                const resp = await respuesta.json();
                setProducto(resp);
            }
        } catch (error) {
            console.log(error);
            //cartel de error
        }
    };

    const cambioCategoria = (e) => {
        setCategoria(e.target.value)
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(nombreProductoRef);
        // console.log(nombreProductoRef.current);
        // console.log(nombreProductoRef.current.value);

        // revisar el valor de la categoria
        let categoriaModificada = (categoria === '')?(producto.categoria):(categoria);
        //validar datos
        if(campoRequerido(nombreProductoRef.current.value) && rangoPrecio(parseFloat(precioProductoRef.current.value)) && campoRequerido(categoriaModificada)){
            //si esta todo bien envio request a API
            setError(false);
            try{
                const productoModificado = {
                    nombreProducto: nombreProductoRef.current.value,
                    precioProducto: precioProductoRef.current.value,
                    categoria: categoriaModificada
                }

                const respuesta = await fetch(URL,{
                    method:"PUT",
                    headers:{"Content-Type":"aplication/json"},
                    body: JSON.stringify(productoModificado)
                })
                if(respuesta.status == 200){
                    //mostrar cartel de producto modificado
                    Swal.fire(
                        'Producto modificado',
                        'Producto seleccionado se modific?? correctamente',
                        'success'
                      )

                    //actualizar los datos
                    props.consultarAPI();
                }


            }catch(error){
                console.log(error);
            }

        }else{
            //mostrar cartel de error si falla la validacion
            setError(true);
        }      
    };

    return (
        <Container>
            <Form className='my-5' onSubmit={handleSubmit}>
                <h1 className='text-center my-5'>Editar producto</h1>
                <Form.Group>
                    <Form.Label>Nombre del Producto*</Form.Label>
                    <Form.Control type='text' placeholder='T??' ref={nombreProductoRef} defaultValue={producto.nombreProducto}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control type='Number' placeholder='0' ref={precioProductoRef} defaultValue={producto.precioProducto}></Form.Control>
                </Form.Group>

                <h3 className='text-center my-4'>Categoria</h3>
                <div className='text-center'>
                    <Form.Check type='radio' name='categoria' inline label='Bebidas calientes' value='bebidaCaliente' onChange={cambioCategoria} defaultChecked={producto.categoria && producto.categoria === 'bebidaCaliente'}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Bebidas frias' value='bebidaFria' onChange={cambioCategoria} defaultChecked={producto.categoria && producto.categoria === 'bebidaFria'}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Dulce' value='dulce' onChange={cambioCategoria}defaultChecked={producto.categoria && producto.categoria === 'dulce'}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Salado' value='salado' onChange={cambioCategoria} defaultChecked={producto.categoria && producto.categoria === 'salado'}></Form.Check>
                </div>
                <Button variant='danger' type='submit' className='w-100 my-5'>Guardar</Button>
            {
                (error === true)?(<Alert variant="warning">Todos los campos son obligatorios</Alert>):(null)
            } 

            </Form>
        </Container>
    );
};

export default EditarProducto;