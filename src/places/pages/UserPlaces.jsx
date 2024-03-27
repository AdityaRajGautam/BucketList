import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";


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
const UserPlaces = () => {
        const userId = useParams().userId;
        const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces;