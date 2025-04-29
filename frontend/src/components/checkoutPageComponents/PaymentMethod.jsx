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

    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formattedValue.substring(0, 19) });
    } else if (name === 'expiryDate') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = formatted.substring(0, 2) + '/' + formatted.substring(2, 4);
      }
      setFormData({ ...formData, [name]: formatted });
    } else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: formatted.substring(0, 4) });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';

    const digits = formData.cardNumber.replace(/\s/g, '');
    if (!digits) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(digits)) newErrors.cardNumber = 'Must be 16 digits';

    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry is required';
    else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Use MM/YY';
    else {
      const [mm, yy] = formData.expiryDate.split('/');
      const expiry = new Date(2000 + +yy, +mm - 1);
      if (expiry < new Date()) newErrors.expiryDate = 'Expired card';
    }

    if (!formData.cvv) newErrors.cvv = 'CVV required';
    else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'Invalid CVV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setPaymentData({ ...formData, paymentType });
      onNext();
    }
  };

  const inputBase = 'w-full px-4 py-3 border focus:outline-none focus:ring-2 transition-all duration-300 bg-white';
  const errorText = 'text-red-500 text-sm mt-1';
  const iconBase = 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>

      <div className="bg-amber-50 border border-amber-200 p-4 mb-8 flex items-start">
        <AlertCircle size={20} className="text-amber-500 mt-0.5 mr-3" />
        <p className="text-amber-800 text-sm">This is a demo checkout. No actual payments will be processed.</p>
      </div>

      <div className="flex space-x-4 mb-6">
        <PaymentOption id="credit-card" label="Credit Card" isSelected={paymentType === 'credit-card'} onClick={() => handlePaymentTypeChange('credit-card')} iconType="visa" />
        <PaymentOption id="paypal" label="PayPal" isSelected={paymentType === 'paypal'} onClick={() => handlePaymentTypeChange('paypal')} iconType="paypal" />
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
              placeholder="John Doe"
              className={`${inputBase} ${errors.cardName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            />
            {errors.cardName && <p className={errorText}>{errors.cardName}</p>}
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2">Card Number</label>
            <CreditCard size={18} className={iconBase} />
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="4242 4242 4242 4242"
              className={`${inputBase} pl-10 ${errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            />
            {errors.cardNumber && <p className={errorText}>{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <label className="block text-gray-700 mb-2">Expiry Date</label>
              <Calendar size={18} className={iconBase} />
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className={`${inputBase} pl-10 ${errors.expiryDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
              />
              {errors.expiryDate && <p className={errorText}>{errors.expiryDate}</p>}
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-2">CVV</label>
              <Lock size={18} className={iconBase} />
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className={`${inputBase} pl-10 ${errors.cvv ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
              />
              {errors.cvv && <p className={errorText}>{errors.cvv}</p>}
            </div>
          </div>

          <label className="flex items-center mb-8">
            <input type="checkbox" name="saveCard" checked={formData.saveCard} onChange={handleChange} className="mr-2" />
            <span className="text-gray-700">Save card for future use</span>
          </label>

          <div className="flex justify-between">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onBack} type="button" className="flex items-center text-gray-600 px-6 py-3 border border-gray-300 hover:bg-gray-50">
              <ChevronLeft size={18} className="mr-2" /> Back
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="bg-[#8E7037] text-white px-8 py-3 hover:bg-[#7a602f]">
              Complete Booking
            </motion.button>
          </div>
        </form>
      )}

      {paymentType === 'paypal' && (
        <div>
          <p className="text-gray-600 mb-6">You’ll be redirected to PayPal to complete payment securely.</p>
          <div className="flex justify-between mt-8">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onBack} className="flex items-center text-gray-600 px-6 py-3 border border-gray-300 hover:bg-gray-50">
              <ChevronLeft size={18} className="mr-2" /> Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPaymentData({ paymentType: 'paypal' });
                onNext();
              }}
              className="bg-[#0070ba] text-white px-8 py-3 hover:bg-[#005ea6]"
            >
              Pay with PayPal
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const PaymentOption = ({ id, label, isSelected, onClick, iconType }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex-1 border p-4 cursor-pointer ${isSelected ? 'border-[#8E7037] bg-amber-50' : 'border-gray-300 hover:border-gray-400'}`}
  >
    <input type="radio" id={id} name="paymentType" checked={isSelected} onChange={() => {}} className="sr-only" />
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <span className={`w-5 h-5 border mr-3 flex items-center justify-center ${isSelected ? 'border-[#8E7037]' : 'border-gray-400'}`}>
        {isSelected && <span className="w-3 h-3 bg-[#8E7037]" />}
      </span>
      <span className="flex items-center">
        {iconType === 'visa' && <span className="text-lg font-bold text-blue-800 mr-2">VISA</span>}
        {iconType === 'paypal' && <span className="text-lg font-bold text-[#0070ba] mr-2">PayPal</span>}
        <span className="text-sm text-gray-600">{label}</span>
      </span>
    </label>
  </motion.div>
);

export default PaymentMethod;
