import React from 'react';
import {ListGroup, Button, Badge} from 'react-bootstrap';

const ItemProducto = (props) => {
    return (
        
            <ListGroup.Item className='d-flex justify-content-between'>
                <p>{props.producto.nombreProducto} <Badge variant="success">${props.producto.precioProducto}</Badge></p>
                <div>
                <Button variant='warning' className='mr-3'>Editar</Button>
                <Button variant='danger'>Borrar</Button>
                </div>
            </ListGroup.Item>
        
    );
};

export default ItemProducto;