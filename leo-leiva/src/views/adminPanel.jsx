
import AdminReservasTable from '../components/reservasTable';

const AdminPanel = () => {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center p-3 h-20 w-full bg-zinc-900">
  <h1 className="text-2xl font-bold ">Panel de Administración</h1>
  <button className='p-4 border-spacing-2 border- border-gray-300'>Administrar Precios</button>
</div>
      {/* Tabla de Reservas */}
      <AdminReservasTable />
    </div>
  );
};

export default AdminPanel;
