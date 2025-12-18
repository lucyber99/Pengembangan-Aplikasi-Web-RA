import React, { useState } from 'react';
import './InquiryCard.css';

const InquiryCard = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: "I'm interested in this property",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <div className="inquiry-card">
            <h3 className="inquiry-card__title">Inquire About This Property</h3>
            <form className="inquiry-card__form" onSubmit={handleSubmit}>
                <div className="inquiry-card__field">
                    <label htmlFor="name" className="inquiry-card__label">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="inquiry-card__input"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inquiry-card__field">
                    <label htmlFor="email" className="inquiry-card__label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="inquiry-card__input"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="inquiry-card__field">
                    <label htmlFor="phone" className="inquiry-card__label">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="inquiry-card__input"
                        placeholder="(+62) 812-3456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="inquiry-card__field">
                    <label htmlFor="message" className="inquiry-card__label">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        className="inquiry-card__input inquiry-card__input--textarea"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button type="submit" className="inquiry-card__submit btn primary">
                    Send Inquiry
                </button>
            </form>
        </div>
    );
};

export default InquiryCard;
