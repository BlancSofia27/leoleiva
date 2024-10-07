import React, { useState } from 'react'; 
import SelectServicio from '../components/SelectServicio';
import SelectHorario from '../components/SelectHorario';
import Calendario from '../components/calendar';
import Hero from '../components/Hero';
import { sendReservationEmail } from '../components/sendReservationEmail';
import Footer from '../components/footer';

const Reservar = () => {
  const [fecha, setFecha] = useState(null);
  const [servicio, setServicio] = useState(null);
  const [horario, setHorario] = useState(null);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [total, setTotal] = useState(0);

  const handleReserva = async () => {
    if (!nombre || !email || !fecha || !horario || !servicio) {
      alert('Por favor, completa todos los campos antes de enviar la reserva.');
      return;
    }

    try {
      await sendReservationEmail({
        nombre,
        email,
        fecha,
        horario,
        servicio,
        total,
      });

      alert('Reserva enviada con éxito');
      resetForm();
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      alert('Hubo un problema al enviar la reserva');
    }
  };

  const resetForm = () => {
    setFecha(null);
    setServicio(null);
    setHorario(null);
    setNombre('');
    setEmail('');
    setTotal(0);
  };

  return (
    <div className="bg-cover bg-center bg-opacity-50">
      <Hero />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl text-white mb-4">Reservar Servicio</h1>
        <div className="mb-4">
          <Calendario onDateChange={setFecha} selectedDate={fecha} />
        </div>
        <SelectServicio onTotalChange={setTotal} onServicioChange={setServicio} />
        
        {servicio && (
          <SelectHorario onHorarioChange={setHorario} />
        )}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
        </div>
        <button onClick={handleReserva} className="bg-blue-500 text-white p-2 rounded">
          Confirmar Reserva
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Reservar;
