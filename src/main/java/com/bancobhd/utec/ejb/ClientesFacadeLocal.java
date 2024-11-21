package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Clientes;
import java.util.List;
import javax.ejb.Local;

@Local
public interface ClientesFacadeLocal {

    void create(Clientes clientes);

    void edit(Clientes clientes);

    void remove(Clientes clientes);

    Clientes find(Object id);

    List<Clientes> findAll();

    List<Clientes> findRange(int[] range);

    int count();

    public Clientes buscarClientePorDocumento(String documentoIdentidad);

    public Clientes buscarClientePorCorreo(String correo);

}
