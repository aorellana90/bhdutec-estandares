package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.EjecutivoUsuarios;
import java.util.List;
import javax.ejb.Local;

@Local
public interface EjecutivoUsuariosFacadeLocal {

    void create(EjecutivoUsuarios ejecutivoUsuarios);

    void edit(EjecutivoUsuarios ejecutivoUsuarios);

    void remove(EjecutivoUsuarios ejecutivoUsuarios);

    EjecutivoUsuarios find(Object id);

    List<EjecutivoUsuarios> findAll();

    List<EjecutivoUsuarios> findRange(int[] range);

    int count();

    public EjecutivoUsuarios accederEjecutivos(EjecutivoUsuarios ejeUs);

}
