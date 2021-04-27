import React from 'react';
import { Container, ListGroup } from 'react-bootstrap'
import ItemProducto from './ItemProducto';

const ListarProductos = (props) => {
    return (
        <Container>
            <h1 className='text-center my-5'>Listar Productos</h1>
            <ListGroup className='my-5'>
                <ItemProducto/>
                
            </ListGroup>
        </Container>
    );
};

export default ListarProductos;