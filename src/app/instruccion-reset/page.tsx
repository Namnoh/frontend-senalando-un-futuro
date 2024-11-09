"use client"
export default function ResetPasswordInstructions() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Instrucciones para restablecer tu contraseña</h1>
        <p className="text-gray-600 text-lg mb-4">
          Revisa tu correo electrónico para obtener un enlace para restablecer tu contraseña.
        </p>
        <p className="text-gray-600 text-lg mb-4">
          Si no ves el correo, revisa la carpeta de <strong>spam</strong> o la carpeta de <strong>promociones</strong>.
        </p>
        <div className="text-center">
          <button 
            className="inline-block bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300"
            onClick={() => window.close()} // Cierra la ventana
          >
            Cerrar esta pestaña
          </button>
        </div>
      </div>
    </div>
  )
}
