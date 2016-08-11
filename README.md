# Projeto de Sistemas de Informação - UFCG - 2016.1  

Repositório público do projeto da disciplina Sistemas de Informação 1 - 2016.1  

# Depêndencias 

- Python 2.7
- Django
- Django Rest Framework
- Django Rest Auth Lib
- Oauth Lib
- MySQL-Python

# Instalação (Requer ter um servidor MySQL (recomendamos o XAMPP), Python 2.7 instalado e configurado no PATH, node.js e bower. Opcional: ambiente virtual virtualenv)  
* 1 - Opcional: acessar o ambiente virtual

1 - Executar o comando 'pip install django'  
2 - Executar o comando 'pip install djangorestframework'  
3 - Executar o comando 'pip install django-rest-auth'  
4 - Executar o comando 'pip install django-allauth'  
5 - Executar o comando 'pip install oauthlib'  
6 - Installar o conector MySQL (https://dev.mysql.com/downloads/connector/python/)  
7 - Executar o comando 'pip install MySQL-python'  
8 - Acessar a raíz do projeto e executar bower install  
9 - Criar a database 'projeto-si1' no servidor MySQL  
10 - Na raíz do projeto executar 'python manage.py makemigrations' e 'python manage.py migrate'  
11 - Por fim, executar 'python manage.py runserver'
