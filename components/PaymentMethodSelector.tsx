'use client'

import { useState } from 'react'
import { CreditCard, Smartphone } from 'lucide-react'

export type PaymentMethod = 'cashfree' | 'upi_qr'

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod
  onMethodChange: (method: PaymentMethod) => void
  onProceed: () => void
  isProcessing: boolean
}

const paymentMethods = [
  {
    id: 'cashfree' as PaymentMethod,
    name: 'Cashfree Payment Gateway',
    description: 'Secure payment with cards, UPI, wallets',
    icon: CreditCard,
    features: ['Credit/Debit Cards', 'UPI Apps', 'Net Banking', 'Wallets']
  },
  {
    id: 'upi_qr' as PaymentMethod,
    name: 'UPI QR Code Payment',
    description: 'Scan QR code with any UPI app',
    icon: Smartphone,
    features: ['Direct UPI Payment', 'Manual Verification', 'All UPI Apps Supported']
  },
]

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
  onProceed,
  isProcessing
}: PaymentMethodSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-brand-brown-800 mb-2">Choose Payment Method</h2>
        <p className="text-gray-600">Select how you'd like to complete your payment</p>
      </div>

      <div className="space-y-4 mb-8">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-brand-amber-500 bg-brand-amber-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onMethodChange(method.id)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg ${
                selectedMethod === method.id ? 'bg-brand-amber-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <method.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-brand-brown-800 mb-1">
                  {method.name}
                </h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <div className="flex flex-wrap gap-2">
                  {method.features.map((feature, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedMethod === method.id
                          ? 'bg-brand-amber-200 text-brand-brown-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === method.id
                  ? 'border-brand-amber-500 bg-brand-amber-500'
                  : 'border-gray-300'
              }`}>
                {selectedMethod === method.id && (
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onProceed}
          disabled={isProcessing}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-brand-amber-600 hover:bg-brand-amber-700'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Proceed with ${selectedMethod === 'cashfree' ? 'Cashfree' : 'UPI QR'} Payment`
          )}
        </button>
      </div>
    </div>
  )
}