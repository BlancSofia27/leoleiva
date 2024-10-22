import emailjs from "emailjs-com"

const serviceId = import.meta.env.VITE_SERVICE_ID
const templateId = import.meta.env.VITE_TEMPLATE_ID
const userId = import.meta.env.VITE_USER_ID
// Función para enviar el email
export const sendReservationEmail = async ({
  nombre,
  email,
  fecha,
  horario,
  subservicios,
}) => {
  const templateParams = {
    nombre: nombre,
    email: email,
    fecha: fecha,
    horario: horario,
    subservicios: subservicios,
  }

  try {
    const response = await emailjs.send(
      serviceId, // Reemplaza con tu SERVICE ID
      templateId, // Reemplaza con tu TEMPLATE ID
      templateParams,
      userId // Reemplaza con tu USER ID
    )
    console.log("Email enviado correctamente:", response.status, response.text)
    return response
  } catch (error) {
    console.error("Error al enviar el email:", error)
    throw error
  }
}
