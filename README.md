# Projeto  Ativo e Operante!

Seja um cidadão atento aos problemas do dia a dia. Avise e denuncie de forma eficiente e rápida os problemas que encontrar na sua comunidade. Use o aplicativo web Ativo e Operante!  

Ativo e Operante!  é um sistema Web capaz de oferecer uma ferramenta ao cidadão que deseja avisar ou denunciar aos orgãos competentes sobre problemas na cidade, como buracos na rua, abandono de animais, poda ou corte de árvores, problemas no trânsito, enfim qualquer situação  que pode afetar o dia a dia do cidadão.

O aplicativo web deve permitir o acesso de pessoas autenticadas e assim fornecer o módulo de denúncia, na qual o usuário conseguirá registrar uma denúncia informando um título, uma descrição, a urgência (entre 1 e 5, onde 5 é muito urgente), selecionar o orgão competente e selecionar o tipo de problema. O tipo de problema e o orgão competende deverão ser carregados a partir de um serviço web (no formato JSON, desenvolvidas com Spring REST). Após preenchida a denúncia, ela deverá ser enviada ao sistema e recebida por um serviço.
A criação da conta do usuário deverá ser feita no próprio aplicativo e será analisada por uma API web que após receber a requisição de  cadastro (cpf, email,senha) deverá criar armazenar em um banco de dados com nível de acesso "cidadão".

Haverá ainda um  módulo para o responsável pelo sistema cadastrar os orgãos responsáveis e os tipos de problemas, além de uma interface que permitirá listar e visualizar todas as denúncias, com opções para deletar e/ou dar um único feedback as mesmas. O acesso a este módulo é pelo mesmo login do cidadão, que ao detectar um usuário de nível "administrador", remeterá o usuário à estas funcionalidades. O cadastro do usuário "administrador" será  pré cadastrado, utilizando o login: "admin@pm.br" e a senha numérica 123321. 


Desafio:
Adicione uma imagem à denúncia! 

Fases:
1) Definição e criação da base de dados, entidades e repositórios JPA
2) Definição dos serviços (APIs Rest), filtros e geração de token:
       A ser consumida pelo administrador:
        . CRUD de tipo de problema e orgão competente
        . Listar denúncias
        . Excluir denúncia
        . Registrar feedback em denúncia
      A ser consumida pelo cidadão:
        . Login com retorno de token (use também para o administrador)
        . Cadastro do usuário cidadão, com criação e armazenamento de chave
        . Receber a denúncia 
        . Listar orgãos competentes
        . Listar tipos de problemas 
        . Visualizar feedback

3) Home page com opção de login e cadastrro de usuário "cidadão"

4) Front end do administrador: 
        . Área do administrador com os CRUDs (orgão e tipos de problemas) e o módulo de visualizar, apagar denúncias e dar feedback

5) Front end do Cidadão:
        . Preencher e enviar denúncia
        . Visualizar as denuncias por ele enviadas e seus possíveis feedbacks

     
 Use:
Banco de dados relacional (pode usar noSQL se desejar)
Vue para troca de informações entre app e API web. 

Tutoriais úteis:
Spring MVC File Upload Example
Initializing a RESTful Web Services Project with Spring Boot
