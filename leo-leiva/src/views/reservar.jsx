import React, { useState } from "react"
import SelectServicio from "../components/selectServicio"
import SelectHorario from "../components/selectHorario"
import Calendario from "../components/calendar"
import Hero from "../components/Hero"
import { sendReservationEmail } from "../components/sendReservationEmail"
import Footer from "../components/footer"
import Swal from "sweetalert2"

// Función para formatear la fecha
const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO)
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return fecha.toLocaleDateString("es-ES", opciones)
}

const Reservar = () => {
  const [fecha, setFecha] = useState(null)
  const [subServicio, setSubServicio] = useState([])
  const [horario, setHorario] = useState(null)
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [emailConfirm, setEmailConfirm] = useState("")
  const [total, setTotal] = useState(0)

  const handleReserva = async () => {
    if (
      !nombre ||
      !email ||
      !emailConfirm ||
      !fecha ||
      !horario ||
      subServicio.length === 0
    ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Completa todos los campos para realizar la reserva",
        showConfirmButton: false,
        timer: 1500,
      })
      return
    }

    // Validar que los correos electrónicos coincidan
    if (email !== emailConfirm) {
      alert(
        "Los correos electrónicos no coinciden. Por favor, verifica e intenta nuevamente."
      )
      return
    }

    // Formatear la fecha antes de enviar el correo
    const fechaFormateada = formatearFecha(fecha)

    // Formatear subServicios como una cadena de texto con saltos de línea
    const subServiciosFormateados = subServicio.join(", ")
    const dataToSend = {
      nombre,
      subservicios: subServiciosFormateados,
      fecha: fechaFormateada,
      horario,
      email,
    }
    try {
      const response = await sendReservationEmail(dataToSend)
      console.log(dataToSend)

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Reserva Realizada",
        showConfirmButton: false,
        timer: 1500,
      })
      //resetForm();

      // Redireccionar después de 3 segundos
      // setTimeout(() => {
      //   window.location.href = '/confirmacion';
      // }, 3000);
    } catch (error) {
      console.error("Error al enviar la reserva:", error)
      alert("Hubo un problema al enviar la reserva")
    }
  }

  const resetForm = () => {
    setFecha(null)
    setSubServicio([])
    setHorario(null)
    setNombre("")
    setEmail("")
    setEmailConfirm("")
    setTotal(0)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-opacity-50 w-full">
      <Hero />
      <div className="flex flex-col justify-center items-center container mx-3 py-3">
        <h1 className="text-3xl text-white mb-4 text-center">
          Reservar Servicio
        </h1>
        <div className="mb-4">
          <Calendario onDateChange={setFecha} selectedDate={fecha} />
        </div>
        <SelectServicio
          onTotalChange={setTotal}
          onServiciosChange={setSubServicio}
        />

        {/* Solo mostrar SelectHorario si hay un servicio seleccionado */}
        {subServicio.length > 0 && (
          <SelectHorario onHorarioChange={setHorario} />
        )}

        <div className="m-4 w-full md:w-[400px]">
          {" "}
          {/* Puedes ajustar el ancho */}
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 mb-2 w-full text-black"
          />
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-2 w-full text-black"
          />
          <input
            type="email"
            placeholder="Confirma tu email"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            className="border p-2 mb-2 w-full text-black"
          />
          {/* Label para mostrar la coincidencia de correos */}
          <label
            className={`text-sm mt-1 ${
              email === emailConfirm ? "text-green-500" : "text-red-500"
            }`}
          >
            {emailConfirm
              ? email === emailConfirm
                ? "Los correos coinciden"
                : "Los correos no coinciden"
              : ""}
          </label>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleReserva}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Confirmar Reserva
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Reservar
