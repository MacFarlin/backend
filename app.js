console.log("Todo Flama")

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000


app.use(express.json())
app.use(cors())

const personas=[{
    "id": 1,
    "dni": 41330029,
    "apellido": "Mac Farlin",
    "nombre": "Ariel",
    "edad": 25,
    "registroConducir": false,
    "domicilio": [{
        "calle":"Calle Falsa",
        "numero": 123,
        "localidad": "JCP",
    }]
}]

app.get('/personas', (req,res) => {
    res.status(200).json(personas)
})

app.get('/personas/:id' , (req,res)=>{
    const id = req.params.id
    const idx = personas.findIndex(p => p.id == id)

    if (idx>=0){
        res.status(200).json(personas[idx])
    } else {
        res.status(404).json({error: "No encontre a la persona con id : " + id})
    }
})

app.delete('/personas/:id' , (req,res)=>{
    const id = req.params.id
    const idx = personas.findIndex(p => p.id == id)

    if (idx>=0){
        const personaBorrada = personas.splice(idx, 1)
        res.status(200).json({"mensaje": "El siguiente objeto con id " + id + " fue borrado", personaBorrada})
    } else {
        res.status(404).json({error: "No encontre a la persona con id : " + id})
    }
})

app.post('/personas' , (req,res) =>{

    const ids = personas.map( p => p.id)
    const id = Math.max(...ids)

    const personaNueva = {
        "id" : id + 1,
        "dni": req.body.dni,
        "apellido": req.body.apellido,
        "nombre": req.body.nombre,
        "edad": req.body.edad,
        "registroConducir": req.body.registroConducir,
        "domicilio": [{
            "calle": req.body.domicilio.calle,
            "numero": req.body.domicilio.numero,
            "localidad": req.body.domicilio.localidad
        }]
    }

if(personaNueva.dni >= 0 && personaNueva.dni <= 9999999 && personaNueva.edad > 0 && personaNueva.edad < 100){

    personas.push(personaNueva)
    res.status(201).json(
        {"mensaje": "El siguiente objeto con id: " + personaNueva.id + " se ha añadido correctamente", personaNueva
        }
                        )   
}   else {
    res.status(400).json(
        {"error": "No se ha podido añadir el objeto, verifique la EDAD y/o DNI. El Dni: '" + personaNueva.dni + "' debe estar entre los valores 0 y 9999999. Y la edad: '" + personaNueva.edad + "' debe estar entre 1 y 99."}
                        )
            }

})

app.put('/personas', (req,res) => {
    const id = req.body.id
    const idx = personas.findIndex(p => p.id == req.body.id)

    if(idx>=0){
        const persona = personas.find(p => p.id == id)

        persona.id = persona.id
        persona.dni = persona.dni
        persona.apellido = persona.apellido
        persona.nombre = persona.nombre
        persona.edad = persona.edad
        persona.registroConducir = req.body.registroConducir
        persona.domicilio = req.body.domicilio

        personas.splice(idx,1,persona)

        res.status(200).json({"mensaje": "Se ha cambiado el objeto con id: '" + id + "' correctamente."})

    } else{
        res.status(404).json({"error": "No se ha encontrado el objeto con id: " + id})
    }

})

app.listen(PORT, () => {
    console.log("Arranco correctamente en el puerto: " + PORT)
})
