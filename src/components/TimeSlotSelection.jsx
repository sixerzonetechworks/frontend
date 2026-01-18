/**
 * TimeSlotSelection Component
 * 
 * This component displays all 24 hourly time slots for a selected date.
 * Slots are marked as available or unavailable based on existing bookings.
 * Users can select an available slot to proceed to ground selection.
 * 
 * Props:
 * @param {string} selectedDate - The date selected by user (YYYY-MM-DD format)
 * @param {Function} onSlotSelect - Callback when a slot is selected
 * @param {Function} onBack - Callback to go back to date selection
 */

import { useState, useEffect } from 'react';
import { getAvailableSlots } from '../utils/api';
import { formatDate, getDayName } from '../utils/helpers';
import './TimeSlotSelection.css';

function TimeSlotSelection({ selectedDate, onSlotSelect, onBack }) {
  // State to store available time slots
  const [slots, setSlots] = useState([]);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch available slots when component mounts or date changes
   */
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  /**
   * Fetch available slots from API for the selected date
   */
  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getAvailableSlots(selectedDate);
      setSlots(data);
    } catch (err) {
      setError('Failed to load available slots. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle slot selection
   * @param {Object} slotObj - Slot object with slot string and enabled status
   * @param {number} index - Index of the slot (hour 0-23)
   */
  const handleSlotClick = (slotObj, index) => {
    if (slotObj.enabled) {
      onSlotSelect(slotObj.slot, index);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="time-slot-selection">
        <h2>Select a Time Slot</h2>
        <div className="loading">Loading available slots...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="time-slot-selection">
        <h2>Select a Time Slot</h2>
        <div className="error">
          {error}
          <button className="btn btn-secondary" onClick={fetchAvailableSlots}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="time-slot-selection">
      {/* Header with selected date info */}
      <div className="selection-header">
        <button className="btn btn-back" onClick={onBack}>
          ← Back
        </button>
        <div className="selected-info">
          <h2>Select a Time Slot</h2>
          <p className="selected-date">
            {formatDate(selectedDate)} ({getDayName(selectedDate)})
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-box available"></span>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <span className="legend-box unavailable"></span>
          <span>Booked / Past Time</span>
        </div>
      </div>

      {/* Time slots grid */}
      <div className="slots-grid">
        {slots.map((slotObj, index) => (
          <div
            key={index}
            className={`slot-card ${slotObj.enabled ? 'enabled' : 'disabled'}`}
            onClick={() => handleSlotClick(slotObj, index)}
            role="button"
            tabIndex={slotObj.enabled ? 0 : -1}
            aria-label={`${slotObj.slot} ${slotObj.enabled ? 'available' : 'booked'}`}
          >
            <div className="slot-time">{slotObj.slot}</div>
            <div className="slot-status">
              {slotObj.enabled ? '✓ Available' : '✗ Booked'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeSlotSelection;
