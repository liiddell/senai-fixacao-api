package com.example.fixacao.controller;

import com.example.fixacao.dto.ProdutoRequestDTO;
import com.example.fixacao.dto.ProdutoResponseDTO;
import com.example.fixacao.services.ProdutoServices;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cadastro")
@CrossOrigin(origins = "*")
public class ProdutoController {
    @Autowired
    private ProdutoServices produtoService;

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listar() {
        return ResponseEntity
                .ok()
                .body(produtoService.listar());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody ProdutoRequestDTO produtoRequestDTO) {
        produtoService.salvar(produtoRequestDTO);

        return ResponseEntity
                .ok()
                .body(Map.of(
                        "menssagem", "Produtor cadastrado com sucesso",
                        "sucesso", "true"
                ));
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Map<String, Object>> atualizar(
            @PathVariable String codigo,
            @Valid @RequestBody ProdutoRequestDTO produtoRequestDTO) {

        produtoService.atualizar(codigo, produtoRequestDTO);

        return ResponseEntity.ok().body(Map.of(
                "mensagem", "Produto atualizado com sucesso",
                "sucesso", true
        ));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletar(@PathVariable Long id) {
        produtoService.deletar(id);

        return ResponseEntity
                .ok()
                .body(Map.of(
                        "menssagem", "Produto deletado com sucesso",
                        "sucesso", "true"
                ));
    }
}