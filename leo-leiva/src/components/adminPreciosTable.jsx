import { useState, useEffect } from 'react';
import { obtenerListaDePrecios } from '../supabase/api'; // Función para obtener los precios desde Supabase

const AdminPreciosTable = () => {
  const [preciosTenis, setPreciosTenis] = useState([]);
  const [preciosFutbol5, setPreciosFutbol5] = useState([]);
  const [preciosFutbol6, setPreciosFutbol6] = useState([]);
  const [preciosPaddle, setPreciosPaddle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tablaIndex, setTablaIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const fetchPrecios = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener precios para cada tipo de cancha
        const tenisResult = await obtenerListaDePrecios('Tenis');
        if (tenisResult.success) setPreciosTenis(tenisResult.data);

        const futbol5Result = await obtenerListaDePrecios('Futbol 5');
        if (futbol5Result.success) setPreciosFutbol5(futbol5Result.data);

        const futbol6Result = await obtenerListaDePrecios('Futbol 6');
        if (futbol6Result.success) setPreciosFutbol6(futbol6Result.data);

        const paddleResult = await obtenerListaDePrecios('Paddle');
        if (paddleResult.success) setPreciosPaddle(paddleResult.data);

      } catch (err) {
        setError('Error al obtener precios');
      } finally {
        setLoading(false);
      }
    };

    fetchPrecios();
  }, []);

  const handleNext = () => {
    setTablaIndex((prevIndex) => (prevIndex + 1) % 4); // Hay 4 tablas
  };

  const handlePrevious = () => {
    setTablaIndex((prevIndex) => (prevIndex - 1 + 4) % 4); // Hay 4 tablas
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext(); // Deslizó hacia la izquierda
    }

    if (touchStart - touchEnd < -50) {
      handlePrevious(); // Deslizó hacia la derecha
    }
  };

  const renderTable = (titulo, precios) => (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">{titulo}</h2>
      {precios.length > 0 ? (
        <table className="min-w-full bg-zinc-800 border rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-2 border-b bg-blue-600 text-white text-center">Día</th>
              <th className="py-3 px-1 border-b bg-blue-600 text-white text-center">Horario</th>
              <th className="py-3 px-4 border-b bg-blue-600 text-white text-center">Precio</th>
              <th className="py-3 border-b bg-blue-600 text-white text-center"></th>
            </tr>
          </thead>
          <tbody>
            {precios.map((precio) => (
              <tr key={`${precio.dia}-${precio.hora}`} className="hover:bg-gray-700">
                <td className="py-2 px-4 text-center border-b text-white">{precio.dia}</td>
                <td className="py-2 px-1 text-center border-b text-white">{precio.hora}</td>
                <td className="py-2 px-2 text-center border-b text-white">${precio.precio}</td>
                <td className="py-2 px-1 text-center border-b">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-300">No hay precios disponibles.</p>
      )}
    </div>
  );

  const tablas = [
    { titulo: 'Precios Tenis', precios: preciosTenis },
    { titulo: 'Precios Fútbol 5', precios: preciosFutbol5 },
    { titulo: 'Precios Fútbol 6', precios: preciosFutbol6 },
    { titulo: 'Precios Paddle', precios: preciosPaddle },
  ];

  return (
    <div className="px-2 shadow-xl rounded-lg">
      <h1 className="text-3xl font-extrabold m-6 text-center text-white">Lista De Precios Vigentes</h1>

      {loading ? (
        <p className="text-gray-300">Cargando precios...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div
            className="flex justify-between items-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button onClick={handlePrevious} className="text-white flex justify-center items-center h-full">
              ⮜
            </button>

            <div className="flex-grow">
              {renderTable(tablas[tablaIndex].titulo, tablas[tablaIndex].precios)}
            </div>

            <button onClick={handleNext} className="text-white flex justify-center items-center h-full">
              ⮞
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPreciosTable;
