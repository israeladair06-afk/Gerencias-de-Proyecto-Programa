import { useState, type ReactNode } from "react";
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
  | "eyeOff";

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
  logout: <><path d="M10 4H4v16h6M14 8l4 4-4 4m-7-4h11" /></>,
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

const menuItems: { label: string; icon: IconName; expandable?: boolean }[] = [
  { label: "Inicio", icon: "home" },
  { label: "Matrícula", icon: "monitor", expandable: true },
  { label: "Consultas", icon: "search", expandable: true },
  { label: "Historial", icon: "chart", expandable: true },
  { label: "Estado de cuenta", icon: "card", expandable: true },
  { label: "Retiro e Inclusión", icon: "folder", expandable: true },
  { label: "Solicitudes", icon: "edit", expandable: true },
  { label: "Solicitud de título", icon: "graduation" },
  { label: "IFARHU", icon: "document", expandable: true },
  { label: "Salir", icon: "logout" },
];

const studentDetails = [
  ["Sede", "COLÓN"],
  ["Facultad", "INGENIERÍA DE SISTEMAS COMPUTACIONALES"],
  ["Carrera", "LIC. EN DESAR. Y GEST. DE SOF."],
  ["Plan", "LIC EN DESARROLLO Y GESTIÓN DE SOFTWARE-2023"],
  ["Año de Estudio", "4"],
  ["Índice", "2.07"],
  ["Turno", "NOCTURNO"],
  ["Activo", "SI"],
  ["Cita de Matrícula", "DESDE MARTES 4 DE AGOSTO DE 2026 A PARTIR DE LAS 03:10 PM"],
  ["Fecha del Servidor", "27/09/2026"],
  ["Hora del Servidor", "3:54:02 PM"],
];

