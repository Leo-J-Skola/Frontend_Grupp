import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {getAllListings} from "../api/service.js";
import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";


// First get all listings from the /listing endpoint
// then i used map to go through all the listings from the database
// and display them as a card by creating a div for each listing it found
function Listing() {
    const [listings, setListings] = useState([]);
    const [viewListing, clickViewListing] = useState(false);
    const [listingId, setListingId] = useState(null);
    const closeListing = () => clickViewListing(false);
    const expandListing = (id) => {
        setListingId(id);
        clickViewListing(true);
    }

    useEffect(() => {
        const fetchListings = async () => {
            const data = await getAllListings();
            setListings(data);
        }
        fetchListings();
    }, []);

    // After loading the listings from the database, it creates a div for each listing
    return (
        <div className="listing">
            {listings.map((listing) => (
                <Card key={listing.id} style={{width: '100%'}}>
                    <Card.Img variant="top" src={listing.imageUrl} />
                    <Card.Body>
                        <Card.Title>{listing.title}</Card.Title>
                        <Card.Text><span>{listing.description}</span></Card.Text>
                        <Card.Text><span> {listing.rooms} rooms</span></Card.Text>
                        <Card.Text><span> {listing.pricePerNight} kr</span></Card.Text>
                        <Button variant="primary" onClick={() => expandListing(listing.id)}>Show Details</Button>
                    </Card.Body>
                </Card>
            ))}
            <Modal show={viewListing} onHide={closeListing}>
                <Modal.Header closeButton>
                    <Modal.Title>Listing details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*loop through the listings again to find the one i clicked on*/}
                    {listings.map((listing) => {
                        if (listing.id === listingId) {
                            return (
                                <div key={listing.id}>
                                    <h2>{listing.title}</h2>
                                    <img src={listing.imageUrl} alt={listing.title} style={{width: '100%'}} />
                                    <p>{listing.description}</p>
                                    <p>Rooms: {listing.rooms}</p>
                                    <p>Price per night: {listing.pricePerNight} kr, {/*this is a default number that will change depending on the amount of days you book*/}</p>
                                    <p>Location: {listing.location}</p>
                                    <p>Availability: {/*Maybe add an interactive calendar to pick days you want to book?*/}</p>

                                </div>
                            );
                        }
                        return null; // return null if the listing wasnt found with the id. Maybe add a message or loading?
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeListing}>Book</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default Listing;
