import Message from "../layouts/Message"

import { useLocation } from "react-router-dom"

import style from "./Project.module.css"

import Container from "../layouts/Container"

import LinkButton from "../layouts/LinkButton"


import { useState, useEffect } from "react"
import ProjectCard from "../project/ProjectCard"

import Loading from "../layouts/Loading"

function Projects(){

    const [projectMessage, setProjectMessage] = useState('')
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location=useLocation()
    let message=''

    if(location.state){
        message= location.state.message
    }

    useEffect(()=>{
        setTimeout(()=> {fetch('http://localhost:5000/projects', { //set timeout ira inserir o tempo para rodar o codigo dentro das chaves dele
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.json())
        .then((data)=>{
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
            
        })
        .catch((err)=>console.log(err))
    }, 500) //comando para inserir tempo no loader de 2 segundos
        
    },[])
    
    function removeProject (id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
        }).then((resp) => resp.json())
        .then(() => {
            setProjects(projects.filter((project)=>project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err=> console.log(err))
    }
    return(
        <div className={style.project_container}>
            <div className={style.tittle_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto"/>
            </div>
            {message && <Message type="success" msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}

            <Container customClass="start">
                    {projects.map((project)=> (
                        <ProjectCard
                        id = {project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category}
                        key={project.id}
                        handleRemove={removeProject}
                        />
                    ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && projects.length === 0 &&
                        <p>Não há projetos cadastrados!</p>
                    }
            </Container>


        </div>
    )
}

export default Projects