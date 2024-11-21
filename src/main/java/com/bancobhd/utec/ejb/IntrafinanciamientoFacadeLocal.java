package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Intrafinanciamiento;
import java.util.List;
import javax.ejb.Local;

@Local
public interface IntrafinanciamientoFacadeLocal {

    void create(Intrafinanciamiento intrafinanciamiento);

    void edit(Intrafinanciamiento intrafinanciamiento);

    void remove(Intrafinanciamiento intrafinanciamiento);

    Intrafinanciamiento find(Object id);

    List<Intrafinanciamiento> findAll();

    List<Intrafinanciamiento> findRange(int[] range);

    int count();

}
