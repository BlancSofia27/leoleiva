import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css'; // Importamos un archivo CSS personalizado

const Calendario = ({ onDateChange, selectedDate }) => {
  const handleDateChange = (date) => {
    onDateChange(date);  // Enviar el objeto Date directamente
  };

  // Función que deshabilita los días anteriores a la fecha actual y los domingos
  const disablePastDates = ({ date, view }) => {
    // Solo deshabilitar días en la vista de mes
    if (view === 'month') {
      const today = new Date();
      // Comparamos la fecha con el día actual y deshabilitamos los días anteriores
      // y también deshabilitamos los domingos (día 0)
      return date < today.setHours(0, 0, 0, 0) || date.getDay() === 0;
    }
    return false;
  };

  return (
    <div className="mb-4 flex justify-center">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={disablePastDates} // Deshabilitar días anteriores y domingos
        className="react-calendar xl:w-[500px] xs:w-full" // Ajusta los valores según necesites
      />
    </div>
  );
};

export default Calendario;
