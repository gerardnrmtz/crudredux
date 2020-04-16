import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async dispatch => {
    dispatch(agregarProducto());

    try {
      //Insertar en la api
      await clienteAxios.post("/productos", producto);

      //Si todo sale bien
      dispatch(agregarProductoExito(producto));
      Swal.fire("Correcto", "el producto se agrego correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: "hubo un error,intente de nuevo"
      });
    }
  };
}
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});
//si el producto se guarda en la bd
const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

//si hubi error
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});
//Funcion que descarga los productos de la base de datos
export function obtenerProductosActions() {
  return async dispatch => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});
const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});
const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});

//selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async dispatch => {
    dispatch(obtenerProductoEliminar(id));

    try {
      const resultado = await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());

      Swal.fire("Eliminado", "El producto se elimino correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}
const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});
const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});
const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
});
//COLOCAR porducto en edicion
export function obtenerProductoEditar(producto) {
  return dispatch => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}
const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});
//edita un registro en la api y state
export function editarProductoAction(producto) {
  return async dispatch => {
    dispatch(editarProducto(producto));
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {}
  };
}
const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});
const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});
