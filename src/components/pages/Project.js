import styles from './Project2.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layouts/Message'
import ServiceForm from '../services/ServiceForm'
import { parse, v4 as uuidv4 } from 'uuid';
import ServiceCard from '../services/ServiceCard'

function Project(){
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type,setType] = useState()
    const [services, setServices] = useState([])

    useEffect(()=>{
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method:'GET',
            headers: {
                'Content-Type':'application/json',
            }
        })
        .then(resp => resp.json())
        .then((data) =>{
            setProject(data)
            setServices (data.services)
        })
        .catch(err => console.log)
        }, 300)
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)

    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)

    }
    
    function createService(project) {
        setMessage('')
    // last service
    const lastService = project.services[project.services.length - 1] //Este trecho de código assume que project.services está definido e não é undefined. O erro que você está enfrentando sugere que project.services pode estar vazio ou undefined em algum momento.

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    // maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!')
      setType('error')
      project.services.pop()
      return false
    }
    project.cost = newCost

    //update project
    fetch(`http://localhost:5000/projects/${project.id}`,
    {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(project)
    })
        .then((resp) => resp.json())
        .then((data) =>{
            //exibir os serviços
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))

    }

    function editPost(project){
        setMessage('')

        //budget validantion
            if(project.budget < project.cost){
               setMessage('O orçamento não pode ser menor que o custo do projeto!')
               setType('error')
               return false
            }

            fetch(`http://localhost:5000/projects/${project.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(project),
            })
            .then(resp => resp.json())
            .then((data) =>{
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto Atualizado!')
                setType('success')
            })
            .catch(err=> console.log(err))
    }

    function removeService(id, cost) {
        const servicesUpdated = project.services.filter(
          (service) => service.id !== id,
        )
    
        const projectUpdated = project
    
        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
    
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectUpdated),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
          })
      }
    
    

    return(
        <>
        {project.name ?
         <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message}/> }
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button onClick={toggleProjectForm} className={styles.btn}>{!showProjectForm ? 'Editar projeto' : 'Fechar' }</button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p><span>Categoria: </span>{project.category.name}</p>
                            <p><span>Total de Orçamento: </span>R${project.budget}</p>
                            <p><span>Total Utilizado: </span>R${project.cost}</p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText='Concluir' projectData={project} />
                        </div>
                    )}
                </div>

                <div className={styles.service_form_container}>
                    <h2>Adicione um serviço: </h2>
                    <button onClick={toggleServiceForm} className={styles.btn}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar' }</button>
                    <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm handleSubmit={createService} textBtn="Adicionar Serviço" projectData={project}/>
                                
                        )

                        }
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                {services.length>0 &&
                services.map((service) => (
                    <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                    />
                ))
                }
                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
            </Container>
        </div> :
            <Loading/>

        }
        </>
    )
}

export default Project