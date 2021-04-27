import React from 'react';
import {ListGroup, Button, Badge} from 'react-bootstrap';

const ItemProducto = () => {
    return (
        <div>
            <ListGroup.Item className='d-flex justify-content-between'>
                <p>nombre del producto <Badge variant="success">$200</Badge></p>
                <Button variant='warning' className='mr-3'>Editar</Button>
                <Button variant='danger'>Borrar</Button>
            </ListGroup.Item>
        </div>
    );
};

export default ItemProducto;