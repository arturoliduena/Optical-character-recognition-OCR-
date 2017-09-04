 let data = [
 {
       "id": 2,
       "role": "cajero",
       "createdAt": "2017-08-01T14:19:58.986Z",
       "updatedAt": "2017-08-01T14:19:58.986Z",
       "id_item": 2,
       "id_mission": 1,
       "id_agent": 2,
       "id_store": 2,
       "item": {
           "id": 2,
           "codigo": "666",
           "nombre": "Cuco",
           "cantidad": 352,
           "unidadMedida": "paquete",
           "foto": "foto",
           "ENA": 448,
           "createdAt": "2017-07-25T15:52:41.566Z",
           "updatedAt": "2017-07-26T18:34:16.825Z"
       },
       "mission": {
           "id": 1,
           "nombre": "Foto",
           "descripcion": "sacar fotos locas",
           "createdAt": "2017-07-25T15:51:34.453Z",
           "updatedAt": "2017-07-26T21:56:13.844Z"
       },
       "agent": {
           "id": 2,
           "nombre": "Ale",
           "apellido": "Cucocccc",
           "DNI": 35203449,
           "role": "cajero",
           "createdAt": "2017-07-25T15:15:59.611Z",
           "updatedAt": "2017-07-25T15:15:59.611Z",
           "id_user": null
       },
       "store": {
           "id": 2,
           "codigo": "Aca a la vuelta",
           "nombre": "Lo de al lado",
           "latitud": "352",
           "longitud": "mmmm",
           "createdAt": "2017-07-25T15:49:30.295Z",
           "updatedAt": "2017-07-25T15:49:30.295Z"
       }
   },
   {
       "id": 3,
       "role": "cajero",
       "createdAt": "2017-08-01T14:19:58.986Z",
       "updatedAt": "2017-08-01T14:19:58.986Z",
       "id_item": 2,
       "id_mission": 1,
       "id_agent": 2,
       "id_store": 3,
       "item": {
           "id": 2,
           "codigo": "666",
           "nombre": "Cuco",
           "cantidad": 352,
           "unidadMedida": "paquete",
           "foto": "foto",
           "ENA": 448,
           "createdAt": "2017-07-25T15:52:41.566Z",
           "updatedAt": "2017-07-26T18:34:16.825Z"
       },
       "mission": {
           "id": 1,
           "nombre": "Foto",
           "descripcion": "sacar fotos locas",
           "createdAt": "2017-07-25T15:51:34.453Z",
           "updatedAt": "2017-07-26T21:56:13.844Z"
       },
       "agent": {
           "id": 2,
           "nombre": "Ale",
           "apellido": "Cucocccc",
           "DNI": 35203449,
           "role": "cajero",
           "createdAt": "2017-07-25T15:15:59.611Z",
           "updatedAt": "2017-07-25T15:15:59.611Z",
           "id_user": null
       },
       "store": {
           "id": 3,
           "codigo": "Aca a la vuelta",
           "nombre": "store",
           "latitud": "352",
           "longitud": "mmmm",
           "createdAt": "2017-07-25T15:49:30.295Z",
           "updatedAt": "2017-07-25T15:49:30.295Z"
       }
   }
]

function filto (data){
  let stores = [];
  for (i=0 ; i < data.length ; i++){
    for (j=0 ; j < stores.length ; j++){
      if(data[i].id_store == stores[j]){
        return break
      }
    }
    stores.push(data[i].id_store)
  }
  return stores
}