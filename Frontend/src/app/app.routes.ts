import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { ListaPacientes } from './pages/admin/pacientes/lista-pacientes/lista-pacientes';
import { FormularioPaciente } from './pages/admin/pacientes/formulario-paciente/formulario-paciente';
import { ListaMedicos } from './pages/admin/medicos/lista-medicos/lista-medicos';
import { FormularioMedico } from './pages/admin/medicos/formulario-medico/formulario-medico';
import { ListaCitas } from './pages/admin/citas/lista-citas/lista-citas';
import { ListaCupos } from './pages/admin/cupos/lista-cupos/lista-cupos';
import { FormularioCupo } from './pages/admin/cupos/formulario-cupo/formulario-cupo';
import { ListaRecetas } from './pages/admin/recetas/lista-recetas/lista-recetas';
import { ListaMedicamentos } from './pages/admin/medicamentos/lista-medicamentos/lista-medicamentos';
import { FormularioMedicamento } from './pages/admin/medicamentos/formulario-medicamento/formulario-medicamento';
import { ListaReferencias } from './pages/admin/referencias/lista-referencias/lista-referencias';
import { FormularioReferencia } from './pages/admin/referencias/formulario-referencia/formulario-referencia';
import { ListaVacunas } from './pages/admin/vacunas/lista-vacunas/lista-vacunas';
import { FormularioVacuna } from './pages/admin/vacunas/formulario-vacuna/formulario-vacuna';
import { ListaEstablecimientos } from './pages/admin/establecimientos/lista-establecimientos/lista-establecimientos';
import { FormularioEstablecimiento } from './pages/admin/establecimientos/formulario-establecimiento/formulario-establecimiento';
import { DashboardPaciente } from './pages/paciente/dashboard-paciente/dashboard-paciente';
import { MisCitas } from './pages/paciente/mis-citas/mis-citas';
import { ReservarCita } from './pages/paciente/reservar-cita/reservar-cita';
import { MisRecetas } from './pages/paciente/mis-recetas/mis-recetas';
import { MisVacunas } from './pages/paciente/mis-vacunas/mis-vacunas';
import { MisReferencias } from './pages/paciente/mis-referencias/mis-referencias';
import { ListaEspecialidades } from './pages/admin/especialidades/lista-especialidades/lista-especialidades';
import { FormularioEspecialidad } from './pages/admin/especialidades/formulario-especialidad/formulario-especialidad';
import { FormularioReceta } from './pages/admin/recetas/formulario-receta/formulario-receta';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },

  // ADMIN
  { path: 'admin/dashboard', component: Dashboard },
  { path: 'admin/pacientes', component: ListaPacientes },
  { path: 'admin/pacientes/nuevo', component: FormularioPaciente },
  { path: 'admin/pacientes/editar/:id', component: FormularioPaciente },
  { path: 'admin/medicos', component: ListaMedicos },
  { path: 'admin/medicos/nuevo', component: FormularioMedico },
  { path: 'admin/medicos/editar/:id', component: FormularioMedico },
  { path: 'admin/citas', component: ListaCitas },
  { path: 'admin/citas/nuevo', component: ListaCitas },
  { path: 'admin/cupos', component: ListaCupos },
  { path: 'admin/cupos/nuevo', component: FormularioCupo },
  { path: 'admin/cupos/editar/:id', component: FormularioCupo },
  { path: 'admin/recetas', component: ListaRecetas },
  { path: 'admin/recetas/nuevo', component: FormularioReceta },
  { path: 'admin/recetas/detalle/:id', component: FormularioReceta },
  { path: 'admin/medicamentos', component: ListaMedicamentos },
  { path: 'admin/medicamentos/nuevo', component: FormularioMedicamento },
  { path: 'admin/medicamentos/editar/:id', component: FormularioMedicamento },
  { path: 'admin/referencias', component: ListaReferencias },
  { path: 'admin/referencias/nuevo', component: FormularioReferencia },
  { path: 'admin/vacunas', component: ListaVacunas },
  { path: 'admin/vacunas/nuevo', component: FormularioVacuna },
  { path: 'admin/establecimientos', component: ListaEstablecimientos },
  { path: 'admin/establecimientos/nuevo', component: FormularioEstablecimiento },
  { path: 'admin/establecimientos/editar/:id', component: FormularioEstablecimiento },
  { path: 'admin/especialidades', component: ListaEspecialidades },
  { path: 'admin/especialidades/nuevo', component: FormularioEspecialidad },
  { path: 'admin/especialidades/editar/:id', component: FormularioEspecialidad },

  // PACIENTE
  { path: 'paciente/dashboard', component: DashboardPaciente },
  { path: 'paciente/mis-citas', component: MisCitas },
  { path: 'paciente/reservar', component: ReservarCita },
  { path: 'paciente/mis-recetas', component: MisRecetas },
  { path: 'paciente/mis-vacunas', component: MisVacunas },
  { path: 'paciente/mis-referencias', component: MisReferencias },
];
