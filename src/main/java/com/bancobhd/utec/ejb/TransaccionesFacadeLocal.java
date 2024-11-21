package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Transacciones;
import java.util.List;
import javax.ejb.Local;

@Local
public interface TransaccionesFacadeLocal {

    void create(Transacciones transacciones);

    void edit(Transacciones transacciones);

    void remove(Transacciones transacciones);

    Transacciones find(Object id);

    List<Transacciones> findAll();

    List<Transacciones> findRange(int[] range);

    int count();

}
