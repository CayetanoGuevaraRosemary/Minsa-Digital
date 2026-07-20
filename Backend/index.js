const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(bodyParser.json());

const conexion = mysql.createConnection({
  host: "localhost",
  port: "3306",
  database: "minsa_digital",
  user: "root",
  password: "",
});

conexion.connect((error) => {
  if (error) throw error;
  else console.log("Conexión exitosa a la base de datos");
});

app.listen(PUERTO, () => {
  console.log("Servidor corriendo en el puerto " + PUERTO);
});

// ENDPOINTS PACIENTES
app.get("/pacientes", (req, res) => {
  conexion.query("SELECT * FROM usuarios_pacientes", (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay registros");
  });
});

app.get("/pacientes/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM usuarios_pacientes WHERE id_paciente = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta[0] : "Paciente no encontrado");
    },
  );
});

app.post("/pacientes/guardar", (req, res) => {
  const paciente = {
    tipo_documento: req.body.tipo_documento,
    numero_documento: req.body.numero_documento,
    password_hash: req.body.password_hash,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    fecha_nacimiento: req.body.fecha_nacimiento,
    codigo_verificacion: req.body.codigo_verificacion,
    rol: req.body.rol || "paciente",
    id_titular: req.body.id_titular || null,
  };
  conexion.query("INSERT INTO usuarios_pacientes SET ?", paciente, (error) => {
    if (error) return console.error(error.message);
    res.json("Paciente registrado correctamente");
  });
});

app.put("/pacientes/actualizar/:id", (req, res) => {
  const {
    nombres,
    apellidos,
    fecha_nacimiento,
    tipo_documento,
    numero_documento,
  } = req.body;
  conexion.query(
    "UPDATE usuarios_pacientes SET nombres=?, apellidos=?, fecha_nacimiento=?, tipo_documento=?, numero_documento=? WHERE id_paciente=?",
    [
      nombres,
      apellidos,
      fecha_nacimiento,
      tipo_documento,
      numero_documento,
      req.params.id,
    ],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Paciente actualizado correctamente");
    },
  );
});

app.delete("/pacientes/eliminar/:id", (req, res) => {
  conexion.query(
    "DELETE FROM usuarios_pacientes WHERE id_paciente = ?",
    [req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Paciente eliminado correctamente");
    },
  );
});

// ENDPOINTS MÉDICOS
app.get("/medicos", (req, res) => {
  const consulta = `SELECT m.*, e.nombre AS especialidad 
                      FROM medicos m 
                      JOIN especialidades e ON m.id_especialidad = e.id_especialidad`;
  conexion.query(consulta, (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay registros");
  });
});

app.get("/medicos/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM medicos WHERE id_medico = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta[0] : "Médico no encontrado");
    },
  );
});

app.post("/medicos/guardar", (req, res) => {
  const medico = {
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    cmp: req.body.cmp,
    id_especialidad: req.body.id_especialidad,
  };
  conexion.query("INSERT INTO medicos SET ?", medico, (error) => {
    if (error) return console.error(error.message);
    res.json("Médico registrado correctamente");
  });
});

app.put("/medicos/actualizar/:id", (req, res) => {
  const { nombres, apellidos, cmp, id_especialidad } = req.body;
  conexion.query(
    "UPDATE medicos SET nombres=?, apellidos=?, cmp=?, id_especialidad=? WHERE id_medico=?",
    [nombres, apellidos, cmp, id_especialidad, req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Médico actualizado correctamente");
    },
  );
});

app.delete("/medicos/eliminar/:id", (req, res) => {
  conexion.query(
    "DELETE FROM medicos WHERE id_medico = ?",
    [req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Médico eliminado correctamente");
    },
  );
});

// ENDPOINTS ESPECIALIDADES
app.get("/especialidades", (req, res) => {
  conexion.query("SELECT * FROM especialidades", (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay registros");
  });
});

app.post("/especialidades/guardar", (req, res) => {
  const esp = { nombre: req.body.nombre, descripcion: req.body.descripcion };
  conexion.query("INSERT INTO especialidades SET ?", esp, (error) => {
    if (error) return console.error(error.message);
    res.json("Especialidad registrada correctamente");
  });
});

app.get("/especialidades/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM especialidades WHERE id_especialidad = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta[0] : "Especialidad no encontrada");
    },
  );
});

app.put("/especialidades/actualizar/:id", (req, res) => {
  const esp = { nombre: req.body.nombre, descripcion: req.body.descripcion };
  conexion.query(
    "UPDATE especialidades SET ? WHERE id_especialidad = ?",
    [esp, req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Especialidad actualizada correctamente");
    },
  );
});

