package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.SolicitudIntra;
import java.util.List;
import javax.ejb.Local;

@Local
public interface SolicitudIntraFacadeLocal {

    void create(SolicitudIntra solicitudintra);

    void edit(SolicitudIntra solicitudintra);

    void remove(SolicitudIntra solicitudintra);

    SolicitudIntra find(Object id);

    List<SolicitudIntra> findAll();

    List<SolicitudIntra> findRange(int[] range);

    int count();

}
