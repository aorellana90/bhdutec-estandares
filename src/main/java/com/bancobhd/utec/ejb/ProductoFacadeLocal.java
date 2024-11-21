package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Producto;
import java.util.List;
import javax.ejb.Local;

@Local
public interface ProductoFacadeLocal {

    void create(Producto producto);

    void edit(Producto producto);

    void remove(Producto producto);

    Producto find(Object id);

    List<Producto> findAll();

    List<Producto> findRange(int[] range);

    int count();

    public Producto buscarProductoPorTipoNumero(int idTipoProducto, String numeroProducto);

    public List<Producto> listaProductoPorCliente(int idCliente);

}
