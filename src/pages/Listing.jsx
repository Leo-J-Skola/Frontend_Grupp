import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListing } from "../api/service.js";
import Form from "react-bootstrap/Form";
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
            navigate("/");
        }
        catch (err) {
            console.error("Error creating listing:", err);
        }
    }

    return (
        <Form className='listing-container' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter Listing Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRooms">
                <Form.Label>Rooms</Form.Label>
                <Form.Control type="number" placeholder="Rooms" value={rooms} onChange={(e) => setRooms(Number(e.target.value))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price / Night</Form.Label>
                <Form.Range min="0" max="1000" value={pricePerNight} onChange={(e) => setPricePerNight(Number(e.target.value))} />
            </Form.Group>
            <Form.Group className="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter Listing Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group className="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter Listing Location" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </Form.Group>
            <Form.Group className="location">
                <Form.Label>Image</Form.Label>
                <Form.Control type="url" placeholder="Enter Listing Image" value={imageUrl} onChange={(e) => setImage(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" value={startDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setStartDate(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Button variant="secondary" type="submit " className="mt-3" onSubmit={handleSubmit}></Button>
            </Form.Group>
        </Form>

    );
}

export default NewListing;