#language: pt

Funcionalidade: Produto

Cenário: O usuário deseja pesquisar os produtos pela barra de busca

Dado que foi informado o texto
Quando eu pesquisar o produto que contém o trecho do texto no nome
Então devo retornar um vetor com todos os produtos


Cenário: O usuário deseja filtrar os produtos por categoria

Dado que foi informado uma categoria de produtos
Quando eu pesquisar a categoria
Então devo retornar um vetor com todos os produtos da categoria solicitada


Cenário: O usuário deseja ter acesso ao catálogo

Dado que foi solicitado ver todos os produtos
Quando eu pesquisar
Então devo retornar um vetor com todos os produtos da loja


Cenário: O usuário deseja ter acesso a um unico produto

Dado que foi informado o id do produto
Quando eu pesquisar pelo id
Então devo retornar um vetor com todas as informações do produto


Cenário: O administrador deseja cadastrar um novo produto

Dado que foi informado todos os dados referentes ao produto
Quando enviar os dados
Então devo retornar um vetor com o produto criado