import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListingById } from "../api/service.js";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../css/listing-page.css";

const locales = {
  'en-US': enUS // Making sure our calendar is in english
};

/* formatting dates for the calendar (source: https://github.com/jquense/react-big-calendar/blob/master/stories/demos/exampleCode/cultures.js) */
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

/*Documentation used for the calendar: https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props-full-prop-list--page  */

const ListingPage = () => {
  const { id } = useParams();
  const [listingPage, setListingPage] = useState(null);
  const [viewBooking, setViewBooking] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  const closeBooking = () => setViewBooking(false);
  const expandListing = () => setViewBooking(true);


    // Function for picking dates in the calendar, (onSelectSlot in the docs)
    // This validates so a user cant select dates in the past and also
    // if a user selects a date, it will show the start date and end date
    // and calculate the total price and days
  const calendarSelectSlot = (slotInfo) => {
    if (selectedRange && selectedRange.start && selectedRange.end) {  // If we have selected both start and end dates
      setSelectedRange({ start: slotInfo.start, end: null });   // it resets selection
    } else if (selectedRange && selectedRange.start) {

      const start = selectedRange.start;
      const end = slotInfo.start;

        // If the start date is before the end date then we set the end date to the selected date
      const range = {
        start: start < end ? start : end,
        end: start < end ? end : start
      };
      setSelectedRange(range);

      // Calculate the total days and price based on all days within the selected range
      const days = Math.ceil((range.end - range.start) / (1000 * 60 * 60 * 24)) + 1; // Using math.ceil to round up range.end and range.start.
      setTotalDays(days);                                                                       // And 1000 * 60 * 60 * 24 is the number of milliseconds in a day
      setTotalPrice(days * listingPage.pricePerNight);                                    // because the price is per night, multiply the number of days
    } else {
        // If we have not selected any dates, we set the start date to slotInfo.start (the date clicked on)
      setSelectedRange({ start: slotInfo.start, end: null });
    }
  };


    // dayPropGetter is just used to style the selected dates in the calendar (read the docs on dayPropGetter)
  const dayPropGetter = (date) => {
    if (!selectedRange) return {};

    const { start, end } = selectedRange;
    if (!start) return {};

    /* get date and depending on const, change styles */
    const dateTs = date.getTime();
    const startTs = start.getTime();
    const endTs = end?.getTime();

    /*Placeholder for unavailable dates (dates already booked from someone else*/
/*    const isUnavailable = ....

    if (isUnavailable) {
        return {
            style: {
            backgroundColor: 'var(--red)',
            color: 'white',
            borderRadius: '0',
            }
        };
    }*/

    if (end && dateTs >= startTs && dateTs <= endTs) {
      return {
        style: {
          backgroundColor: 'var(--green)',
          color: 'white',
          borderRadius: '0',
        }
      };
    }

    if (dateTs === startTs) {
      return {
        style: {
          backgroundColor: 'var(--green)',
          color: '--blue',

        }
      };
    }

    return {};
  };


  //Fetch listing to show the correct listing info in the page
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(id);
        setListingPage(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [id]);

    // Loading message if ListingPage hasnt been fetched from the database yet
  if (!listingPage) return <div className="loading">Loading...</div>;

  return (
      <div className="listing-page">
        <div className="listing-container">
          <div className="listing-details-container">
            <div className="listing-header">
              <h2>{listingPage.title}, {listingPage.location}</h2>
            </div>

            <div className="listing-images">
              <div className="listing-selected-image">
                <img src={listingPage.imageUrl} alt={listingPage.title}/>
              </div>
              <div className="listing-image-gallery"> {/*PLACEHOLDER IMAGES IF WE ADD MORE IMAGES*/}
                <img src={listingPage.imageUrl}/>
                <img src={listingPage.imageUrl}/>
                <img src={listingPage.imageUrl}/>
                <img src={listingPage.imageUrl}/>
              </div>
            </div>

            <div className="listing-tags"> {/*PLACEHOLDER TAGS INCASE WE ADD FUNCTIONALITY LATER*/}
              <div className="listing-tag">
                <p>Cozy</p>
                <p>Modern</p>
                <p>Spacious</p>
                <p>Luxury</p>
                <p>Family friendly</p>
                <p>Pet friendly</p>
                <p>Wifi</p>
                <p>Parking</p>
                <p>Pool</p>
                <p>Gym</p>
                <p>Sauna</p>
                <p>Beach</p>
              </div>
            </div>

            <div className="listing-description">
              <p>{listingPage.description}</p>
            </div>
          </div>

          <div className="details-section">
            <div className="user-info">
              <div className="user-details">
                <img src={listingPage.imageUrl} className="user-image" alt="Host"/>
                <div className="user-text">
                  <h5>Host</h5>
                  <h3>{/*{listingPage.username*/} Username{/*}*/}</h3> {/*THIS SHOULD SHOW USERNAME, NOT THE HOST ID, BACKEND NEEDS FIX*/}
                </div>
              </div>
            </div>

            <div className="calendar-container">
              <Calendar
                  localizer={localizer}
                  events={[]} // No events for now, but we should add and event that disables the unavailable dates if someone has booked those dates already
                  startAccessor="start" // Start date of the event, so it can be used to select the start date
                  endAccessor="end"     // And same for the end date.
                  style={{height: 190}}
                  selectable
                  onSelectSlot={calendarSelectSlot} // When a date is selected it uses calendarSelectSlot function (read onSelectSlot in the documentation)
                  dayPropGetter={dayPropGetter} // This is used to style the selected dates, ALSO IF YOU CHANGE SOME STYLES (like margin in some cases) IT WILL BREAK THE CALENDAR
                  defaultView="month" // Just makes the calendar start show the whole month (all days in the month)
                  views={['month']}
                  min={new Date()} // This prevents a user from selecting dates in the past
              />
            </div>

            {/*Price calc and dynamic button/total price/total days*/}

            <div className="price-section">
              <h3>{listingPage.pricePerNight} SEK <span>per night</span></h3>
              {totalDays > 0 && (
                  <div className="price-calc">
                    <p>{listingPage.pricePerNight} SEK x {totalDays} nights</p>
                    <h4>Total: {totalPrice} SEK</h4>
                  </div>
              )}

              <Button
                  variant="primary"
                  className="listing-go-btn"
                  onClick={expandListing}
                  disabled={!selectedRange?.end}
              >
                {selectedRange?.end ? 'Book Now' : 'Select Dates'} {/*if you have selected end date, then change button to book now*/}
              </Button>
            </div>


          </div>
        </div>

        <Modal show={viewBooking} onHide={closeBooking} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Your Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-listing-info">
              <img src={listingPage.imageUrl} alt={listingPage.title}/>
              <h3>{listingPage.title}</h3>
              <p>{listingPage.location}</p>
            </div>


            {/*Booking dates and price breakdown in modal*/}
            <div className="booking-dates">
              <h4>Your Selected Dates</h4>
              {selectedRange?.end ? (
                  <>
                    <p>
                      {format(selectedRange.start, 'MMM dd, yyyy')} - {format(selectedRange.end, 'MMM dd, yyyy')}
                    </p>
                    <p>{totalDays} nights</p>
                  </>
              ) : (
                  <p>You need to select dates before</p>
              )}
            </div>

            <div className="booking-price">
              <h4>Total Price</h4>
              <p>{listingPage.pricePerNight} kr x {totalDays} nights</p>
              <h3>{totalPrice} SEK</h3>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeBooking}>Cancel</Button>
            <Button variant="primary" disabled={!selectedRange?.end}>Confirm Booking</Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
}

export default ListingPage;