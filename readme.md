# Sistema Fast Parking

_ _ _


O projeto foi criado com o objetivo de cumprimento avaliat�rio da disciplina de Algoritmos do curso t�cnico de Desenvolvimento em Sistemas, realizado na escola t�cnica profissionalizante SENAI Prof. "Vicente Amato".



## Proposta e Requisitos
_ _ _

O objetivo principal era criar, mediante uma situa��o hipot�tica, um sistema de controle de ve�culos para um estacionamento chamado "Fast Parking", em que o operador pudesse ter liberdade para cadastrar clientes e visualizar os estacionados, assim como controlar o valor da cobran�a por hora, sem depender de um banco de dados ou acesso � internet. Nenhum framework deveria ser utilizado para a montagem do sistema e o mesmo deveria seguir wireframes especificadas.


Dessa forma, o projeto deveria focar na cria��o do CRUD em JavaScript em sua intera��o direta com Web Storage, devendo:

- Armazenar informa��es dos ve�culos, incluindo a data e hora atuais;

- Gerar comprovante com dados do ve�culo e do cliente no momento da entrada;

- Possibilitar a edi��o do nome do cliente ou da placa do ve�culo;

- Armazenar pre�os de custo por hora e demais horas;

- Calcular o valor de pagamento na retirada do ve�culo; 

- Exibir relat�rio di�rio contendo a lista dos ve�culos que realizaram pagamento e o rendimento di�rio;
- Validar todos os campos de entrada de dados.



## Tecnologias utilizadas
_ _ _


- HTML / CSS 

A estrutura b�sica do sistema foi montada em HTML e CSS, sem a utiliza��o de frameworks, buscando um layout que fosse limpo e eficiente ao usu�rio.

- JavaScript

A linguagem foi utilizada baseando-se na metodologia de programa��o funcional, utilizando arrow functions e m�todos auxiliares como map(), filter(), reduce() e pipe(). Seu uso tamb�m fica destacado nas anima��es, como intera��o com modais, e principalmente para a comunica��o com o armazenamento local por Web Storage.



- Web Storage

Um dos requisitos principais era que n�o houvesse depend�ncia de comunica��o com a internet e com servidores, ent�o o Web Storage foi definida como a op��o mais vi�vel. Dois bancos de dados s�o criados no mesmo para armazenar informa��es dos clientes, ve�culos e pre�os do estacionamento.