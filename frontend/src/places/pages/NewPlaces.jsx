import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/components/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './NewPlace.css';




const NewPlace = () => {
    const [formState,titleInputHandler] = useForm({
        title:{
            value: '',
            isValid: false
        },
        description: {
            value:'',
            isValid: false
        },
        address: {
            value:'',
            isValid: false
        }
    },false)
 

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs)
    }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input id='title' element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText='please enter a valid text' onInput={titleInputHandler}/>
      <Input id='address' element="input" label="Address" validators={[VALIDATOR_MINLENGTH(5)]} errorText='please enter a valid address' onInput={titleInputHandler}/>
      <Input id='description' element="textare" label="Description" validators={[VALIDATOR_MINLENGTH(5)]} errorText='please enter a valid description' onInput={titleInputHandler}/>
      <Button type='submit' disabled={!formState.isValid}> ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;