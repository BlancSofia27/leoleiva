import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa el CSS de AOS
import coloracion from '../assets/carito.jpg';
import belleza from '../assets/cande.jpg';
import corte from '../assets/agos.jpg';
import SelectHorario from './SelectHorario'; // Asegúrate de importar tu componente SelectHorario

const SelectServicio = ({ onTotalChange, onServicioChange }) => { // Recibe las funciones como props
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [subServicioSeleccionado, setSubServicioSeleccionado] = useState(null); // Estado para el subservicio seleccionado
  const [precioTotal, setPrecioTotal] = useState(0); // Estado para el precio total

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
    AOS.init({ duration: 800 }); // Inicializa AOS con una duración de animación
  }, []);

  const handleServicioClick = (servicio) => {
    setServicioSeleccionado(servicio);
    setSubServicioSeleccionado(null); // Resetear subservicio al seleccionar un nuevo servicio
    setPrecioTotal(0); // Resetear el precio total
  };

  const handleSubServicioClick = (subServicio) => {
    setSubServicioSeleccionado(subServicio);
    setPrecioTotal(subServicio.valor); // Actualiza el precio total
    onTotalChange(subServicio.valor); // Envía el precio total al componente padre
    onServicioChange(subServicio); // Envía el subservicio seleccionado al componente padre
  };

  const handleVolver = () => {
    setServicioSeleccionado(null);
    setSubServicioSeleccionado(null);
    setPrecioTotal(0);
    onTotalChange(0); // Enviar 0 al componente padre al volver
  };

  return (
    <div className="mb-4 xl:w-[500px] lg:w-[500px]">
      {subServicioSeleccionado ? ( // Si hay un subservicio seleccionado
        <div className="flex flex-col items-center">
          <button 
            onClick={handleVolver} 
            className="mb-4 flex items-center text-white bg-blue-500 rounded p-2"
          >
            Volver a Servicios
          </button>
          <h3 className="text-white mb-2">{subServicioSeleccionado.nombre}</h3> {/* Mostrar solo el subservicio seleccionado */}
          <SelectHorario precioTotal={precioTotal} /> {/* Mostrar el componente SelectHorario aquí */}
        </div>
      ) : servicioSeleccionado ? ( // Si hay un servicio seleccionado
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
                  onClick={() => handleSubServicioClick(subServicio)} // Al seleccionar un subservicio
                >
                  <div>
                    <h4 className="text-lg font-bold">{subServicio.nombre}</h4>
                    <p className="text-gray-300">{subServicio.precio}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      ) : ( // Si no hay un servicio seleccionado
        <div className="flex flex-wrap gap-4 justify-center">
          {servicios.map((servicio) => (
            <button
              key={servicio.nombre}
              className={`border rounded w-[300px] h-[300px] flex flex-col items-center text-white
                          ${servicioSeleccionado === servicio.nombre ? 'bg-blue-500' : 'bg-zinc-800'}`}
              onClick={() => handleServicioClick(servicio.nombre)} // Al seleccionar un servicio
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
    </div>
  );
};

export default SelectServicio;
