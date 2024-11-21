package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.TipoTransacciones;
import java.util.List;
import javax.ejb.Local;

@Local
public interface TipoTransaccionesFacadeLocal {

    void create(TipoTransacciones tipotransacciones);

    void edit(TipoTransacciones tipotransacciones);

    void remove(TipoTransacciones tipotransacciones);

    TipoTransacciones find(Object id);

    List<TipoTransacciones> findAll();

    List<TipoTransacciones> findRange(int[] range);

    int count();

}
