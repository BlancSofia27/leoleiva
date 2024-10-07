
import logo from '../assets/leoleiva.jpg';


const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center xl:h-[300px] xs:h-[250px]  bg-black">
    

      {/* Contenedor para centrar logo y texto */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Contenido del logo por encima del header */}
        <div className=" overflow-hidden  flex items-center justify-center shadow-lg  ">
          <img 
            src={logo} 
            alt="logo El circulo"
            className="w-full h-full object-cover border border-white"
          />
        </div>

        {/* Texto debajo del logo */}
        <h2 className="my-4 text-xl font-light">Selecciona una fecha</h2>
      </div>
    </div>
  );
};

export default Hero;
