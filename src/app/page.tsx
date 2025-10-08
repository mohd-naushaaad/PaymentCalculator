'use client';

import { useState } from 'react';

interface CalculationDetails {
  totalDays: number;
  totalHours: number;
  breakdown: Array<{
    hours: number;
    days: number;
    totalHoursForThisType: number;
  }>;
}

export default function Home() {
  const [dailyWage, setDailyWage] = useState<string>('');
  const [daysWorked, setDaysWorked] = useState<{[key: number]: string}>({});
  const [total, setTotal] = useState<number>(0);
  const [calculationDetails, setCalculationDetails] = useState<CalculationDetails | null>(null);

  const hourOptions = [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  const calculateTotal = () => {
    if (dailyWage) {
      const wage = parseFloat(dailyWage);
      let calculatedTotal = 0;
      let totalDays = 0;
      let totalHours = 0;
      const breakdown: Array<{
        hours: number;
        days: number;
        totalHoursForThisType: number;
      }> = [];
      
      hourOptions.forEach(hours => {
        const days = parseFloat(daysWorked[hours] || '0');
        if (days > 0) {
          const hourlyRate = wage / 12; 
          calculatedTotal += (hourlyRate * hours * days);
          totalDays += days;
          totalHours += (hours * days);
          
          breakdown.push({
            hours,
            days,
            totalHoursForThisType: hours * days
          });
        }
      });
      
      setTotal(calculatedTotal);
      setCalculationDetails({
        totalDays,
        totalHours,
        breakdown
      });
    }
  };

  const resetCalculator = () => {
    setDailyWage('');
    setDaysWorked({});
    setTotal(0);
    setCalculationDetails(null);
  };

  const handleDaysChange = (hours: number, value: string) => {
    setDaysWorked(prev => ({
      ...prev,
      [hours]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-8 py-12 border-b border-gray-100">
            <h1 className="text-3xl font-semibold text-gray-900 text-center">
              Karigar Payment Calculator
            </h1>
            <p className="text-gray-600 text-center mt-3">
              Calculate wages based on hours worked per day
            </p>
          </div>

          <div className="px-8 py-8">
            {/* Daily Wage Input */}
            <div className="mb-12">
              <label htmlFor="dailyWage" className="block text-sm font-medium text-gray-700 mb-3">
                Daily Wage (Dihari) ₹
              </label>
              <div className="relative">
                <div className="absolute inset-y-3 left-3 pl-3 flex items-center pointer-events-none">
                </div>
                <input
                  id="dailyWage"
                  type="number"
                  value={dailyWage}
                  onChange={(e) => setDailyWage(e.target.value)}
                  placeholder="Enter daily wage amount"
                  className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-2 focus:border-green-500 text-sm selection:bg-green-200"
                />
              </div>
            </div>

            {/* Hours Input Fields */}
            <div className="mb-12">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Hours Worked Per Day
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {hourOptions.map((hours) => (
                  <div key={hours} className="space-y-2">
                    <label htmlFor={`hours-${hours}`} className="block text-sm font-medium text-gray-700">
                      {hours} Hours
                    </label>
                    <input
                      id={`hours-${hours}`}
                      type="number"
                      value={daysWorked[hours] || ''}
                      onChange={(e) => handleDaysChange(hours, e.target.value)}
                      placeholder="Days"
                      min="0"
                      step="0.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-2 focus:border-green-500 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={calculateTotal}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
              >
                Calculate Total
              </button>
              <button
                onClick={resetCalculator}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
              >
                Reset Calculator
              </button>
            </div>

            {/* Calculation Details */}
            {calculationDetails && calculationDetails.totalDays > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-md p-6 mb-6">
                <h3 className="text-lg font-medium text-purple-800 mb-4 text-center">
                  Calculation Details
                </h3>
                
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-md p-4 border border-purple-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {calculationDetails.totalDays}
                      </div>
                      <div className="text-sm text-purple-800">
                        Total Days
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 border border-purple-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {calculationDetails.totalHours}
                      </div>
                      <div className="text-sm text-purple-800">
                        Total Hours
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 border border-purple-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        ₹{dailyWage}
                      </div>
                      <div className="text-sm text-purple-800">
                        Dihari per Day
                      </div>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white rounded-md p-4 border border-purple-100">
                  <h4 className="text-md font-medium text-purple-800 mb-3 text-center">
                    Hours Breakdown
                  </h4>
                  <div className="space-y-2">
                    {calculationDetails.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-purple-25 rounded">
                        <span className="text-sm text-purple-700">
                          {item.hours} hours × {item.days} days
                        </span>
                        <span className="text-sm font-medium text-purple-800">
                          = {item.totalHoursForThisType} hours
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Total Display */}
            {total > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-8">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-green-800 mb-2">
                    Total Payment
                  </h3>
                  <div className="text-3xl font-bold text-green-600">
                    ₹{total.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
