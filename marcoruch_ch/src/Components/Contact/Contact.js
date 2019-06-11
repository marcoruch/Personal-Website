import React, { Component } from "react";
import { Form } from 'semantic-ui-react'
import firebase from './../Firebase/Firebase'
import Swal from 'sweetalert2'
import Wave from 'react-wavify';
import "./Contact.scss";


const options = [
    { key: 'question', text: 'Allgemeine Auskunft', value: 'question' },
    { key: 'offer', text: 'Anfrage', value: 'offer' },
    { key: 'feedback', text: 'Feedback', value: 'feedback' },
    { key: 'other', text: 'Andere', value: 'other' },
  ]


class Contact extends Component {
    
  state = { firstName: '', lastName: '',email: '', company: '', reason: '', comment: '' }
  
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    sendEmail = () => {
        const db = firebase.firestore();
        const reason = this.state.reason;

        db.collection("contacts").add({
          firstName: this.state.firstName, 
          lastName: this.state.lastName,
          email: this.state.email,
          company: this.state.company,
          reason: this.state.reason,
          comment: this.state.comment,
        }).then(function(){
            Swal.fire('Versendet...', `Vielen Dank für ${reason === "feedback" ? "ihr Feedback": "ihre Anfrage"}.`, 'success')
        }).catch(function(){
            Swal.fire('Ups...', `${reason === "feedback" ? "Ihr Feedback": "Ihre Anfrage"} konnte nicht versendet werden.`, 'error')
        })
    }

render() {
    return  (
      
    <div className="contact-formular-holder">
        <Form>  
            <Form.Group>
                <Form.Input name="firstName" fluid label='Vorname' placeholder='Vorname' width={8} onChange={this.handleChange}  />
                <Form.Input name="lastName" fluid label='Nachname' placeholder='Nachname' width={8} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Input name="email" fluid label='Email' placeholder='E-Mail' width={16} onChange={this.handleChange} />
            </Form.Group>
            
            <Form.Group>
                <Form.Input name="company" fluid label='Unternehmen' placeholder='Unternehmen (optional)' width={16} onChange={this.handleChange} />
            </Form.Group>
            
            <Form.Group>
                <Form.Select name="reason" fluid label='Kontaktgrund' options={options} placeholder='Kontaktgrund'  width={16} onChange={this.handleChange} />
            </Form.Group>
            
            <Form.Group>
                <Form.TextArea name="comment" label='Kommentar' placeholder='' style={{ minHeight: 100, maxHeight: 350 }} width={16} onChange={this.handleChange} />
            </Form.Group>
            
            <Form.Button floated='right' onClick={this.sendEmail}
            disabled={
                !this.state.firstName ||
                    !this.state.lastName ||
                    !this.state.email ||
                    !this.state.reason ||
                    !this.state.comment
            }>Submit</Form.Button>
        </Form>
  </div>
  );
}
}

export default Contact;