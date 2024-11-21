package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.SolicitudIntra;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class SolicitudIntraFacade extends AbstractFacade<SolicitudIntra> implements SolicitudIntraFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public SolicitudIntraFacade() {
        super(SolicitudIntra.class);
    }

}
