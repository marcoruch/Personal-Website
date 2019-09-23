    
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from '../Header/Header';
import BlogPost from '../BlogPost/BlogPost';
import CreateBlog from '../CreateBlog/CreateBlog';
import SubHeader from '../SubHeader/SubHeader.jsx';
import AboutMe from '../AboutMe/AboutMe';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import Contact from '../Contact/Contact';
import BlogCardHolder from "../BlogCardHolder/BlogCardHolder";
import OverviewBlog from "../OverviewBlog/OverviewBlog";
import EditBlog from "../EditBlog/EditBlog";
import Haltestelle from "../Haltestelle/Haltestelle";
import CurriculumVitae from "../CurriculumVitae/CurriculumVitae";
import Muehle from "../Muehle/Muehle";
import Games from "../Games/Games";
import FoodLookup from "../FoodLookup/FoodLookup";
import { MapProvider } from "../MapContainer/MapContext/MapContext"
import { UserProvider } from "../UserContext/UserContext";
import axios from 'axios'
import Footer from "../Footer/Footer";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

function App() {
  return (
    <Router basename="/">
       <UserProvider>
        <Header />
        <Route exact path="/" component={GetHome} />
        <Route path="/aboutme" component={GetAboutMe} />
        <Route path="/projects" component={GetProjects} />
        <Route path="/skills" component={GetSkills} />
       { /* <Route path="/blog" component={GetBlog} />
        <Route path="/createBlog" component={GetCreateBlog} />
  <Route path="/overviewBlog" component={GetOverviewBlog} />*/}
        <Route path="/contact" component={GetContact} />
        <Route path="/games" component={GetGames} />
        <Route path="/haltestelle" component={GetHaltestelle} />
        <Route path="/muehle" component={GetMuehle} />
        <Route path="/curriculumvitae" component={GetCV} />
        <Route path="/games/foodlookup" component={GetFoodLookup} />
        <Route path="/games/haltestelle" component={GetHaltestelle} />
        <Route path="/games/muehle" component={GetMuehle} />
        <Route path="/foodlookup" component={GetFoodLookup} />
        </UserProvider>
    </Router>
  );
}

function GetHome() {
  return <React.Fragment>
    <AboutMe></AboutMe>
    <Projects loadAll={false} loadAmount={5}></Projects>
    <Skills></Skills>
    <Games></Games>
    <Contact></Contact>
    <Footer></Footer>
  </React.Fragment>;
}

function GetAboutMe() {
  return <React.Fragment>
    <AboutMe></AboutMe>
    <Footer></Footer>
  </React.Fragment>;
}


function GetFoodLookup(){
  return <React.Fragment><MapProvider>
    <FoodLookup></FoodLookup>
  </MapProvider>
  <Footer></Footer>
  </React.Fragment>;
}

function GetCV() {
  return <React.Fragment><CurriculumVitae></CurriculumVitae>
  <Footer></Footer></React.Fragment>;
}
function GetProjects() {

  return <React.Fragment><Projects loadAll={true}></Projects>
  <Footer></Footer></React.Fragment>;
}
function GetSkills() {

  return <React.Fragment>
    <Skills></Skills>
    
  <Footer></Footer>
  </React.Fragment>;
}

function GetContact() {

  return <React.Fragment>
    <Contact></Contact>
    
  <Footer></Footer>
  </React.Fragment>;
}

function GetHaltestelle() {

  return <React.Fragment>
    <Haltestelle></Haltestelle>
    
  <Footer></Footer>
  </React.Fragment>;
}

function GetMuehle() {
  return <React.Fragment>
    <Muehle></Muehle>
    
  <Footer></Footer>
  </React.Fragment>
}

function GetGames() {

  return <React.Fragment>
    <Games></Games>
    
  <Footer></Footer>
  </React.Fragment>;
}


function GetCreateBlog() {
  return <React.Fragment>
    <CreateBlog></CreateBlog>
    
  <Footer></Footer>
  </React.Fragment>;
}

function GetEditBlog({ match }) {
  return <React.Fragment>
    <EditBlog id={match.params.id}></EditBlog>
    
  <Footer></Footer>
  </React.Fragment>;
}
function GetOverviewBlog({ match }) {
  return (
    <div>
      <Route path={`${match.path}/:id`} component={GetEditBlog} />
      <Route exact path={match.path} render={() =>
        <React.Fragment>
          <SubHeader PageTitle="Meine Blogs"></SubHeader>
          <OverviewBlog></OverviewBlog>
          
  <Footer></Footer>
        </React.Fragment>

      } />
    </div>
  );
}

function GetBlogPost({ match }) {
  return <React.Fragment>

    <BlogPost id={match.params.id}></BlogPost>
    
  <Footer></Footer>
  </React.Fragment>;
}


function GetBlog({ match }) {
  return (
    <div>
      <Route path={`${match.path}/:id`} component={GetBlogPost} />
      <Route exact path={match.path} render={() =>
      
          <BlogCardHolder amount={5} match={match}></BlogCardHolder>
      } />
      
  <Footer></Footer>
    </div>
  );
}


export default App;