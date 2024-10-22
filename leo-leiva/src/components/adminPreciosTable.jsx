import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// Lista de servicios de peluquería
const servicios = [
  {
    nombre: 'Coloración',
    subServicios: [
      { nombre: 'Cambio de color', precio: 'DESDE $80.000' },
      { nombre: 'Tono sobre tono', precio: 'DESDE $50.000' },
      { nombre: 'Color sin amoníaco', precio: 'DESDE $65.000' },
      { nombre: 'Color raíz', precio: 'DESDE $55.000' },
      { nombre: 'Decoloración', precio: 'DESDE $80.000' },
      { nombre: 'Reflejos con gorra/papel', precio: 'DESDE $80.000' },
      { nombre: 'Balayage / Balayage ombré', precio: 'DESDE $80.000' },
      { nombre: 'Mechas Papel', precio: 'DESDE $80.000' },
    ],
  },
  {
    nombre: 'Belleza Capilar',
    subServicios: [
      { nombre: 'Botox Capilar', precio: 'DESDE $50.000' },
      { nombre: 'Hidratación', precio: 'DESDE $30.000' },
      { nombre: 'Keratina', precio: 'DESDE $70.000' },
    ],
  },
  {
    nombre: 'Cortes',
    subServicios: [
      { nombre: 'Corte de Puntas', precio: 'DESDE $20.000' },
      { nombre: 'Corte de Estilo', precio: 'DESDE $25.000' },
      { nombre: 'Corte en Seco', precio: 'DESDE $30.000' },
    ],
  },
  {
    nombre: 'Peinados',
    subServicios: [
      { nombre: 'Peinado Casual', precio: 'DESDE $30.000' },
      { nombre: 'Peinado Formal', precio: 'DESDE $40.000' },
      { nombre: 'Trenzas', precio: 'DESDE $35.000' },
    ],
  },
];

const ServiciosTable = () => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null); // Estado para manejar el índice de la fila en hover

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-white">Servicios de Peluquería</h1>
      <Swiper
        spaceBetween={50}
        slidesPerView={1} // Cambiar según el número de tablas visibles
        pagination={{ clickable: true }} // Habilita la paginación
        loop={true} // Permite el bucle infinito
        className="mySwiper"
      >
        {servicios.map((servicio, index) => (
          <SwiperSlide key={index}>
            <div className="overflow-x-auto bg-zinc-800 border rounded-lg mb-4">
              <h2 className="text-xl font-bold text-white text-center p-4">{servicio.nombre}</h2>
              <table className="min-w-full">
                <thead>
                  <tr className="text-white">
                    <th className="py-3 px-4 border-b text-left">Subservicio</th>
                    <th className="py-3 px-4 border-b text-left">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {servicio.subServicios.map((subServicio, subIndex) => (
                    <tr
                      key={subIndex}
                      className={`hover:bg-gray-700 relative ${hoveredRowIndex === subIndex ? 'bg-gray-600' : ''}`}
                      onMouseEnter={() => setHoveredRowIndex(subIndex)}
                      onMouseLeave={() => setHoveredRowIndex(null)}
                    >
                      <td className="py-2 px-4 border-b text-white">{subServicio.nombre}</td>
                      <td className="py-2 px-4 border-b text-white flex justify-between items-center">
                        {subServicio.precio}
                        {hoveredRowIndex === subIndex && (
                          <button className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                            Editar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServiciosTable;
