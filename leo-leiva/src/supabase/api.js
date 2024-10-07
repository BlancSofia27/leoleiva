// src/supabaseQueries.js
import { supabase } from './supabaseClient'
// Obtener horarios disponibles para una cancha específica en una fecha


// Hacer una reserva
export const crearReserva = async ( fecha, horario, cancha, total, nombre) => {
  const { error } = await supabase.from('reservas').insert([
    {
      
      fecha,
      horario,
      cancha,
      total,
      nombre,
    },
  ])

  if (error) {
    console.error('Error haciendo la reserva:', error)
    return false
  }

  return true
}

// Hacer una reserva
export const crearPrecio = async (dia, hora, cancha, precio) => {
  const { error } = await supabase.from('precios').insert([
    {
      
      dia,
      hora,
      cancha,
      precio
    },
  ])

  if (error) {
    console.error('Error creando el precio:', error)
    return false
  }

  return true
}

// Función para obtener las reservas por fecha

export const obtenerReservasPorFecha = async (fechaSeleccionada) => {
  const formatearFecha = (fecha) => {
    // Convertir la fecha a formato ISO y tomar solo la parte de la fecha
    return new Date(fecha).toISOString().split('T')[0]; // Esto devolverá 'YYYY-MM-DD'
  };
  try {
      // Formatear la fecha al formato 'YYYY-MM-DD'
      const fechaFormateada = formatearFecha(fechaSeleccionada);
      
    // Consulta a la base de datos filtrando solo por la fecha (formato DATE en la base de datos)
    const { data, error } = await supabase
      .from('reservas')
      .select('nombre, cancha, horario')
      .eq('fecha', fechaFormateada); // Comparar solo la fecha en formato 'YYYY-MM-DD'

    if (error) {
      console.error('Error al obtener las reservas:', error);
      return { success: false, error };
    }

    
    return { success: true, data };
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    return { success: false, error };
  }
};







// Obtener los horarios reservados para una fecha específica


export const obtenerDisponibilidad = async (fecha, cancha) => {
  try {
    // Formatear la fecha a "yyyy/mm/dd"
    const formattedDate = `${fecha.getFullYear()}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getDate().toString().padStart(2, '0')}`;
    console.log(formattedDate);

    const { data, error } = await supabase
      .from("reservas")
      .select("horario")
      .eq("fecha", formattedDate)  // Usar la fecha formateada
      .eq("cancha", cancha);

    if (error) throw error;

    // Todos los horarios precargados (08:00 a 22:00)
    const todosLosHorarios = Array.from({ length: 15 }, (_, i) => {
      const hora = (8 + i).toString().padStart(2, '0'); // Genera horarios desde 08:00 a 22:00
      return `${hora}:00`;
    });

    // Definir el umbral de ocupación según el tipo de cancha
    let umbralOcupacion;
    switch (cancha) {
      case "Tenis":
        umbralOcupacion = 7;
        break;
      case "Paddle":
        umbralOcupacion = 2;
        break;
      case "Futbol5":
      case "Futbol7":
        umbralOcupacion = 1;
        break;
      default:
        umbralOcupacion = 7; // Umbral por defecto
    }

    // Contar las ocurrencias de cada horario
    const horasContadas = data.reduce((acc, { horario }) => {
      acc[horario] = (acc[horario] || 0) + 1;
      return acc;
    }, {});

    // Filtrar los horarios que superan el umbral de ocupación según el tipo de cancha
    const horariosOcupados = Object.entries(horasContadas)
      .filter(([_, count]) => count >= umbralOcupacion)
      .map(([hora]) => hora);

    // Filtrar los horarios ocupados del listado completo
    const horariosDisponibles = todosLosHorarios.filter(hora => !horariosOcupados.includes(hora));

    return horariosDisponibles; // Devuelve todos los horarios menos los ocupados
  } catch (error) {
    console.error("Error al obtener disponibilidad:", error);
    return []; // Retorna un array vacío en caso de error
  }
};



export const devolverPrecio = async (fecha, horario) => {
  // Asegúrate de que la fecha es un objeto Date
  if (!(fecha instanceof Date)) {
    throw new Error('Se debe proporcionar un objeto Date válido');
  }
  
  // Obtener el día de la semana
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const diaDeLaSemana = dias[fecha.getDay()];
  const hora = String(horario)

  console.log('fecha y hora:',diaDeLaSemana,horario)
  // Realizar la consulta a la tabla de precios
  const { data, error } = await supabase
    .from('precios')
    .select('precio')
    .eq('dia', diaDeLaSemana)
    .eq('hora', hora)
    .single(); // Obtén solo una fila

  if (error) {
    console.error('Error al obtener el precio:', error);
    return null; // O maneja el error según sea necesario
  }

  return data ? data.precio : null; // Devuelve el precio o null si no se encontró
};


export const obtenerListaDePrecios = async (cancha) => {
  try {
    // Verificar si cancha no está vacía
    if (!cancha) {
      const { data, error } = await supabase
        .from('precios')
        .select('dia, hora, cancha, precio');

      if (error) {
        console.error('Error al obtener los precios:', error);
        return { success: false, error };
      }

      return { success: true, data }; // Retornar todos los precios si no se especifica cancha
    }

    // Consulta a la base de datos filtrando solo por la cancha
    const { data, error } = await supabase
      .from('precios')
      .select('dia, hora, cancha, precio')
      .eq('cancha', cancha);

    if (error) {
      console.error('Error al obtener los precios:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error al obtener precios:', error);
    return { success: false, error };
  }
};