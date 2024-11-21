package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.TipoCuentas;
import java.util.List;
import javax.ejb.Local;

@Local
public interface TipoCuentasFacadeLocal {

    void create(TipoCuentas tipocuentas);

    void edit(TipoCuentas tipocuentas);

    void remove(TipoCuentas tipocuentas);

    TipoCuentas find(Object id);

    List<TipoCuentas> findAll();

    List<TipoCuentas> findRange(int[] range);

    int count();

}
