import loading from '../../img/loading.svg'


import styles from './Loading.module.css'

function Loading () {

    return (
      
       <div className={styles.loader_container}>
            <img src={loading} className={styles.loader} alt="Loading"/>
       </div>
       
    )
 }

 export default Loading