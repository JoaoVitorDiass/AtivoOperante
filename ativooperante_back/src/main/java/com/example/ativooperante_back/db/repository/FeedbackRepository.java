package com.example.ativooperante_back.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ativooperante_back.db.entidades.Denuncia;
import com.example.ativooperante_back.db.entidades.Feedback;

import jakarta.transaction.Transactional;

public interface FeedbackRepository extends JpaRepository <Feedback,Long>{
    // public void deleteFromDenuncia(Denuncia denuncia);

    public void deleteByDenuncia(Denuncia denuncia);

    @Modifying
    @Transactional
    @Query(value="DELETE FROM FEEDBACK WHERE DEN_ID = :den_id",nativeQuery = true)
    void deleteByDenID(@Param("den_id") Long den_id);
}