app.delete("/especialidades/eliminar/:id", (req, res) => {
  conexion.query(
    "DELETE FROM especialidades WHERE id_especialidad = ?",
    [req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Especialidad eliminada correctamente");
    },
  );
});

// ENDPOINTS ESTABLECIMIENTOS
app.get("/establecimientos", (req, res) => {
  const consulta = `SELECT es.*, u.departamento, u.provincia, u.distrito 
                      FROM establecimientos_salud es 
                      JOIN ubicaciones u ON es.id_ubicacion = u.id_ubicacion`;
  conexion.query(consulta, (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay registros");
  });
});

app.post("/establecimientos/guardar", (req, res) => {
  const est = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    id_ubicacion: req.body.id_ubicacion,
    tipo: req.body.tipo,
  };
  conexion.query("INSERT INTO establecimientos_salud SET ?", est, (error) => {
    if (error) return console.error(error.message);
    res.json("Establecimiento registrado correctamente");
  });
});

app.get("/establecimientos/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM establecimientos_salud WHERE id_establecimiento = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta[0] : "Establecimiento no encontrado");
    },
  );
});

app.put("/establecimientos/actualizar/:id", (req, res) => {
  const est = {
    nombre: req.body.nombre,
    direccion: req.body.direccion,
    id_ubicacion: req.body.id_ubicacion,
    tipo: req.body.tipo,
  };
  conexion.query(
    "UPDATE establecimientos_salud SET ? WHERE id_establecimiento = ?",
    [est, req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Establecimiento actualizado correctamente");
    },
  );
});

app.delete("/establecimientos/eliminar/:id", (req, res) => {
  conexion.query(
    "DELETE FROM establecimientos_salud WHERE id_establecimiento = ?",
    [req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Establecimiento eliminado correctamente");
    },
  );
});

// ENDPOINTS CITAS
app.get("/citas", (req, res) => {
  const consulta = `SELECT c.*, 
                        CONCAT(p.nombres,' ',p.apellidos) AS paciente,
                        cd.fecha, cd.hora,
                        CONCAT(m.nombres,' ',m.apellidos) AS medico
                      FROM citas c
                      JOIN usuarios_pacientes p ON c.id_paciente = p.id_paciente
                      JOIN cupos_disponibles cd ON c.id_cupo = cd.id_cupo
                      JOIN medicos m ON cd.id_medico = m.id_medico`;
  conexion.query(consulta, (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay registros");
  });
});

app.get("/citas/paciente/:id", (req, res) => {
  const consulta = `SELECT c.*, 
                    CONCAT(m.nombres,' ',m.apellidos) AS medico,
                    cd.fecha, cd.hora
                  FROM citas c
                  JOIN cupos_disponibles cd ON c.id_cupo = cd.id_cupo
                  JOIN medicos m ON cd.id_medico = m.id_medico
                  WHERE c.id_paciente = ?
                  ORDER BY cd.fecha DESC, cd.hora DESC`;
  conexion.query(consulta, [req.params.id], (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay citas para este paciente");
  });
});

app.post("/citas/guardar", (req, res) => {
  const cita = {
    id_paciente: req.body.id_paciente,
    id_cupo: req.body.id_cupo,
    tipo_cita: req.body.tipo_cita,
    estado_cita: req.body.estado_cita || "pendiente",
    tipo_usuario: req.body.tipo_usuario,
  };
  conexion.query("INSERT INTO citas SET ?", cita, (error) => {
    if (error) return console.error(error.message);
    res.json("Cita registrada correctamente");
  });
});

app.put("/citas/estado/:id", (req, res) => {
  conexion.query(
    "UPDATE citas SET estado_cita=? WHERE id_cita=?",
    [req.body.estado_cita, req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Estado de cita actualizado");
    },
  );
});

app.delete("/citas/eliminar/:id", (req, res) => {
  conexion.query(
    "DELETE FROM citas WHERE id_cita = ?",
    [req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Cita eliminada correctamente");
    },
  );
});

// ENDPOINTS CUPOS
app.get("/cupos", (req, res) => {
  const consulta = `SELECT cd.*, 
                    CONCAT(m.nombres,' ',m.apellidos) AS medico,
                    e.nombre AS especialidad,
                    es.nombre AS establecimiento
                  FROM cupos_disponibles cd
                  JOIN medicos m ON cd.id_medico = m.id_medico
                  JOIN especialidades e ON m.id_especialidad = e.id_especialidad
                  JOIN establecimientos_salud es ON cd.id_establecimiento = es.id_establecimiento
                  WHERE cd.slots_disponibles > 0
                  ORDER BY cd.fecha, cd.hora`;
  conexion.query(consulta, (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay cupos disponibles");
  });
});

