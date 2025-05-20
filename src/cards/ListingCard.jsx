import { Button, Card, Modal } from "react-bootstrap";
import { getAllListings } from "../api/service.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api/bookingService.js";
import { useAuth } from '../hooks/useAuth';


// First get all listings from the /listing endpoint
// then i used map to go through all the listings from the database
// and display them as a card by creating a div for each listing it found
function Listing() {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [viewListing, clickViewListing] = useState(false);
    const [listingId, setListingId] = useState(null);
    const { currentUser } = useAuth();
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

    const handleCreateBooking = async () => {
    try {
        // Find the specific listing that matches listingId
        const listing = listings.find(listing => listing.id === listingId);
        if (!listing) {
            throw new Error("Listing not found");
        }

        //If there is no user it alerts the user to log in to make a booking

        if(!currentUser) {
            alert("Please log in to make a booking");
        }

        // Because there is a buggy empty availability object,
        // Right now i gotta use the 2nd availability at index 1
        const firstAvailability = listing.availability[1];

        // Variable for startDate found in the object in the availability array
        const availableStartDate = firstAvailability?.startDate;
        //Variable for endDate found in the object in the availability array
        const availableEndDate = firstAvailability?.endDate;
        // Method to format the dates correctly for the backend
        const formatDates = (isoString) => {
            return new Date(isoString).toISOString().split('T')[0];
        }

        const bookingData = {
            userId: currentUser.userId,   // userId from the currently logged in user
            listingId: listingId,         // current listing the user wants to book by its id
            startDate: formatDates(availableStartDate), // dates
            endDate: formatDates(availableEndDate)
        };

        // i console.log the bookingData as a object
        console.log(JSON.parse(JSON.stringify(bookingData)));
        const data = await createBooking(bookingData);
        // Message if the booking was created successfully
        alert(`Booking successful! ${JSON.stringify(data)}`);
        // If the booking was succesful the modal is closed again
        closeListing();

        // Error message if the booking was failed
    } catch(error) {
        console.error("Booking failed", error);
        alert("Booking failed, please try again!");
    }
};


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
                        </Card.Body></Card>
                    ))}
            <Modal show={viewListing} onHide={closeListing}>
                <Modal.Header closeButton>
                    <Modal.Title>Listing details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {listings.map((listing) => {
                        if (listing.id === listingId) {
                            return (
                                <div key={listing.id}>
                                    <h2>{listing.title}</h2>
                                    <img src={listing.imageUrl} alt={listing.title} />
                                    <p>{listing.description}</p>
                                    <p>Rooms: {listing.rooms}</p>
                                    <p>Price per night: {listing.pricePerNight} kr</p>
                                    <p>Location: {listing.location}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeListing}>Close</Button>
                    <Button variant="primary" onClick={handleCreateBooking}>Book Now</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default Listing;