import { useEffect, useState, type ReactNode } from "react";
import utpLogo from "./imports/utp-logo.png";

type IconName =
  | "home"
  | "monitor"
  | "search"
  | "chart"
  | "card"
  | "folder"
  | "edit"
  | "document"
  | "graduation"
  | "logout"
  | "calendar"
  | "clock"
  | "menu"
  | "help"
  | "user"
  | "mail"
  | "key"
  | "phone"
  | "info"
  | "list"
  | "check"
  | "download"
  | "send"
  | "alert"
  | "eye"
  | "eyeOff"
  | "megaphone";

const paths: Record<IconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-7h6v7" /></>,
  monitor: <><rect x="3" y="4" width="18" height="13" rx="1" /><path d="M8 21h8m-4-4v4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  chart: <><path d="M4 20V10m5 10V5m5 15v-8m5 8V3" /></>,
  card: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h4" /></>,
  folder: <path d="M3 7h7l2 3h9l-2 9H3zM3 7V5h7l2 2" />,
  edit: <><path d="M12 20H4V6h8" /><path d="m10 14 9-9 2 2-9 9-3 1z" /></>,
  document: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7m-7 4h7" /></>,
  graduation: <><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c3 3 9 3 12 0v-5M22 9v7" /></>,
  logout: <><path d="M12 2v10" /><path d="M18.4 6.6a9 9 0 1 1-12.8 0" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4m8-4v4M4 10h16" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 2" /></>,
  menu: <path d="M5 7h14M5 12h14M5 17h14" />,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.1 2.3c-.9.4-.9 1-.9 1.7M12 17h.01" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M5 21c0-4 3-7 7-7s7 3 7 7" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 7 9-7" /></>,
  key: <><circle cx="8" cy="15" r="3" /><path d="m10 13 8-8m-2 2 2 2m-5 1 2 2" /></>,
  phone: <path d="M6 3h4l1 5-3 2c2 4 4 6 8 8l2-3 4 1v4c0 1-1 2-2 2C10 21 3 14 4 5c0-1 1-2 2-2z" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
  list: <><path d="M9 7h11M9 12h11M9 17h11" /><circle cx="5" cy="7" r=".6" /><circle cx="5" cy="12" r=".6" /><circle cx="5" cy="17" r=".6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 19h14" /></>,
  send: <path d="m3 11 18-8-8 18-2-8zM11 13l10-10" />,
  alert: <><path d="M12 4 3 20h18z" /><path d="M12 9v5M12 17h.01" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="2.5" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 6.2A10.7 10.7 0 0 1 12 6c6.5 0 10 6 10 6a16 16 0 0 1-3.1 3.6M6.2 6.3C3.5 8 2 12 2 12s3.5 6 10 6c1 0 2-.2 2.9-.5" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  megaphone: <><path d="m3 11 18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>,
};

function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

type MenuItemConfig = {
  label: string;
  icon: IconName;
  expandable?: boolean;
  subItems?: string[];
};

const menuItems: MenuItemConfig[] = [
  { label: "Inicio", icon: "home" },
  {
    label: "Matrícula",
    icon: "monitor",
    expandable: true,
    subItems: ["Matrícula", "Prematrícula"],
  },
  {
    label: "Consultas",
    icon: "search",
    expandable: true,
    subItems: [
      "Información de Matrícula",
      "Horario de Clase",
      "Listado de Grupos",
      "Estado de Solicitud de Cambio de Nota",
      "Estado de Solicitud de Créditos",
      "Estado de Solicitud de RI",
      "Estado de Solicitud de Asignatura",
      "Constancia de Matrícula",
      "Comprobante Banconal",
      "Tutor Académico",
      "Calendario de Exámenes",
      "Carné Digital Estudiantil",
      "Listado de Precalificación",
      "Estado de Solicitud de Certificación de Constancia",
    ],
  },
  {
    label: "Historial",
    icon: "chart",
    expandable: true,
    subItems: ["Historial Académico", "Avance del Plan de Estudio"],
  },
  {
    label: "Estado de cuenta",
    icon: "card",
    expandable: true,
    subItems: ["Estado de Cuenta", "Detalle de Pagos"],
  },
  {
    label: "Retiro e Inclusión",
    icon: "folder",
    expandable: true,
    subItems: [
      "Solicitud de RI",
      "Modificar Solicitud RI",
      "Solicitud de Retiro Fuera de Período o Total",
    ],
  },
  {
    label: "Solicitudes",
    icon: "edit",
    expandable: true,
    subItems: [
      "Cambio de Nota",
      "Historial Académico",
      "Autorización de Asignatura",
      "Certificación de Constancia de Matrícula",
      "Solicitud de título",
    ],
  },
  { label: "Solicitud de título", icon: "graduation" },
  { label: "Salir", icon: "logout" },
];

export type StudentProfileData = {
  estudiante_id?: number;
  usuario_id?: number;
  cedula: string;
  matricula: string;
  nombres: string;
  apellidos: string;
  correo: string;
  facultad: string;
  carrera: string;
  plan_estudio: string;
  sede: string;
  ano_estudio: number;
  turno: string;
  telefono: string;
  telefono_secundario: string;
  correo_secundario: string;
  direccion: string;
  creditos_aprobados: number;
  creditos_totales: number;
  horas_servicio_social: number;
  horas_voluntariado: number;
  indice_academico: number;
  ingles_cel: boolean;
  paz_y_salvo: boolean;
  capitulo_honor: boolean;
  habilitado_tecnico: boolean;
  habilitado_licenciatura: boolean;
  habilitado_ingenieria: boolean;
};

export type ReviewerUser = {
  usuario_id?: number;
  cedula: string;
  nombre: string;
  correo: string;
  rol: string;
  area_cargo: string;
};

const defaultStudentsList: StudentProfileData[] = [
  {
    estudiante_id: 1,
    usuario_id: 1,
    cedula: "3-749-2120",
    matricula: "2023-03-2120",
    nombres: "Israel",
    apellidos: "Vergara",
    correo: "israel.vergara@utp.ac.pa",
    facultad: "INGENIERÍA DE SISTEMAS COMPUTACIONALES",
    carrera: "LIC. EN DESAR. Y GEST. DE SOF.",
    plan_estudio: "LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023",
    sede: "COLÓN",
    ano_estudio: 4,
    turno: "NOCTURNO",
    telefono: "63533040",
    telefono_secundario: "65882460",
    correo_secundario: "israel.vergara@gmail.com",
    direccion: "Barrio Norte, ciudad de Colón",
    creditos_aprobados: 132,
    creditos_totales: 148,
    horas_servicio_social: 60,
    horas_voluntariado: 25,
    indice_academico: 2.07,
    ingles_cel: true,
    paz_y_salvo: true,
    capitulo_honor: false,
    habilitado_tecnico: true,
    habilitado_licenciatura: true,
    habilitado_ingenieria: false,
  },
  {
    estudiante_id: 2,
    usuario_id: 2,
    cedula: "8-921-1843",
    matricula: "2022-08-1843",
    nombres: "María",
    apellidos: "González",
    correo: "maria.gonzalez@utp.ac.pa",
    facultad: "INGENIERÍA DE SISTEMAS COMPUTACIONALES",
    carrera: "LIC. EN DESAR. Y GEST. DE SOF.",
    plan_estudio: "LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023",
    sede: "PANAMÁ",
    ano_estudio: 4,
    turno: "DIURNO",
    telefono: "6678-1442",
    telefono_secundario: "6611-2090",
    correo_secundario: "mariagonzalez@gmail.com",
    direccion: "San Francisco, ciudad de Panamá",
    creditos_aprobados: 148,
    creditos_totales: 148,
    horas_servicio_social: 60,
    horas_voluntariado: 25,
    indice_academico: 2.68,
    ingles_cel: true,
    paz_y_salvo: true,
    capitulo_honor: true,
    habilitado_tecnico: true,
    habilitado_licenciatura: true,
    habilitado_ingenieria: false,
  },
  {
    estudiante_id: 3,
    usuario_id: 3,
    cedula: "4-812-963",
    matricula: "2021-04-0963",
    nombres: "Carlos",
    apellidos: "Rodríguez",
    correo: "carlos.rodriguez@utp.ac.pa",
    facultad: "INGENIERÍA DE SISTEMAS COMPUTACIONALES",
    carrera: "INGENIERÍA DE SOFTWARE",
    plan_estudio: "INGENIERÍA DE SOFTWARE-2021",
    sede: "CHIRIQUÍ",
    ano_estudio: 5,
    turno: "DIURNO",
    telefono: "6214-9081",
    telefono_secundario: "6400-8812",
    correo_secundario: "carlos.r@email.com",
    direccion: "David, provincia de Chiriquí",
    creditos_aprobados: 178,
    creditos_totales: 178,
    horas_servicio_social: 60,
    horas_voluntariado: 30,
    indice_academico: 2.35,
    ingles_cel: true,
    paz_y_salvo: true,
    capitulo_honor: false,
    habilitado_tecnico: true,
    habilitado_licenciatura: true,
    habilitado_ingenieria: true,
  },
  {
    estudiante_id: 4,
    usuario_id: 4,
    cedula: "6-715-1094",
    matricula: "2023-06-1094",
    nombres: "Ana",
    apellidos: "Martínez",
    correo: "ana.martinez@utp.ac.pa",
    facultad: "INGENIERÍA DE SISTEMAS COMPUTACIONALES",
    carrera: "LIC. EN DESAR. Y GEST. DE SOF.",
    plan_estudio: "LIC. EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023",
    sede: "VERAGUAS",
    ano_estudio: 3,
    turno: "VESPERTINO",
    telefono: "6992-5570",
    telefono_secundario: "6801-1209",
    correo_secundario: "anam@email.com",
    direccion: "Santiago, provincia de Veraguas",
    creditos_aprobados: 88,
    creditos_totales: 148,
    horas_servicio_social: 40,
    horas_voluntariado: 10,
    indice_academico: 1.89,
    ingles_cel: false,
    paz_y_salvo: true,
    capitulo_honor: false,
    habilitado_tecnico: false,
    habilitado_licenciatura: false,
    habilitado_ingenieria: false,
  },
];

