    
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BlogPost from '../BlogPost/BlogPost';
import CreateBlog from '../CreateBlog/CreateBlog';
import SubHeader from '../SubHeader/SubHeader';
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

function App() {
  return (

    <Router>
      <div>
        <Header />
        <Route exact path="/" component={GetHome} />
        <Route path="/aboutme" component={GetAboutMe} />
        <Route path="/projects" component={GetProjects} />
        <Route path="/skills" component={GetSkills} />
        <Route path="/blog" component={GetBlog} />
        <Route path="/createBlog" component={GetCreateBlog} />
        <Route path="/overviewBlog" component={GetOverviewBlog} />
        <Route path="/contact" component={GetContact} />
        <Route path="/games" component={GetGames} />
        <Route path="/haltestelle" component={GetHaltestelle} />
        <Route path="/muehle" component={GetMuehle} />
        <Route path="/curriculumvitae" component={GetCV} />
        <Footer />
              </div>
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
  </React.Fragment>;
}

function GetAboutMe() {
  return <React.Fragment>
    <AboutMe></AboutMe>
  </React.Fragment>;
}


function GetCV() {
  return <React.Fragment>
    <CurriculumVitae></CurriculumVitae>
  </React.Fragment>;
}
function GetProjects() {

  return <React.Fragment>
    <Projects loadAll={true}></Projects>
  </React.Fragment>;
}
function GetSkills() {

  return <React.Fragment>
    <Skills></Skills>
  </React.Fragment>;
}

function GetContact() {

  return <React.Fragment>
    <Contact></Contact>
  </React.Fragment>;
}

function GetHaltestelle() {

  return <React.Fragment>
    <Haltestelle></Haltestelle>
  </React.Fragment>;
}

function GetMuehle() {
  return <React.Fragment>
    <Muehle></Muehle>
  </React.Fragment>
}

function GetGames() {

  return <React.Fragment>
    <Games></Games>
  </React.Fragment>;
}


function GetCreateBlog() {
  return <React.Fragment>
    <CreateBlog></CreateBlog>
  </React.Fragment>;
}

function GetEditBlog({ match }) {
  return <React.Fragment>
    <EditBlog id={match.params.id}></EditBlog>
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
        </React.Fragment>

      } />
    </div>
  );
}

function GetBlogPost({ match }) {
  return <React.Fragment>

    <BlogPost id={match.params.id}></BlogPost>
  </React.Fragment>;
}


function GetBlog({ match }) {
  return (
    <div>
      <Route path={`${match.path}/:id`} component={GetBlogPost} />
      <Route exact path={match.path} render={() =>
      
          <BlogCardHolder amount={5} match={match}></BlogCardHolder>
      } />
    </div>
  );
}


export default App;