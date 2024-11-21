package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Ejecutivo;
import java.util.List;
import javax.ejb.Local;

@Local
public interface EjecutivoFacadeLocal {

    void create(Ejecutivo ejecutivo);

    void edit(Ejecutivo ejecutivo);

    void remove(Ejecutivo ejecutivo);

    Ejecutivo find(Object id);

    List<Ejecutivo> findAll();

    List<Ejecutivo> findRange(int[] range);

    int count();

}
