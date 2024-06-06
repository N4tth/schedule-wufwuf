# Utiliza una imagen base de Python
FROM python:3.9

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos requirements.txt al contenedor
COPY requirements.txt .

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia todos los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto 8000 para que Gunicorn pueda servir la aplicación
EXPOSE 8000

CMD ["python","manage.py","runserver","0.0.0.0:8000"]

# Comando para ejecutar Gunicorn y servir la aplicación Django
#CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend2.wsgi:application"]