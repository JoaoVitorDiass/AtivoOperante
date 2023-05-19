package com.example.ativooperante_back.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.entidades.Orgao;
import com.example.ativooperante_back.db.repository.OrgaoRepository;

@RestController
public class TesteRestController {
    @Autowired
    OrgaoRepository repoOrgao;
     
    @GetMapping("orgaos")
    ResponseEntity<Object> findOrgaos()
    {
        List<Orgao> orgaos=repoOrgao.findAll();
        return ResponseEntity.ok(orgaos);
    }

}
