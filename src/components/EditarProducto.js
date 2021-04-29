import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const EditarProducto = () => {

    //const id= useParams().id
    const { id } = useParams();
    const [producto, setProducto] = useState({});


    useEffect(() => {
        consultarProducto();

    }, []);

    const consultarProducto = async() => {
        try {
            const URL = process.env.REACT_APP_API_URL + '/' + id;
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
        //setCategoria(e.target.value)
    };

    const handleSubmit = () => { };

    return (
        <Container>
            <Form className='my-5' onSubmit={handleSubmit}>
                <h1 className='text-center my-5'>Editar producto</h1>
                <Form.Group>
                    <Form.Label>Nombre del Producto*</Form.Label>
                    <Form.Control type='text' placeholder='Té'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control type='Number' placeholder='0'></Form.Control>
                </Form.Group>

                <h3 className='text-center my-4'>Categoria</h3>
                <div className='text-center'>
                    <Form.Check type='radio' name='categoria' inline label='Bebidas calientes' value='bebidaCaliente' onChange={cambioCategoria}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Bebidas frias' value='bebidaFria' onChange={cambioCategoria}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Dulce' value='dulce' onChange={cambioCategoria}></Form.Check>
                    <Form.Check type='radio' name='categoria' inline label='Salado' value='salado' onChange={cambioCategoria}></Form.Check>
                </div>
                <Button variant='danger' type='submit' className='w-100 my-5'>Guardar</Button>
                {/* {
                (error === true)?(<Alert variant="warning">Todos los campos son obligatorios</Alert>):(null)
            } */}

            </Form>
        </Container>
    );
};

export default EditarProducto;