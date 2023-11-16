import styles from '../project/Project.module.css'
import {useState} from 'react'
import Input from '../form/Input'
import SubmitBtn from '../form/SubmitBtn'


function ServiceForm({handleSubmit, textBtn, projectData}){  
    
    const [services, setServices] = useState([])

    function submit(e){
        e.preventDefault()
        projectData.services.push(services)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setServices({...services, [e.target.name]: e.target.value})
    }

return(
    <form onSubmit={submit} className={styles.form}>
        <Input type="text" text="Nome do Serviço" name="name" placeholder="Insira o nome do serviço" handleOnChange={handleChange}/>

        <Input type="number" text="Custo do Serviço" name="cost" placeholder="Insira o valor total" handleOnChange={handleChange}/>

        <Input type="text" text="Descrição do Serviço" name="description" placeholder="Escreva o serviço" handleOnChange={handleChange}/>

        <SubmitBtn text={textBtn}/>
    </form>
)
}

export default ServiceForm