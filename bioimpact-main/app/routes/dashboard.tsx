import { useState } from "react";
import { useLoaderData, redirect, Form } from "react-router";
import { getSession, destroySession } from "~/session.server";

// ── 1. LOADER: Implementación estricta de cookies para proteger la ruta ──
export async function loader({ request }: { request: Request }) {
  const session = await getSession(request);
  const userId = session.get("userId");

  // Si no hay cookie de sesión, lo pateamos al login
  if (!userId) throw redirect("/");

  // Devolvemos los datos del usuario al componente visual
  return {
    userId: session.get("userId"),
    nombre: session.get("nombre") || "Usuario",
    email: session.get("email"),
  };
}

// ── 2. ACTION: Destruye la cookie cuando le dan a "Cerrar sesión" ──
export async function action({ request }: { request: Request }) {
  const session = await getSession(request);
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
}

// ==========================================
// SVGs e Iconos (Mantenidos igual)
// ==========================================
const GridIcon = () => ( <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="7" height="7" rx="1" fill="currentColor" /><rect x="11" y="2" width="7" height="7" rx="1" fill="currentColor" /><rect x="2" y="11" width="7" height="7" rx="1" fill="currentColor" /><rect x="11" y="11" width="7" height="7" rx="1" fill="currentColor" /></svg>);
const CalendarIcon = () => ( <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" /><path d="M6 2v4M14 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const UsersIcon = () => ( <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M14 5c1.657 0 3 1.343 3 3s-1.343 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M17 17c0-2.761-1.343-5-3-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>);
const ListIcon = () => ( <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h12M4 10h12M4 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const CalendarIcon2 = () => ( <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" /><path d="M6 2v4M14 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="13" r="1.5" fill="currentColor" /></svg>);
const RefreshIcon = () => ( <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10a6 6 0 016-6 6 6 0 014.243 1.757L16 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M16 4v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M16 10a6 6 0 01-6 6 6 6 0 01-4.243-1.757L4 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M4 16v-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>);
const SettingsIcon = () => ( <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.222 4.222l1.414 1.414M14.364 14.364l1.414 1.414M4.222 15.778l1.414-1.414M14.364 5.636l1.414-1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const SearchIcon = () => ( <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="6" stroke="#6b7280" strokeWidth="1.5" fill="none" /><path d="M13.5 13.5L17 17" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const PlusIcon = () => ( <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3v10M3 8h10" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>);
const CheckIcon = () => ( <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const XIcon = () => ( <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l8 8M11 3l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>);
const CircleProgressIcon = () => ( <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="7" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="22 22" strokeDashoffset="11" /><circle cx="9" cy="9" r="3" fill="#3b82f6" /></svg>);
const WarningIcon = () => ( <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2L1.5 12h11L7 2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" /><path d="M7 6v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" /><circle cx="7" cy="10.5" r="0.75" fill="white" /></svg>);
const EditIcon = () => ( <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="#9ca3af" strokeWidth="1.5" strokeLinejoin="round" fill="none" /></svg>);
const ArrowRightIcon = () => ( <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8h10M9 4l4 4-4 4" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);

const BioImpactLogo = () => ( <div className="w-8 h-8 flex items-center justify-center"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 3L6 13h4L5 23h8v4h2v-4h8l-5-10h4L14 3z" fill="#2d6a2d" /></svg></div>);
const GrupoSymaLogo = () => ( <div className="w-8 h-8 rounded-full bg-[#f15a24] flex items-center justify-center text-white text-[10px] font-bold">syma</div>);
const ToyotaLogo = () => ( <div className="w-8 h-8 rounded-full flex items-center justify-center"><svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="11" cy="7" rx="10" ry="6" stroke="#d32f2f" strokeWidth="1.5" fill="none" /><ellipse cx="11" cy="7" rx="4" ry="6" stroke="#d32f2f" strokeWidth="1.5" fill="none" /><path d="M1 5h20" stroke="#d32f2f" strokeWidth="1.5" /></svg></div>);
const AmericanIndustriesLogo = () => ( <div className="w-8 h-8 flex items-center justify-center"><div className="w-6 h-1 bg-[#1a365d] rounded" /></div>);

// ==========================================
// Datos de Prueba
// ==========================================
const projectsData = [
  { id: 1, name: "Bio Impact", location: "Monterrey, Nuevo León", status: "Completo", statusType: "success", logo: <BioImpactLogo /> },
  { id: 2, name: "Grupo Syma", location: "Monterrey, Nuevo León", status: "No iniciado", statusType: "error", logo: <GrupoSymaLogo /> },
  { id: 3, name: "Toyota Tsusho México", location: "Monterrey, Nuevo León", status: "En Progreso", statusType: "progress", logo: <ToyotaLogo /> },
  { id: 4, name: "American Industries", location: "Monterrey, Nuevo León", status: "Revisón Necesaria", statusType: "warning", logo: <AmericanIndustriesLogo /> },
];

const proximasJuntasData = [
  { id: 1, name: "Toyota Tusho México", date: "17 de Febrero 2026", time: "17:00", logo: <ToyotaLogo /> },
  { id: 2, name: "Grupo Syma", date: "18 de Febrero 2026", time: "18:00", logo: <GrupoSymaLogo /> },
  { id: 3, name: "American Industries", date: "18 de Febrero 2026", time: "20:00", logo: <AmericanIndustriesLogo /> },
];

const pendientesData = [
  { id: 1, date: "25 Feb 2026", text: "Manifiesto Bio Impact", urgent: true },
  { id: 2, date: "15 Marzo 2026", text: "Cumplimiento Toyota", urgent: false },
  { id: 3, date: "24 Nov 2022", text: "UMAs", urgent: false },
  { id: 4, date: "24 Nov 2022", text: "PIMVS", urgent: false },
  { id: 5, date: "24 Nov 2022", text: "Residuos de Manejo Especial", urgent: false },
  { id: 6, date: "24 Nov 2022", text: "Manifiesto A. Industries", urgent: false },
];

const tareasData = [
  { id: 1, date: "17 Marzo 2026", text: "Terminar UMAs" },
  { id: 2, date: "20 Marzo 2026", text: "Entrgar manifiesto" }, // Typo from original maintained
];

// ==========================================
// Componente Auxiliar
// ==========================================
const StatusBadge = ({ statusType, status }: any) => {
  if (statusType === "success") {
    return (
      <div className="flex items-center justify-end gap-2 w-32">
        <span className="font-bold text-[#1a1a1a] text-sm whitespace-nowrap">{status}</span>
        <div className="bg-[#2d6a2d] flex w-5 h-5 items-center justify-center rounded-full flex-shrink-0 text-white"><CheckIcon /></div>
      </div>
    );
  }
  if (statusType === "error") {
    return (
      <div className="flex items-center justify-end gap-2 w-32">
        <span className="font-bold text-[#1a1a1a] text-sm whitespace-nowrap">{status}</span>
        <div className="bg-[#d32f2f] flex w-5 h-5 items-center justify-center rounded-full flex-shrink-0 text-white"><XIcon /></div>
      </div>
    );
  }
  if (statusType === "progress") {
    return (
      <div className="flex items-center justify-end gap-2 w-32">
        <span className="font-bold text-[#1a1a1a] text-sm whitespace-nowrap">{status}</span>
        <div className="flex w-5 h-5 items-center justify-center flex-shrink-0"><CircleProgressIcon /></div>
      </div>
    );
  }
  if (statusType === "warning") {
    return (
      <div className="flex items-center justify-end gap-2 w-32">
        <span className="font-bold text-[#1a1a1a] text-sm whitespace-nowrap">{status}</span>
        <div className="bg-[#fbbf24] flex w-5 h-5 items-center justify-center rounded-full flex-shrink-0 text-white"><WarningIcon /></div>
      </div>
    );
  }
  return null;
};

// ==========================================
// Componente Principal: Dashboard
// ==========================================
export default function Dashboard() {
  const loaderData = useLoaderData<typeof loader>();
  // Calculamos las iniciales del usuario para el avatar
  const iniciales = loaderData.nombre ? loaderData.nombre.substring(0, 2).toUpperCase() : "US";

  const [pendienteInput, setPendienteInput] = useState("");

  const sideNavItems = [
    { icon: <GridIcon />, active: true },
    { icon: <CalendarIcon />, active: false },
    { icon: <UsersIcon />, active: false },
    { icon: <ListIcon />, active: false },
    { icon: <CalendarIcon2 />, active: false },
    { icon: <RefreshIcon />, active: false },
  ];

  return (
    <div className="bg-[#f0f2f5] w-full min-h-screen relative flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-[72px] bg-white flex flex-col items-center py-6 border-r border-gray-200 flex-shrink-0 z-10">
        <div className="mb-4 flex flex-col items-center gap-4">
           <img src="/Logo Bioimpact.png" alt="Bioimpact Logo" className="w-20 h-12 object-contain" />
        </div>
        
        <nav className="flex flex-col items-center gap-4 w-full">
          {sideNavItems.map((item, index) => (
            <button
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
                item.active ? "bg-[#2d6a2d] text-white shadow-md" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
            >
              {item.icon}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button className="w-12 h-12 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <SettingsIcon />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-[#f8f9fa] h-[80px] flex items-center justify-between px-8 border-b border-gray-200">
          <h1 className="font-bold text-[#1a365d] text-3xl tracking-tight">
            ¡Bienvenido, {loaderData.nombre}!
          </h1>
          <div className="flex items-center gap-5">
            <button className="bg-[#2d6a2d] hover:bg-[#245a24] text-white flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-sm">
              Añadir Proyecto
              <span className="ml-1"><PlusIcon /></span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors shadow-sm">
              <SearchIcon />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer shadow-sm">
              {/* Fallback to initials if no image is available, but the design shows a face */}
               <img src={`https://ui-avatars.com/api/?name=${loaderData.nombre}&background=random`} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
             {/* 4. BOTÓN DE CERRAR SESIÓN */}
             <Form method="post">
              <button
                type="submit"
                className="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
              >
                Salir
              </button>
            </Form>
          </div>
        </header>

        {/* Dashboard Body - Responsive Grid Layout */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Span 2 columns on large screens) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Top Row: Cita Próxima & Proyectos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cita Próxima Card */}
                <div className="bg-[#2d6a2d] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg flex flex-col justify-between h-[340px]">
                   {/* Decorative background circle (simulated) */}
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white opacity-5 rounded-full blur-xl pointer-events-none"></div>

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-bold text-white text-lg">Cita Próxima</h2>
                      <div className="w-2.5 h-2.5 bg-white rounded-full opacity-80" />
                    </div>
                    
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                        <BioImpactLogo /> {/* Reusing the logo component as placeholder for the location icon */}
                      </div>
                      <div>
                        <p className="font-bold text-white text-base">200 Washington</p>
                        <p className="font-medium text-green-100 text-sm opacity-90">Monterrey, N.L. 89601</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="font-medium text-green-100 text-xs mb-1 opacity-90">Fecha</p>
                      <p className="font-bold text-white text-base">17 de Febrero 2026, 17:30</p>
                    </div>
                    
                    <div className="flex gap-8 mb-6">
                      <div>
                        <p className="font-medium text-green-100 text-xs mb-1 opacity-90">Empresa</p>
                        <p className="font-bold text-white text-base">Bio Impact</p>
                      </div>
                      <div>
                        <p className="font-medium text-green-100 text-xs mb-1 opacity-90">Consultor</p>
                        <p className="font-bold text-white text-base">{loaderData.nombre}</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-3/4 mx-auto bg-white text-[#2d6a2d] font-bold text-sm py-3 rounded-full hover:bg-green-50 transition-colors shadow-sm">
                    Ver detalles
                  </button>
                </div>

                {/* Proyectos Card */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 h-[340px] flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-[#1a365d] text-lg">Proyectos</h2>
                    <button className="font-semibold text-[#2d6a2d] text-sm hover:underline">Ver todos</button>
                  </div>
                  <div className="flex flex-col gap-1 overflow-y-auto pr-2 flex-1">
                    {projectsData.map((project) => (
                      <div key={project.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-4">
                          {project.logo}
                          <div>
                            <p className="font-bold text-[#1a365d] text-sm">{project.name}</p>
                            <p className="font-medium text-gray-400 text-xs">{project.location}</p>
                          </div>
                        </div>
                        <StatusBadge statusType={project.statusType} status={project.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

               {/* Grupo Syma Task Card (Spans full width of left column) */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <GrupoSymaLogo />
                    <div>
                      <p className="font-bold text-[#1a365d] text-base">Grupo Syma</p>
                      <p className="font-medium text-gray-400 text-sm">Monterrey, NL</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-[#e8f5e9] text-[#2d6a2d] font-bold text-xs px-4 py-1.5 rounded-full tracking-wide">
                      EN PROCESO
                    </span>
                    <button className="text-gray-400 hover:text-[#2d6a2d] transition-colors">
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-5 pl-2 relative">
                   {/* Vertical timeline line */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-200 z-0"></div>

                  {tareasData.map((tarea, index) => (
                    <div key={tarea.id} className="flex items-start gap-4 relative z-10">
                      <div className="w-5 h-5 rounded-full bg-[#2d6a2d] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm border-2 border-white">
                        <CheckIcon />
                      </div>
                      <div>
                        <p className="font-medium text-gray-400 text-xs mb-0.5">{tarea.date}</p>
                        <p className="font-bold text-[#1a365d] text-sm">{tarea.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="font-bold text-[#2d6a2d] text-sm hover:underline">
                    Cargar más
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 h-full">
              
              {/* Próximas Juntas */}
              <div className="bg-[#f8fcf8] rounded-[24px] p-6 border border-green-50 shadow-sm flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-[#1a365d] text-lg">Próximas Juntas</h2>
                  <button className="font-semibold text-[#2d6a2d] text-sm hover:underline">Ver todas</button>
                </div>
                <div className="flex flex-col gap-5">
                  {proximasJuntasData.map((junta) => (
                    <div key={junta.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-50">
                      {junta.logo}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1a365d] text-sm truncate">{junta.name}</p>
                        <p className="font-medium text-gray-400 text-xs">{junta.date}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                         <span className="text-gray-400"><EditIcon/></span>
                         <span className="font-medium text-gray-500 text-xs">{junta.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pendientes */}
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-[#1a365d] text-lg">Pendientes</h2>
                  <button className="font-semibold text-[#2d6a2d] text-sm hover:underline">Ver todo</button>
                </div>
                
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 mb-4">
                  {pendientesData.map((pendiente) => (
                    <div key={pendiente.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <span className={`font-medium text-xs w-24 flex-shrink-0 ${pendiente.urgent ? "text-[#d32f2f]" : "text-gray-400"}`}>
                        {pendiente.date}
                      </span>
                      {pendiente.urgent && <div className="w-1.5 h-1.5 rounded-full bg-[#d32f2f] flex-shrink-0" />}
                      <span className="font-semibold text-[#1a365d] text-sm truncate">{pendiente.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2">
                  <input
                    type="text"
                    value={pendienteInput}
                    onChange={(e) => setPendienteInput(e.target.value)}
                    placeholder="Añade un pendiente"
                    className="flex-1 font-medium text-gray-600 text-sm bg-transparent outline-none placeholder-gray-400"
                  />
                  <button className="text-gray-400 hover:text-[#2d6a2d] transition-colors">
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}