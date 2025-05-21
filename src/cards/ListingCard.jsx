import { Button, Card } from "react-bootstrap";
import { getAllListings } from "../api/service.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api/bookingService.js";
import { useAuth } from '../hooks/useAuth';

function Listing() {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [listingId] = useState(null);
    const { currentUser } = useAuth();
    useEffect(() => {
        const fetchListings = async () => {
            const data = await getAllListings();
            setListings(data);
        };
        fetchListings();
    }, []);

    const handleCreateBooking = async (id) => {
        try {
            // Use the passed ID or fall back to state
            const targetId = id || listingId;
            if (!targetId) {
                throw new Error("No listing selected");
            }

            // Find the listing
            const selectedListing = listings.find(item => item.id === targetId);
            if (!selectedListing) {
                throw new Error("Listing not found");
            }

            console.log("Selected listing:", selectedListing);

            if (!currentUser) {
                alert("Please log in to make a booking");
                navigate('/login');
                return;
            }

            const firstAvailability = selectedListing.availability[1];
            const availableStartDate = firstAvailability?.startDate;
            const availableEndDate = firstAvailability?.endDate;

            const formatDates = (isoString) => {
                return new Date(isoString).toISOString().split('T')[0];
            }


            const bookingData = {
                userId: selectedListing.hostId,
                listingId: targetId,
                startDate: formatDates(availableStartDate),
                endDate: formatDates(availableEndDate)
            };

            console.log("Booking data:", bookingData);
            const data = await createBooking(bookingData);
            alert(`Booking successful! ${JSON.stringify(data)}`);

        } catch(error) {
            console.error("Booking failed", error);
            alert(error.message || "Booking failed, please try again!");
        }
    };

    return (
        <div className="card-container">
            {listings.map((listing) => (
                <Card key={listing.id}>
                    <Card.Img variant="top" src={listing.imageUrl} />
                    <Card.Body>
                        <Card.Title>{listing.title}</Card.Title>
                        <Card.Text>{listing.description}</Card.Text>
                        <Card.Text>{listing.rooms} rooms</Card.Text>
                        <Card.Text>{listing.pricePerNight} kr per natt</Card.Text>
                        <Button variant="primary" className="listing-go-btn-2" onClick={() => navigate(`/listing/${listing.id}`)}>Go to listing</Button>
                        <Button variant="primary" className="listing-go-btn" onClick={() => handleCreateBooking(listing.id)}>Quick book</Button>
                        {listing.availability?.[1]
                         && (<div className="availability">{`Available from`} {new Date(listing.availability[1].startDate).toLocaleDateString() + " "}
                           to {new Date(listing.availability[1].endDate).toLocaleDateString() + " "}</div>
                            )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Listing;