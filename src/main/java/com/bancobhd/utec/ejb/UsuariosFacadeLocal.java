package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Usuarios;
import java.util.List;
import javax.ejb.Local;

@Local
public interface UsuariosFacadeLocal {

    void create(Usuarios usuarios);

    void edit(Usuarios usuarios);

    void remove(Usuarios usuarios);

    Usuarios find(Object id);

    List<Usuarios> findAll();

    List<Usuarios> findRange(int[] range);

    int count();

    public Usuarios acceder(Usuarios us);

    public Usuarios buscarPorUsuario(String usuario);

    public Usuarios buscarPorIdCliente(int idCliente);

}
