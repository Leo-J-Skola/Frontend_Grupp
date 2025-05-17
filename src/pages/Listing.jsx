import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../api/service.js";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const NewListing = () => {
    const [title, setTitle] = useState("");
    const [rooms, setRooms] = useState(0);
    const [pricePerNight, setPricePerNight] = useState(0);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imageUrl, setImage] = useState("");
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //simple validation for now
            if (!title || !rooms || !pricePerNight || !description || !location || !imageUrl || !startDate || !endDate) {
                throw new Error("Please fill in all required fields");
            }

                const listingData = {
                title,
                rooms: Number(rooms),
                pricePerNight: Number(pricePerNight),
                description,
                location,
                imageUrl,
                availability: [
                    {
                        //Need to convert to ISO string to deserialize in backend
                        startDate: new Date(startDate).toISOString(),
                        endDate: new Date(endDate).toISOString()
                    }
                ]
            };
            // try catch to debug when submitting
            const success = await createListing(listingData);
            console.log("Listing created successfully:", success);
            navigate("/listing/" + success.id);
        }
        catch (err) {
            console.error("Error creating listing:", err);
        }
    }

    return (
        <Form className='listing-container'  onSubmit={handleSubmit}>
            <h2 className="listing-header">Listing Page</h2>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Listing Title</Form.Label>
                <Form.Control type="text" required={true} placeholder="Enter Listing Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRooms">
                <Form.Label>Amount of rooms</Form.Label>
                <Form.Control type="number" required={true} placeholder="Rooms" value={rooms} onChange={(e) => setRooms(Number(e.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price / Night: {pricePerNight}</Form.Label>
                <Form.Range min="0" max="1000" step="25" type="range" required={true} value={pricePerNight} onChange={(e) => setPricePerNight(Number(e.target.value))} />  
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Listing description</Form.Label>
                <Form.Control type="text" required={true} placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Listing location</Form.Label>
                <Form.Control type="text" required={true} placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Listing image</Form.Label>
                <Form.Control type="url" required={true} placeholder="Enter Image URL" value={imageUrl} onChange={(e) => setImage(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStartDate" required={true}>
                <Form.Label>Listing start date</Form.Label>
                <Form.Control type="date" required={true} value={startDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setStartDate(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEndDate">
                <Form.Label>Listing end date</Form.Label>
                <Form.Control type="date" required={true} value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Button variant="secondary" type="submit" className="listing-btn" onSubmit={handleSubmit}>Create listing</Button>
            </Form.Group>
        </Form>

    );
}

export default NewListing;