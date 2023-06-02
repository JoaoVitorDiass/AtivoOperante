package com.example.ativooperante_back.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ativooperante_back.db.entidades.Denuncia;
import com.example.ativooperante_back.db.entidades.Usuario;

import jakarta.transaction.Transactional;

public interface DenunciaRepository extends JpaRepository<Denuncia,Long> {
    public List <Denuncia> findAllByUsuario(Usuario usuario);

    public List <Denuncia> findAll();
    
    @Modifying
    @Transactional
    @Query(value="INSERT into feedback (fee_texto, den_id) VALUES (:texto,:den_id)",nativeQuery = true)
    void addFeedback(@Param("den_id") Long den_id, @Param("texto") String texto);
}
