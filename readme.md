# Sistema Fast Parking

_ _ _


O projeto foi criado com o objetivo de cumprimento avaliatório da disciplina de Algoritmos do curso técnico de Desenvolvimento em Sistemas, realizado na escola técnica profissionalizante SENAI Prof. "Vicente Amato".



## Proposta e Requisitos
_ _ _

O objetivo principal era criar, mediante uma situação hipotética, um sistema de controle de veículos para um estacionamento chamado "Fast Parking", em que o operador pudesse ter liberdade para cadastrar clientes e visualizar os estacionados, assim como controlar o valor da cobrança por hora, sem depender de um banco de dados ou acesso à internet. Nenhum framework deveria ser utilizado para a montagem do sistema e o mesmo deveria seguir wireframes especificadas.


Dessa forma, o projeto deveria focar na criação do CRUD em JavaScript em sua interação direta com Web Storage, devendo:

- Armazenar informações dos veículos, incluindo a data e hora atuais;

- Gerar comprovante com dados do veículo e do cliente no momento da entrada;

- Possibilitar a edição do nome do cliente ou da placa do veículo;

- Armazenar preços de custo por hora e demais horas;

- Calcular o valor de pagamento na retirada do veículo; 

- Exibir relatório diário contendo a lista dos veículos que realizaram pagamento e o rendimento diário;
- Validar todos os campos de entrada de dados.



## Tecnologias utilizadas
_ _ _


- HTML / CSS 

A estrutura básica do sistema foi montada em HTML e CSS, sem a utilização de frameworks, buscando um layout que fosse limpo e eficiente ao usuário.

- JavaScript

A linguagem foi utilizada baseando-se na metodologia de programação funcional, utilizando arrow functions e métodos auxiliares como map(), filter(), reduce() e pipe(). Seu uso também fica destacado nas animações, como interação com modais, e principalmente para a comunicação com o armazenamento local por Web Storage.



- Web Storage

Um dos requisitos principais era que não houvesse dependência de comunicação com a internet e com servidores, então o Web Storage foi definida como a opção mais viável. Dois bancos de dados são criados no mesmo para armazenar informações dos clientes, veículos e preços do estacionamento.