app.post("/cupos/guardar", (req, res) => {
  const cupo = {
    id_medico: req.body.id_medico,
    id_establecimiento: req.body.id_establecimiento,
    fecha: req.body.fecha,
    hora: req.body.hora,
    slots_totales: req.body.slots_totales,
    slots_disponibles: req.body.slots_disponibles,
    tipo_cita: req.body.tipo_cita,
  };
  conexion.query("INSERT INTO cupos_disponibles SET ?", cupo, (error) => {
    if (error) return console.error(error.message);
    res.json("Cupo registrado correctamente");
  });
});

app.get("/cupos/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM cupos_disponibles WHERE id_cupo = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta[0] : "Cupo no encontrado");
    },
  );
});

app.put("/cupos/actualizar/:id", (req, res) => {
  const cupo = {
    id_medico: req.body.id_medico,
    id_establecimiento: req.body.id_establecimiento,
    fecha: req.body.fecha,
    hora: req.body.hora,
    slots_totales: req.body.slots_totales,
    slots_disponibles: req.body.slots_disponibles,
    tipo_cita: req.body.tipo_cita,
  };
  conexion.query(
    "UPDATE cupos_disponibles SET ? WHERE id_cupo = ?",
    [cupo, req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Cupo actualizado correctamente");
    },
  );
});

app.delete("/cupos/eliminar/:id", (req, res) => {
  conexion.query(
    "DELETE FROM cupos_disponibles WHERE id_cupo = ?",
    [req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Cupo eliminado correctamente");
    },
  );
});

// ENDPOINTS RECETAS
app.get("/recetas", (req, res) => {
  conexion.query("SELECT * FROM recetas", (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay registros");
  });
});

app.get("/recetas/paciente/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM recetas WHERE id_paciente = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta : "No hay recetas para este paciente");
    },
  );
});

app.post("/recetas/guardar", (req, res) => {
  const receta = {
    id_cita: req.body.id_cita,
    id_paciente: req.body.id_paciente,
    estado_dispensacion: req.body.estado_dispensacion || "pendiente",
    observaciones: req.body.observaciones,
  };
  conexion.query("INSERT INTO recetas SET ?", receta, (error, resultado) => {
    if (error) return console.error(error.message);
    res.json({
      mensaje: "Receta registrada correctamente",
      id_receta: resultado.insertId,
    });
  });
});

// ENDPOINTS RECETA DETALLE
app.get("/recetas/detalle/:id_receta", (req, res) => {
  const consulta = `SELECT rd.*, m.nombre, m.presentacion, m.concentracion 
                      FROM receta_detalle rd 
                      JOIN medicamentos m ON rd.id_medicamento = m.id_medicamento 
                      WHERE rd.id_receta = ?`;
  conexion.query(consulta, [req.params.id_receta], (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta);
  });
});

app.post("/recetas/detalle/guardar", (req, res) => {
  const detalle = {
    id_receta: req.body.id_receta,
    id_medicamento: req.body.id_medicamento,
    dosis: req.body.dosis,
    frecuencia: req.body.frecuencia,
    duracion_dias: req.body.duracion_dias,
    cantidad: req.body.cantidad,
  };
  conexion.query("INSERT INTO receta_detalle SET ?", detalle, (error) => {
    if (error) return console.error(error.message);
    res.json("Detalle de receta registrado correctamente");
  });
});

// ENDPOINTS MEDICAMENTOS
app.get("/medicamentos", (req, res) => {
  conexion.query("SELECT * FROM medicamentos", (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta);
  });
});

app.post("/medicamentos/guardar", (req, res) => {
  const med = {
    nombre: req.body.nombre,
    presentacion: req.body.presentacion,
    concentracion: req.body.concentracion,
  };
  conexion.query("INSERT INTO medicamentos SET ?", med, (error) => {
    if (error) return console.error(error.message);
    res.json("Medicamento registrado correctamente");
  });
});

app.get("/medicamentos/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM medicamentos WHERE id_medicamento = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta[0] : "No encontrado");
    },
  );
});

app.put("/medicamentos/actualizar/:id", (req, res) => {
  const med = {
    nombre: req.body.nombre,
    presentacion: req.body.presentacion,
    concentracion: req.body.concentracion,
  };
  conexion.query(
    "UPDATE medicamentos SET ? WHERE id_medicamento = ?",
    [med, req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Medicamento actualizado correctamente");
    },
  );
});

app.delete("/medicamentos/eliminar/:id", (req, res) => {
  conexion.query(
    "DELETE FROM medicamentos WHERE id_medicamento = ?",
    [req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Medicamento eliminado correctamente");
    },
  );
});

// ENDPOINTS REFERENCIAS
app.get("/referencias", (req, res) => {
  conexion.query("SELECT * FROM referencias", (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay registros");
  });
});

