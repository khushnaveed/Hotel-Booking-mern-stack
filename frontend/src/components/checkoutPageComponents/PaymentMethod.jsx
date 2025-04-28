import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Lock, ChevronLeft, AlertCircle } from 'lucide-react';


const PaymentMethod = ({ onNext, onBack, setPaymentData }) => {
  const [paymentType, setPaymentType] = useState('credit-card');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });
  const [errors, setErrors] = useState({});

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle formatting for card number (add spaces)
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({
        ...formData,
        [name]: formattedValue.substring(0, 19), // Limit to 16 digits plus spaces
      });
    }
    // Handle expiry date formatting (MM/YY)
    else if (name === 'expiryDate') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2, 4);
      }
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    }
    // Handle CVV (numbers only, max 4 digits)
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: formattedValue.substring(0, 4),
      });
    }
    // Handle checkbox
    else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    }
    // Handle all other fields normally
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    // Validate card number (16 digits)
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardNumberDigits)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Validate expiry date (MM/YY format)
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please use MM/YY format';
    } else {
      // Check if date is in the future
      const [month, year] = formData.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const currentDate = new Date();
      if (expiryDate < currentDate) {
        newErrors.expiryDate = 'Card has expired';
      }
    }
    
    // Validate CVV (3-4 digits)
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setPaymentData({
        ...formData,
        paymentType,
      });
      onNext();
    }
  };

  const inputClasses = 'w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8E7037] transition-all duration-300 bg-white';
  const errorClasses = 'text-red-500 text-sm mt-1';
  const iconClasses = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-8 flex items-start">
        <AlertCircle size={20} className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-amber-800 text-sm">
          This is a demo checkout page. No actual payments will be processed, and your card 
          information is not being stored or transmitted.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <PaymentOption 
            id="credit-card"
            label="Credit Card"
            isSelected={paymentType === 'credit-card'}
            onClick={() => handlePaymentTypeChange('credit-card')}
            iconType="visa"
          />
          <PaymentOption 
            id="paypal"
            label="PayPal"
            isSelected={paymentType === 'paypal'}
            onClick={() => handlePaymentTypeChange('paypal')}
            iconType="paypal"
          />
        </div>
      </div>
      
      {paymentType === 'credit-card' && (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              className={`${inputClasses} ${errors.cardName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
              placeholder="John Doe"
            />
            {errors.cardName && <p className={errorClasses}>{errors.cardName}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Card Number</label>
            <div className="relative">
              <CreditCard size={18} className={iconClasses} />
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className={`${inputClasses} pl-10 ${errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                placeholder="4242 4242 4242 4242"
              />
            </div>
            {errors.cardNumber && <p className={errorClasses}>{errors.cardNumber}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Expiry Date</label>
              <div className="relative">
                <Calendar size={18} className={iconClasses} />
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className={`${inputClasses} pl-10 ${errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                  placeholder="MM/YY"
                />
              </div>
              {errors.expiryDate && <p className={errorClasses}>{errors.expiryDate}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-2">CVV</label>
              <div className="relative">
                <Lock size={18} className={iconClasses} />
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className={`${inputClasses} pl-10 ${errors.cvv ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                  placeholder="123"
                />
              </div>
              {errors.cvv && <p className={errorClasses}>{errors.cvv}</p>}
            </div>
          </div>
          
          <div className="mb-8">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="saveCard"
                checked={formData.saveCard}
                onChange={handleChange}
                className="w-4 h-4 text-[#8E7037] rounded focus:ring-[#8E7037]"
              />
              <span className="text-gray-700">Save this card for future bookings</span>
            </label>
          </div>
          
          <div className="flex justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onBack}
              className="flex items-center text-gray-600 px-6 py-3 rounded-md font-medium 
                border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <ChevronLeft size={18} className="mr-2" />
              Back
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="bg-[#8E7037] text-white px-8 py-3 rounded-md font-semibold 
                hover:bg-[#7a602f] transition-all duration-300 shadow-md"
            >
              Complete Booking
            </motion.button>
          </div>
        </form>
      )}
      
      {paymentType === 'paypal' && (
        <div>
          <p className="text-gray-600 mb-6">
            You will be redirected to PayPal to complete your payment securely.
          </p>
          
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onBack}
              className="flex items-center text-gray-600 px-6 py-3 rounded-md font-medium 
                border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              <ChevronLeft size={18} className="mr-2" />
              Back
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPaymentData({ paymentType: 'paypal' });
                onNext();
              }}
              className="bg-[#0070ba] text-white px-8 py-3 rounded-md font-semibold 
                hover:bg-[#005ea6] transition-all duration-300 shadow-md"
            >
              Pay with PayPal
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const PaymentOption = ({ id, label, isSelected, onClick, iconType }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex-1 border rounded-md p-4 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-[#8E7037] bg-amber-50' 
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onClick={onClick}
    >
      <input
        type="radio"
        id={id}
        name="paymentType"
        checked={isSelected}
        onChange={() => {}}
        className="sr-only"
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <span
          className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
            isSelected ? 'border-[#8E7037]' : 'border-gray-400'
          }`}
        >
          {isSelected && (
            <span className="w-3 h-3 rounded-full bg-[#8E7037]" />
          )}
        </span>
        
        <span className="flex items-center">
          {iconType === 'visa' && (
            <span className="text-lg font-bold text-blue-800 mr-2">VISA</span>
          )}
          {iconType === 'paypal' && (
            <span className="text-lg font-bold text-[#0070ba] mr-2">PayPal</span>
          )}
          <span className="text-sm text-gray-600">{label}</span>
        </span>
      </label>
    </motion.div>
  );
};

export default PaymentMethod;