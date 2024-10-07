import React, { useState } from 'react';

const SelectHorario = ( onHorarioChange ) => {
  const [horario, setHorario] = useState(null);

  const horarios = [
    { id: 1, hora: '09:00' },
    { id: 2, hora: '10:15' },
    { id: 3, hora: '10:30' },
    { id: 4, hora: '12:00' },
    { id: 5, hora: '13:30' },
    { id: 6, hora: '17:05' },
    { id: 7, hora: '18:00' },
    { id: 8, hora: '19:10' },
    { id: 9, hora: '19:30' },
  ];

  const handleHorarioClick = (hora) => {
    setHorario(hora);
    console.log(onHorarioChange)
    onHorarioChange(hora); // Enviar el valor seleccionado al componente padre
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h3 className="text-white mb-4">Horarios Disponibles</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {horarios.map((horario) => (
          <button
            key={horario.id}
            onClick={() => handleHorarioClick(horario.hora)}
            className={`p-4 border rounded ${
              horario === horario.hora ? 'bg-blue-500' : 'bg-zinc-700'
            } text-white transition duration-300 ease-in-out transform hover:bg-leo hover:scale-105`}
          >
            {horario.hora}
          </button>
        ))}
      </div>

      {horario && (
        <button
          onClick={() => console.log(`Confirmando horario: ${horario}`)}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          Confirmar Horario
        </button>
      )}
    </div>
  );
};

export default SelectHorario;
