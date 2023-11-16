import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; /*Imports necessários para a criação de rotas*/
/*Imports que levarão para as páginas Home, Company, Contact, NewProject*/
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Container from './components/layouts/Container';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Projects from './components/pages/Projects';
import ProjectForm from './components/project/ProjectForm';
import Project from './components/pages/Project';
function App() {
  return (
    <Router>
    <Navbar/>
    <Container customClass="min-height">
   
        
      <Routes>  {/*O container servirá para colocar os route dentro da div props.children em Container.js para estilização */}
          <Route path="/"element={<Home />}/>
          <Route path="/company"element={<Company />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/newProject" element={<NewProject />}/>
          <Route path="/Projects" element={<Projects />}/>
          <Route path="/Project/:id" element={<Project />}/>
      </Routes>
      
      
    

    </Container>
    <Footer/>
    </Router>
  );
}
export default App