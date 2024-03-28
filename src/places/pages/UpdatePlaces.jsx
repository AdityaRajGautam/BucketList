import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../shared/components/FormElements/Button/Button'
import Input from '../../shared/components/FormElements/Input'
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from '../../shared/components/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

import './NewPlace.css'

const DUMMY_PLACES = [
    {
    id: 'p1',
    title: 'Sicaly City',
    description: 'Charming island with historic, stone buildings, squares, a temple, shops, eateries & a small beach.',
    imageUrl: 'https://media.timeout.com/images/105490133/750/422/image.jpg',
    address: 'Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi, 110006',
    location: {
        lat: 37.0601699,
        lng: 15.294269
    },
    creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Sicaly City',
        description: 'Charming island with historic, stone buildings, squares, a temple, shops, eateries & a small beach.',
        imageUrl: 'https://media.timeout.com/images/105490133/750/422/image.jpg',
        address: 'Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi, 110006',
        location: {
            lat: 37.0601699,
            lng: 15.294269
        },
        creator: 'u2'
        }
]

const UpdatePlaces = () => {
    const placeId = useParams().placeId;
    const[isLoading,setIsLoading] = useState(true)
    
    const [formState,inputHandler,setFormData] = useForm({
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false
        }
    },false)
    
    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    const identifiedPlaces = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(()=>{
        if(identifiedPlaces){
            setFormData({
                title:{
                    value:identifiedPlaces.title,
                    isValid:true
                },
                description:{
                    value:identifiedPlaces.description,
                    isValid:true
                }
            },true)
        }
        
        setIsLoading(false);
    },[setFormData,identifiedPlaces])

    

    if(!identifiedPlaces){
        return (
            <div className="center">
                <h2>Could Not find the place you are looking for</h2>
            </div>
        )
    }

    if(isLoading){
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input
             id="title"
             type='text'
             element='input'
             lable='Title'
             validators={[VALIDATOR_REQUIRE()]}
             errorText='Please enter a valid titile'
             onInput={inputHandler}
             value={formState.inputs.title.value}
             valid={formState.inputs.title.isValid}
            >
            </Input>
            <Input
             id="description"
             element='textarea'
             lable='Description'
             validators={[VALIDATOR_MINLENGTH(5)]}
             errorText='Please enter a valid Description'
             onInput={inputHandler}
             value={formState.inputs.description.value}
             valid={formState.inputs.description.isValid}
            >
            </Input>
            <Button type='submit' disabled={!formState.isValid}>UPADTE PLACE</Button>
        </form>
    )
}

export default UpdatePlaces