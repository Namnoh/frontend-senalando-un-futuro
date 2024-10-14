export default function Email({ email }: { email: string }) {
    return (
        <div className="flex flex-col space-y-4">
            <h3 className="pt-10 sm:pt-6 lg:pt-6 sm:text-xl lg:text-2xl text-lg font-semibold text-black ">Correo:</h3>
            <p className="sm:text-xl lg:text-2xl lg:ml-10 text-black">{email}</p>
        </div>
    )
}