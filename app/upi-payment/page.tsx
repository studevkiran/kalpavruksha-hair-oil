'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Smartphone, CheckCircle, AlertCircle, Copy } from 'lucide-react'
import Image from 'next/image'

export default function UPIPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get order details from URL params
  const orderId = searchParams.get('orderId') || 'ORDER123'
  const amount = parseFloat(searchParams.get('amount') || '0')
  const customerName = searchParams.get('name') || ''
  const customerPhone = searchParams.get('phone') || ''

  const [upiId] = useState('gen-z@slc') // Your UPI ID
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed' | 'failed'>('pending')
  const [transactionId, setTransactionId] = useState('')
  const [upiIdInput, setUpiIdInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate UPI payment string
  const generateUPIPaymentString = () => {
    // UPI payment URL format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR&tn=NOTE
    const upiString = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(customerName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`
    return upiString
  }

  // Generate QR code using multiple fallback methods
  const generateQRCode = async (text: string) => {
    setIsGenerating(true)
    try {
      // Try primary QR service
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&bgcolor=ffffff&color=000000&format=png`
      console.log('Generated QR URL:', qrApiUrl)
      console.log('UPI String:', text)

      // Test if the URL works by creating an image element
      const img = document.createElement('img')
      img.onload = () => {
        setQrCodeUrl(qrApiUrl)
        setIsGenerating(false)
      }
      img.onerror = () => {
        console.log('Primary QR service failed, trying fallback')
        tryFallbackQR(text)
      }
      img.src = qrApiUrl

    } catch (error) {
      console.error('Error generating QR code:', error)
      tryFallbackQR(text)
    }
  }

  const tryFallbackQR = (text: string) => {
    try {
      // Fallback: Use a different QR service
      const fallbackUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(text)}&choe=UTF-8`
      console.log('Fallback QR URL:', fallbackUrl)

      const img = document.createElement('img')
      img.onload = () => {
        setQrCodeUrl(fallbackUrl)
        setIsGenerating(false)
      }
      img.onerror = () => {
        console.log('Fallback QR service also failed')
        setQrCodeUrl('')
        setIsGenerating(false)
      }
      img.src = fallbackUrl

    } catch (error) {
      console.error('Fallback QR generation failed:', error)
      setQrCodeUrl('')
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    const upiString = generateUPIPaymentString()
    generateQRCode(upiString)
  }, [amount, orderId, customerName, upiId])

  const handlePaymentComplete = async () => {
    if (!transactionId.trim()) {
      alert('Please enter the UPI transaction ID')
      return
    }

    if (!upiIdInput.trim()) {
      alert('Please enter your UPI ID')
      return
    }

    setIsSubmitting(true)

    try {
      // Submit payment verification
      const response = await fetch('/api/verify-upi-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          transactionId: transactionId.trim(),
          upiId: upiIdInput.trim(),
          amount
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to verify payment')
      }

      setPaymentStatus('completed')

      // Redirect to success page after a delay
      setTimeout(() => {
        router.push(`/order-success?orderId=${orderId}&paymentMethod=upi_qr`)
      }, 2000)

    } catch (error: any) {
      console.error('Verification error:', error)
      alert('Payment verification failed. Please try again or contact support.')
      setIsSubmitting(false)
    }
  }

  const copyUPIId = () => {
    navigator.clipboard.writeText(upiId)
    alert('UPI ID copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-brand-brown-800">UPI Payment</h1>
            <p className="text-gray-600">Order #{orderId}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {paymentStatus === 'pending' && (
            <>
              {/* Order Summary */}
              <div className="bg-brand-gold-50 border border-brand-gold-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-brand-brown-800 mb-2">Payment Details</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-lg">₹{amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">{customerName}</span>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-brand-brown-800 mb-4">
                  Scan QR Code to Pay
                </h2>

                {isGenerating ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-amber-600"></div>
                    <span className="ml-2 text-gray-600">Generating QR Code...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="inline-block bg-white p-4 rounded-lg border-2 border-gray-200">
                      {qrCodeUrl ? (
                        <img
                          src={qrCodeUrl}
                          alt="UPI Payment QR Code"
                          width={300}
                          height={300}
                          className="mx-auto"
                          onError={(e) => {
                            console.error('QR Code failed to load:', qrCodeUrl)
                            setQrCodeUrl('')
                          }}
                        />
                      ) : (
                        <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-100 rounded">
                          <p className="text-gray-500">QR Code generation failed</p>
                        </div>
                      )}
                    </div>

                    {/* UPI ID Display */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-2">Or pay manually to:</p>
                      <div className="flex items-center justify-center space-x-2">
                        <code className="bg-white px-3 py-2 rounded border font-mono text-lg">
                          {upiId}
                        </code>
                        <button
                          onClick={copyUPIId}
                          className="p-2 text-gray-500 hover:text-gray-700"
                          title="Copy UPI ID"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                      {!qrCodeUrl && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-sm text-yellow-800">
                            <strong>UPI Payment String:</strong><br />
                            <code className="text-xs break-all">{generateUPIPaymentString()}</code>
                          </p>
                          <p className="text-xs text-yellow-700 mt-2">
                            Copy this string and paste it into any QR code generator to create your own QR code.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Smartphone className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">How to Pay:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Open any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                      <li>Scan the QR code above or enter the UPI ID manually</li>
                      <li>Verify the amount (₹{amount}) and pay</li>
                      <li>Note down the UPI Reference ID (12-digit number)</li>
                      <li>Enter the details below and submit</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Payment Verification Form */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-brand-brown-800 mb-4">
                  Payment Verification
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UPI Reference ID / Transaction Number *
                    </label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 301422121258"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-amber-500"
                      maxLength={20}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the 12-digit UPI reference number from your payment app
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your UPI ID *
                    </label>
                    <input
                      type="text"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      placeholder="e.g. yourname@upi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-amber-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the UPI ID you used for payment
                    </p>
                  </div>

                  <button
                    onClick={handlePaymentComplete}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Verifying Payment...
                      </div>
                    ) : (
                      'Submit Payment Details'
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {paymentStatus === 'completed' && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Payment Submitted Successfully!
              </h3>
              <p className="text-gray-600 mb-4">
                Your payment details have been submitted for verification.
              </p>
              <p className="text-sm text-gray-500">
                You will be redirected to the order confirmation page shortly...
              </p>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="text-center py-8">
              <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Payment Verification Failed
              </h3>
              <p className="text-gray-600 mb-4">
                There was an issue verifying your payment. Please try again.
              </p>
              <button
                onClick={() => setPaymentStatus('pending')}
                className="bg-brand-amber-600 hover:bg-brand-amber-700 text-white px-6 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}