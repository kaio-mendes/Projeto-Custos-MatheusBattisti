import styles from './ProjectCard.module.css' 

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

import { Link } from 'react-router-dom'
 
function ProjectCard ({name, budget, category, id, handleRemove}) {
const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
}
    return (
       <div className={styles.project_card}>

        <h4>{name || ('Sem titulo')}</h4> {/*Se houver nome inserir nome, caso não haja mostrar sem titulo*/}

       <p><span>Orçamento: </span> {budget ? `R$ ${budget}` : 'Valor não definido'}</p> {/*Se houver valor inserir valor, caso não haja mostrar Valor não definido*/}
       

      <p className={styles.category_text}>
    <span className={`${styles[category?.name?.toLowerCase()] || ''}`}></span>
    {category?.name || 'Categoria não definida'} {/*Verifica se possuí categoria, caso não haja retorna erro*/}
</p>

       <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}>
            <BsPencil />Editar
        </Link>

        
            <button onClick={remove}><BsFillTrashFill/>Excluir</button>
        
       </div>

       </div>
       
    )
 }

 export default ProjectCard