app.post("/referencias/guardar", (req, res) => {
  const ref = {
    id_paciente: req.body.id_paciente,
    id_establecimiento_origen: req.body.id_establecimiento_origen,
    id_establecimiento_destino: req.body.id_establecimiento_destino,
    id_especialidad: req.body.id_especialidad,
    estado_referencia: req.body.estado_referencia || "pendiente",
  };
  conexion.query("INSERT INTO referencias SET ?", ref, (error) => {
    if (error) return console.error(error.message);
    res.json("Referencia registrada correctamente");
  });
});

app.get("/referencias/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM referencias WHERE id_referencia = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta[0] : "Referencia no encontrada");
    },
  );
});

app.get("/referencias/paciente/:id", (req, res) => {
  const consulta = `SELECT r.*, 
                        e.nombre AS especialidad,
                        es.nombre AS establecimiento_destino
                      FROM referencias r
                      JOIN especialidades e ON r.id_especialidad = e.id_especialidad
                      JOIN establecimientos_salud es ON r.id_establecimiento_destino = es.id_establecimiento
                      WHERE r.id_paciente = ?`;
  conexion.query(consulta, [req.params.id], (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay referencias para este paciente");
  });
});

app.put("/referencias/estado/:id", (req, res) => {
  conexion.query(
    "UPDATE referencias SET estado_referencia=? WHERE id_referencia=?",
    [req.body.estado_referencia, req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Estado de referencia actualizado");
    },
  );
});

app.delete("/referencias/eliminar/:id", (req, res) => {
  conexion.query(
    "DELETE FROM referencias WHERE id_referencia = ?",
    [req.params.id],
    (error) => {
      if (error) return console.error(error.message);
      res.json("Referencia eliminada correctamente");
    },
  );
});

// ENDPOINTS VACUNAS
app.get("/vacunas", (req, res) => {
  conexion.query("SELECT * FROM registro_vacunas", (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "No hay registros");
  });
});

app.get("/vacunas/paciente/:id", (req, res) => {
  conexion.query(
    "SELECT * FROM registro_vacunas WHERE id_paciente = ?",
    [req.params.id],
    (error, rpta) => {
      if (error) return console.error(error.message);
      res.json(rpta.length > 0 ? rpta : "Sin vacunas registradas");
    },
  );
});

app.post("/vacunas/guardar", (req, res) => {
  const vacuna = {
    id_paciente: req.body.id_paciente,
    nombre_vacuna: req.body.nombre_vacuna,
    tipo_carne: req.body.tipo_carne,
    dosis: req.body.dosis,
    fecha_aplicacion: req.body.fecha_aplicacion,
    id_establecimiento: req.body.id_establecimiento,
  };
  conexion.query("INSERT INTO registro_vacunas SET ?", vacuna, (error) => {
    if (error) return console.error(error.message);
    res.json("Vacuna registrada correctamente");
  });
});

// ENDPOINTS ADMIN
app.get("/admin/log", (req, res) => {
  const consulta = `SELECT l.*, a.nombre AS admin 
                      FROM admin_log l 
                      JOIN admin_usuarios a ON l.id_admin = a.id_admin 
                      ORDER BY l.fecha DESC`;
  conexion.query(consulta, (error, rpta) => {
    if (error) return console.error(error.message);
    res.json(rpta.length > 0 ? rpta : "Sin registros");
  });
});

app.post("/admin/log/guardar", (req, res) => {
  const log = {
    id_admin: req.body.id_admin,
    accion: req.body.accion,
    tabla_afectada: req.body.tabla_afectada,
    registro_id: req.body.registro_id,
  };
  conexion.query("INSERT INTO admin_log SET ?", log, (error) => {
    if (error) return console.error(error.message);
    res.json("Log registrado");
  });
});

// ENDPOINTS LOGIN
app.post("/login/paciente", (req, res) => {
  conexion.query(
    "SELECT * FROM usuarios_pacientes WHERE numero_documento = ? AND password_hash = ?",
    [req.body.numero_documento, req.body.password_hash],
    (error, rpta) => {
      if (error) return console.error(error.message);
      if (rpta.length > 0) {
        res.json(rpta[0]);
      } else {
        res.json("Documento o contraseña incorrectos");
      }
    },
  );
});

app.post("/login/admin", (req, res) => {
  conexion.query(
    "SELECT * FROM admin_usuarios WHERE email = ? AND password_hash = ?",
    [req.body.email, req.body.password_hash],
    (error, rpta) => {
      if (error) return console.error(error.message);
      if (rpta.length > 0) {
        res.json(rpta[0]);
      } else {
        res.json("Correo o contraseña incorrectos");
      }
    },
  );
});
