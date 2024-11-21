package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.TipoProducto;
import java.util.List;
import javax.ejb.Local;

@Local
public interface TipoProductoFacadeLocal {

    void create(TipoProducto tipoproducto);

    void edit(TipoProducto tipoproducto);

    void remove(TipoProducto tipoproducto);

    TipoProducto find(Object id);

    List<TipoProducto> findAll();

    List<TipoProducto> findRange(int[] range);

    int count();

}
