export default function Sidebar() {
  return (
    <div className="text-black w-64 flex flex-col">
      <div className="p-4">
        <div className="flex flex-col items-center space-x-2 my-8">
          <img
            src="foto.jpeg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full h-32 w-auto"
          />
        </div>
          <div className="text-center">
            <p className="text-xl my-8 font-light"><span><strong>ACCTC</strong><br /></span>
            "Aplicación para consulta de clasificación de tumores cerebrales"
            </p>
          </div>
          <hr />
          <div className="my-8">
            <h2 className="font-semibold">Integrantes:</h2>
            <ol className="list-disc ml-4">
              <li>Saeed Priego Merino</li>
              <li>Miranda Vargas Ricardo</li>
              <li>Islas Duarte Ángel Israel</li>
              <li>García Espinosa Ricardo Zadkiel</li>
              <li>Barrera Franco Héctor Missael</li>
              <li>Garcia Jimenez Osmar Alejandro</li>
              <li>Murillo Mendoza María Fernanda</li>
              <li>González Macuilaco Jonathan</li>
              <li>Florencio Enríquez Kevin Joan</li>
            </ol>
          </div>
      </div>
    </div>
  )
}
