import React from 'react';
import {ListGroup, Button, Badge} from 'react-bootstrap';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

const ItemProducto = (props) => {
    const eliminarPrducto = (id) => {
        Swal.fire({
            title: '¿Esta seguro que desea eliminar el producto?',
            text: "No se podrá recuperar un producto eliminado",
            icon: 'warning',
            showCancelButton: true, 
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
          }).then(async(result) => {
            if (result.isConfirmed) {
                //aqui borrar el producto
                const URL = `${process.env.REACT_APP_API_URL}/${id}`;
                try{
                    const respuesta = await fetch(URL,{
                        method: "DELETE",
                        headers:{
                            "Content-Type":"application/json"
                        }
                    });
                    if(respuesta.status === 200){
                        Swal.fire(
                            'Producto eliminado',
                            'El producto se elimino correctamente',
                            'success'
                          )
                          //actualizar los datos de la lista de productos
                          props.consultarAPI();
                    }

                }catch(error){
                    console.log(error);
                    //mostrar un cartel con un mensaje que indique que ocurrrio un error y lo vuelva a intentar
                }
            }
          })

    }


    return (
        
            <ListGroup.Item className='d-flex justify-content-between'>
                <p>{props.producto.nombreProducto} <Badge variant="success">${props.producto.precioProducto}</Badge></p>
                <div>
                
                <Link className='btn btn-warning mr-3 text-light' to={`/productos/editar/${props.producto.id}`} >Editar</Link>
                <Button variant='danger' onClick={()=> eliminarPrducto(props.producto.id)}>Borrar</Button>
                </div>
            </ListGroup.Item>
        
    );
};

export default ItemProducto;