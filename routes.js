const express = require("express");

const router = express.Router();

const tareas = require("./data");


// ======================
// GET - Obtener todas las tareas
// ======================

router.get("/tareas", (req, res) => {

    res.json(tareas);

});


// ======================
// GET - Obtener una tarea por ID
// ======================

router.get("/tareas/:id", (req, res) => {

    const id = Number(req.params.id);

    const tarea = tareas.find(t => t.id === id);


    if (!tarea) {

        return res.status(404).json({
            mensaje: "Tarea no encontrada"
        });

    }


    res.json(tarea);

});



// ======================
// POST - Crear tarea
// ======================

router.post("/tareas", (req, res) => {


    const {titulo, descripcion, completada} = req.body;


    // Validación

    if (!titulo || descripcion === undefined || completada === undefined) {

        return res.status(400).json({

            mensaje: "Faltan campos obligatorios"

        });

    }


    if (typeof completada !== "boolean") {

        return res.status(400).json({

            mensaje: "Completada debe ser true o false"

        });

    }



    const nuevaTarea = {

        id: tareas.length + 1,

        titulo,

        descripcion,

        completada

    };


    tareas.push(nuevaTarea);



    res.status(201).json({

        mensaje: "Tarea creada correctamente",

        tarea: nuevaTarea

    });


});




// ======================
// PUT - Actualizar tarea
// ======================

router.put("/tareas/:id", (req,res)=>{


    const id = Number(req.params.id);


    const tarea = tareas.find(t => t.id === id);



    if(!tarea){

        return res.status(404).json({

            mensaje:"Tarea no encontrada"

        });

    }



    const {titulo, descripcion, completada}=req.body;



    if(completada !== undefined && typeof completada !== "boolean"){

        return res.status(400).json({

            mensaje:"Completada debe ser boolean"

        });

    }



    if(titulo){

        tarea.titulo=titulo;

    }


    if(descripcion){

        tarea.descripcion=descripcion;

    }


    if(completada !== undefined){

        tarea.completada=completada;

    }



    res.json({

        mensaje:"Tarea actualizada",

        tarea

    });



});





// ======================
// DELETE - Eliminar tarea
// ======================

router.delete("/tareas/:id",(req,res)=>{


    const id = Number(req.params.id);



    const posicion = tareas.findIndex(t=>t.id===id);



    if(posicion===-1){

        return res.status(404).json({

            mensaje:"Tarea no encontrada"

        });

    }



    tareas.splice(posicion,1);



    res.json({

        mensaje:"Tarea eliminada correctamente"

    });


});



module.exports = router;