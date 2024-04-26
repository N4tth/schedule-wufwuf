# Dates wuf-wuf

# Configuración backend:

`cd backend`

# Si hay un ambiente virtual, debe eliminarse dicha carpeta primero 

`python3 -m venv venv` o `python -m venv venv`

para Linux `source venv/Scripts/activate` para Windows `venv/Scripts/activate`

>si no funciona en windows, activar la configuración de activación de comandos de windows

instalar los requerimientos `pip install -r requirements.txt`

# Crear migraciones

dirigirse a la carpeta que contenga el manage.py

`python manage.py makemigrations dates`

`python manage.py migrate`

# Correr el proyecto

`python manage.py runserver`