import Input from '../form/Input'
import Select from '../form/Select'
import SubmitBtn from '../form/SubmitBtn'
import styles from './Project.module.css'
import {useState, useEffect} from 'react'

function ProjectForm({handleSubmit,btnText, projectData}){ 
    //Recebendo informacao de texto do btn do componente pai newproject.js

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() =>{
        fetch("http://localhost:5000/categories" ,{
            method: "GET",
            headers:{
                'Content-Type':'application/json',
            },                     //arquivo para receber dados inseridos nas categories de json
        })
        .then((resp) => resp.json())
        .then((data) => {
                setCategories(data)
        })
        .catch((err)=>console.log(err))
    },[])
    
    const submit = (e) =>{
        e.preventDefault()
        //console.log(project)
       handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e) {
        setProject({...project,category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
    },
})
        console.log(project)
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" required handleOnChange={handleChange} value={project.name ? project.name : ''} placeholder="Insira o nome do projeto"/> {/*Props dinamicas de form/input.js servem  */}

            <Input type="number" text="Orçamento do projeto" name="budget" required handleOnChange={handleChange} value={project.budget ? project.budget : ''} placeholder="Insira o orçamento total"/>

            <div>
            <Select name="category_id" text="Selecione a categoria" options={categories} required handleOnChange={handleCategory} value={project.category ? project.category.id : ''} />
            </div>  
            <SubmitBtn text={btnText}/>
        </form>
    )
}

export default ProjectForm