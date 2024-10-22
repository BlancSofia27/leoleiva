import logo from '../assets/leoleiva.jpg'
import emailGif from '../assets/email.gif';

const ReservaConfirmada = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black px-5">
      <img 
      className="w-40 h-w-40"
      src={logo} 
      alt="logo leo leiva peluqueria" />
      <h1 className="text-3xl font-bold mb-4">Reserva Confirmada</h1>
      <p className="mb-7 text-xl text-center">Vas a recibir la confirmación en tu casilla de email.</p>

      {/* Contenedor con fondo de círculo blanco */}
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="absolute bg-white rounded-full w-full h-full"></div>

        {/* Mostrar el GIF de forma continua */}
        <img
          src={emailGif}
          alt="Confirmación por Email"
          className="relative w-auto h-auto"
        />
      </div>
    </div>
  );
};

export default ReservaConfirmada;
