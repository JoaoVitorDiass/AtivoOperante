package com.example.ativooperante_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ativooperante_back.db.entidades.Orgao;
import com.example.ativooperante_back.db.entidades.Tipo;
import com.example.ativooperante_back.db.repository.DenunciaRepository;
import com.example.ativooperante_back.db.repository.OrgaoRepository;
import com.example.ativooperante_back.db.repository.TipoRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("apis/admin")
public class AdminRestController {
    @Autowired
    private OrgaoRepository orgaoRepo;
    @Autowired
    private TipoRepository tipoRepo;
    @Autowired
    private DenunciaRepository denunciaRepo;

    @Autowired
    HttpServletRequest request;

    /* CRUD de orgaos */
    @PostMapping(value="save-orgao")
    public ResponseEntity <Object> saveOrgao(@RequestBody Orgao orgao) {
        String nivel = (String)request.getAttribute("nivel");
        if(nivel.equals("1")){
            return ResponseEntity.ok().body(orgaoRepo.save(orgao)); 
        }
        else {
            return ResponseEntity.ok().body("não autorizado");
        }
    }

    @GetMapping("del-orgao/{id}")
    public ResponseEntity<Object> delOrgao(@PathVariable(value="id") int id)
    {
        try{
            String nivel = (String)request.getAttribute("nivel");
            if(nivel.equals("1")){
                orgaoRepo.deleteById((long)id);
                return ResponseEntity.ok().body("deletado com sucesso");
            }
            else {
                return ResponseEntity.ok().body("não autorizado");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());  
        }
    }
    
    @GetMapping("get-orgaos")
    public ResponseEntity<Object> getOrgaos()
    {
        String nivel = (String)request.getAttribute("nivel");
        if(nivel.equals("1")){
            return ResponseEntity.ok().body(orgaoRepo.findAll(Sort.by("nome")));  
        }
        else {
            return ResponseEntity.ok().body("não autorizado");
        } 
    }

    /* CRUD de tipos */
    @GetMapping("get-tipos")
    public ResponseEntity<Object> getTipos()
    {
        String nivel = (String)request.getAttribute("nivel");
        if(nivel.equals("1")){
            return ResponseEntity.ok().body(tipoRepo.findAll(Sort.by("nome")));  
        }
        else {
            return ResponseEntity.ok().body("não autorizado");
        }
    }
    @PostMapping(value="save-tipo")
    public ResponseEntity <Object> saveTipo(@RequestBody Tipo tipo) {
        String nivel = (String)request.getAttribute("nivel");
        if(nivel.equals("1")){
            return ResponseEntity.ok().body(tipoRepo.save(tipo));
        }
        else {
            return ResponseEntity.ok().body("não autorizado");
        }
        
    }

    @GetMapping("del-tipo/{id}")
    public ResponseEntity<Object> delTipo(@PathVariable(value="id") int id)
    {
        try{
            String nivel = (String)request.getAttribute("nivel");
            System.out.println(nivel);
            if(nivel.equals("1")){
                System.out.println(id);
                tipoRepo.deleteById((long)id);
                return ResponseEntity.ok().body("deletado com sucesso");
            }
            else {
                return ResponseEntity.ok().body("não autorizado");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());  
        }
    }

    @GetMapping("get-denuncias-all")
    public ResponseEntity <Object> getDenunciasAll(){
        try{
            String nivel = (String)request.getAttribute("nivel");
            if(nivel.equals("1")){
                return ResponseEntity.ok().body(denunciaRepo.findAll(Sort.by("nome")));
            }
            else {
                return ResponseEntity.ok().body("não autorizado");
            }
        }
        catch(Exception e){                                        
            return ResponseEntity.badRequest().body("--->"+e.getMessage());
        } 
    }

    /* Denuncia: adicionar FeedBack */
    @GetMapping("add-feedback/{den_id}/{texto}")
    public ResponseEntity <Object> addFeedback(@PathVariable(value="den_id") Long den_id, @PathVariable(value="texto") String texto) 
    {
        try{
            String nivel = (String)request.getAttribute("nivel");
            if(nivel.equals("1")){
                denunciaRepo.addFeedback(den_id, texto);
                return ResponseEntity.ok().body("inserido com sucesso");
            }
            else {
                return ResponseEntity.ok().body("não autorizado");
            }
        }
        catch(Exception e){                                        
            return ResponseEntity.badRequest().body("--->"+e.getMessage());
        }
    }

    /* Denuncia: excluir */
    @GetMapping("del-denuncia/{id}")
    public ResponseEntity<Object> delDenuncia(@PathVariable(value="id") int id)
    {
        try{
            String nivel = (String)request.getAttribute("nivel");
            if(nivel.equals("1")){
                // resolver a deleção de um possível feedback
                denunciaRepo.deleteById((long)id);
                return ResponseEntity.ok().body("deletado com sucesso");
            }
            else {
                return ResponseEntity.ok().body("não autorizado");
            }
        }
        catch(Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());  
        }
    }

}
