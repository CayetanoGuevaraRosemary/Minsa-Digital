-- MINSA DIGITAL - Base de Datos MySQL

CREATE DATABASE IF NOT EXISTS minsa_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE minsa_digital;

CREATE TABLE especialidades (
  id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255)
);

CREATE TABLE ubicaciones (
  id_ubicacion INT AUTO_INCREMENT PRIMARY KEY,
  departamento VARCHAR(100) NOT NULL,
  provincia VARCHAR(100) NOT NULL,
  distrito VARCHAR(100) NOT NULL
);

CREATE TABLE establecimientos_salud (
  id_establecimiento INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  direccion VARCHAR(255),
  id_ubicacion INT NOT NULL,
  tipo VARCHAR(50),
  FOREIGN KEY (id_ubicacion) REFERENCES ubicaciones(id_ubicacion)
);

CREATE TABLE medicos (
  id_medico INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  cmp VARCHAR(20) UNIQUE NOT NULL,
  id_especialidad INT NOT NULL,
  FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

CREATE TABLE medico_establecimiento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_medico INT NOT NULL,
  id_establecimiento INT NOT NULL,
  FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),
  FOREIGN KEY (id_establecimiento) REFERENCES establecimientos_salud(id_establecimiento)
);

CREATE TABLE usuarios_pacientes (
  id_paciente INT AUTO_INCREMENT PRIMARY KEY,
  tipo_documento VARCHAR(20) NOT NULL,
  numero_documento VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  codigo_verificacion VARCHAR(50),
  rol VARCHAR(30) DEFAULT 'paciente',
  id_titular INT,
  FOREIGN KEY (id_titular) REFERENCES usuarios_pacientes(id_paciente)
);

CREATE TABLE admin_usuarios (
  id_admin INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(50) NOT NULL
);

CREATE TABLE admin_log (
  id_log INT AUTO_INCREMENT PRIMARY KEY,
  id_admin INT NOT NULL,
  accion VARCHAR(150) NOT NULL,
  tabla_afectada VARCHAR(100),
  registro_id INT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_admin) REFERENCES admin_usuarios(id_admin)
);

CREATE TABLE cupos_disponibles (
  id_cupo INT AUTO_INCREMENT PRIMARY KEY,
  id_medico INT NOT NULL,
  id_establecimiento INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  slots_totales INT NOT NULL DEFAULT 1,
  slots_disponibles INT NOT NULL DEFAULT 1,
  tipo_cita VARCHAR(50),
  FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),
  FOREIGN KEY (id_establecimiento) REFERENCES establecimientos_salud(id_establecimiento)
);

CREATE TABLE citas (
  id_cita INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente INT NOT NULL,
  id_cupo INT NOT NULL,
  tipo_cita VARCHAR(50),
  estado_cita VARCHAR(50) DEFAULT 'pendiente',
  tipo_usuario VARCHAR(50),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_paciente) REFERENCES usuarios_pacientes(id_paciente),
  FOREIGN KEY (id_cupo) REFERENCES cupos_disponibles(id_cupo)
);

CREATE TABLE recetas (
  id_receta INT AUTO_INCREMENT PRIMARY KEY,
  id_cita INT NOT NULL,
  id_paciente INT NOT NULL,
  fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado_dispensacion VARCHAR(50) DEFAULT 'pendiente',
  observaciones TEXT,
  FOREIGN KEY (id_cita) REFERENCES citas(id_cita),
  FOREIGN KEY (id_paciente) REFERENCES usuarios_pacientes(id_paciente)
);

CREATE TABLE medicamentos (
  id_medicamento INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  presentacion VARCHAR(100),
  concentracion VARCHAR(100)
);

CREATE TABLE receta_detalle (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  id_receta INT NOT NULL,
  id_medicamento INT NOT NULL,
  dosis VARCHAR(100),
  frecuencia VARCHAR(100),
  duracion_dias INT,
  cantidad INT,
  FOREIGN KEY (id_receta) REFERENCES recetas(id_receta),
  FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento)
);

CREATE TABLE referencias (
  id_referencia INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente INT NOT NULL,
  id_establecimiento_origen INT NOT NULL,
  id_establecimiento_destino INT NOT NULL,
  id_especialidad INT NOT NULL,
  estado_referencia VARCHAR(50) DEFAULT 'pendiente',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_paciente) REFERENCES usuarios_pacientes(id_paciente),
  FOREIGN KEY (id_establecimiento_origen) REFERENCES establecimientos_salud(id_establecimiento),
  FOREIGN KEY (id_establecimiento_destino) REFERENCES establecimientos_salud(id_establecimiento),
  FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

CREATE TABLE registro_vacunas (
  id_registro_vacuna INT AUTO_INCREMENT PRIMARY KEY,
  id_paciente INT NOT NULL,
  nombre_vacuna VARCHAR(150) NOT NULL,
  tipo_carne VARCHAR(50),
  dosis VARCHAR(50),
  fecha_aplicacion DATE NOT NULL,
  id_establecimiento INT NOT NULL,
  FOREIGN KEY (id_paciente) REFERENCES usuarios_pacientes(id_paciente),
  FOREIGN KEY (id_establecimiento) REFERENCES establecimientos_salud(id_establecimiento)
);