const defaultReviewersList: ReviewerUser[] = [
  {
    usuario_id: 5,
    cedula: "8-710-1001",
    nombre: "Secretaría General UTP",
    correo: "secretaria.general@utp.ac.pa",
    rol: "Revisor",
    area_cargo: "Secretaría General",
  },
  {
    usuario_id: 6,
    cedula: "8-720-2002",
    nombre: "Finanzas UTP",
    correo: "finanzas@utp.ac.pa",
    rol: "Finanzas",
    area_cargo: "Área Financiera",
  },
  {
    usuario_id: 7,
    cedula: "8-730-3003",
    nombre: "Administrador DITIC",
    correo: "admin.ditic@utp.ac.pa",
    rol: "Administrador",
    area_cargo: "Administrador DITIC",
  },
];

function Sidebar({
  selected,
  activeParent,
  studentName,
  onSelect,
  onExit,
}: {
  selected: string;
  activeParent: string;
  studentName: string;
  onSelect: (label: string, parentLabel?: string) => void;
  onExit: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleParentClick = (item: MenuItemConfig) => {
    if (item.label === "Salir") {
      onExit();
      return;
    }
    if (item.expandable && item.subItems) {
      setOpenMenu((prev) => (prev === item.label ? null : item.label));
      return;
    }
    setOpenMenu(null);
    onSelect(item.label, item.label);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="small-avatar">
          <Icon name="user" size={40} />
        </div>
        <div>
          <strong>Hola, {studentName.toUpperCase()}</strong>
          <span className="online"><i /> En línea</span>
          <span className="period">Periodo: II-2026</span>
        </div>
      </div>
      <nav aria-label="Menú principal">
        {menuItems.map((item) => {
          const isOpen = openMenu === item.label;
          const isCurrentParent = activeParent === item.label && !item.expandable;
          const isDarkParent = isOpen;

          return (
            <div className="nav-group" key={item.label}>
              <button
                aria-expanded={item.expandable ? isOpen : undefined}
                className={`nav-item ${isCurrentParent ? "active" : ""} ${isDarkParent ? "expanded-parent" : ""}`}
                onClick={() => handleParentClick(item)}
                type="button"
              >
                <Icon name={item.icon} size={15} />
                <span>{item.label}</span>
                {item.expandable && <b className={isOpen ? "open" : ""}>‹</b>}
              </button>

              {item.expandable && isOpen && item.subItems && (
                <div className="sub-menu">
                  {item.subItems.map((sub) => {
                    const isSubSelected = selected === sub && activeParent === item.label;
                    return (
                      <button
                        className={`sub-nav-item ${isSubSelected ? "active-sub" : ""}`}
                        key={sub}
                        onClick={() => onSelect(sub, item.label)}
                        type="button"
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function StudentHome({
  student,
  onGoToDiploma,
}: {
  student: StudentProfileData;
  onGoToDiploma: () => void;
}) {
  const dynamicDetails: [string, string][] = [
    ["Sede", student.sede.toUpperCase()],
    ["Facultad", student.facultad.toUpperCase()],
    ["Carrera", student.carrera.toUpperCase()],
    ["Plan", student.plan_estudio.toUpperCase()],
    ["Año de Estudio", String(student.ano_estudio)],
    ["Indice", Number(student.indice_academico).toFixed(2)],
    ["Turno", student.turno.toUpperCase()],
    ["Activo", "SI"],
    ["Cita de Matrícula", "DESDE MARTES 4 DE AGOSTO DE 2026 A PARTIR DE LAS 03:10 PM"],
    ["Fecha del Servidor", "19/11/2026"],
    ["Hora del Servidor", "6:52:35 PM"],
  ];

  const totalHours = Number(student.horas_servicio_social) + Number(student.horas_voluntariado);

  return (
    <>
      <div className="notice">
        <Icon name="info" size={18} />
        <div>
          <strong>Atención</strong>
          <p>Usted esta debidamente matriculado en este periodo <b>II-2026</b></p>
        </div>
        <button aria-label="Cerrar aviso" type="button">×</button>
      </div>

      <div className="schedule-banner">
        <div className="schedule-title">
          <Icon name="megaphone" size={16} />
          <strong>Programación de Matrícula</strong>
        </div>
        <p>
          • Conozca las actividades de matrícula para el <span className="semester-red">II SEMESTRE 2026</span>{" "}
          <button className="program-link" onClick={onGoToDiploma} type="button">
            <Icon name="eye" size={13} /> <b>Ver Programación</b>
          </button>
        </p>
      </div>

      <div className="dashboard-grid">
        <section className="student-card">
          <div className="large-avatar"><Icon name="user" size={95} /></div>
          <label><input defaultChecked type="checkbox" /> Omitir Fotografía</label>
          <h2>{student.apellidos.toUpperCase()}, {student.nombres.toUpperCase()}</h2>
          <p>{student.cedula === "3-749-2120" ? "03-0749-002120" : student.cedula}</p>
          <div className="contact">
            <h3>Información de Contacto:</h3>
            <p><Icon name="mail" size={14} /> Email: <b>{student.correo}</b></p>
            <p><Icon name="key" size={14} /> Contraseña Inicial: <b>Id60395eb!044*</b></p>
            <p><Icon name="phone" size={14} /> Teléfono 1: {student.telefono}</p>
            <p><Icon name="phone" size={14} /> Teléfono 2: {student.telefono_secundario || "65882460"}</p>
          </div>
        </section>

        <section className="details">
          {dynamicDetails.map(([label, value], index) => (
            <div className="detail-row" key={label}>
              <strong>{label}</strong>
              <span className={index === 2 ? "career-bold" : ""}>
                {index === 9 && <Icon name="calendar" size={13} />}
                {index === 10 && <Icon name="clock" size={13} />}
                {value}
              </span>
            </div>
          ))}
          <div className="stats">
            <div className="stat social">
              <b>{student.horas_servicio_social}</b>
              <strong>Horas Servicio Social</strong>
              <Icon name="clock" size={68} />
            </div>
            <div className="stat volunteer">
              <b>{student.horas_voluntariado}</b>
              <strong>Horas Voluntariado</strong>
              <span className="people">Ⅱ</span>
            </div>
            <div className="stat total">
              <b>{totalHours}</b>
              <strong>Horas Totales</strong>
              <Icon name="clock" size={68} />
              <span className="stat-link">Ir a Servicio Social Universitario ➔</span>
            </div>
          </div>
        </section>
      </div>
      <div className="preference"><Icon name="list" /> Preferencias de Matrícula</div>
    </>
  );
}

function MatriculaInactiveView() {
  return (
    <section className="inactive-wrapper">
      <div className="warning-notice">
        <Icon name="alert" size={18} />
        <div>
          <strong>Atención</strong>
          <p>El período de matrícula está inactivo</p>
        </div>
        <button aria-label="Cerrar aviso" type="button">×</button>
      </div>
      <div className="utp-copyright">© 2026 - Universidad Tecnológica de Panamá - DITIC</div>
    </section>
  );
}

type Degree = "tecnico" | "licenciatura" | "ingenieria";

const degreeLabels: Record<Degree, string> = {
  tecnico: "Técnico en Desarrollo de Software",
  licenciatura: "Licenciatura en Desarrollo y Gestión de Software",
  ingenieria: "Ingeniería de Software",
};

type RequirementRow = {
  requisito: string;
  detalle: string;
  estado: "Completo" | "En revisión" | "Pendiente";
};

function getStudentDegreeRequirements(student: StudentProfileData, degree: Degree): RequirementRow[] {
  const totalSocial = Number(student.horas_servicio_social) + Number(student.horas_voluntariado);
  const socialOk = Number(student.horas_servicio_social) >= 60;
  const pazOk = Boolean(student.paz_y_salvo);
  const inglesOk = Boolean(student.ingles_cel);

  if (degree === "tecnico") {
    const planTecOk = Boolean(student.habilitado_tecnico) && Number(student.creditos_aprobados) >= 105;
    return [
      {
        requisito: "Plan de estudios (I a III año)",
        detalle: planTecOk
          ? `Asignaturas del bloque técnico aprobadas (${student.creditos_aprobados} créditos • Índice: ${Number(student.indice_academico).toFixed(2)})`
          : `Posee asignaturas pendientes del bloque técnico (${student.creditos_aprobados} / 105 créditos requeridos)`,
        estado: planTecOk ? "Completo" : "Pendiente",
      },
      {
        requisito: "Servicio Social Universitario",
        detalle: `${student.horas_servicio_social} h de Servicio Social y ${student.horas_voluntariado} h de Voluntariado (${totalSocial} h registradas)`,
        estado: socialOk ? "Completo" : "Pendiente",
      },
      {
        requisito: "Paz y Salvo institucional (SIPAF)",
        detalle: pazOk
          ? "Sin saldos pendientes en Finanzas, Biblioteca ni Laboratorios"
          : "Mantiene saldo o préstamo pendiente en el sistema SIPAF",
        estado: pazOk ? "Completo" : "Pendiente",
      },
      {
        requisito: "Arancel de diploma e historial académico",
        detalle: student.capitulo_honor
          ? "Exonerado por pertenecer al Capítulo de Honor Sigma Lambda"
          : "Diploma B/. 63.00 + Historial académico de graduado B/. 10.00 (Total: B/. 73.00)",
        estado: "Completo",
      },
    ];
  }

  if (degree === "licenciatura") {
    const licCompleta = Boolean(student.habilitado_licenciatura) && Number(student.creditos_aprobados) >= 148;
    const licEnCurso = Boolean(student.habilitado_licenciatura) && Number(student.creditos_aprobados) >= 120;
    return [
      {
        requisito: "Plan de estudios de Licenciatura (I a IV año)",
        detalle: licCompleta
          ? `100% de asignaturas de Licenciatura aprobadas (${student.creditos_aprobados} / ${student.creditos_totales} créditos)`
          : licEnCurso
            ? `Cursando IV año (${student.creditos_aprobados} / ${student.creditos_totales} créditos) — Sujeto a cierre de actas`
            : `Créditos insuficientes para Licenciatura (${student.creditos_aprobados} / 148 créditos)`,
        estado: licCompleta ? "Completo" : licEnCurso ? "En revisión" : "Pendiente",
      },
      {
        requisito: "Opción de Trabajo de Graduación",
        detalle: licCompleta
          ? "Opción de trabajo de graduación registrada en expediente"
          : licEnCurso
            ? "Tesis, Práctica Profesional o Asignaturas de Postgrado en validación"
            : "Requiere aprobar las asignaturas de IV año para sustentar",
        estado: licCompleta ? "Completo" : licEnCurso ? "En revisión" : "Pendiente",
      },
      {
        requisito: "Certificación del Idioma Inglés (CEL)",
        detalle: inglesOk
          ? "Certificación emitida por el Centro Especializado en Lenguas"
          : "No registra certificación vigente del idioma inglés en el CEL UTP",
        estado: inglesOk ? "Completo" : "Pendiente",
      },
      {
        requisito: "Servicio Social Universitario y Paz y Salvo",
        detalle:
          socialOk && pazOk
            ? `${totalSocial} horas totales completadas y estado financiero al día`
            : `Servicio Social: ${student.horas_servicio_social}/60 h • Paz y Salvo: ${pazOk ? "Al día" : "Pendiente"}`,
        estado: socialOk && pazOk ? "Completo" : "Pendiente",
      },
      {
        requisito: "Arancel de diploma e historial académico",
        detalle: student.capitulo_honor
          ? "Exonerado por pertenecer al Capítulo de Honor Sigma Lambda"
          : "Diploma B/. 63.00 + Historial académico de graduado B/. 10.00 (Total: B/. 73.00)",
        estado: "Completo",
      },
    ];
  }

  const ingOk = Boolean(student.habilitado_ingenieria) && Number(student.creditos_aprobados) >= 175;
  return [
    {
      requisito: "Plan de estudios de Ingeniería (I a V año)",
      detalle: ingOk
        ? `100% de asignaturas de Ingeniería aprobadas (${student.creditos_aprobados} / ${student.creditos_totales} créditos)`
        : `Posee asignaturas pendientes correspondientes al V año del plan de Ingeniería (${student.creditos_aprobados} / 178 créditos)`,
      estado: ingOk ? "Completo" : "Pendiente",
    },
    {
      requisito: "Opción de Trabajo de Graduación de Ingeniería",
      detalle: ingOk
        ? "Trabajo de Graduación / Tesis de Ingeniería aprobada"
        : "Requiere culminar el plan de estudios de V año para habilitar la sustentación",
      estado: ingOk ? "Completo" : "Pendiente",
    },
    {
      requisito: "Certificación del Idioma Inglés (CEL)",
      detalle: inglesOk
        ? "Certificación emitida por el Centro Especializado en Lenguas"
        : "No registra certificación vigente del idioma inglés en el CEL UTP",
      estado: inglesOk ? "Completo" : "Pendiente",
    },
    {
      requisito: "Servicio Social Universitario y Paz y Salvo",
      detalle:
        socialOk && pazOk
          ? `${totalSocial} h registradas y Paz y Salvo verificado en SIPAF`
          : `Servicio Social: ${student.horas_servicio_social}/60 h • Paz y Salvo: ${pazOk ? "Al día" : "Pendiente"}`,
      estado: socialOk && pazOk ? "Completo" : "Pendiente",
    },
  ];
}

function TitleRequest({ student }: { student: StudentProfileData }) {
  const defaultDeg: Degree = student.habilitado_ingenieria
    ? "ingenieria"
    : student.creditos_aprobados >= 148
      ? "licenciatura"
      : "tecnico";
  const [degree, setDegree] = useState<Degree>(defaultDeg);
  const [view, setView] = useState<"form" | "status">("form");
  const [showRejection, setShowRejection] = useState(false);
  const [diplomaName, setDiplomaName] = useState(`${student.nombres} ${student.apellidos}`.toUpperCase());
  const [phone, setPhone] = useState(student.telefono || "6353-3040");
  const [secondaryEmail, setSecondaryEmail] = useState(
    student.correo_secundario || student.correo.replace("@utp.ac.pa", "@gmail.com")
  );
  const [address, setAddress] = useState(student.direccion || `Centro Regional de ${student.sede}`);
  const [graduationOption, setGraduationOption] = useState("Práctica Profesional");
  const [paymentMethod, setPaymentMethod] = useState("Banco Nacional de Panamá (Comprobante Banconal)");
  const [paymentReceipt, setPaymentReceipt] = useState("BNC-2026-04821");
  const [honorChapter, setHonorChapter] = useState(Boolean(student.capitulo_honor));
  const [idFileName, setIdFileName] = useState(`cedula_${student.cedula}.pdf`);
  const [receiptFileName, setReceiptFileName] = useState("recibo_arancel_secretaria.pdf");
  const [requestNumber, setRequestNumber] = useState("ST-2026-00482");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setDiplomaName(`${student.nombres} ${student.apellidos}`.toUpperCase());
    setPhone(student.telefono || "6353-3040");
    setSecondaryEmail(student.correo_secundario || student.correo.replace("@utp.ac.pa", "@gmail.com"));
    setAddress(student.direccion || `Centro Regional de ${student.sede}`);
    setHonorChapter(Boolean(student.capitulo_honor));
    setIdFileName(`cedula_${student.cedula}.pdf`);
    setDegree(
      student.habilitado_ingenieria
        ? "ingenieria"
        : student.creditos_aprobados >= 148
          ? "licenciatura"
          : "tecnico"
    );
    setView("form");
  }, [student]);

  const requirements = getStudentDegreeRequirements(student, degree);
  const hasPendingRequirements = requirements.some((r) => r.estado === "Pendiente");
  const allRequirementsComplete = requirements.every((r) => r.estado === "Completo");

  const submitRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError("");

    if (!diplomaName.trim() || !phone.trim() || !address.trim()) {
      setValidationError("Por favor complete todos los datos personales obligatorios antes de continuar.");
      return;
    }

    if (!honorChapter && !paymentReceipt.trim()) {
      setValidationError("Debe indicar el número de comprobante de pago del arancel (B/. 73.00) o marcar exoneración por Capítulo de Honor.");
      return;
    }

    if (hasPendingRequirements) {
      setShowRejection(true);
      return;
    }

    const estadoDb = allRequirementsComplete && degree === "tecnico" ? "Aprobada" : "En revision";

    try {
      const response = await fetch("/api/db/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cedula: student.cedula,
          titulo: degreeLabels[degree],
          nivel_academico: degree,
          enfoque_solicitud: degree === "tecnico" ? "curricular" : "graduacion",
          modalidad_graduacion: degree === "tecnico" ? "Culminación de plan técnico" : graduationOption,
          recibo_pago: honorChapter ? "EXONERADO-HONOR" : paymentReceipt,
          nombreDiploma: diplomaName,
          estado: estadoDb,
          observaciones: `Modalidad: ${degree === "tecnico" ? "Salida intermedia curricular" : graduationOption} | Comprobante: ${honorChapter ? "Exonerado (Capítulo de Honor)" : paymentReceipt}`,
        }),
      });
      const data = await response.json();
      if (data.ok && data.numero_solicitud) {
        setRequestNumber(data.numero_solicitud);
      }
    } catch {
      // Mantiene el número por defecto
    }

    setView("status");
  };

  const downloadCopy = () => {
    const confirmed = allRequirementsComplete && degree === "tecnico";
    const status = confirmed ? "CONFIRMADO - ORDEN DE RETIRO EMITIDA" : "EN REVISIÓN FINAL DE CRÉDITOS";
    const copy = [
      "UNIVERSIDAD TECNOLÓGICA DE PANAMÁ",
      "SECRETARÍA GENERAL",
      "CONSTANCIA DE SOLICITUD DE REVISIÓN FINAL Y DIPLOMA",
      "",
      `Número de solicitud: ${requestNumber}`,
      "Fecha: 19/11/2026",
      `Sede / Centro Regional: ${student.sede.toUpperCase()}`,
      `Estudiante: ${student.apellidos.toUpperCase()}, ${student.nombres.toUpperCase()}`,
      `Cédula: ${student.cedula}`,
      `Facultad: ${student.facultad}`,
      `Carrera: ${student.carrera}`,
      `Título solicitado: ${degreeLabels[degree]}`,
      `Nombre impreso en el diploma: ${diplomaName}`,
      `Opción de trabajo de graduación: ${degree === "tecnico" ? "Salida intermedia curricular (III año completado)" : graduationOption}`,
      `Arancel (Diploma B/.63.00 + Historial B/.10.00): ${honorChapter ? "Exonerado (Capítulo de Honor)" : `B/. 73.00 (${paymentReceipt})`}`,
      `Estado del trámite: ${status}`,
    ].join("\n");
    const url = URL.createObjectURL(new Blob([copy], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `constancia-revision-final-${requestNumber}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (view === "status") {
    const confirmed = allRequirementsComplete && degree === "tecnico";
    return (
      <section className="request-wrapper">
        <div className="status-card">
          <div className={`status-icon ${confirmed ? "confirmed" : "pending"}`}>
            <Icon name={confirmed ? "check" : "clock"} size={38} />
          </div>
          <span className={`status-badge ${confirmed ? "confirmed" : "pending"}`}>
            {confirmed ? "Orden de retiro emitida" : "En revisión final de créditos"}
          </span>
          <h2>{confirmed ? "Su título está listo para retiro" : "Solicitud de Revisión Final registrada"}</h2>
          <p className="status-description">
            {confirmed
              ? `La Secretaría Académica verificó que cumple con la totalidad de créditos y requisitos del nivel Técnico. Se ha emitido su Orden de Retiro de Diploma; puede retirarlo en la Secretaría Académica del Centro Regional de ${student.sede} presentando su cédula.`
              : "Su expediente ha sido enviado a la bandeja de Secretaría General para la Revisión Final de Créditos. Una vez validados los documentos y el acta de graduación, recibirá la Orden de Retiro de Diploma."}
          </p>

          <div className="request-summary">
            <div><span>N.º de solicitud</span><strong>{requestNumber}</strong></div>
            <div><span>Título solicitado</span><strong>{degreeLabels[degree]}</strong></div>
            <div><span>Nombre en el diploma</span><strong>{diplomaName}</strong></div>
            <div><span>Arancel de Secretaría General</span><strong>{honorChapter ? "Exonerado (Capítulo de Honor)" : `B/. 73.00 — Recibo ${paymentReceipt}`}</strong></div>
          </div>

          <div className="status-actions">
            <button className="secondary-button" onClick={() => setView("form")} type="button">
              Regresar al formulario
            </button>
            <button className="primary-button" onClick={downloadCopy} type="button">
              <Icon name="download" /> Descargar constancia
            </button>
          </div>
        </div>
      </section>
    );
  }

  const pendingList = requirements.filter((r) => r.estado === "Pendiente");

  return (
    <section className="request-wrapper">
      <form className="request-card" noValidate onSubmit={submitRequest}>
        <div className="request-heading">
          <div className="request-heading-icon"><Icon name="graduation" size={26} /></div>
          <div>
            <h2>Solicitud de Revisión Final y Diploma</h2>
            <p>Secretaría General — Verificación de requisitos académicos y solicitud de título universitario.</p>
          </div>
        </div>

        <div className="form-notice">
          <Icon name="info" />
          <span>
            El nombre que indique para el diploma debe coincidir exactamente con su cédula de identidad personal.
          </span>
        </div>

        <fieldset className="degree-fieldset">
          <legend>1. Seleccione el título a solicitar</legend>
          <div className="degree-options">
            {(Object.keys(degreeLabels) as Degree[]).map((value) => (
              <label className={`degree-option ${degree === value ? "selected" : ""}`} key={value}>
                <input
                  checked={degree === value}
                  name="degree"
                  onChange={() => {
                    setDegree(value);
                    setValidationError("");
                  }}
                  type="radio"
                  value={value}
                />
                <span className="degree-icon"><Icon name="graduation" size={23} /></span>
                <span>
                  <strong>
                    {value === "tecnico" ? "Técnico" : value === "licenciatura" ? "Licenciatura" : "Ingeniería"}
                  </strong>
                  <small>{degreeLabels[value]}</small>
                </span>
              </label>
            ))}
          </div>

          <div className="requirements-panel">
            <div className="requirements-panel-header">
              <strong>Verificación de requisitos en su expediente ({degreeLabels[degree]})</strong>
              <span className={`req-overall-badge ${hasPendingRequirements ? "no-cumple" : allRequirementsComplete ? "cumple" : "revision"}`}>
                {hasPendingRequirements
                  ? "Requisitos incompletos"
                  : allRequirementsComplete
                    ? "Habilitado para solicitud"
                    : "Sujeto a revisión final"}
              </span>
            </div>
            <table className="requirements-table">
              <thead>
                <tr>
                  <th>Requisito reglamentario UTP</th>
                  <th>Detalle en el expediente</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {requirements.map((item) => (
                  <tr key={item.requisito}>
                    <td><strong>{item.requisito}</strong></td>
                    <td>{item.detalle}</td>
                    <td>
                      <span
                        className={`req-status-pill ${
                          item.estado === "Completo"
                            ? "completo"
                            : item.estado === "En revisión"
                              ? "en-revision"
                              : "pendiente"
                        }`}
                      >
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>

        <div className="section-subtitle">2. Datos del estudiante y confección del diploma</div>

        <div className="form-grid">
          <label htmlFor="sede">Sede o Centro Regional</label>
          <input id="sede" readOnly type="text" value={`CENTRO REGIONAL DE ${student.sede.toUpperCase()}`} />

          <label htmlFor="faculty">Facultad</label>
          <select id="faculty" value="sistemas" onChange={() => {}}>
            <option value="sistemas">{student.facultad}</option>
          </select>

          <label htmlFor="career">Carrera</label>
          <select id="career" value="software" onChange={() => {}}>
            <option value="software">{student.carrera}</option>
          </select>

          <label htmlFor="cedula-est">Cédula de identidad</label>
          <input id="cedula-est" readOnly type="text" value={student.cedula} />

          <label htmlFor="diploma-name">Nombre para el diploma *</label>
          <input
            id="diploma-name"
            name="diplomaName"
            onChange={(e) => setDiplomaName(e.target.value)}
            placeholder="Tal como aparece en su cédula"
            required
            type="text"
            value={diplomaName}
          />

          <label htmlFor="email">Correo institucional *</label>
          <input
            id="email"
            name="email"
            readOnly
            type="email"
            value={student.correo}
          />

          <label htmlFor="secondary-email">Correo personal</label>
          <input
            id="secondary-email"
            name="secondaryEmail"
            onChange={(e) => setSecondaryEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            type="email"
            value={secondaryEmail}
          />

          <label htmlFor="phone">Teléfono de contacto *</label>
          <input
            id="phone"
            inputMode="tel"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
            type="tel"
            value={phone}
          />

          <label htmlFor="address">Dirección residencial *</label>
          <input
            id="address"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Provincia, distrito, corregimiento, calle o barriada"
            required
            type="text"
            value={address}
          />
        </div>

        <div className="section-subtitle">3. Requisitos de graduación, aranceles y documentos</div>

        <div className="form-grid">
          <label htmlFor="grad-option">Opción de graduación</label>
          {degree === "tecnico" ? (
            <input
              id="grad-option"
              readOnly
              type="text"
              value="Culminación de asignaturas de I a III año (Salida intermedia de Técnico)"
            />
          ) : (
            <select
              id="grad-option"
              onChange={(e) => setGraduationOption(e.target.value)}
              value={graduationOption}
            >
              <option value="Práctica Profesional">Práctica Profesional</option>
              <option value="Trabajo de Graduación (Tesis)">Trabajo de Graduación (Tesis)</option>
              <option value="Asignaturas de Postgrado">Asignaturas de Postgrado</option>
              <option value="Certificación Internacional">Certificación Internacional</option>
            </select>
          )}

          <label htmlFor="arancel-info">Arancel reglamentario</label>
          <input
            id="arancel-info"
            readOnly
            type="text"
            value="B/. 73.00 (Diploma de Pregrado B/. 63.00 + Historial Académico de Graduado B/. 10.00)"
          />

          <label htmlFor="honor-check">Capítulo de Honor</label>
          <label className="inline-checkbox" htmlFor="honor-check">
            <input
              checked={honorChapter}
              id="honor-check"
              onChange={(e) => setHonorChapter(e.target.checked)}
              type="checkbox"
            />
            <span>Pertenezco al Capítulo de Honor Sigma Lambda (Exonerado de pago de diploma e historial)</span>
          </label>

          {!honorChapter && (
            <>
              <label htmlFor="payment-method">Modalidad de pago</label>
              <select
                id="payment-method"
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
              >
                <option value="Banco Nacional de Panamá (Comprobante Banconal)">Banco Nacional de Panamá (Comprobante Banconal)</option>
                <option value="Caja de la Sede / Centro Regional UTP">Caja de la Sede / Centro Regional UTP</option>
                <option value="Banca en Línea / ACH">Banca en Línea / ACH</option>
              </select>

              <label htmlFor="payment-receipt">N.º de recibo o comprobante *</label>
              <input
                id="payment-receipt"
                onChange={(e) => setPaymentReceipt(e.target.value)}
                placeholder="Ingrese el número del recibo de pago"
                type="text"
                value={paymentReceipt}
              />
            </>
          )}

          <label htmlFor="doc-cedula">Copia de cédula vigente *</label>
          <div className="file-upload-row">
            <input
              accept=".pdf,.jpg,.jpeg,.png"
              id="doc-cedula"
              onChange={(e) => setIdFileName(e.target.files?.[0]?.name || idFileName)}
              type="file"
            />
            <span className="file-attached">Archivo: <b>{idFileName}</b> (PDF / Imagen, máx. 5 MB)</span>
          </div>

          <label htmlFor="doc-recibo">Comprobante de pago *</label>
          <div className="file-upload-row">
            <input
              accept=".pdf,.jpg,.jpeg,.png"
              id="doc-recibo"
              onChange={(e) => setReceiptFileName(e.target.files?.[0]?.name || receiptFileName)}
              type="file"
            />
            <span className="file-attached">
              Archivo: <b>{honorChapter ? "constancia_capitulo_honor.pdf" : receiptFileName}</b>
            </span>
          </div>
        </div>

        {validationError && (
          <div className="form-validation-error" role="alert">
            <Icon name="alert" size={16} />
            <span>{validationError}</span>
          </div>
        )}

        <div className="form-actions">
          <button className="primary-button" type="submit">
            <Icon name="send" /> {hasPendingRequirements ? "Validar requisitos y enviar" : "Enviar solicitud de revisión final"}
          </button>
        </div>
      </form>

      {showRejection && (
        <div className="modal-backdrop" role="presentation">
          <div aria-labelledby="rejection-title" aria-modal="true" className="rejection-modal" role="alertdialog">
            <div className="rejection-icon"><Icon name="alert" size={34} /></div>
            <h2 id="rejection-title">No cumple con los requisitos para este título</h2>
            <p>
              Según el expediente de <b>{student.nombres} {student.apellidos}</b> ({student.cedula}), no es posible procesar la solicitud para <b>{degreeLabels[degree]}</b> por los siguientes pendientes:
            </p>
            <div className="rejection-details">
              {pendingList.map((p) => (
                <div key={p.requisito} style={{ marginBottom: 6 }}>
                  • <b>{p.requisito}:</b> {p.detalle}
                </div>
              ))}
            </div>
            <button className="primary-button" onClick={() => setShowRejection(false)} type="button">
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

type ServiceRequest = {
  id: string;
  cedula: string;
  nombre: string;
  apellido: string;
  centro: string;
  estado: string;
  titulo: string;
  correo: string;
  telefono: string;
  facultad: string;
  carrera: string;
  nombreDiploma: string;
  correoSecundario: string;
  direccion: string;
  fecha: string;
  indice?: string;
  creditos?: string;
  horasSocial?: string;
  inglesCel?: string;
  pazYSalvo?: string;
  modalidadGraduacion?: string;
  arancelRecibo?: string;
  arancelMonto?: string;
  docCedula?: string;
  docComprobante?: string;
  observaciones?: string;
};

const fallbackServiceRequests: ServiceRequest[] = [
  {
    id: "ST-2026-00482",
    cedula: "3-749-2120",
    nombre: "Israel",
    apellido: "Vergara",
    centro: "Colón",
    estado: "Confirmado",
    titulo: "Técnico en Desarrollo de Software",
    correo: "israel.vergara@utp.ac.pa",
    telefono: "6353-3040",
    facultad: "Ingeniería de Sistemas Computacionales",
    carrera: "Lic. en Desarrollo y Gestión de Software",
    nombreDiploma: "ISRAEL VERGARA",
    correoSecundario: "israel.vergara@gmail.com",
    direccion: "Barrio Norte, ciudad de Colón",
    fecha: "27/09/2026",
    indice: "2.07",
    creditos: "105 / 105 créditos (I a III año aprobados)",
    horasSocial: "85 horas completadas (60 h Servicio Social + 25 h Voluntariado)",
    inglesCel: "Certificado CEL UTP aprobado",
    pazYSalvo: "Paz y Salvo (Finanzas, Biblioteca y Laboratorios)",
    modalidadGraduacion: "Culminación de plan técnico (Salida intermedia)",
    arancelRecibo: "BNC-2026-04821",
    arancelMonto: "B/. 73.00 (Diploma B/. 63.00 + Historial B/. 10.00)",
    docCedula: "cedula_3-749-2120.pdf",
    docComprobante: "recibo_arancel_secretaria.pdf",
    observaciones: "Expediente verificado conforme al plan de estudio. Orden de retiro de diploma emitida.",
  },
  {
    id: "ST-2026-00483",
    cedula: "8-921-1843",
    nombre: "María",
    apellido: "González",
    centro: "Panamá",
    estado: "En espera",
    titulo: "Licenciatura en Desarrollo y Gestión de Software",
    correo: "maria.gonzalez@utp.ac.pa",
    telefono: "6678-1442",
    facultad: "Ingeniería de Sistemas Computacionales",
    carrera: "Lic. en Desarrollo y Gestión de Software",
    nombreDiploma: "MARÍA GONZÁLEZ",
    correoSecundario: "mariagonzalez@gmail.com",
    direccion: "San Francisco, ciudad de Panamá",
    fecha: "28/09/2026",
    indice: "2.45",
    creditos: "148 / 148 créditos (IV año culminado)",
    horasSocial: "85 horas completadas (60 h Servicio Social + 25 h Voluntariado)",
    inglesCel: "Certificado CEL UTP aprobado",
    pazYSalvo: "Paz y Salvo (SIPAF sin saldo pendiente)",
    modalidadGraduacion: "Práctica Profesional",
    arancelRecibo: "BNC-2026-05190",
    arancelMonto: "B/. 73.00 (Diploma B/. 63.00 + Historial B/. 10.00)",
    docCedula: "cedula_8-921-1843.pdf",
    docComprobante: "comprobante_banconal_05190.pdf",
    observaciones: "Pendiente validación final del acta de Práctica Profesional por Secretaría General.",
  },
  {
    id: "ST-2026-00484",
    cedula: "4-812-963",
    nombre: "Carlos",
    apellido: "Rodríguez",
    centro: "Chiriquí",
    estado: "En espera",
    titulo: "Ingeniería de Software",
    correo: "carlos.rodriguez@utp.ac.pa",
    telefono: "6214-9081",
    facultad: "Ingeniería de Sistemas Computacionales",
    carrera: "Ingeniería de Software",
    nombreDiploma: "CARLOS RODRÍGUEZ",
    correoSecundario: "carlos.r@email.com",
    direccion: "David, provincia de Chiriquí",
    fecha: "29/09/2026",
    indice: "2.31",
    creditos: "178 / 178 créditos (V año culminado)",
    horasSocial: "90 horas completadas (60 h Servicio Social + 30 h Voluntariado)",
    inglesCel: "Certificado CEL UTP aprobado",
    pazYSalvo: "Paz y Salvo (SIPAF verificado)",
    modalidadGraduacion: "Trabajo de Graduación (Tesis)",
    arancelRecibo: "BNC-2026-05312",
    arancelMonto: "B/. 73.00 (Diploma B/. 63.00 + Historial B/. 10.00)",
    docCedula: "cedula_4-812-963.pdf",
    docComprobante: "recibo_caja_chiriqui.pdf",
    observaciones: "En revisión de documentos y firma de acta de sustentación de Tesis.",
  },
  {
    id: "ST-2026-00485",
    cedula: "6-715-1094",
    nombre: "Ana",
    apellido: "Martínez",
    centro: "Veraguas",
    estado: "Rechazado",
    titulo: "Técnico en Desarrollo de Software",
    correo: "ana.martinez@utp.ac.pa",
    telefono: "6992-5570",
    facultad: "Ingeniería de Sistemas Computacionales",
    carrera: "Lic. en Desarrollo y Gestión de Software",
    nombreDiploma: "ANA MARTÍNEZ",
    correoSecundario: "anam@email.com",
    direccion: "Santiago, provincia de Veraguas",
    fecha: "29/09/2026",
    indice: "1.89",
    creditos: "88 / 105 créditos (Asignaturas pendientes de III año)",
    horasSocial: "40 / 60 horas de Servicio Social (Incompleto)",
    inglesCel: "Pendiente certificación CEL",
    pazYSalvo: "Paz y Salvo en Biblioteca",
    modalidadGraduacion: "Culminación de plan técnico",
    arancelRecibo: "BNC-2026-05401",
    arancelMonto: "B/. 73.00 (Diploma B/. 63.00 + Historial B/. 10.00)",
    docCedula: "cedula_6-715-1094.pdf",
    docComprobante: "recibo_arancel_05401.pdf",
    observaciones: "No cumple requisitos: faltan 17 créditos del bloque técnico y 20 horas de Servicio Social.",
  },
];

function formatStatusLabel(estado: string) {
  if (estado === "Aprobada" || estado === "Confirmado" || estado === "Lista para entrega" || estado === "Entregada") {
    return { text: "Confirmado", css: "confirmado" };
  }
  if (estado === "Rechazada" || estado === "Rechazado") {
    return { text: "Rechazado", css: "rechazado" };
  }
  if (estado === "Requiere correccion" || estado === "Corrección requerida") {
    return { text: "Requiere corrección", css: "en-espera" };
  }
  return { text: "En espera", css: "en-espera" };
}

type ChecklistKeys =
  | "planEstudios"
  | "servicioSocial"
  | "inglesCel"
  | "pazYSalvo"
  | "cedulaIdentidad"
  | "arancelPago";

const checklistLabels: { key: ChecklistKeys; label: string; area: string }[] = [
  {
    key: "planEstudios",
    label: "100% de créditos del plan de estudio y opción de graduación aprobados",
    area: "Secretaría Académica",
  },
  {
    key: "servicioSocial",
    label: "Horas de Servicio Social Universitario y Voluntariado completadas",
    area: "Servicio Social",
  },
  {
    key: "inglesCel",
    label: "Certificación del idioma inglés emitida por el CEL UTP",
    area: "Centro de Lenguas",
  },
  {
    key: "pazYSalvo",
    label: "Paz y Salvo institucional verificado en sistema SIPAF (Biblioteca, Laboratorios y Finanzas)",
    area: "Finanzas / SIPAF",
  },
  {
    key: "cedulaIdentidad",
    label: "Nombre para el diploma coincide exactamente con la copia de cédula adjunta",
    area: "Secretaría General",
  },
  {
    key: "arancelPago",
    label: "Comprobante de pago de aranceles validado (Diploma B/. 63.00 + Historial B/. 10.00)",
    area: "Área Financiera",
  },
];

function enrichRequestDefaults(req: ServiceRequest): ServiceRequest {
  const match = fallbackServiceRequests.find((f) => f.cedula === req.cedula || f.id === req.id);
  return {
    indice: match?.indice || "2.07",
    creditos: match?.creditos || "Plan de estudios verificado en expediente",
    horasSocial: match?.horasSocial || "85 horas registradas (60 h Servicio Social + 25 h Voluntariado)",
    inglesCel: match?.inglesCel || "Certificado CEL UTP aprobado",
    pazYSalvo: match?.pazYSalvo || "Paz y Salvo en sistema SIPAF",
    modalidadGraduacion: match?.modalidadGraduacion || "Práctica Profesional",
    arancelRecibo: match?.arancelRecibo || "BNC-2026-04821",
    arancelMonto: match?.arancelMonto || "B/. 73.00 (Diploma B/. 63.00 + Historial B/. 10.00)",
    docCedula: match?.docCedula || `cedula_${req.cedula}.pdf`,
    docComprobante: match?.docComprobante || `comprobante_pago_${req.id}.pdf`,
    ...match,
    ...req,
  };
}

function StudentServicesPortal({
  reviewer,
  onExit,
}: {
  reviewer: ReviewerUser;
  onExit: () => void;
}) {
  const [requests, setRequests] = useState<ServiceRequest[]>(fallbackServiceRequests);
  const [studentFilter, setStudentFilter] = useState("");
  const [centerFilter, setCenterFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [openRequest, setOpenRequest] = useState<ServiceRequest | null>(null);
  const [checklist, setChecklist] = useState<Record<ChecklistKeys, boolean>>({
    planEstudios: true,
    servicioSocial: true,
    inglesCel: true,
    pazYSalvo: true,
    cedulaIdentidad: true,
    arancelPago: true,
  });
  const [reviewComment, setReviewComment] = useState("");
  const [generatingRandom, setGeneratingRandom] = useState(false);

  const fetchRequests = () => {
    fetch("/api/db/solicitudes")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.ok && Array.isArray(data.solicitudes) && data.solicitudes.length > 0) {
          setRequests(data.solicitudes.map(enrichRequestDefaults));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleGenerateRandomRequest = async (escenario: string) => {
    setGeneratingRandom(true);
    try {
      const res = await fetch("/api/db/generar-aleatorio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ escenario, crearSolicitud: true }),
      });
      const data = await res.json();
      if (data?.ok) {
        fetchRequests();
      }
    } catch {
      // ignore
    } finally {
      setGeneratingRandom(false);
    }
  };

  const handleOpenRequest = (request: ServiceRequest) => {
    const enriched = enrichRequestDefaults(request);
    const isRejected = formatStatusLabel(enriched.estado).css === "rechazado";
    setChecklist({
      planEstudios: (enriched as any).plan_ok ?? !isRejected,
      servicioSocial: (enriched as any).social_ok ?? !isRejected,
      inglesCel: (enriched as any).ingles_ok ?? !isRejected,
      pazYSalvo: (enriched as any).paz_salvo_ok ?? true,
      cedulaIdentidad: true,
      arancelPago: true,
    });
    setReviewComment(enriched.observaciones || "");
    setOpenRequest(enriched);
  };

  const visibleRequests = requests.filter((request) => {
    const student = `${request.cedula} ${request.nombre} ${request.apellido} ${request.id}`.toLowerCase();
    const matchesStudent = student.includes(studentFilter.trim().toLowerCase());
    const matchesCenter = centerFilter === "Todos" || request.centro.toUpperCase() === centerFilter.toUpperCase();
    const statusText = formatStatusLabel(request.estado).text;
    const matchesStatus = statusFilter === "Todos" || statusText === statusFilter;
    return matchesStudent && matchesCenter && matchesStatus;
  });

  const totalCount = requests.length;
  const confirmedCount = requests.filter((r) => formatStatusLabel(r.estado).css === "confirmado").length;
  const pendingCount = requests.filter((r) => formatStatusLabel(r.estado).css === "en-espera").length;
  const rejectedCount = requests.filter((r) => formatStatusLabel(r.estado).css === "rechazado").length;

  const updateRequestStatus = async (nuevoEstadoDb: "Aprobada" | "Rechazada" | "Requiere correccion", estadoUi: string, defaultMsg: string) => {
    if (!openRequest) return;
    const comentarioFinal = reviewComment.trim() || defaultMsg;
    try {
      await fetch("/api/db/validar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: openRequest.id,
          estado: nuevoEstadoDb,
          comentario: `${comentarioFinal} (${reviewer.area_cargo})`,
        }),
      });
    } catch {
      // ignore
    }
    const updated: ServiceRequest = {
      ...openRequest,
      estado: estadoUi,
      observaciones: `${comentarioFinal} (${reviewer.area_cargo})`,
    };
    setRequests((current) => current.map((request) => (request.id === updated.id ? updated : request)));
    setOpenRequest(updated);
  };

  const allChecked = Object.values(checklist).every(Boolean);

  const exportToExcel = () => {
    const columns = ["N.º Solicitud", "Cédula", "Nombre", "Apellido", "Centro regional", "Título solicitado", "Estado", "Fecha"];
    const rows = visibleRequests.map((request) => [
      request.id,
      request.cedula,
      request.nombre,
      request.apellido,
      request.centro,
      request.titulo,
      formatStatusLabel(request.estado).text,
      request.fecha,
    ]);
    const escapeCell = (value: string) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = [columns, ...rows].map((row) => row.map(escapeCell).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "solicitudes-de-titulo.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell service-shell">
      <header className="topbar">
        <div className="brand">
          <img alt="" className="brand-mark" src={utpLogo} />
          <span>Servicios UTP</span>
        </div>
        <div className="top-actions">
          <Icon name="calendar" />
          <Icon name="clock" />
          <Icon name="menu" />
          <Icon name="help" />
          <button aria-label="Regresar a perfiles de usuario" className="user-menu" onClick={onExit} type="button">
            <Icon name="user" /> {reviewer.area_cargo.toUpperCase()} ▾
          </button>
        </div>
      </header>

      <aside className="sidebar">
        <div className="sidebar-profile">
          <div className="small-avatar"><Icon name="user" size={40} /></div>
          <div>
            <strong>{reviewer.nombre}</strong>
            <span className="online"><i /> {reviewer.area_cargo}</span>
            <span className="period">Periodo: II-2026</span>
          </div>
        </div>
        <nav aria-label="Menú de servicios estudiantiles">
          <button className="nav-item active" type="button">
            <Icon name="document" size={16} /><span>Solicitudes</span>
          </button>
          <button className="nav-item" onClick={onExit} type="button">
            <Icon name="logout" size={16} /><span>Salir</span>
          </button>
        </nav>
      </aside>

      <main>
        <h1>Solicitudes de título</h1>
        <div className="breadcrumb">
          <Icon name="home" size={14} /><span>Inicio</span><i>/</i><span>Solicitudes</span><i>/</i><span>{reviewer.area_cargo}</span>
        </div>

        <div className="service-kpi-grid">
          <div className="service-kpi-card">
            <span>Total de solicitudes</span>
            <strong>{totalCount}</strong>
            <small>Registradas en el período II-2026</small>
          </div>
          <div className="service-kpi-card pending">
            <span>Pendientes de revisión</span>
            <strong>{pendingCount}</strong>
            <small>Por verificar requisitos o arancel</small>
          </div>
          <div className="service-kpi-card confirmed">
            <span>Confirmadas (Orden emitida)</span>
            <strong>{confirmedCount}</strong>
            <small>Cumplen el 100% de requisitos</small>
          </div>
          <div className="service-kpi-card rejected">
            <span>Rechazadas / Observadas</span>
            <strong>{rejectedCount}</strong>
            <small>Con requisitos académicos pendientes</small>
          </div>
        </div>

        <section className="service-content">
          <div className="service-section-heading">
            <div>
              <h2>Bandeja de Revisión Final y Validación de Requisitos</h2>
              <p>Verifique el cumplimiento del plan de estudios, Servicio Social, Inglés (CEL), Paz y Salvo y pago de aranceles.</p>
            </div>
            <div className="service-heading-actions">
              <span>{visibleRequests.length} solicitudes</span>
              <button
                className="secondary-button"
                disabled={generatingRandom}
                onClick={() => handleGenerateRandomRequest("aleatorio")}
                title="Genera un estudiante aleatorio con su solicitud para probar la revisión"
                type="button"
              >
                + Generar solicitud de prueba
              </button>
              <button className="excel-button" disabled={visibleRequests.length === 0} onClick={exportToExcel} type="button">
                <Icon name="download" /> Exportar a Excel
              </button>
            </div>
          </div>

          <div className="service-filters service-filters-3">
            <div className="filter-field">
              <label htmlFor="student-filter">Estudiante o N.º de solicitud</label>
              <div className="filter-input">
                <Icon name="search" />
                <input
                  id="student-filter"
                  onChange={(event) => setStudentFilter(event.target.value)}
                  placeholder="Buscar por nombre, apellido, cédula o código"
                  type="search"
                  value={studentFilter}
                />
              </div>
            </div>
            <div className="filter-field">
              <label htmlFor="center-filter">Centro regional</label>
              <select id="center-filter" onChange={(event) => setCenterFilter(event.target.value)} value={centerFilter}>
                <option>Todos</option>
                <option>Panamá</option>
                <option>Colón</option>
                <option>Chiriquí</option>
                <option>Veraguas</option>
              </select>
            </div>
            <div className="filter-field">
              <label htmlFor="status-filter">Estado de revisión</label>
              <select id="status-filter" onChange={(event) => setStatusFilter(event.target.value)} value={statusFilter}>
                <option>Todos</option>
                <option>Confirmado</option>
                <option>En espera</option>
                <option>Rechazado</option>
              </select>
            </div>
          </div>

          <div className="requests-table-wrap">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>N.º Solicitud</th>
                  <th>Cédula</th>
                  <th>Estudiante</th>
                  <th>Centro regional</th>
                  <th>Título solicitado</th>
                  <th>Arancel (B/. 73.00)</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {visibleRequests.map((request) => {
                  const enriched = enrichRequestDefaults(request);
                  const st = formatStatusLabel(enriched.estado);
                  return (
                    <tr key={enriched.id}>
                      <td><strong>{enriched.id}</strong></td>
                      <td>
                        <button className="request-link" onClick={() => handleOpenRequest(enriched)} type="button">
                          {enriched.cedula}
                        </button>
                      </td>
                      <td>{enriched.nombre} {enriched.apellido}</td>
                      <td>{enriched.centro}</td>
                      <td>{enriched.titulo}</td>
                      <td><span className="receipt-code">{enriched.arancelRecibo}</span></td>
                      <td><span className={`table-status ${st.css}`}>{st.text}</span></td>
                      <td>{enriched.fecha}</td>
                      <td>
                        <button className="review-action-btn" onClick={() => handleOpenRequest(enriched)} type="button">
                          Revisar expediente
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {visibleRequests.length === 0 && (
                  <tr><td className="empty-results" colSpan={9}>No se encontraron solicitudes con estos filtros.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <footer><Icon name="mail" /> Mensajes <b>1</b></footer>

      {openRequest && (
        <div className="modal-backdrop" role="presentation">
          <section aria-labelledby="request-detail-title" aria-modal="true" className="request-detail-modal" role="dialog">
            <div className="detail-modal-heading">
              <div>
                <span>Expediente de Revisión Final • {openRequest.id}</span>
                <h2 id="request-detail-title">{openRequest.nombre} {openRequest.apellido} ({openRequest.cedula})</h2>
              </div>
              <div className="detail-heading-right">
                <span className={`table-status ${formatStatusLabel(openRequest.estado).css}`}>
                  {formatStatusLabel(openRequest.estado).text}
                </span>
                <button aria-label="Cerrar detalle" onClick={() => setOpenRequest(null)} type="button">×</button>
              </div>
            </div>

            <div className="detail-modal-body">
              <div className="detail-section-title">1. Datos académicos y de confección del diploma</div>
              <form className="detail-form">
                <label>Nombre impreso en el diploma (Según cédula)<input readOnly value={openRequest.nombreDiploma} /></label>
                <label>Título solicitado<input readOnly value={openRequest.titulo} /></label>
                <label>Facultad<input readOnly value={openRequest.facultad} /></label>
                <label>Carrera<input readOnly value={openRequest.carrera} /></label>
                <label>Centro regional / Sede<input readOnly value={openRequest.centro} /></label>
                <label>Índice académico / Avance de créditos<input readOnly value={`Índice: ${openRequest.indice} — ${openRequest.creditos}`} /></label>
                <label>Opción de trabajo de graduación<input readOnly value={openRequest.modalidadGraduacion} /></label>
                <label>Servicio Social Universitario<input readOnly value={openRequest.horasSocial} /></label>
                <label>Correo institucional<input readOnly value={openRequest.correo} /></label>
                <label>Teléfono y dirección<input readOnly value={`${openRequest.telefono} • ${openRequest.direccion}`} /></label>
              </form>

              <div className="detail-section-title">2. Documentos adjuntos y comprobante de aranceles</div>
              <div className="documents-review-grid">
                <div className="doc-review-card">
                  <div className="doc-review-icon"><Icon name="document" size={20} /></div>
                  <div className="doc-review-info">
                    <strong>Copia de cédula de identidad</strong>
                    <span>Archivo: {openRequest.docCedula}</span>
                  </div>
                  <span className="req-status-pill completo">Verificado</span>
                </div>
                <div className="doc-review-card">
                  <div className="doc-review-icon"><Icon name="card" size={20} /></div>
                  <div className="doc-review-info">
                    <strong>Arancel de Secretaría General ({openRequest.arancelRecibo})</strong>
                    <span>{openRequest.arancelMonto} • {openRequest.docComprobante}</span>
                  </div>
                  <span className="req-status-pill completo">Pagado</span>
                </div>
              </div>

              <div className="detail-section-title">3. Lista de comprobación reglamentaria (Secretaría General)</div>
              <div className="verification-checklist">
                {checklistLabels.map((item) => (
                  <label className="checklist-row" key={item.key}>
                    <input
                      checked={checklist[item.key]}
                      onChange={(e) =>
                        setChecklist((prev) => ({
                          ...prev,
                          [item.key]: e.target.checked,
                        }))
                      }
                      type="checkbox"
                    />
                    <span className="checklist-text">{item.label}</span>
                    <span className="checklist-area">{item.area}</span>
                  </label>
                ))}
              </div>

              <div className="detail-section-title">4. Dictamen y observaciones del revisor</div>
              <div className="reviewer-notes-box">
                <textarea
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Registre observaciones para el estudiante o el número de Orden de Retiro de Diploma..."
                  rows={3}
                  value={reviewComment}
                />
              </div>
            </div>

            <div className="detail-modal-actions">
              <button className="secondary-button" onClick={() => setOpenRequest(null)} type="button">
                Cerrar
              </button>
              <button
                className="reject-button"
                onClick={() =>
                  updateRequestStatus(
                    "Rechazada",
                    "Rechazado",
                    "Solicitud rechazada por incumplimiento de requisitos académicos o documentales."
                  )
                }
                type="button"
              >
                Rechazar solicitud
              </button>
              <button
                className="correction-button"
                onClick={() =>
                  updateRequestStatus(
                    "Requiere correccion",
                    "En espera",
                    "Se solicita subsanar documentación o completar requisitos pendientes."
                  )
                }
                type="button"
              >
                Solicitar corrección
              </button>
              <button
                className="validate-button"
                disabled={!allChecked}
                onClick={() =>
                  updateRequestStatus(
                    "Aprobada",
                    "Confirmado",
                    "Revisión Final aprobada. Se emite Orden de Retiro de Diploma."
                  )
                }
                title={!allChecked ? "Marque todos los puntos de la lista de comprobación para aprobar" : ""}
                type="button"
              >
                <Icon name="check" /> Aprobar y emitir Orden de Retiro
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function ProfileSelection({
  activeStudent,
  activeReviewer,
  studentsList,
  reviewersList,
  onSelectStudent,
  onSelectReviewer,
  onStudentAccess,
  onServicesAccess,
  onGenerateRandomStudent,
  onLogout,
}: {
  activeStudent: StudentProfileData;
  activeReviewer: ReviewerUser;
  studentsList: StudentProfileData[];
  reviewersList: ReviewerUser[];
  onSelectStudent: (st: StudentProfileData) => void;
  onSelectReviewer: (rev: ReviewerUser) => void;
  onStudentAccess: () => void;
  onServicesAccess: () => void;
  onGenerateRandomStudent: (escenario: string) => Promise<void>;
  onLogout: () => void;
}) {
  const [generating, setGenerating] = useState(false);
  const [scenario, setScenario] = useState("aleatorio");

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await onGenerateRandomStudent(scenario);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="profile-page">
      <header className="portal-topbar">
        <div className="portal-brand">
          <img alt="" className="brand-mark" src={utpLogo} />
          <span>Matrícula UTP</span>
        </div>
        <button className="portal-logout" onClick={onLogout} type="button">Cerrar sesión</button>
      </header>
      <section className="profile-panel">
        <h1>Perfiles de Usuario</h1>
        <div className="profile-divider" />
        <div className="profile-options">
          <button onClick={onStudentAccess} type="button">
            <span className="profile-radio" />
            <span>
              ESTUDIANTES — <small style={{ fontWeight: 400, color: "#277ca7" }}>{activeStudent.nombres} {activeStudent.apellidos} ({activeStudent.cedula} • {activeStudent.sede})</small>
            </span>
          </button>
          <button disabled type="button">
            <span className="profile-radio" />
            <span>ESTUDIANTE PREINGRESO</span>
          </button>
          <button onClick={onServicesAccess} type="button">
            <span className="profile-radio" />
            <span>
              SERVICIOS ESTUDIANTILES — <small style={{ fontWeight: 400, color: "#277ca7" }}>{activeReviewer.nombre} ({activeReviewer.area_cargo})</small>
            </span>
          </button>
        </div>

        <div className="profile-test-switcher">
          <div className="switcher-block">
            <label htmlFor="select-student-profile">Cambiar estudiante activo para la prueba:</label>
            <select
              id="select-student-profile"
              onChange={(e) => {
                const found = studentsList.find((s) => s.cedula === e.target.value);
                if (found) onSelectStudent(found);
              }}
              value={activeStudent.cedula}
            >
              {studentsList.map((st) => (
                <option key={st.cedula} value={st.cedula}>
                  {st.nombres} {st.apellidos} ({st.cedula}) — {st.creditos_aprobados}/{st.creditos_totales} créd. | {st.horas_servicio_social + st.horas_voluntariado}h Social | {st.sede}
                </option>
              ))}
            </select>
          </div>

          <div className="switcher-block">
            <label htmlFor="select-reviewer-profile">Cambiar perfil revisor (Servicios Estudiantiles):</label>
            <select
              id="select-reviewer-profile"
              onChange={(e) => {
                const found = reviewersList.find((r) => r.cedula === e.target.value);
                if (found) onSelectReviewer(found);
              }}
              value={activeReviewer.cedula}
            >
              {reviewersList.map((rev) => (
                <option key={rev.cedula} value={rev.cedula}>
                  {rev.nombre} ({rev.cedula}) — Rol: {rev.area_cargo}
                </option>
              ))}
            </select>
          </div>

          <div className="switcher-generator">
            <label htmlFor="random-scenario">Generar nuevo estudiante aleatorio:</label>
            <div className="generator-controls">
              <select
                id="random-scenario"
                onChange={(e) => setScenario(e.target.value)}
                value={scenario}
              >
                <option value="aleatorio">Escenario aleatorio</option>
                <option value="tecnico_listo">Cumple Técnico (3.er año completo)</option>
                <option value="licenciatura_completa">Cumple Licenciatura (148 créditos + Inglés + Social)</option>
                <option value="ingenieria_completa">Cumple Ingeniería (178 créditos + V año completo)</option>
                <option value="incompleto">Con requisitos pendientes (Para probar bloqueo)</option>
              </select>
              <button
                className="primary-button"
                disabled={generating}
                onClick={handleGenerate}
                type="button"
              >
                {generating ? "Generando..." : "+ Generar estudiante"}
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="profile-footer">© 2026 - Universidad Tecnológica de Panamá - DITIC</footer>
    </div>
  );
}

function LoginScreen({
  studentsList,
  reviewersList,
  onAuthenticated,
  onGenerateRandomStudent,
}: {
  studentsList: StudentProfileData[];
  reviewersList: ReviewerUser[];
  onAuthenticated: (payload: {
    roleType: "student" | "reviewer";
    student?: StudentProfileData;
    reviewer?: ReviewerUser;
    directPortal?: "profiles" | "student" | "services";
  }) => void;
  onGenerateRandomStudent: (escenario: string) => Promise<StudentProfileData | null>;
}) {
  const [cedula, setCedula] = useState("3-749-2120");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [showRecoveryNotice, setShowRecoveryNotice] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [generatingRandom, setGeneratingRandom] = useState(false);

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setLoadingLogin(true);

    try {
      const response = await fetch("/api/db/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula: cedula.trim(), password }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setLoginError(data.error || "Credenciales inválidas. Verifique su cédula y contraseña.");
        setLoadingLogin(false);
        return;
      }

      if (data.studentProfile) {
        onAuthenticated({
          roleType: "student",
          student: data.studentProfile,
          directPortal: "profiles",
        });
      } else if (data.user) {
        onAuthenticated({
          roleType: "reviewer",
          reviewer: {
            usuario_id: data.user.usuario_id,
            cedula: data.user.cedula,
            nombre: data.user.nombre,
            correo: data.user.correo,
            rol: data.user.rol,
            area_cargo: data.user.area_cargo || data.user.rol,
          },
          directPortal: "profiles",
        });
      }
    } catch {
      // Fallback local si no responde endpoint
      const foundSt = studentsList.find(
        (s) => s.cedula === cedula.trim() || s.correo.toLowerCase() === cedula.trim().toLowerCase()
      );
      const foundRev = reviewersList.find(
        (r) => r.cedula === cedula.trim() || r.correo.toLowerCase() === cedula.trim().toLowerCase()
      );
      if (foundSt) {
        onAuthenticated({ roleType: "student", student: foundSt, directPortal: "profiles" });
      } else if (foundRev) {
        onAuthenticated({ roleType: "reviewer", reviewer: foundRev, directPortal: "profiles" });
      } else {
        setLoginError("No se encontró un perfil con esa cédula. Seleccione uno de los perfiles de prueba.");
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  const quickSelectStudent = (st: StudentProfileData) => {
    setCedula(st.cedula);
    setPassword("123456");
    setLoginError("");
  };

  const quickSelectReviewer = (rev: ReviewerUser) => {
    setCedula(rev.cedula);
    setPassword("123456");
    setLoginError("");
  };

  const handleQuickRandom = async (escenario: string) => {
    setGeneratingRandom(true);
    setLoginError("");
    try {
      const created = await onGenerateRandomStudent(escenario);
      if (created) {
        setCedula(created.cedula);
        setPassword("123456");
      }
    } finally {
      setGeneratingRandom(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-topbar">
        <div className="login-topbar-inner">
          <div className="portal-brand">
            <img alt="" className="brand-mark" src={utpLogo} />
            <span>Matrícula UTP</span>
          </div>
          <a href="https://utp.ac.pa" rel="noreferrer" target="_blank">Portal UTP</a>
        </div>
      </header>

      <main className="login-content">
        <div className="login-layout">
          <section className="login-card" aria-labelledby="login-title">
            <h1 id="login-title">Introduzca su cédula y clave para ingresar al sistema.</h1>
            <form onSubmit={submitLogin}>
              <label className="login-field" htmlFor="login-cedula">
                <span>Cédula</span>
                <span className="login-input-wrap">
                  <span className="input-icon"><Icon name="user" size={14} /></span>
                  <input
                    autoComplete="username"
                    id="login-cedula"
                    onChange={(event) => setCedula(event.target.value)}
                    placeholder="1-1-1"
                    required
                    value={cedula}
                  />
                </span>
              </label>
              <label className="login-field" htmlFor="login-password">
                <span>Contraseña</span>
                <span className="login-input-wrap">
                  <span className="input-icon"><Icon name="key" size={14} /></span>
                  <input
                    autoComplete="current-password"
                    id="login-password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Contraseña"
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                </span>
              </label>
              <label className="show-password">
                <input checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} type="checkbox" />
                <Icon name={showPassword ? "eyeOff" : "eye"} size={14} />
                Mostrar contraseña
              </label>
              {loginError && (
                <div className="login-error-alert" role="alert">
                  {loginError}
                </div>
              )}
              <div className="login-actions">
                <button className="primary-button" disabled={!cedula.trim() || !password || loadingLogin} type="submit">
                  {loadingLogin ? "Verificando..." : "Iniciar sesión"}
                </button>
              </div>
            </form>
            <p className="demo-notice">Clave de acceso para perfiles de prueba: <b>123456</b></p>
          </section>

          <aside className="recovery-card">
            <h2>¿Olvidó su contraseña del Sitio de Matrícula UTP?</h2>
            <p>Siga las instrucciones para recuperar su contraseña aquí.</p>
            <button onClick={() => setShowRecoveryNotice((visible) => !visible)} type="button">Recuperar acceso</button>
            {showRecoveryNotice && (
              <p className="recovery-notice" role="status">
                Utilice cualquiera de los perfiles inferiores con la clave <b>123456</b>.
              </p>
            )}
          </aside>
        </div>

        <section className="test-profiles-panel" aria-label="Perfiles rápidos de prueba">
          <div className="test-profiles-header">
            <div>
              <strong>Perfiles de prueba rápidos (Autocompletar credenciales)</strong>
              <p>Haga clic en un estudiante o revisor para cargar su cédula y clave, o genere un estudiante aleatorio.</p>
            </div>
            <div className="random-gen-buttons">
              <button
                className="gen-random-btn"
                disabled={generatingRandom}
                onClick={() => handleQuickRandom("aleatorio")}
                type="button"
              >
                {generatingRandom ? "Generando..." : "+ Estudiante aleatorio"}
              </button>
              <button
                className="gen-random-btn"
                disabled={generatingRandom}
                onClick={() => handleQuickRandom("ingenieria_completa")}
                type="button"
              >
                + Aleatorio (Cumple Ingeniería)
              </button>
              <button
                className="gen-random-btn"
                disabled={generatingRandom}
                onClick={() => handleQuickRandom("incompleto")}
                type="button"
              >
                + Aleatorio (Con pendientes)
              </button>
            </div>
          </div>

          <div className="test-profiles-columns">
            <div className="test-profiles-group">
              <h3>Perfiles de Estudiantes</h3>
              <div className="test-profile-list">
                {studentsList.map((st) => {
                  const statusSummary = st.habilitado_ingenieria
                    ? "Habilitado: Técnico, Lic. e Ingeniería"
                    : st.creditos_aprobados >= 148 && st.habilitado_licenciatura
                      ? "Habilitado: Técnico y Licenciatura (100%)"
                      : st.habilitado_tecnico
                        ? "Habilitado: Técnico (4.º año Lic. en curso)"
                        : "Requisitos pendientes (Bloqueado)";
                  return (
                    <button
                      className={`test-profile-chip ${cedula === st.cedula ? "selected" : ""}`}
                      key={st.cedula}
                      onClick={() => quickSelectStudent(st)}
                      type="button"
                    >
                      <div className="chip-top">
                        <strong>{st.nombres} {st.apellidos}</strong>
                        <span>{st.cedula}</span>
                      </div>
                      <small>{statusSummary} • {st.sede}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="test-profiles-group">
              <h3>Personal Revisor y Administrativo</h3>
              <div className="test-profile-list">
                {reviewersList.map((rev) => (
                  <button
                    className={`test-profile-chip reviewer-chip ${cedula === rev.cedula ? "selected" : ""}`}
                    key={rev.cedula}
                    onClick={() => quickSelectReviewer(rev)}
                    type="button"
                  >
                    <div className="chip-top">
                      <strong>{rev.nombre}</strong>
                      <span>{rev.cedula}</span>
                    </div>
                    <small>Rol: {rev.area_cargo} • {rev.correo}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="login-news" aria-labelledby="news-title">
          <h2 id="news-title"><Icon name="document" size={15} /> Noticias</h2>
          <p><strong>¡ATENCIÓN!</strong> Los créditos de técnicos y licenciaturas tendrán un costo de B/.5.00; para postgrados y maestrías es de B/.10.00.</p>
        </section>

        <footer className="login-footer">© 2026 - Universidad Tecnológica de Panamá - DITIC</footer>
      </main>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState("Inicio");
  const [activeParent, setActiveParent] = useState("Inicio");
  const [portal, setPortal] = useState<"login" | "profiles" | "student" | "services">("login");
  const [studentsList, setStudentsList] = useState<StudentProfileData[]>(defaultStudentsList);
  const [reviewersList, setReviewersList] = useState<ReviewerUser[]>(defaultReviewersList);
  const [activeStudent, setActiveStudent] = useState<StudentProfileData>(defaultStudentsList[0]);
  const [activeReviewer, setActiveReviewer] = useState<ReviewerUser>(defaultReviewersList[0]);

  const loadProfilesFromDb = async () => {
    try {
      const res = await fetch("/api/db/perfiles");
      if (!res.ok) return;
      const data = await res.json();
      if (data.ok) {
        if (Array.isArray(data.estudiantes) && data.estudiantes.length > 0) {
          setStudentsList(data.estudiantes);
          setActiveStudent((prev) => data.estudiantes.find((s: StudentProfileData) => s.cedula === prev.cedula) || data.estudiantes[0]);
        }
        if (Array.isArray(data.revisores) && data.revisores.length > 0) {
          setReviewersList(data.revisores);
          setActiveReviewer((prev) => data.revisores.find((r: ReviewerUser) => r.cedula === prev.cedula) || data.revisores[0]);
        }
      }
    } catch {
      // mantiene lista por defecto
    }
  };

  useEffect(() => {
    loadProfilesFromDb();
  }, []);

  const handleGenerateRandomStudent = async (escenario: string): Promise<StudentProfileData | null> => {
    try {
      const res = await fetch("/api/db/generar-aleatorio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ escenario, crearSolicitud: false }),
      });
      const data = await res.json();
      if (data?.ok && data.estudiante) {
        const created: StudentProfileData = data.estudiante;
        setStudentsList((prev) => [...prev, created]);
        setActiveStudent(created);
        return created;
      }
    } catch {
      // Fallback local en caso de estar sin backend
    }
    return null;
  };

  const handleSelectMenu = (label: string, parentLabel?: string) => {
    setSelected(label);
    setActiveParent(parentLabel || label);
  };

  const isMatriculaView =
    activeParent === "Matrícula" && (selected === "Matrícula" || selected === "Prematrícula");
  const isDiplomaView = selected === "Solicitud de Diploma" || selected === "Solicitud de título";

  const title =
    selected === "Inicio"
      ? "Bienvenido al Sitio de Estudiantes"
      : isMatriculaView
        ? `${selected} del Período II/2026`
        : selected;

  if (portal === "login") {
    return (
      <LoginScreen
        onAuthenticated={({ roleType, student, reviewer, directPortal }) => {
          if (roleType === "student" && student) {
            setActiveStudent(student);
          }
          if (roleType === "reviewer" && reviewer) {
            setActiveReviewer(reviewer);
          }
          setPortal(directPortal || "profiles");
        }}
        onGenerateRandomStudent={handleGenerateRandomStudent}
        reviewersList={reviewersList}
        studentsList={studentsList}
      />
    );
  }

  if (portal === "profiles") {
    return (
      <ProfileSelection
        activeReviewer={activeReviewer}
        activeStudent={activeStudent}
        onGenerateRandomStudent={async (escenario) => {
          await handleGenerateRandomStudent(escenario);
        }}
        onLogout={() => setPortal("login")}
        onSelectReviewer={setActiveReviewer}
        onSelectStudent={setActiveStudent}
        onServicesAccess={() => setPortal("services")}
        onStudentAccess={() => {
          setSelected("Inicio");
          setActiveParent("Inicio");
          setPortal("student");
        }}
        reviewersList={reviewersList}
        studentsList={studentsList}
      />
    );
  }

  if (portal === "services") {
    return <StudentServicesPortal onExit={() => setPortal("profiles")} reviewer={activeReviewer} />;
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img alt="" className="brand-mark" src={utpLogo} />
          <span>Matrícula UTP</span>
        </div>
        <div className="top-actions">
          <Icon name="calendar" />
          <Icon name="clock" />
          <Icon name="menu" />
          <Icon name="help" />
          <button
            aria-label="Cambiar perfil o cerrar sesión"
            className="user-menu"
            onClick={() => setPortal("profiles")}
            type="button"
          >
            <Icon name="user" /> {activeStudent.nombres.toUpperCase()} ▾
          </button>
        </div>
      </header>
      <Sidebar
        activeParent={activeParent}
        onExit={() => setPortal("login")}
        onSelect={handleSelectMenu}
        selected={selected}
        studentName={activeStudent.nombres}
      />
      <main>
        <h1>{title}</h1>
        <div className="breadcrumb">
          <Icon name="home" size={14} /><span>Inicio</span><i>/</i>
          <span>{activeParent}</span><i>/</i>
          <span>{title}</span>
        </div>
        {selected === "Inicio" ? (
          <StudentHome
            onGoToDiploma={() => handleSelectMenu("Solicitud de título", "Solicitud de título")}
            student={activeStudent}
          />
        ) : isMatriculaView ? (
          <MatriculaInactiveView />
        ) : isDiplomaView ? (
          <TitleRequest student={activeStudent} />
        ) : (
          <MatriculaInactiveView />
        )}
      </main>
      <footer><Icon name="mail" /> Mensajes <b>1</b></footer>
      <button className="chat" aria-label="Abrir chat" type="button">
        <span>•••</span>
      </button>
    </div>
  );
}
