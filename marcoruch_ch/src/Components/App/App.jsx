    
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from '../Header/Header';
import AboutMe from '../AboutMe/AboutMe';
import Projects from '../Projects/Projects';
import Skills from '../Skills/Skills';
import Contact from '../Contact/Contact';
import Haltestelle from "../Haltestelle/Haltestelle";
import CurriculumVitae from "../CurriculumVitae/CurriculumVitae";
import Muehle from "../Muehle/Muehle";
import RocketTracker from "../RocketTracker/RocketTracker";
import Nutrify from "../Nutrify/Nutrify";
import Games from "../Games/Games";
import FoodLookup from "../FoodLookup/FoodLookup";
import Sorting from "../Sorting/Sorting";
import { MapProvider } from "../MapContainer/MapContext/MapContext"
import { UserProvider } from "../UserContext/UserContext";
import BlogCardHolder from "../BlogCardHolder/BlogCardHolder";
import OverviewBlog from "../OverviewBlog/OverviewBlog";
import EditBlog from "../EditBlog/EditBlog";
import axios from 'axios'
import Footer from "../Footer/Footer";
import SubHeader from '../SubHeader/SubHeader';
import CreateBlog from '../CreateBlog/CreateBlog';
import BlogPost from '../BlogPost/BlogPost';


axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";



const myRouter = () => {
  return <Router basename="/">
       <UserProvider>
        <Header />
        <Route exact path="/" component={GetHome} />
        <Route path="/aboutme" component={GetAboutMe} />
        <Route path="/projects" component={GetProjects} />
        <Route path="/skills" component={GetSkills} />
        <Route path="/blogs" component={GetBlog} />
        <Route path="/blogs/:blogId" component={GetBlogPost} />
        <Route path="/createBlog" component={GetCreateBlog} />
        <Route path="/contact" component={GetContact} />
        <Route path="/games" component={GetGames} />
        <Route path="/haltestelle" component={GetHaltestelle} />
        <Route path="/sorting" component={GetSorting} />
        <Route path="/muehle" component={GetMuehle} />
        <Route path="/nutrify" component={GetNutrify} />
        <Route path="/rockettracker" component={GetRocketTracker}/>
        <Route path="/curriculumvitae" component={GetCV} />
        <Route path="/games/foodlookup" component={GetFoodLookup} />
        <Route path="/games/haltestelle" component={GetHaltestelle} />
        <Route path="/games/sorting" component={GetSorting} />
        <Route path="/games/muehle" component={GetMuehle} />
        <Route path="/games/rockettracker" component={GetRocketTracker}/>
        <Route path="/foodlookup" component={GetFoodLookup} />
        </UserProvider>
    </Router>
}


function App() {
  return (
    myRouter()
  );
}

function GetHome() {
  return <React.Fragment>
    <AboutMe></AboutMe>
    <Skills></Skills>
    <Games loadAll={false} loadAmount={4}></Games>
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

function GetSorting() {

  return <React.Fragment>
    <Sorting></Sorting>
    
  <Footer></Footer>
  </React.Fragment>;
}

function GetMuehle() {
  return <React.Fragment>
    <Muehle></Muehle>
    
  <Footer></Footer>
  </React.Fragment>
}

function GetRocketTracker(){
  return <>
    <RocketTracker />
    <Footer />
  </>
}


function GetNutrify() {
  return <React.Fragment>
    <Nutrify></Nutrify>
    
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

function GetBlogPost({ match }) {
  return <React.Fragment>

    <BlogPost routingParams={match.params}></BlogPost>
    
  <Footer></Footer>
  </React.Fragment>;
}


function GetBlog({ match }) {
  if (match.isExact){
    return (
      <div>
        <Route exact path={match.path} render={() =>
          
            <BlogCardHolder amount={5} match={match}></BlogCardHolder>
        } />
        
      <Footer></Footer>
      </div>
    );
  }
  return (<React.Fragment></React.Fragment>)
}

export default App;