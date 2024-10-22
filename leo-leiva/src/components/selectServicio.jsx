import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import coloracion from '../assets/carito.jpg';
import belleza from '../assets/cande.jpg';
import corte from '../assets/agos.jpg';

const SelectServicio = ({ onTotalChange, onServiciosChange }) => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [subServicioSeleccionado, setSubServicioSeleccionado] = useState(null);
  const [subServiciosSeleccionados, setSubServiciosSeleccionados] = useState([]); // Array de servicios seleccionados
  const [total, setTotal] = useState(0); // State to hold the total
  
  const servicios = [
    { 
      nombre: 'Coloración', 
      img: coloracion,  
      subServicios: [
        { nombre: 'Cambio de color', precio: 'DESDE $80.000', valor: 80000 },
        { nombre: 'Tono sobre tono', precio: 'DESDE $50.000', valor: 50000 },
        { nombre: 'Color sin amoníaco', precio: 'DESDE $65.000', valor: 65000 },
        { nombre: 'Color raíz', precio: '$55.000 (Incluye lavado)', valor: 55000 },
        { nombre: 'Decoloración', precio: 'DESDE $80.000', valor: 80000 },
        { nombre: 'Reflejos con gorra/papel', precio: 'DESDE $80.000', valor: 80000 },
        { nombre: 'Balayage / Balayage ombré', precio: 'DESDE $80.000', valor: 80000 },
        { nombre: 'Mechas Papel', precio: 'DESDE $80.000', valor: 80000 }
      ]
    },
    { 
      nombre: 'Belleza Capilar', 
      img: belleza,  
      subServicios: [
        { nombre: 'Botox Capilar', precio: 'DESDE $50.000', valor: 50000 },
        { nombre: 'Hidratación', precio: 'DESDE $30.000', valor: 30000 },
        { nombre: 'Keratina', precio: 'DESDE $70.000', valor: 70000 }
      ] 
    },
    { 
      nombre: 'Cortes', 
      img: corte,  
      subServicios: [
        { nombre: 'Corte de Puntas', precio: 'DESDE $20.000', valor: 20000 },
        { nombre: 'Corte de Estilo', precio: 'DESDE $25.000', valor: 25000 },
        { nombre: 'Corte en Seco', precio: 'DESDE $30.000', valor: 30000 }
      ] 
    },
    { 
      nombre: 'Peinados', 
      img: 'https://leoleiva.com/wp-content/uploads/2024/06/A.webp',  
      subServicios: [
        { nombre: 'Peinado Casual', precio: 'DESDE $30.000', valor: 30000 },
        { nombre: 'Peinado Formal', precio: 'DESDE $40.000', valor: 40000 },
        { nombre: 'Trenzas', precio: 'DESDE $35.000', valor: 35000 }
      ] 
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleServicioClick = (servicio) => {
    setServicioSeleccionado(servicio);
  };

  const handleSubServicioClick = (subServicio) => {
    setSubServicioSeleccionado(subServicio.nombre);

    // Actualizamos el array de servicios seleccionados con solo el nombre
    const nuevosServicios = [
      ...subServiciosSeleccionados, 
      subServicio.nombre
    ];
    setSubServiciosSeleccionados(nuevosServicios);

    // Actualizamos el total sumando el valor del nuevo subservicio
    const nuevoTotal = total + subServicio.valor;
    setTotal(nuevoTotal);

    // Comunicamos los cambios al componente padre
    onTotalChange(nuevoTotal);
    console.log(nuevosServicios)
    onServiciosChange(nuevosServicios);
  };

  const handleEliminarServicio = (index) => {
    const nuevosServicios = subServiciosSeleccionados.filter((_, i) => i !== index);
    setSubServiciosSeleccionados(nuevosServicios);

    // Recalcular el total eliminando el valor del subservicio eliminado
    const subServicioEliminado = subServiciosSeleccionados[index];
    const servicioData = servicios
      .flatMap(s => s.subServicios)
      .find(sub => sub.nombre === subServicioEliminado);
    const nuevoTotal = total - (servicioData ? servicioData.valor : 0);
    setTotal(nuevoTotal);

    // Comunicamos los cambios al componente padre
    onTotalChange(nuevoTotal);
    onServiciosChange(nuevosServicios);
  };

  const handleVolver = () => {
    setServicioSeleccionado(null);
    setSubServicioSeleccionado(null);
  };

  return (
    <div className="mb-4 xl:w-[500px] lg:w-[500px]">
      {subServicioSeleccionado ? (
        <div className="flex flex-col items-center">
          <button 
            onClick={handleVolver} 
            className="mb-4 flex items-center text-white bg-blue-500 rounded p-2"
          >
            Volver a Servicios
          </button>
          
        </div>
      ) : servicioSeleccionado ? (
        <div className="flex flex-col items-center">
          <h3 className="text-white mb-2">Subservicios de {servicioSeleccionado}</h3>
          <div className="grid grid-cols-1 gap-4">
            {servicios
              .find(servicio => servicio.nombre === servicioSeleccionado)
              .subServicios.map((subServicio) => (
                <div
                  key={subServicio.nombre}
                  className="p-4 border rounded bg-zinc-700 text-white flex items-center cursor-pointer"
                  data-aos="fade-up" 
                  onClick={() => handleSubServicioClick(subServicio)}
                >
                  <div>
                    <h4 className="text-lg font-bold">{subServicio.nombre}</h4>
                    <p className="text-gray-300">{subServicio.precio}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {servicios.map((servicio) => (
            <button
              key={servicio.nombre}
              className={`border rounded w-[300px] h-[300px] flex flex-col items-center text-white
                          ${servicioSeleccionado === servicio.nombre ? 'bg-blue-500' : 'bg-zinc-800'}`}
              onClick={() => handleServicioClick(servicio.nombre)}
              data-aos="fade-up"
            >
              <div className="relative w-full h-full"> 
                <img 
                  src={servicio.img} 
                  alt={servicio.nombre} 
                  className="w-full h-full object-cover opacity-50" 
                />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-center">
                  {servicio.nombre}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Tabla de servicios seleccionados */}
      <div className="mt-6 w-full">
        <h3 className="text-white text-lg font-semibold mb-4 text-center">Servicios Seleccionados:</h3>
        <table className="table-auto w-full text-white">
          <thead>
            <tr>
              <th className="text-left p-3">Subservicio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subServiciosSeleccionados.map((servicio, index) => (
              <tr key={index}>
                <td className='border-b p-3'>{servicio}</td>
                <td>
                  <button
                    onClick={() => handleEliminarServicio(index)}
                    className="text-white"
                  >
                    ⛌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Total */}
        <div className="mt-4 text-right text-white font-semibold">
          Total: ${total.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default SelectServicio;
