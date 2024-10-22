import { useState } from 'react';
import Calendario from '../components/calendar'; // Asumiendo que ya tienes este componente de calendario

const AdminReservasTable = () => {
  const [fecha, setFecha] = useState(new Date()); // Usamos la fecha actual como valor inicial
  const [search, setSearch] = useState(''); // Para la búsqueda por nombre
  const [servicio, setServicio] = useState(''); // Para filtrar por servicio

  // Datos hardcodeados de las reservas
  const reservasHardcoded = [
    { id: 7, nombre: 'Isabel Ramírez', servicio: 'Belleza Capilar', subServicio: 'Hidratación', horario: '04:00 PM' },
    { id: 8, nombre: 'Camila Ortiz', servicio: 'Peinados', subServicio: 'Cambio de color', horario: '05:00 PM' },
    { id: 2, nombre: 'María Pérez', servicio: 'Cortes', subServicio: 'Corte de Puntas', horario: '11:00 AM' },
    { id: 3, nombre: 'Laura Martínez', servicio: 'Belleza Capilar', subServicio: 'Botox Capilar', horario: '12:00 PM' },
    { id: 4, nombre: 'Lucía Rodríguez', servicio: 'Peinados', subServicio: 'Color sin moníaco', horario: '01:00 PM' },
    { id: 5, nombre: 'Carla Fernández', servicio: 'Coloración', subServicio: 'Balayage', horario: '02:00 PM' },
    { id: 6, nombre: 'Sofía Sánchez', servicio: 'Cortes', subServicio: 'Corte de Estilo', horario: '03:00 PM' },
    { id: 1, nombre: 'Gimena Olivero', servicio: 'Coloración', subServicio: 'Cambio de color', horario: '10:00 AM' },
  ];

  // Filtro por nombre y servicio
  const filteredReservas = reservasHardcoded
    .filter((reserva) => reserva.nombre.toLowerCase().includes(search.toLowerCase()))
    .filter((reserva) => servicio ? reserva.servicio.toLowerCase() === servicio.toLowerCase() : true);

  return (
    <div className="p-4 shadow-lg rounded-lg text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Reservas de Servicios</h1>

      {/* Componente de calendario */}
      <Calendario onDateChange={setFecha} selectedDate={fecha} />

      {/* Barra de búsqueda por nombre */}
      <div className="m-2">
        <label htmlFor="search" className="block text-lg font-medium">Buscar por Nombre:</label>
        <input
          type="text"
          id="search"
          placeholder="Ingresa Un Nombre"
          className="border p-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filtro por servicio */}
      <div className="m-2">
        <label htmlFor="servicio" className="block text-lg font-medium">Filtrar por Servicio:</label>
        <select
          id="servicio"
          className="border p-2 w-full text-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Coloración">Coloración</option>
          <option value="Cortes">Cortes</option>
          <option value="Belleza Capilar">Belleza Capilar</option>
          <option value="Peinados">Peinados</option>
        </select>
      </div>

      <h2 className="text-xl mb-2">Reservas para el {new Date(fecha).toLocaleDateString()}</h2>

      {filteredReservas.length > 0 ? (
        <table className="min-w-full shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500">
            <tr>
              <th className="py-2 px-3 border-b">Nombre</th>
              <th className="py-2 px-2 border-b text-center">Servicio</th>
              <th className="py-2 px-2 border-b text-center">Subservicio</th>
              <th className="py-2 px-1 border-b text-center">Horario</th>
              <th className="py-2 px-1 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            {filteredReservas.map((reserva) => (
              <tr key={reserva.id} className="hover:bg-gray-600">
                <td className="py-2 px-2 border-b h-20">{reserva.nombre}</td>
                <td className="py-2 px-1 border-b text-center">{reserva.servicio}</td>
                <td className="py-2 px-1 border-b text-center">{reserva.subServicio}</td>
                <td className="py-2 px-1 border-b text-center">{reserva.horario}</td>
                <td className="text-center border-b">
                  <button className="font-bold px-2 py-1 rounded-lg border border-red-600 bg-red-500 text-white transition-transform transform hover:scale-105">
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay reservas para esta fecha.</p>
      )}
    </div>
  );
};

export default AdminReservasTable;
