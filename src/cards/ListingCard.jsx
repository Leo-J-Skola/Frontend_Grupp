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

        if(!currentUser) {
            alert("Please log in to make a booking");
        }

        const firstAvailability = listing.availability[1];

        const availableStartDate = firstAvailability?.startDate;
        
        const availableEndDate = firstAvailability?.endDate;

        const formatDates = (isoString) => {
            return new Date(isoString).toISOString().split('T')[0];
        }

        const bookingData = {
            userId: currentUser.userId,   // or currentUser.id if you want the logged-in user
            listingId: listingId,
            startDate: formatDates(availableStartDate),
            endDate: formatDates(availableEndDate)
        };
        console.log(JSON.parse(JSON.stringify(bookingData)));
        const data = await createBooking(bookingData);
        alert(`Booking successful! ${JSON.stringify(data)}`);
        closeListing();
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