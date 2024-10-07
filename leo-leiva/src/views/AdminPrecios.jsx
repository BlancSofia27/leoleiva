
import AdminPreciosTable from '../components/adminPreciosTable';

const AdminPrecios = () => {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center p-3 h-20 w-full bg-zinc-900">
        <button>volver al panel de administrador</button>
  
  
</div>
      {/* Tabla de Reservas */}
      <AdminPreciosTable/>
    </div>
  );
};

export default AdminPrecios;