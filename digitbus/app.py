from flask import Flask, request, jsonify
from db import get_connection
import bcrypt  

app = Flask(__name__)

#----------------------------Modulo de login-------------------------------------------

@app.route("/user-register", methods=['POST'])
def registrar_usuario():
    data = request.get_json()

    # Validaciones básicas
    if not data or "nombre" not in data or "password" not in data:
        return jsonify({"error": "Faltan campos requeridos"}), 400

    nombre = data["nombre"]
    password = data["password"]

    password_bytes = password.encode('utf-8')

    salt = bcrypt.gensalt(rounds=10)   
    hashed_password = bcrypt.hashpw(password_bytes, salt)

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Insertar usuario
        cursor.execute("""
            INSERT INTO USUARIOS (NOMBREUSUARIO, PASSWORD)
            VALUES (?, ?)
        """, (nombre, hashed_password.decode("utf-8")))  

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()

    # Validación de campos
    if not data or "nombre" not in data or "password" not in data:
        return jsonify({"error": "Faltan campos requeridos"}), 400

    nombre = data["nombre"]
    password = data["password"]

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Consulta del usuario
        cursor.execute("SELECT PASSWORD FROM USUARIOS WHERE NOMBREUSUARIO = ?", (nombre,))
        row = cursor.fetchone()

        cursor.close()
        conn.close()

        if not row:
            return jsonify({"error": "Credenciales incorrectas."}), 404

        hashed_password = row[0]  # Hash guardado en BD

        # Validación de contraseña
        password_bytes = password.encode('utf-8')
        hashed_bytes = hashed_password.encode('utf-8')

        if bcrypt.checkpw(password_bytes, hashed_bytes):
            return jsonify({"mensaje": "Login exitoso"}), 200
        else:
            return jsonify({"error": "Credenciales incorrectas."}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500





#------------------------------Modulo de Tarjetas-----------------------------------


@app.route("/tarjeta/status", methods=['POST'])
def actualizar_tarjeta():
    data = request.get_json()

    # Validación de campos
    if not data or "idtarjeta" not in data or "estado" not in data:
        return jsonify({"error": "Faltan campos requeridos"}), 400

    idtarjeta = data["idtarjeta"]
    estado = data["estado"]

    # Validar estado
    if estado not in [0, 1]:
        return jsonify({"error": "El parámetro 'estado' debe ser 0 o 1"}), 400


    status = "ACTIVA" if estado == 1 else "INACTIVA"

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE TARJETAS
            SET STATUS = ?
            WHERE IDTARJETA = ?
        """, (status, idtarjeta))

        conn.commit()
        filas_actualizadas = cursor.rowcount

        cursor.close()
        conn.close()

        if filas_actualizadas == 0:
            return jsonify({"mensaje": "No se encontró la tarjeta"}), 404

        return jsonify({"mensaje": f"Tarjeta actualizada a {status}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route("/tarjeta/tipo", methods=['POST'])
def actualizar_tipo_tarjeta():
    data = request.get_json()

    # Validación de campos
    if not data or "idtarjeta" not in data or "tipo" not in data:
        return jsonify({"error": "Faltan campos requeridos"}), 400

    idtarjeta = data["idtarjeta"]
    tipo_num = data["tipo"]

    # Mapear número a tipo
    tipos = {1: "ESTUDIANTE", 2: "GENERAL"}

    if tipo_num not in tipos:
        return jsonify({"error": "El parámetro 'tipo' debe ser 1 (Estudiante) o 2 (General)"}), 400

    tipo_texto = tipos[tipo_num]

    try:
        conn = get_connection()
        cursor = conn.cursor()

        # Update en la BD
        cursor.execute("""
            UPDATE TARJETAS
            SET TIPO = ?
            WHERE IDTARJETA = ?
        """, (tipo_texto, idtarjeta))

        conn.commit()
        filas_actualizadas = cursor.rowcount

        cursor.close()
        conn.close()

        if filas_actualizadas == 0:
            return jsonify({"mensaje": "No se encontró la tarjeta"}), 404

        return jsonify({"mensaje": f"Tarjeta actualizada a tipo {tipo_texto}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
