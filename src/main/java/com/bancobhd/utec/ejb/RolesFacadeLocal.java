package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Roles;
import java.util.List;
import javax.ejb.Local;

@Local
public interface RolesFacadeLocal {

    void create(Roles roles);

    void edit(Roles roles);

    void remove(Roles roles);

    Roles find(Object id);

    List<Roles> findAll();

    List<Roles> findRange(int[] range);

    int count();

}
