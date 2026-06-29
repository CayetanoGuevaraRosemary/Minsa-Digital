# Minsa-Digital

Plataforma web educativa que digitaliza la gestión de salud pública inspirada en los servicios del MINSA (Ministerio de Salud del Perú).

> Los datos utilizados son **completamente ficticios**, pero los módulos reflejan flujos reales de un sistema de salud para un correcto uso tanto del administrador como del paciente.

---

## Desarrollado por

- **Rosemary Cayetano Guevara**
- **Mateo Pozo**

Proyecto académico universitario.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Angular 21 |
| Backend | Node.js + Express |
| Base de datos | MySQL |
| ORM/Driver | mysql2 |
| Estilos | CSS |

---

## Módulos del Sistema

### Rol Administrador
- Gestión de pacientes (CRUD)
- Gestión de médicos (CRUD)
- Gestión de establecimientos de salud (CRUD)
- Gestión de cupos disponibles
- Gestión de citas médicas
- Gestión de recetas y medicamentos
- Registro de vacunas
- Referencias médicas entre establecimientos
- Log de auditoría

### Rol Paciente
- Ver y reservar citas
- Consultar mis recetas
- Historial de vacunas
- Mis referencias médicas

---

## Estructura del Proyecto

```
Minsa Digital/
├── Backend/
│   ├── index.js
│   └── package.json
├── Frontend/
│   └── src/
│       └── app/
│           ├── pages/
│           ├── services/
│           ├── model/
│           └── shared/
└── Database/
    ├── minsa_digital.sql
    └── minsa_digital_data.sql
```

---

## Instalación y Uso

### Backend
```bash
cd Backend
npm install
npm run dev
```

### Frontend
```bash
cd Frontend
npm install
ng serve
```

### Base de Datos
Importar en MySQL en este orden:
```bash
mysql -u root -p < Database/minsa_digital.sql
mysql -u root -p minsa_digital < Database/minsa_digital_data.sql
```

---

## Puertos
- Frontend: `http://localhost:4200`
- API REST: `http://localhost:3000`
