import { Button, Card, Modal } from "react-bootstrap";
import { getAllListings } from "../api/service.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// First get all listings from the /listing endpoint
// then i used map to go through all the listings from the database
// and display them as a card by creating a div for each listing it found
function Listing() {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [viewListing, clickViewListing] = useState(false);
    const [listingId, setListingId] = useState(null);
    const closeListing = () => clickViewListing(false);
    const expandListing = (id) => {
        setListingId(id);
        clickViewListing(true);
    };

    useEffect(() => {
        const fetchListings = async () => {
            const data = await getAllListings();
            setListings(data);
        };
        fetchListings();
    }, []);

    // After loading the listings from the database, it creates a div for each listing
    return (
        <div className="card-container">
            {listings.map((listing) => (
                <Card key={listing.id}>
                    <Card.Img variant="top" src={listing.imageUrl} />
                    <Card.Body>
                        <Card.Title>{listing.title}</Card.Title>
                        <Card.Text><span>{listing.description}</span></Card.Text>
                        <Card.Text><span>{listing.rooms} rooms</span></Card.Text>
                        <Card.Text><span>{listing.pricePerNight} kr per natt</span></Card.Text>
                        <Button variant="primary" className="listing-go-btn" onClick={() => expandListing(listing.id)}>Quick book</Button>

                        <Button variant="primary" className="listing-go-btn-2" onClick={() => navigate("/listing/" + listing.id)}>Go to listing</Button>
                    </Card.Body>
                </Card>
            ))}
            <Modal show={viewListing} onHide={closeListing}>
                <Modal.Header closeButton>
                    <Modal.Title>Listing details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Loop through the listings again to find the one clicked on */}
                    {listings.map((listing) => {
                        if (listing.id === listingId) {
                            return (
                                <div key={listing.id}>
                                    <h2>{listing.title}</h2>
                                    <img src={listing.imageUrl} />
                                    <p>{listing.description}</p>
                                    <p>Rooms: {listing.rooms}</p>
                                    <p>Price per night: {listing.pricePerNight} kr</p>
                                    <p>Location: {listing.location}</p>
                                    <p>Availability: </p>
                                </div>
                            );
                        }
                        return null; // Return null if the listing wasn't found with the id. Maybe add a message or loading?
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