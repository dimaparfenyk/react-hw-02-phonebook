import React from "react";
import { Component } from "react";
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types';
import { Button, Container, Label, FormInput} from "./ContactForm.styled";


const INITIAL_STATE = {
        name: '',
        number: '',
    };

export class ContactForm extends Component{

    state = { ...INITIAL_STATE };
    nameInputId = nanoid();
    numberInputId = nanoid();

    handleChange = e => {
        const { name, value } = e.currentTarget;
    
    this.setState({
      [name]: value,
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    
    this.props.onSubmit(this.state);
    this.reset();
    };
    
    reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Container>
                <Label htmlFor={this.nameInputId}>Name
                    <FormInput
                        type="text"
                        name="name"
                        id={this.nameInputId}
                        value={this.state.name}
                        onChange={this.handleChange}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </Label>
                <Label htmlFor={this.numberInputId}>Number
                    <FormInput
                        type="tel"
                        name="number"
                        id={this.numberInputId}
                        value={this.state.number}
                        onChange={this.handleChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </Label>
        
                <Button
                    type="submit">
                    Add Contact
                    </Button>
            </Container>
            </form>
        );
    };
};

ContactForm.propTypes =
    { onSubmit: PropTypes.func.isRequired };