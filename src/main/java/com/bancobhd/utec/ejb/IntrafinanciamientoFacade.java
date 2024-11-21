package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Intrafinanciamiento;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class IntrafinanciamientoFacade extends AbstractFacade<Intrafinanciamiento> implements IntrafinanciamientoFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public IntrafinanciamientoFacade() {
        super(Intrafinanciamiento.class);
    }

}
