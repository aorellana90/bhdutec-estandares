package com.bancobhd.utec.ejb;

import com.bancobhd.utec.modelo.Usuarios;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.apache.commons.codec.digest.DigestUtils;

@Stateless
public class UsuariosFacade extends AbstractFacade<Usuarios> implements UsuariosFacadeLocal {

    @PersistenceContext(unitName = "persistenciaBhd")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public UsuariosFacade() {
        super(Usuarios.class);
    }

    @Override
    public Usuarios acceder(Usuarios us) {
        Usuarios usuarios = null;
        StringBuilder consulta = new StringBuilder();
        String clave = DigestUtils.md5Hex(us.getClave());

        try {
            consulta.append("SELECT u FROM Usuarios u WHERE u.usuario = :usuario AND u.clave = :clave");
            Query query = em.createQuery(consulta.toString());
            query.setParameter("usuario", us.getUsuario());
            query.setParameter("clave", clave);
            List<Usuarios> lista = query.getResultList();
            if (!lista.isEmpty()) {
                usuarios = lista.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return usuarios;
    }

    @Override
    public Usuarios buscarPorUsuario(String usuario) {
        Usuarios usuarios = null;
        StringBuilder consulta = new StringBuilder();

        try {
            consulta.append("select * from usuarios where usuario like ?");
            Query query = em.createNativeQuery(consulta.toString(), Usuarios.class);
            query.setParameter(1, usuario);
            List<Usuarios> lista = query.getResultList();
            if (!lista.isEmpty()) {
                usuarios = lista.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return usuarios;
    }

    @Override
    public Usuarios buscarPorIdCliente(int idCliente) {
        Usuarios usuarios = null;
        StringBuilder consulta = new StringBuilder();

        try {
            consulta.append("select * from usuarios where idCliente = ?");
            Query query = em.createNativeQuery(consulta.toString(), Usuarios.class);
            query.setParameter(1, idCliente);
            List<Usuarios> lista = query.getResultList();
            if (!lista.isEmpty()) {
                usuarios = lista.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return usuarios;
    }

}