function Sidebar({
  selected,
  onSelect,
  onExit,
}: {
  selected: string;
  onSelect: (label: string) => void;
  onExit: () => void;
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <div className="small-avatar">
          <Icon name="user" size={40} />
        </div>
        <div>
          <strong>Hola, ISRAEL</strong>
          <span className="online"><i /> En línea</span>
          <span className="period">Periodo: II-2026</span>
        </div>
      </div>
      <nav aria-label="Menú principal">
        {menuItems.map((item) => (
          <button
            className={`nav-item ${selected === item.label ? "active" : ""}`}
            key={item.label}
            onClick={() => item.label === "Salir" ? onExit() : onSelect(item.label)}
            type="button"
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
            {item.expandable && <b>‹</b>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function StudentHome() {
  return (
    <>
      <div className="notice">
        <Icon name="info" size={18} />
        <div><strong>Atención</strong><p>Usted está debidamente matriculado en este periodo II-2026</p></div>
        <button aria-label="Cerrar aviso" type="button">×</button>
      </div>

      <div className="dashboard-grid">
        <section className="student-card">
          <div className="large-avatar"><Icon name="user" size={95} /></div>
          <label><input defaultChecked type="checkbox" /> Omitir Fotografía</label>
          <h2>VERGARA, ISRAEL</h2>
          <p>03-0749-002120</p>
          <div className="contact">
            <h3>Información de Contacto:</h3>
            <p><Icon name="mail" /> Email: <b>israel.vergara@utp.ac.pa</b></p>
            <p><Icon name="phone" /> Teléfono 1: 63533040</p>
            <p><Icon name="phone" /> Teléfono 2: 65882460</p>
          </div>
        </section>

        <section className="details">
          {studentDetails.map(([label, value], index) => (
            <div className="detail-row" key={label}>
              <strong>{label}</strong>
              <span>
                {index === 9 && <Icon name="calendar" size={13} />}
                {index === 10 && <Icon name="clock" size={13} />}
                {value}
              </span>
            </div>
          ))}
          <div className="stats">
            <div className="stat social"><b>60</b><strong>Horas Servicio Social</strong><Icon name="clock" size={68} /></div>
            <div className="stat volunteer"><b>25</b><strong>Horas Voluntariado</strong><span className="people">Ⅱ</span></div>
            <div className="stat total"><b>85</b><strong>Horas Totales</strong><Icon name="clock" size={68} /></div>
          </div>
        </section>
      </div>
      <div className="preference"><Icon name="list" /> Preferencias de Matrícula</div>
    </>
  );
}

type Degree = "tecnico" | "licenciatura" | "ingenieria";

const degreeLabels: Record<Degree, string> = {
  tecnico: "Técnico en Desarrollo de Software",
  licenciatura: "Licenciatura en Desarrollo y Gestión de Software",
  ingenieria: "Ingeniería de Software",
};

function TitleRequest() {
  const [degree, setDegree] = useState<Degree | "">("");
  const [view, setView] = useState<"form" | "status">("form");
  const [showRejection, setShowRejection] = useState(false);

  const submitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!degree) return;

    if (degree === "ingenieria") {
      setShowRejection(true);
      return;
    }
    setView("status");
  };

  const downloadCopy = () => {
    if (!degree) return;
    const status = degree === "tecnico" ? "CONFIRMADO" : "EN ESPERA";
    const copy = [
      "UNIVERSIDAD TECNOLÓGICA DE PANAMÁ",
      "COMPROBANTE DE SOLICITUD DE TÍTULO",
      "",
      "Estudiante: VERGARA, ISRAEL",
      "Cédula: 03-0749-002120",
      "Facultad: INGENIERÍA DE SISTEMAS COMPUTACIONALES",
      "Carrera: LIC. EN DESAR. Y GEST. DE SOF.",
      `Título solicitado: ${degreeLabels[degree]}`,
      `Estado: ${status}`,
      "Número de solicitud: ST-2026-00482",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([copy], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "solicitud-de-titulo.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (view === "status" && degree) {
    const confirmed = degree === "tecnico";
    return (
      <section className="request-wrapper">
        <div className="status-card">
          <div className={`status-icon ${confirmed ? "confirmed" : "pending"}`}>
            <Icon name={confirmed ? "check" : "clock"} size={38} />
          </div>
          <span className={`status-badge ${confirmed ? "confirmed" : "pending"}`}>
            {confirmed ? "Confirmado" : "En espera"}
          </span>
          <h2>{confirmed ? "Su título está listo" : "Solicitud recibida"}</h2>
          <p className="status-description">
            {confirmed
              ? "Su solicitud fue confirmada. Puede pasar a retirar el título por la ventanilla de Secretaría General, edificio administrativo de la sede de Colón."
              : "Su solicitud está siendo revisada por la facultad. Le notificaremos cuando el título esté confirmado y disponible para retirar."}
          </p>

          <div className="request-summary">
            <div><span>N.º de solicitud</span><strong>ST-2026-00482</strong></div>
            <div><span>Título solicitado</span><strong>{degreeLabels[degree]}</strong></div>
            <div><span>Facultad</span><strong>Ingeniería de Sistemas Computacionales</strong></div>
            <div><span>Fecha de solicitud</span><strong>27/09/2026</strong></div>
          </div>

          <div className="status-actions">
            <button className="secondary-button" onClick={() => setView("form")} type="button">
              Nueva solicitud
            </button>
            {confirmed && (
              <button className="primary-button" onClick={downloadCopy} type="button">
                <Icon name="download" /> Descargar copia
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="request-wrapper">
      <form className="request-card" onSubmit={submitRequest}>
        <div className="request-heading">
          <div className="request-heading-icon"><Icon name="graduation" size={26} /></div>
          <div>
            <h2>Solicitud de título</h2>
            <p>Complete la información para iniciar su solicitud.</p>
          </div>
        </div>

        <div className="form-notice">
          <Icon name="info" />
          <span>Seleccione la facultad, carrera y el título que desea solicitar.</span>
        </div>

        <div className="form-grid">
          <label htmlFor="faculty">Facultad</label>
          <select id="faculty" defaultValue="sistemas">
            <option value="sistemas">INGENIERÍA DE SISTEMAS COMPUTACIONALES</option>
          </select>

          <label htmlFor="career">Carrera</label>
          <select id="career" defaultValue="software">
            <option value="software">LIC. EN DESAR. Y GEST. DE SOF.</option>
          </select>

          <label htmlFor="email">Correo institucional</label>
          <input
            defaultValue="israel.vergara@utp.ac.pa"
            id="email"
            name="email"
            required
            type="email"
          />

          <label htmlFor="diploma-name">Nombre para el diploma</label>
          <input
            defaultValue="ISRAEL VERGARA"
            id="diploma-name"
            name="diplomaName"
            required
            type="text"
          />

          <label htmlFor="phone">Teléfono</label>
          <input
            defaultValue="6353-3040"
            id="phone"
            inputMode="tel"
            name="phone"
            required
            type="tel"
          />

          <label htmlFor="secondary-email">Correo secundario</label>
          <input
            id="secondary-email"
            name="secondaryEmail"
            placeholder="correo@ejemplo.com"
            type="email"
          />

          <label htmlFor="address">Dirección residencial</label>
          <input
            id="address"
            name="address"
            placeholder="Ingrese su dirección residencial"
            required
            type="text"
          />
        </div>

        <fieldset className="degree-fieldset">
          <legend>Título a solicitar</legend>
          <div className="degree-options">
            {(Object.keys(degreeLabels) as Degree[]).map((value) => (
              <label className={`degree-option ${degree === value ? "selected" : ""}`} key={value}>
                <input
                  checked={degree === value}
                  name="degree"
                  onChange={() => setDegree(value)}
                  required
                  type="radio"
                  value={value}
                />
                <span className="degree-icon"><Icon name="graduation" size={23} /></span>
                <span><strong>{value === "tecnico" ? "Técnico" : value === "licenciatura" ? "Licenciatura" : "Ingeniería"}</strong><small>{degreeLabels[value]}</small></span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-actions">
          <button className="primary-button" disabled={!degree} type="submit">
            <Icon name="send" /> Enviar solicitud
          </button>
        </div>
      </form>

      {showRejection && (
        <div className="modal-backdrop" role="presentation">
          <div aria-labelledby="rejection-title" aria-modal="true" className="rejection-modal" role="alertdialog">
            <div className="rejection-icon"><Icon name="alert" size={34} /></div>
            <h2 id="rejection-title">No es posible realizar la solicitud</h2>
            <p>
              Aún tiene asignaturas pendientes o no ha completado las horas de labor social requeridas para solicitar el título de Ingeniería.
            </p>
            <div className="rejection-details">
              Consulte su historial académico y complete los requisitos antes de intentarlo nuevamente.
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
  estado: "Confirmado" | "En espera" | "Rechazado";
  titulo: string;
  correo: string;
  telefono: string;
  facultad: string;
  carrera: string;
  nombreDiploma: string;
  correoSecundario: string;
  direccion: string;
  fecha: string;
};

const serviceRequests: ServiceRequest[] = [
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
  },
];

function StudentServicesPortal({ onExit }: { onExit: () => void }) {
  const [requests, setRequests] = useState(serviceRequests);
  const [studentFilter, setStudentFilter] = useState("");
  const [centerFilter, setCenterFilter] = useState("Todos");
  const [openRequest, setOpenRequest] = useState<ServiceRequest | null>(null);

  const visibleRequests = requests.filter((request) => {
    const student = `${request.cedula} ${request.nombre} ${request.apellido}`.toLowerCase();
    const matchesStudent = student.includes(studentFilter.trim().toLowerCase());
    const matchesCenter = centerFilter === "Todos" || request.centro === centerFilter;
    return matchesStudent && matchesCenter;
  });

  const validateRequest = () => {
    if (!openRequest) return;
    const validated = { ...openRequest, estado: "Confirmado" as const };
    setRequests((current) => current.map((request) => request.id === validated.id ? validated : request));
    setOpenRequest(validated);
  };

  const exportToExcel = () => {
    const columns = ["Cédula", "Nombre", "Apellido", "Centro regional", "Título solicitado", "Estado", "Fecha"];
    const rows = visibleRequests.map((request) => [
      request.cedula,
      request.nombre,
      request.apellido,
      request.centro,
      request.titulo,
      request.estado,
      request.fecha,
    ]);
    const escapeCell = (value: string) => `"${value.replaceAll('"', '""')}"`;
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
            <Icon name="user" /> SERVICIOS⌄
          </button>
        </div>
      </header>

      <aside className="sidebar">
        <div className="sidebar-profile">
          <div className="small-avatar"><Icon name="user" size={40} /></div>
          <div>
            <strong>Servicios estudiantiles</strong>
            <span className="online"><i /> En línea</span>
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
          <Icon name="home" size={14} /><span>Inicio</span><i>/</i><span>Solicitudes</span>
        </div>

        <section className="service-content">
          <div className="service-section-heading">
            <div>
              <h2>Gestión de solicitudes</h2>
              <p>Consulte y revise las solicitudes enviadas por los estudiantes.</p>
            </div>
            <div className="service-heading-actions">
              <span>{visibleRequests.length} solicitudes</span>
              <button className="excel-button" disabled={visibleRequests.length === 0} onClick={exportToExcel} type="button">
                <Icon name="download" /> Exportar a Excel
              </button>
            </div>
          </div>

          <div className="service-filters">
            <div className="filter-field">
              <label htmlFor="student-filter">Estudiante</label>
              <div className="filter-input">
                <Icon name="search" />
                <input
                  id="student-filter"
                  onChange={(event) => setStudentFilter(event.target.value)}
                  placeholder="Buscar por nombre o cédula"
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
          </div>

          <div className="requests-table-wrap">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Centro regional</th>
                  <th>Título solicitado</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {visibleRequests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <button className="request-link" onClick={() => setOpenRequest(request)} type="button">
                        {request.cedula}
                      </button>
                    </td>
                    <td>{request.nombre}</td>
                    <td>{request.apellido}</td>
                    <td>{request.centro}</td>
                    <td>{request.titulo}</td>
                    <td><span className={`table-status ${request.estado.toLowerCase().replace(" ", "-")}`}>{request.estado}</span></td>
                    <td>{request.fecha}</td>
                  </tr>
                ))}
                {visibleRequests.length === 0 && (
                  <tr><td className="empty-results" colSpan={7}>No se encontraron solicitudes con estos filtros.</td></tr>
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
                <span>Solicitud {openRequest.id}</span>
                <h2 id="request-detail-title">Información de la solicitud</h2>
              </div>
              <button aria-label="Cerrar detalle" onClick={() => setOpenRequest(null)} type="button">×</button>
            </div>
            <form className="detail-form">
              <label>Cédula<input readOnly value={openRequest.cedula} /></label>
              <label>Nombre<input readOnly value={openRequest.nombre} /></label>
              <label>Apellido<input readOnly value={openRequest.apellido} /></label>
              <label>Centro regional<input readOnly value={openRequest.centro} /></label>
              <label>Correo institucional<input readOnly value={openRequest.correo} /></label>
              <label>Teléfono<input readOnly value={openRequest.telefono} /></label>
              <label className="wide-field">Nombre para el diploma<input readOnly value={openRequest.nombreDiploma} /></label>
              <label>Correo secundario<input readOnly value={openRequest.correoSecundario} /></label>
              <label>Estado<input readOnly value={openRequest.estado} /></label>
              <label className="wide-field">Facultad<input readOnly value={openRequest.facultad} /></label>
              <label className="wide-field">Carrera<input readOnly value={openRequest.carrera} /></label>
              <label className="wide-field">Título solicitado<input readOnly value={openRequest.titulo} /></label>
              <label className="wide-field">Dirección residencial<input readOnly value={openRequest.direccion} /></label>
            </form>
            <div className="detail-modal-actions">
              <button className="secondary-button" onClick={() => setOpenRequest(null)} type="button">Cerrar</button>
              {openRequest.estado !== "Confirmado" && (
                <button className="validate-button" onClick={validateRequest} type="button">
                  <Icon name="check" /> Validar solicitud
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function ProfileSelection({
  onStudentAccess,
  onServicesAccess,
  onLogout,
}: {
  onStudentAccess: () => void;
  onServicesAccess: () => void;
  onLogout: () => void;
}) {
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
            <span>ESTUDIANTES</span>
          </button>
          <button disabled type="button">
            <span className="profile-radio" />
            <span>ESTUDIANTE PREINGRESO</span>
          </button>
          <button onClick={onServicesAccess} type="button">
            <span className="profile-radio" />
            <span>SERVICIOS ESTUDIANTILES</span>
          </button>
        </div>
      </section>
      <footer className="profile-footer">© 2026 - Universidad Tecnológica de Panamá - DITIC</footer>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRecoveryNotice, setShowRecoveryNotice] = useState(false);

  const submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin();
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
              <div className="login-actions">
                <button className="primary-button" disabled={!cedula.trim() || !password} type="submit">
                  Iniciar sesión
                </button>
              </div>
            </form>
            <p className="demo-notice">Acceso de demostración. No se validan credenciales institucionales.</p>
          </section>

          <aside className="recovery-card">
            <h2>¿Olvidó su contraseña del Sitio de Matrícula UTP?</h2>
            <p>Siga las instrucciones para recuperar su contraseña aquí.</p>
            <button onClick={() => setShowRecoveryNotice((visible) => !visible)} type="button">Recuperar acceso</button>
            {showRecoveryNotice && (
              <p className="recovery-notice" role="status">
                La recuperación estará disponible cuando se conecte el servicio de autenticación.
              </p>
            )}
          </aside>
        </div>

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
  const [portal, setPortal] = useState<"login" | "profiles" | "student" | "services">("login");
  const title = selected === "Inicio" ? "Bienvenido al Sitio de Estudiantes" : selected;

  if (portal === "login") {
    return <LoginScreen onLogin={() => setPortal("profiles")} />;
  }

  if (portal === "profiles") {
    return (
      <ProfileSelection
        onLogout={() => setPortal("login")}
        onServicesAccess={() => setPortal("services")}
        onStudentAccess={() => setPortal("student")}
      />
    );
  }

  if (portal === "services") {
    return <StudentServicesPortal onExit={() => setPortal("login")} />;
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
            aria-label="Cerrar sesión"
            className="user-menu"
            onClick={() => setPortal("login")}
            type="button"
          >
            <Icon name="user" /> ISRAEL⌄
          </button>
        </div>
      </header>
      <Sidebar
        onExit={() => setPortal("login")}
        onSelect={setSelected}
        selected={selected}
      />
      <main>
        <h1>{title}</h1>
        <div className="breadcrumb">
          <Icon name="home" size={14} /><span>Inicio</span><i>/</i>
          <span>{selected === "Inicio" ? "Inicio" : selected}</span><i>/</i>
          <span>{title}</span>
        </div>
        {selected === "Inicio" ? (
          <StudentHome />
        ) : selected === "Solicitud de título" ? (
          <TitleRequest />
        ) : (
          <section className="empty-module" aria-label={`Módulo ${selected}`} />
        )}
      </main>
      <footer><Icon name="mail" /> Mensajes <b>1</b></footer>
      <button className="chat" aria-label="Abrir chat" type="button">
        <span>•••</span>
      </button>
    </div>
  );
}
