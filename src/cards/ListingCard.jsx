import Button from 'react-bootstrap/Button';
import { Card,} from "react-bootstrap";
import {getAllListings} from "../api/service.js";
import {useEffect, useState} from "react";


// First get all listings from the /listing endpoint
// then i used map to go through all the listings from the database
// and display them as a card by creating a div for each listing it found
function Listing() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
            const fetchListings = async () => {
            const data = await getAllListings();
            setListings(data);
        }
        fetchListings();
    }, []);

    console.log(listings)

    // After loading the listings from the database, it creates a div for each listing
    return (
        <div className="card-container">
        {listings.map((listing) => (
            <Card key={listing.id}>
            <Card.Img variant="top" src={listing.imageUrl}/>
            <Card.Body>
                <Card.Title>{listing.title}</Card.Title>
                <Card.Text><span>{listing.description}</span></Card.Text>
                <Card.Text><span> {listing.rooms} rooms</span></Card.Text>
                <Card.Text><span> {listing.pricePerNight} kr</span></Card.Text>
                <Button variant="primary">Go to listing</Button>
            </Card.Body>
            </Card>

        ))}
        </div>
    );
}


export default Listing;